import CitationLink from './CitationLink';

interface AnalysisPanelProps {
  onCitationClick: (citationNumber: number) => void;
  activeCitation: number | null;
}

export default function AnalysisPanel({ onCitationClick, activeCitation }: AnalysisPanelProps) {
  return (
    <div className="h-full overflow-y-auto" data-testid="analysis-panel">
      <article className="max-w-3xl mx-auto py-8 px-6">
        <h2 className="text-2xl font-semibold mb-8 text-foreground">Analysis</h2>
        
        <div className="space-y-6 text-base leading-relaxed">
          <p>
            No extraordinary or one-off items affecting EBITDA were reported in Maersk's Q2 2025 results. 
            The report explicitly notes that EBITDA improvements stemmed from operational performance—including 
            volume growth, cost control, and margin improvement across Ocean, Logistics & Services, and 
            Terminals segments <CitationLink number={1} onClick={onCitationClick} isActive={activeCitation === 1} />
            <CitationLink number={2} onClick={onCitationClick} isActive={activeCitation === 2} />. 
            Gains or losses from asset sales, which could qualify as extraordinary items, are shown separately 
            under EBIT and not included in EBITDA. The gain on sale of non-current assets was USD 25 m in Q2 2025, 
            significantly lower than USD 208 m in Q2 2024, but these affect EBIT, not EBITDA{' '}
            <CitationLink number={3} onClick={onCitationClick} isActive={activeCitation === 3} />. 
            Hence, Q2 2025 EBITDA reflects core operating activities without one-off extraordinary adjustments.
          </p>
        </div>

        <h2 className="text-xl font-semibold mt-12 mb-6 text-foreground">Findings</h2>
        
        <div className="space-y-6 text-base leading-relaxed">
          <div>
            <h3 className="text-lg font-medium mb-2 text-foreground">Page 3 — Highlights Q2 2025</h3>
            <p className="text-muted-foreground">
              EBITDA increase (USD 2.3 bn vs USD 2.1 bn prior year) attributed to operational improvements; no 
              mention of extraordinary or one-off items. <CitationLink number={1} onClick={onCitationClick} isActive={activeCitation === 1} />
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2 text-foreground">Page 5 — Review Q2 2025</h3>
            <p className="text-muted-foreground">
              EBITDA rise driven by higher revenue and cost control across all segments; no extraordinary gains 
              or losses included. <CitationLink number={2} onClick={onCitationClick} isActive={activeCitation === 2} />
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2 text-foreground">Page 15 — Condensed Income Statement</h3>
            <p className="text-muted-foreground">
              Gain on sale of non-current assets USD 25 m (vs USD 208 m prior year) reported separately below 
              EBITDA; therefore, not part of EBITDA. <CitationLink number={3} onClick={onCitationClick} isActive={activeCitation === 3} />
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-12 mb-6 text-foreground">Supporting Evidence</h2>
        
        <div className="space-y-6 text-sm leading-loose">
          <div>
            <p className="font-medium mb-2 text-foreground">
              <CitationLink number={1} onClick={onCitationClick} isActive={activeCitation === 1} /> A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 3 →
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              "Maersk's results continued to improve year-on-year … EBITDA of USD 2.3 bn (USD 2.1 bn) … 
              driven by volume and other revenue growth in Ocean, margin improvements in Logistics & Services 
              and significant top line growth in Terminals."
            </blockquote>
          </div>

          <div>
            <p className="font-medium mb-2 text-foreground">
              <CitationLink number={2} onClick={onCitationClick} isActive={activeCitation === 2} /> A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 5 →
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              "EBITDA increased to USD 2.3 bn (USD 2.1 bn) … driven by higher revenue and cost management 
              … Ocean's EBITDA … slightly increased by USD 36 m … Logistics & Services contributed 
              significantly with a USD 71 m increase … Terminals' EBITDA increased by USD 50 m."
            </blockquote>
          </div>

          <div>
            <p className="font-medium mb-2 text-foreground">
              <CitationLink number={3} onClick={onCitationClick} isActive={activeCitation === 3} /> A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 15 →
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              "Gain on sale of non-current assets, etc., net 25 (208) … Profit before depreciation, amortisation 
              and impairment losses, etc. (EBITDA) 2,298"
            </blockquote>
          </div>
        </div>
      </article>
    </div>
  );
}
