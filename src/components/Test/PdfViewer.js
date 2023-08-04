import React, { useEffect, useRef } from "react";
import pdfjsLib from "pdfjs-dist";

const PdfViewer = ({ pdfURL }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Function to render PDF using PDF.js
    const renderPDF = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfURL).promise;
        const numPages = pdf.numPages;

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const viewport = page.getViewport({ scale: 1.5 });

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          page.render(renderContext);
          container.appendChild(canvas);
        }
      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    renderPDF();
  }, [pdfURL]);

  return <div ref={containerRef} />;
};

export default PdfViewer;
