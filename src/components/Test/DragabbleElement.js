// import React, { useEffect, useRef } from "react";
// import interact from "interactjs";
// import * as pdfjsLib from "pdfjs-dist";

// const DraggablePDF = () => {
//   const pdfViewerRef = useRef(null);
//   const draggablePDFRef = useRef(null);

//   useEffect(() => {
//     const viewer = pdfViewerRef.current;
//     const draggablePDF = draggablePDFRef.current;

//     // Load and display the PDF in the viewer
//     const loadPDF = async () => {
//       try {
//         const pdfData = await fetch("/path/to/your/pdf.pdf");
//         const pdfArrayBuffer = await pdfData.arrayBuffer();
//         const pdf = await pdfjsLib.getDocument({ data: pdfArrayBuffer })
//           .promise;
//         const page = await pdf.getPage(1);
//         const viewport = page.getViewport({ scale: 1 });

//         const canvas = document.createElement("canvas");
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;
//         const context = canvas.getContext("2d");

//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };
//         await page.render(renderContext);

//         viewer.appendChild(canvas);
//       } catch (error) {
//         console.error("Error loading PDF:", error);
//       }
//     };

//     loadPDF();

//     // Enable dragging for the draggable PDF element
//     interact(draggablePDF).draggable({
//       inertia: true,
//       autoScroll: true,
//       onmove: dragMoveListener,
//     });
//   }, []);

//   const dragMoveListener = (event) => {
//     const target = event.target;
//     const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
//     const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

//     target.style.transform = `translate(${x}px, ${y}px)`;
//     target.setAttribute("data-x", x);
//     target.setAttribute("data-y", y);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <div
//         ref={pdfViewerRef}
//         style={{
//           width: "100%",
//           height: "500px",
//           backgroundColor: "#f0f0f0",
//           position: "relative",
//         }}
//       ></div>
//       <div
//         ref={draggablePDFRef}
//         style={{
//           width: "200px",
//           height: "150px",
//           backgroundColor: "lightblue",
//           position: "absolute",
//         }}
//       >
//         Drag Me (PDF)!
//       </div>
//     </div>
//   );
// };

// export default DraggablePDF;
