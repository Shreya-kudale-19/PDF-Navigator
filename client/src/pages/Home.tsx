import { useState } from 'react';
import PDFViewer from '@/components/PDFViewer';
import AnalysisPanel from '@/components/AnalysisPanel';

export default function Home() {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);

  const handleCitationClick = (citationNumber: number) => {
    console.log(`Citation ${citationNumber} clicked`);
    setActiveHighlight(citationNumber);
  };

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-background">
      {/* PDF Viewer Panel */}
      <div className="h-full border border-border rounded-lg overflow-hidden bg-card">
        <PDFViewer activeHighlight={activeHighlight} />
      </div>

      {/* Analysis Panel */}
      <div className="h-full border border-border rounded-lg overflow-hidden bg-card">
        <AnalysisPanel 
          onCitationClick={handleCitationClick}
          activeCitation={activeHighlight}
        />
      </div>
    </div>
  );
}
