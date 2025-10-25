import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// ensure worker is served from client/public/pdf.worker.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.js`;

type HighlightSpec = {
  page: number;
  text: string;
};

interface PDFViewerProps {
  fileUrl: string;
  highlights: Record<number, HighlightSpec>;
  activeCitation: number | null;
  onPageChange?: (page: number) => void;
}

export default function PDFViewer({ fileUrl, highlights, activeCitation, onPageChange }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRefs = useRef<Record<number, HTMLCanvasElement | null>>({});
  const pageContainers = useRef<Record<number, HTMLDivElement | null>>({});
  const pageViewports = useRef<Record<number, any>>({});
  const pageTextContents = useRef<Record<number, any>>({});
  const [pdf, setPdf] = useState<any | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale] = useState<number>(1.25);
  const [highlightRects, setHighlightRects] = useState<Record<number, Array<{ left: number; top: number; width: number; height: number }>>>({});

  // load pdf
  useEffect(() => {
    let cancelled = false;
    pdfjsLib.getDocument(fileUrl).promise.then((loaded: any) => {
      if (cancelled) return;
      setPdf(loaded);
      setNumPages(loaded.numPages);
    }).catch((err: any) => {
      console.error('Failed to load PDF:', err);
    });
    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  // render all pages once pdf is available
  useEffect(() => {
    if (!pdf || numPages <= 0) return;
    let mounted = true;

    const renderPage = async (pageNumber: number) => {
      const page = await pdf.getPage(pageNumber);
      if (!mounted) return;
      const viewport = page.getViewport({ scale });
      pageViewports.current[pageNumber] = viewport;

      const canvas = canvasRefs.current[pageNumber];
      if (!canvas) return;
      const ctx = canvas.getContext('2d')!;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const renderTask = page.render({ canvasContext: ctx, viewport });
      await renderTask.promise;

      // cache text content for searching/highlighting
      try {
        const textContent = await page.getTextContent();
        pageTextContents.current[pageNumber] = textContent;
      } catch (e) {
        console.warn('Could not extract text content for page', pageNumber, e);
      }
    };

    (async () => {
      for (let i = 1; i <= numPages; i++) {
        // render sequentially to avoid hogging CPU
        // small delay yields smoother rendering for large docs
        // eslint-disable-next-line no-await-in-loop
        await renderPage(i);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [pdf, numPages, scale]);

  // handle highlight when activeCitation changes
  useEffect(() => {
    if (!pdf || activeCitation == null) {
      setHighlightRects({});
      return;
    }
    const spec = highlights[activeCitation];
    if (!spec) return;
    const targetPage = spec.page;

    // scroll to the page container
    const pageEl = pageContainers.current[targetPage];
    if (pageEl && containerRef.current) {
      containerRef.current.scrollTo({ top: pageEl.offsetTop - 40, behavior: 'smooth' });
    }

    // compute highlight rects using cached text content
    const textContent = pageTextContents.current[targetPage];
    const viewport = pageViewports.current[targetPage];
    if (!textContent || !viewport) {
      // highlight will be set after textContent becomes available (render pass)
      setHighlightRects({});
      return;
    }

    const needle = spec.text.replace(/\s+/g, ' ').trim();
    const items = (textContent.items || []);
    const strings = items.map((it: any) => ((it.str || '') as string).replace(/\s+/g, ' '));
    const concat = strings.join('\u202F');
    const idx = concat.indexOf(needle);
    const rects: Array<{ left: number; top: number; width: number; height: number }> = [];

    if (idx >= 0) {
      // map char index back to items (approx)
      let running = 0;
      for (let i = 0; i < items.length; i++) {
        const s = strings[i];
        const next = running + s.length + 1;
        if (next >= idx && running <= idx + needle.length) {
          const item = items[i];
          const transform = item.transform || item.matrix || [1,0,0,1,0,0];
          const x = transform[4];
          const y = transform[5];
          const fontHeight = Math.hypot(transform[1] || 0, transform[3] || 0) || 10;
          const [x1, y1] = viewport.convertToViewportPoint(x, y);
          const [_, yTop] = viewport.convertToViewportPoint(x, y + fontHeight);
          const width = (item.width || (s.length * 6)) * (viewport.scale || 1);
          rects.push({
            left: x1,
            top: Math.min(yTop, y1),
            width,
            height: Math.abs(y1 - yTop),
          });
        }
        running = next;
      }
    } else {
      // fallback: find an item containing the needle
      for (let i = 0; i < items.length; i++) {
        const s = strings[i];
        if (!s) continue;
        if (s.includes(needle) || needle.includes(s) || s.toLowerCase().includes(needle.toLowerCase())) {
          const item = items[i];
          const transform = item.transform || item.matrix || [1,0,0,1,0,0];
          const x = transform[4];
          const y = transform[5];
          const fontHeight = Math.hypot(transform[1] || 0, transform[3] || 0) || 10;
          const [x1, y1] = viewport.convertToViewportPoint(x, y);
          const [_, yTop] = viewport.convertToViewportPoint(x, y + fontHeight);
          const width = (item.width || (s.length * 6)) * (viewport.scale || 1);
          rects.push({
            left: x1,
            top: Math.min(yTop, y1),
            width,
            height: Math.abs(y1 - yTop),
          });
          break;
        }
      }
    }

    setHighlightRects({ [targetPage]: rects });
  }, [activeCitation, highlights, pdf]);

  // render page canvases
  const pages = [];
  for (let i = 1; i <= numPages; i++) {
    const pageRects = highlightRects[i] || [];
    pages.push(
      <div
        key={`page-container-${i}`}
        ref={(el) => (pageContainers.current[i] = el)}
        style={{ margin: '24px 0', display: 'flex', justifyContent: 'center', position: 'relative' }}
      >
        <div style={{ position: 'relative' }}>
          <canvas
            ref={(el) => (canvasRefs.current[i] = el)}
            style={{ display: 'block', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}
            data-testid={`pdf-canvas-${i}`}
          />
          {/* overlays for this page */}
          {pageRects.map((r, idx) => (
            <div
              key={`hl-${i}-${idx}`}
              style={{
                position: 'absolute',
                left: `${r.left}px`,
                top: `${r.top}px`,
                width: `${r.width}px`,
                height: `${r.height}px`,
                background: 'rgba(255,255,0,0.45)',
                pointerEvents: 'none',
              }}
              data-testid={`pdf-highlight-${i}-${idx}`}
            />
          ))}
          <div style={{ position: 'absolute', left: 8, top: 8, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 6, fontSize: 12 }}>
            Page {i}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', overflowY: 'auto', height: '100%' }}>
      <div style={{ padding: 16 }}>{pages}</div>
    </div>
  );
}
