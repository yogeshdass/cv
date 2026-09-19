import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Font Awesome for icons
Font.register({
  family: "FontAwesome",
  src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.ttf",
});

Font.register({
  family: "FontAwesomeBrands",
  src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.ttf",
});

// Register Roboto (supports Latin, Cyrillic, German characters)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf", fontWeight: "normal" },
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf", fontWeight: "bold" },
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu52xP.ttf", fontStyle: "italic" },
  ],
});

const DARK_BLUE = "#2C3E50";
const GRAY = "#666666";
const BLACK = "#000000";
const ORANGE = "#F99F3E";
const WHITE = "#FFFFFF";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 9,
    color: BLACK,
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 0,
  },

  // --- Header ---
  header: {
    backgroundColor: BLACK,
    padding: "12 25 14 25",
    marginBottom: 10,
  },
  name: {
    fontSize: 23,
    color: WHITE,
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    color: ORANGE,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  contactText: {
    fontSize: 8,
    color: WHITE,
  },
  summary: {
    fontSize: 9,
    color: WHITE,
    lineHeight: 1.5,
    textAlign: "left",
    marginBottom: 8,
  },

  // --- Section titles ---
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Roboto", fontWeight: "bold",
    color: ORANGE,
    marginTop: 12,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: ORANGE,
    paddingBottom: 2,
    marginHorizontal: 25,
  },

  // --- Experience ---
  jobBlock: {
    marginBottom: 8,
    marginHorizontal: 25,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: "Roboto", fontWeight: "bold",
    color: BLACK,
  },
  jobMeta: {
    fontSize: 8,
    fontFamily: "Roboto", fontStyle: "italic",
    color: ORANGE,
    marginBottom: 2,
  },
  highlight: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 8,
    fontSize: 9,
    color: ORANGE,
  },
  highlightText: {
    fontSize: 9,
    flex: 1,
    lineHeight: 1.4,
  },

  // --- Skills ---
  skillGroup: {
    marginBottom: 3,
    marginHorizontal: 25,
  },
  skillLine: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillCategory: {
    fontSize: 9,
    fontFamily: "Roboto", fontWeight: "bold",
    color: BLACK,
  },
  skillItems: {
    fontSize: 9,
  },
  skillPairRow: {
    flexDirection: "row",
    marginLeft: 8,
    marginBottom: 1,
  },
  skillPairLabel: {
    fontSize: 9,
    fontFamily: "Roboto", fontWeight: "bold",
    width: 90,
  },
  skillPairValue: {
    fontSize: 9,
    flex: 1,
  },

  // --- Certifications ---
  certItem: {
    fontSize: 9,
    marginBottom: 2,
    lineHeight: 1.4,
    marginHorizontal: 25,
  },
  certTitle: {
    fontFamily: "Roboto", fontWeight: "bold",
  },

  // --- Languages ---
  langItem: {
    fontSize: 9,
    marginBottom: 2,
    marginHorizontal: 25,
  },
  langName: {
    fontFamily: "Roboto", fontWeight: "bold",
  },

  // --- Education ---
  eduBlock: {
    marginHorizontal: 25,
  },
  eduDegree: {
    fontSize: 9,
    fontFamily: "Roboto", fontWeight: "bold",
    color: BLACK,
  },
  eduInstitution: {
    fontSize: 8.5,
    color: BLACK,
  },
  eduDate: {
    fontSize: 8,
    fontFamily: "Roboto", fontStyle: "italic",
    color: ORANGE,
  },
});

const CVDocumentSingle = ({ data, headings }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.summary}>{data.summary}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactText}>{data.email}</Text>
          <Text style={styles.contactText}>|</Text>
          <Text style={styles.contactText}>{data.phone}</Text>
          <Text style={styles.contactText}>|</Text>
          <Text style={styles.contactText}>{data.location}</Text>
          <Text style={styles.contactText}>|</Text>
          <Text style={styles.contactText}>{data.linkedin}</Text>
        </View>
      </View>

      {/* Experience */}
      <Text style={styles.sectionTitle}>{headings.experience}</Text>
      {data.experience.map((job, i) => (
        <View key={i} style={styles.jobBlock} wrap={false}>
          <Text style={styles.jobTitle}>{job.position}</Text>
          <Text style={styles.jobMeta}>
            {job.company}  |  {job.startDate} – {job.endDate}  |  {job.location}
          </Text>
          {job.highlights.map((h, j) => (
            <View key={j} style={styles.highlight}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.highlightText}>{h}</Text>
            </View>
          ))}
        </View>
      ))}

      {/* Skills */}
      <Text style={styles.sectionTitle}>{headings.skills}</Text>
      {data.skills.map((skill, i) => (
        <View key={i} style={styles.skillGroup}>
          {Array.isArray(skill.items) ? (
            <>
              <Text style={styles.skillCategory}>{skill.category}:</Text>
              {skill.items.map((pair, j) => (
                <View key={j} style={styles.skillPairRow}>
                  <Text style={styles.skillPairLabel}>{pair.label}:</Text>
                  <Text style={styles.skillPairValue}>{pair.value}</Text>
                </View>
              ))}
            </>
          ) : (
            <View style={styles.skillLine}>
              <Text style={styles.skillCategory}>{skill.category}: </Text>
              <Text style={styles.skillItems}>{skill.items}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Certifications */}
      <Text style={styles.sectionTitle}>{headings.certifications}</Text>
      {data.certifications.map((cert, i) => (
        <Text key={i} style={styles.certItem}>•  <Text style={styles.certTitle}>{cert.title}</Text> {cert.detail}</Text>
      ))}

      {/* Languages */}
      <Text style={styles.sectionTitle}>{headings.languages}</Text>
      {data.languages.map((lang, i) => (
        <Text key={i} style={styles.langItem}>•  <Text style={styles.langName}>{lang.language}</Text>: {lang.level}</Text>
      ))}

      {/* Education */}
      <Text style={styles.sectionTitle}>{headings.education}</Text>
      {data.education.map((edu, i) => (
        <View key={i} style={styles.eduBlock}>
          <Text style={styles.eduDegree}>{edu.degree}</Text>
          <Text style={styles.eduInstitution}>{edu.institution}</Text>
          <Text style={styles.eduDate}>{edu.startDate} – {edu.endDate}  |  {edu.location}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default CVDocumentSingle;
