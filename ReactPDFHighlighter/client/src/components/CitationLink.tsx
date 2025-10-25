// interface CitationLinkProps {
//   number: number;
//   onClick: (citationNumber: number) => void;
//   isActive?: boolean;
// }

// export default function CitationLink({ number, onClick, isActive }: CitationLinkProps) {
//   return (
//     <span
//       className={`
//         inline-block font-mono text-sm font-semibold cursor-pointer 
//         underline transition-all duration-200
//         ${isActive 
//           ? 'text-primary bg-primary/10' 
//           : 'text-primary hover:bg-primary/5'
//         }
//         px-1 rounded-sm
//       `}
//       onClick={() => onClick(number)}
//       title={`Jump to page reference [${number}]`}
//       data-testid={`citation-link-${number}`}
//     >
//       [{number}]
//     </span>
//   );
// }

import React from 'react';

interface CitationLinkProps {
  number: number;
  onClick: (n: number) => void;
  isActive?: boolean;
}

export default function CitationLink({ number, onClick, isActive }: CitationLinkProps) {
  return (
    <button
      type="button"
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('CitationLink clicked', number);
        onClick(number);
      }}
      aria-pressed={!!isActive}
      style={{
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        padding: 0,
        marginLeft: 4,
        color: isActive ? '#1f6feb' : '#0b5fff',
        textDecoration: 'underline',
        fontWeight: 600,
      }}
      data-testid={`citation-${number}`}
    >
      [{number}]
    </button>
  );
}
