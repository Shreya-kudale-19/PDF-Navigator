# PDF Citation Highlighter - CloudMotiv Case Study

A ReactJS web application that displays a split-screen interface with a PDF document on the left and analysis text on the right. When users click citation numbers ([1], [2], [3]) in the analysis text, the corresponding text in the PDF automatically highlights in yellow and navigates to that page.

## 🎯 Features

- **Split-screen layout**: PDF viewer (left) and analysis panel (right)
- **Citation-based navigation**: Click [1], [2], or [3] to jump to references
- **Yellow text highlighting**: Precise highlighting of cited content within PDF
- **Smooth scrolling**: Automatic navigation to target pages
- **Responsive design**: Adapts to mobile and tablet devices
- **Professional UI**: Clean, document-focused interface

## 📋 Setup Instructions

### 1. PDF File Location

✅ **DONE!** The Maersk Q2 2025 Interim Report PDF has been placed in the correct location: `client/public/Maersk-Q2-2025-Interim-Report.pdf`

The PDF is now loaded and ready for testing!

### 2. Run the Application

The application is already running! Just open the preview in your browser.

If you need to restart:
```bash
npm run dev
```

## 🗺️ Citation Map

The application maps three citations to specific pages in the PDF:

- **[1]** → Page 3: "EBITDA of USD 2.3 bn (USD 2.1 bn)"
- **[2]** → Page 5: "EBITDA increased to USD 2.3bn (USD 2.1bn)"
- **[3]** → Page 15: "Gain on sale of non-current assets, etc., net" (in financial table)

## 🏗️ Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── PDFViewer.tsx           # Left panel - PDF rendering & highlighting
│   │   ├── AnalysisPanel.tsx       # Right panel - Analysis text with citations
│   │   ├── CitationLink.tsx        # Clickable citation component [1], [2], [3]
│   │   └── examples/               # Component demos
│   ├── data/
│   │   └── citationMap.ts          # Citation configuration (page, searchText, context)
│   ├── pages/
│   │   └── Home.tsx                # Main application layout
│   └── App.tsx                     # App router
client/public/
└── Maersk-Q2-2025-Interim-Report.pdf  # ✅ PDF file (already added)
```

## 🎨 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **react-pdf** - PDF rendering
- **pdfjs-dist** - PDF.js library for text extraction
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📱 How It Works

1. **Click a citation** in the analysis text (e.g., [3])
2. **PDF panel scrolls** to the target page (page 15)
3. **Yellow highlight** appears over the exact text
4. **Previous highlights** clear automatically
5. **Citation link** shows active state

## 🧪 Testing Checklist

- ✅ PDF loads all 25 pages correctly
- ✅ Clicking [1] navigates to page 3 and highlights EBITDA text
- ✅ Clicking [2] navigates to page 5 and highlights EBITDA increase
- ✅ Clicking [3] navigates to page 15 and highlights table row
- ✅ Previous highlights clear when new citation clicked
- ✅ Layout responsive on mobile/tablet
- ✅ Smooth scrolling and navigation

## 🚀 For GitHub Submission

1. Ensure the PDF file is in `/public`
2. Test all three citations work correctly
3. Verify responsive layout
4. Commit all changes:
   ```bash
   git add .
   git commit -m "Complete PDF citation highlighter implementation"
   git push
   ```
5. Share the repository link with CloudMotiv HR

## 📝 Key Implementation Details

- **PDF.js Worker**: Configured to use local worker from `pdfjs-dist`
- **Text Layer**: Semi-transparent text layer enables text search and selection
- **Highlight Overlay**: Absolute-positioned yellow div with 40% opacity
- **Page Detection**: Async text content extraction for accurate highlighting
- **State Management**: React useState for active citation tracking

## 💡 Notes for CloudMotiv Assessment

This implementation demonstrates:
- ✅ React component architecture and state management
- ✅ PDF.js integration and text layer manipulation
- ✅ Responsive design patterns
- ✅ Clean, professional UI/UX
- ✅ TypeScript type safety
- ✅ Efficient state lifting and prop drilling

---

Built for **CloudMotiv Full-Stack Developer Assessment** | October 2025
