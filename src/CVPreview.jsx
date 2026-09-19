import React from "react";

const ORANGE = "#F99F3E";
const BLACK = "#000000";
const WHITE = "#FFFFFF";
const GRAY = "#666666";

const CVPreview = ({ data, headings, layout }) => {
  if (layout === "twocol") return <TwoColumnPreview data={data} headings={headings} />;
  return <SingleColumnPreview data={data} headings={headings} />;
};

// --- Two-Column Layout ---
function TwoColumnPreview({ data, headings }) {
  return (
    <div style={{ width: "100%", fontFamily: "Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ background: BLACK, padding: "30px 5%", color: WHITE }}>
        <h1 style={{ fontSize: 32, fontWeight: "normal", margin: 0 }}>{data.name}</h1>
        <p style={{ fontSize: 16, color: ORANGE, margin: "6px 0 12px" }}>{data.title}</p>
        <p style={{ fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>{data.summary}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 30px", fontSize: 12 }}>
          <span>⌂ {data.location}</span>
          <span>🔗 {data.linkedin}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", gap: 0 }}>
        {/* Left: Experience */}
        <div style={{ width: "58%", padding: "24px 3% 24px 5%" }}>
          <SectionTitle>{headings.experience}</SectionTitle>
          {data.experience.map((job, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: "bold" }}>{job.position}</div>
              <div style={{ fontSize: 16 }}>{job.company}</div>
              <div style={{ fontSize: 12, fontStyle: "italic", color: ORANGE, margin: "3px 0 6px" }}>
                {job.startDate} – {job.endDate} &nbsp;&nbsp; {job.location}
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7 }}>
                {job.highlights.map((h, j) => (
                  <li key={j} style={{ marginBottom: 3 }}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right: Skills etc */}
        <div style={{ width: "42%", padding: "24px 5% 24px 3%", borderLeft: "1px solid #eee" }}>
          <SectionTitle>{headings.skills}</SectionTitle>
          {data.skills.map((skill, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: "bold" }}>{skill.category}</div>
              {Array.isArray(skill.items) ? (
                skill.items.map((pair, j) => (
                  <div key={j} style={{ fontSize: 13, display: "flex" }}>
                    <span style={{ fontWeight: "bold", width: 120, flexShrink: 0 }}>{pair.label}:</span>
                    <span>{pair.value}</span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: 13, color: "#333" }}>{skill.items}</div>
              )}
            </div>
          ))}

          <SectionTitle>{headings.certifications}</SectionTitle>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ fontSize: 12, marginBottom: 6, lineHeight: 1.6 }}>• <strong>{cert.title}</strong> {cert.detail}</div>
          ))}

          <SectionTitle>{headings.languages}</SectionTitle>
          {data.languages.map((lang, i) => (
            <div key={i} style={{ fontSize: 13, marginBottom: 3 }}>
              <strong>{lang.language}</strong> — <span>{lang.level}</span>
            </div>
          ))}

          <SectionTitle>{headings.education}</SectionTitle>
          {data.education.map((edu, i) => (
            <div key={i}>
              <div style={{ fontSize: 13, fontWeight: "bold" }}>{edu.degree}</div>
              <div style={{ fontSize: 12 }}>{edu.institution}</div>
              <div style={{ fontSize: 12, fontStyle: "italic", color: ORANGE }}>
                {edu.startDate} – {edu.endDate} | {edu.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Single-Column Layout ---
function SingleColumnPreview({ data, headings }) {
  return (
    <div style={{ width: "100%", fontFamily: "Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ background: BLACK, padding: "30px 5%", color: WHITE }}>
        <h1 style={{ fontSize: 32, fontWeight: "normal", margin: 0 }}>{data.name}</h1>
        <p style={{ fontSize: 16, color: ORANGE, margin: "6px 0 12px" }}>{data.title}</p>
        <p style={{ fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>{data.summary}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12 }}>
          <span>{data.location}</span>
          <span>|</span>
          <span>{data.linkedin}</span>
        </div>
      </div>

      <div style={{ padding: "0 5%" }}>

      {/* Experience */}
      <SectionTitle>{headings.experience}</SectionTitle>
      {data.experience.map((job, i) => (
        <div key={i} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 16, fontWeight: "bold" }}>{job.position}</div>
          <div style={{ fontSize: 12, fontStyle: "italic", color: ORANGE }}>
            {job.company} | {job.startDate} – {job.endDate} | {job.location}
          </div>
          <ul style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 13, lineHeight: 1.7 }}>
            {job.highlights.map((h, j) => (
              <li key={j} style={{ marginBottom: 3 }}>{h}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Skills */}
      <SectionTitle>{headings.skills}</SectionTitle>
      {data.skills.map((skill, i) => (
        <div key={i} style={{ marginBottom: 6 }}>
          {Array.isArray(skill.items) ? (
            <>
              <span style={{ fontSize: 13, fontWeight: "bold" }}>{skill.category}:</span>
              {skill.items.map((pair, j) => (
                <div key={j} style={{ fontSize: 13, marginLeft: 14 }}>
                  <span style={{ fontWeight: "bold" }}>{pair.label}:</span> {pair.value}
                </div>
              ))}
            </>
          ) : (
            <div style={{ fontSize: 13 }}>
              <span style={{ fontWeight: "bold" }}>{skill.category}:</span> {skill.items}
            </div>
          )}
        </div>
      ))}

      {/* Certifications */}
      <SectionTitle>{headings.certifications}</SectionTitle>
      {data.certifications.map((cert, i) => (
        <div key={i} style={{ fontSize: 13, marginBottom: 4 }}>• <strong>{cert.title}</strong> {cert.detail}</div>
      ))}

      {/* Languages */}
      <SectionTitle>{headings.languages}</SectionTitle>
      {data.languages.map((lang, i) => (
        <div key={i} style={{ fontSize: 13, marginBottom: 3 }}>
          • <strong>{lang.language}</strong>: {lang.level}
        </div>
      ))}

      {/* Education */}
      <SectionTitle>{headings.education}</SectionTitle>
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: "bold" }}>{edu.degree}</div>
          <div style={{ fontSize: 12 }}>{edu.institution}</div>
          <div style={{ fontSize: 12, fontStyle: "italic", color: ORANGE }}>
            {edu.startDate} – {edu.endDate} | {edu.location}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 18,
      fontWeight: "bold",
      color: ORANGE,
      borderBottom: `1px solid ${ORANGE}`,
      paddingBottom: 5,
      marginTop: 24,
      marginBottom: 12,
    }}>
      {children}
    </h2>
  );
}

export default CVPreview;
