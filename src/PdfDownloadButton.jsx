import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "./CVDocument";
import CVDocumentSingle from "./CVDocumentSingle";

/**
 * Owns all @react-pdf/renderer imports so they can be code-split into a
 * separate chunk that is only fetched when the user opens the app's PDF
 * feature (this component is lazy-loaded from App.jsx).
 */
function PdfDownloadButton({ data, headings, layout }) {
  const DocComponent = layout === "single" ? CVDocumentSingle : CVDocument;
  const fileName = `${data.name.replace(" ", "_")}_CV_${layout === "single" ? "ATS" : "twocol"}.pdf`;

  return (
    <PDFDownloadLink
      document={<DocComponent data={data} headings={headings} />}
      fileName={fileName}
      style={{
        padding: "8px 20px",
        background: "#F99F3E",
        color: "#fff",
        textDecoration: "none",
        borderRadius: 6,
        fontWeight: "bold",
        fontSize: 14,
      }}
    >
      {({ loading }) => (loading ? "..." : "Download PDF")}
    </PDFDownloadLink>
  );
}

export default PdfDownloadButton;
