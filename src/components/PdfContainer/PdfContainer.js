import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PageNumberInput from './PageNumberInput/PageNumberInput'

function PdfContainer({file}) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    const filePath = `http://localhost:8080/${file.filepath}`

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
    
    function onPageNumberChange(event) {
      setPageNumber(event.target.value);
    }

    return (
    <div>
      <Document
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={err => console.error(err)}
      >
        <Page pageNumber={Number(pageNumber)} />
      </Document> 
      <PageNumberInput number={pageNumber} setNumber={onPageNumberChange} />
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}

export default PdfContainer;