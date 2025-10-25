import { useState } from 'react';
import AnalysisPanel from '../AnalysisPanel';

export default function AnalysisPanelExample() {
  const [activeCitation, setActiveCitation] = useState<number | null>(null);

  const handleCitationClick = (num: number) => {
    console.log(`Citation ${num} clicked`);
    setActiveCitation(num);
  };

  return (
    <div className="h-screen bg-card border border-border">
      <AnalysisPanel 
        onCitationClick={handleCitationClick}
        activeCitation={activeCitation}
      />
    </div>
  );
}
