// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import Home from "@/pages/Home";
// import NotFound from "@/pages/not-found";

// function Router() {
//   return (
//     <Switch>
//       <Route path="/" component={Home} />
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Router />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;




import React, { useState } from 'react';
import AnalysisPanel from './components/AnalysisPanel';
import PDFViewer from './components/PDFViewer';

export default function App() {
  const [activeCitation, setActiveCitation] = useState<number | null>(null);

  // DEBUG: log clicks so we can confirm the handler is invoked
  const handleCitationClick = (n: number) => {
    // eslint-disable-next-line no-console
    console.log('handleCitationClick called with', n);
    setActiveCitation((prev) => (prev === n ? null : n));
  };
  
  // highlight mapping
  const highlights = {
    1: { page: 3, text: 'EBITDA of USD 2.3bn ' },
    2: { page: 5, text: 'increased to USD 2.3bn (USD 2.1bn) ' },
    3: { page: 15, text: 'Gain on sale of non-current assets' },
  };

  return (
    <div className="h-screen grid grid-cols-2">
      {/* left column: make independently scrollable and full height */}
      <div className="bg-white" style={{ height: '100vh', overflow: 'auto' }}>
        <PDFViewer
          fileUrl="/Maersk-Q2-2025-Interim-Report.pdf"
          highlights={highlights}
          activeCitation={activeCitation}
        />
      </div>

      {/* right column: make independently scrollable and full height */}
      <div className="bg-surface-50" style={{ height: '100vh', overflow: 'auto' }}>
        <AnalysisPanel onCitationClick={handleCitationClick} activeCitation={activeCitation} />
      </div>
    </div>
  );
}