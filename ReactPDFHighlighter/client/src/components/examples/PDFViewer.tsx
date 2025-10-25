import { useState } from 'react';
import PDFViewer from '../PDFViewer';

export default function PDFViewerExample() {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(1);

  return (
    <div className="h-screen bg-card border border-border">
      <div className="p-4 border-b border-border flex gap-2">
        <button 
          onClick={() => setActiveHighlight(1)}
          className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground"
        >
          Highlight Citation 1 (Page 3)
        </button>
        <button 
          onClick={() => setActiveHighlight(2)}
          className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground"
        >
          Highlight Citation 2 (Page 5)
        </button>
        <button 
          onClick={() => setActiveHighlight(3)}
          className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground"
        >
          Highlight Citation 3 (Page 15)
        </button>
        <button 
          onClick={() => setActiveHighlight(null)}
          className="px-3 py-1 text-sm rounded-md bg-secondary text-secondary-foreground"
        >
          Clear
        </button>
      </div>
      <PDFViewer activeHighlight={activeHighlight} />
    </div>
  );
}
