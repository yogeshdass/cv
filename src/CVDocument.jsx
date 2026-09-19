import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

// Register Ubuntu font to match YogeshsResume.pdf
Font.register({
  family: "Ubuntu",
  fonts: [
    { src: "https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgo6eA.ttf", fontWeight: "normal" },
    { src: "https://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvTtw.ttf", fontWeight: "bold" },
    { src: "https://fonts.gstatic.com/s/ubuntu/v20/4iCu6KVjbNBYlgoKeg7z.ttf", fontStyle: "italic" },
  ],
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

// Register Font Awesome for icons
Font.register({
  family: "FontAwesome",
  src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.ttf",
});

Font.register({
  family: "FontAwesomeBrands",
  src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.ttf",
});

// --- Colors matching YogeshsResume.pdf ---
const ORANGE = "#F99F3E";
const BLACK = "#000000";
const WHITE = "#FFFFFF";
const GRAY = "#666666";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 9,
    color: BLACK,
  },

  // --- Header ---
  header: {
    backgroundColor: BLACK,
    padding: "12 20 14 20",
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
  summary: {
    fontSize: 9,
    color: WHITE,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  contactIcon: {
    fontFamily: "FontAwesome",
    fontSize: 9,
    color: WHITE,
    marginRight: 4,
  },
  contactIconBrand: {
    fontFamily: "FontAwesomeBrands",
    fontSize: 9,
    color: WHITE,
    marginRight: 4,
  },
  contactText: {
    fontSize: 8,
    color: WHITE,
  },

  // --- Body ---
  body: {
    flexDirection: "row",
    paddingTop: 10,
  },
  leftColumn: {
    width: "58%",
    paddingLeft: 20,
    paddingRight: 12,
  },
  rightColumn: {
    width: "42%",
    paddingLeft: 12,
    paddingRight: 20,
  },

  // --- Section titles ---
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Roboto", fontWeight: "bold",
    color: ORANGE,
    marginBottom: 4,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: ORANGE,
    paddingBottom: 3,
  },
  sectionTitleFirst: {
    marginTop: 0,
  },

  // --- Experience ---
  jobBlock: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: "Roboto", fontWeight: "bold",
    color: BLACK,
  },
  jobCompany: {
    fontSize: 12,
    color: BLACK,
  },
  jobMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
    marginBottom: 3,
  },
  jobDate: {
    fontSize: 8,
    fontFamily: "Roboto", fontStyle: "italic",
    color: ORANGE,
  },
  jobLocation: {
    fontSize: 8,
    fontFamily: "Roboto", fontStyle: "italic",
    color: ORANGE,
  },
  highlight: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 2,
  },
  bullet: {
    width: 5,
    fontSize: 9,
    color: ORANGE,
    marginRight: 4,
  },
  highlightText: {
    fontSize: 9,
    flex: 1,
    lineHeight: 1.4,
  },

  // --- Skills ---
  skillGroup: {
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 9,
    fontFamily: "Roboto", fontWeight: "bold",
    color: BLACK,
    marginBottom: 1,
  },
  skillItems: {
    fontSize: 9,
    color: BLACK,
    lineHeight: 1.4,
  },
  skillPairRow: {
    flexDirection: "row",
    marginBottom: 1,
  },
  skillPairLabel: {
    fontSize: 9,
    fontFamily: "Roboto", fontWeight: "bold",
    width: 80,
  },
  skillPairValue: {
    fontSize: 9,
    flex: 1,
  },

  // --- Certifications ---
  certItem: {
    fontSize: 8,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  certTitle: {
    fontFamily: "Roboto", fontWeight: "bold",
  },

  // --- Languages ---
  langItem: {
    fontSize: 9,
    marginBottom: 2,
  },
  langName: {
    fontFamily: "Roboto", fontWeight: "bold",
  },
  langLevel: {
    color: BLACK,
  },

  // --- Education ---
  eduDegree: {
    fontSize: 9,
    fontFamily: "Roboto", fontWeight: "bold",
  },
  eduInstitution: {
    fontSize: 8,
    color: BLACK,
  },
  eduDate: {
    fontSize: 8,
    fontFamily: "Roboto", fontStyle: "italic",
    color: ORANGE,
  },
});

const CVDocument = ({ data, headings }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.summary}>{data.summary}</Text>
        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>{"\uf0e0"}</Text>
            <Text style={styles.contactText}>{data.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>{"\uf095"}</Text>
            <Text style={styles.contactText}>{data.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>{"\uf3c5"}</Text>
            <Text style={styles.contactText}>{data.location}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIconBrand}>{"\uf08c"}</Text>
            <Text style={styles.contactText}>{data.linkedin}</Text>
          </View>
        </View>
      </View>

      {/* Body — two columns */}
      <View style={styles.body}>
        {/* Left: Experience */}
        <View style={styles.leftColumn}>
          <Text style={[styles.sectionTitle, styles.sectionTitleFirst]}>
            {headings.experience}
          </Text>
          {data.experience.map((job, i) => (
            <View key={i} style={styles.jobBlock} wrap={false}>
              <Text style={styles.jobTitle}>{job.position}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
              <View style={styles.jobMeta}>
                <Text style={styles.jobDate}>
                  {job.startDate} – {job.endDate}
                </Text>
                <Text style={styles.jobLocation}>{job.location}</Text>
              </View>
              {job.highlights.map((h, j) => (
                <View key={j} style={styles.highlight}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.highlightText}>{h}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Right: Skills, Certs, Languages, Education */}
        <View style={styles.rightColumn}>
          {/* Skills */}
          <Text style={[styles.sectionTitle, styles.sectionTitleFirst]}>
            {headings.skills}
          </Text>
          {data.skills.map((skill, i) => (
            <View key={i} style={styles.skillGroup}>
              <Text style={styles.skillCategory}>{skill.category}</Text>
              {Array.isArray(skill.items) ? (
                skill.items.map((pair, j) => (
                  <View key={j} style={styles.skillPairRow}>
                    <Text style={styles.skillPairLabel}>{pair.label}:</Text>
                    <Text style={styles.skillPairValue}>{pair.value}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.skillItems}>{skill.items}</Text>
              )}
            </View>
          ))}

          {/* Certifications */}
          <Text style={styles.sectionTitle}>{headings.certifications}</Text>
          {data.certifications.map((cert, i) => (
            <Text key={i} style={styles.certItem}>
              • <Text style={styles.certTitle}>{cert.title}</Text> {cert.detail}
            </Text>
          ))}

          {/* Languages */}
          <Text style={styles.sectionTitle}>{headings.languages}</Text>
          {data.languages.map((lang, i) => (
            <Text key={i} style={styles.langItem}>
              <Text style={styles.langName}>{lang.language}</Text> —{" "}
              <Text style={styles.langLevel}>{lang.level}</Text>
            </Text>
          ))}

          {/* Education */}
          <Text style={styles.sectionTitle}>{headings.education}</Text>
          {data.education.map((edu, i) => (
            <View key={i}>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              <Text style={styles.eduInstitution}>{edu.institution}</Text>
              <Text style={styles.eduDate}>
                {edu.startDate} – {edu.endDate} | {edu.location}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default CVDocument;
