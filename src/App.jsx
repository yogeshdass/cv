import React from "react";
import CVPreview from "./CVPreview";
import { cvData as cvDataEn } from "./cvData";
import { cvData as cvDataRu } from "./cvData_ru";

// Lazy-loaded so @react-pdf/renderer (large) is split into its own chunk
// and only fetched when the download control renders.
const PdfDownloadButton = React.lazy(() => import("./PdfDownloadButton"));

const CV_DATA = {
  en: cvDataEn,
  ru: cvDataRu,
};

const LANGUAGES = {
  en: {
    label: "EN",
    headings: {
      experience: "WORK EXPERIENCE",
      skills: "TECHNICAL SKILLS",
      certifications: "CERTIFICATIONS",
      languages: "LANGUAGES",
      education: "EDUCATION",
    },
  },
  ru: {
    label: "RU",
    headings: {
      experience: "ОПЫТ РАБОТЫ",
      skills: "ТЕХНИЧЕСКИЕ НАВЫКИ",
      certifications: "СЕРТИФИКАТЫ",
      languages: "ЯЗЫКИ",
      education: "ОБРАЗОВАНИЕ",
    },
  },
};

const LAYOUTS = {
  twocol: "Two-Column",
  single: "One-Column",
};

function App() {
  const [lang, setLang] = React.useState("en");
  const [layout, setLayout] = React.useState("twocol");
  const headings = LANGUAGES[lang].headings;
  const currentData = CV_DATA[lang];

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Controls bar */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "12px 20px",
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        {Object.entries(LANGUAGES).map(([code, { label }]) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            style={{
              padding: "8px 16px",
              border: lang === code ? "2px solid #F99F3E" : "1px solid #ccc",
              borderRadius: 6,
              background: lang === code ? "#FFF3E0" : "#fff",
              cursor: "pointer",
              fontWeight: lang === code ? "bold" : "normal",
              fontSize: 14,
            }}
          >
            {label}
          </button>
        ))}

        <span style={{ width: 1, height: 24, background: "#ddd", margin: "0 8px" }} />

        {Object.entries(LAYOUTS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setLayout(key)}
            style={{
              padding: "8px 16px",
              border: layout === key ? "2px solid #F99F3E" : "1px solid #ccc",
              borderRadius: 6,
              background: layout === key ? "#FFF3E0" : "#fff",
              cursor: "pointer",
              fontWeight: layout === key ? "bold" : "normal",
              fontSize: 14,
            }}
          >
            {label}
          </button>
        ))}

        <span style={{ width: 1, height: 24, background: "#ddd", margin: "0 8px" }} />

        <React.Suspense
          fallback={
            <span style={{ padding: "8px 20px", fontSize: 14, color: "#999" }}>
              Loading PDF…
            </span>
          }
        >
          <PdfDownloadButton data={currentData} headings={headings} layout={layout} />
        </React.Suspense>
      </div>

      {/* HTML Preview — full width, responsive */}
      <div style={{ padding: 0 }}>
        <CVPreview data={currentData} headings={headings} layout={layout} />
      </div>
    </div>
  );
}

export default App;
