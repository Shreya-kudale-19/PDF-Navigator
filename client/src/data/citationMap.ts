export interface Citation {
  page: number;
  searchText: string;
  context: string;
  section: string;
}

export const citationMap: Record<number, Citation> = {
  1: {
    page: 3,
    searchText: "EBITDA of USD 2.3 bn (USD 2.1 bn)",
    context: "Highlights Q2 2025 - EBITDA performance",
    section: "Highlights Q2 2025"
  },
  2: {
    page: 5,
    searchText: "EBITDA increased to USD 2.3bn (USD 2.1bn)",
    context: "Review Q2 2025 - Operational improvements",
    section: "Review Q2 2025"
  },
  3: {
    page: 15,
    searchText: "Gain on sale of non-current assets, etc., net",
    context: "Condensed Income Statement - Line item in financial table",
    section: "Condensed income statement"
  }
};
