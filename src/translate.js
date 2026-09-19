/**
 * Pre-translates CV data into Russian using Google Translate.
 * Run: npm run translate
 * Output: src/cvData_ru.js
 */

import translate from "@iamtraction/google-translate";
import { cvData } from "./cvData.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGETS = ["ru"];

async function translateText(text, lang) {
  if (!text || !text.trim()) return text;
  try {
    const res = await translate(text, { from: "en", to: lang });
    return res.text;
  } catch (e) {
    console.warn(`  ⚠ Failed: "${text.slice(0, 40)}..." — ${e.message}`);
    return text;
  }
}

async function translateCV(data, lang) {
  const translated = JSON.parse(JSON.stringify(data));

  // Title & summary
  translated.title = await translateText(data.title, lang);
  translated.summary = await translateText(data.summary, lang);
  translated.location = await translateText(data.location, lang);

  // Experience — position + highlights
  for (const job of translated.experience) {
    // Keep position in English (overrides handle Russian titles)
    job.location = await translateText(job.location, lang);
    job.highlights = await Promise.all(
      job.highlights.map((h) => translateText(h, lang))
    );
  }

  // Skills — category names only
  for (const skill of translated.skills) {
    skill.category = await translateText(skill.category, lang);
  }

  // Languages
  for (const lang_entry of translated.languages) {
    lang_entry.language = await translateText(lang_entry.language, lang);
    lang_entry.level = await translateText(lang_entry.level, lang);
  }

  // Education — degree + location
  for (const edu of translated.education) {
    edu.degree = await translateText(edu.degree, lang);
    edu.location = await translateText(edu.location, lang);
  }

  return translated;
}

async function applyOverrides(translated, lang) {
  const overridePath = path.join(__dirname, `cvData_${lang}_overrides.js`);
  if (!fs.existsSync(overridePath)) return translated;

  const { overrides } = await import(`./cvData_${lang}_overrides.js`);
  if (!overrides) return translated;

  // Top-level string fields
  for (const key of ["title", "summary"]) {
    if (overrides[key]) translated[key] = overrides[key];
  }

  // Experience array — override by index
  if (overrides.experience) {
    for (const override of overrides.experience) {
      const job = translated.experience[override.index];
      if (!job) continue;
      if (override.position) job.position = override.position;
      if (override.highlights) {
        for (const [idx, text] of Object.entries(override.highlights)) {
          job.highlights[Number(idx)] = text;
        }
      }
    }
  }

  // Skills array — override by index
  if (overrides.skills) {
    for (const override of overrides.skills) {
      const skill = translated.skills[override.index];
      if (!skill) continue;
      if (override.category) skill.category = override.category;
    }
  }

  // Languages array — override by index
  if (overrides.languages) {
    for (const override of overrides.languages) {
      const lang_entry = translated.languages[override.index];
      if (!lang_entry) continue;
      if (override.language) lang_entry.language = override.language;
      if (override.level) lang_entry.level = override.level;
    }
  }

  // Certifications array — override by index
  if (overrides.certifications) {
    for (const override of overrides.certifications) {
      const cert = translated.certifications[override.index];
      if (!cert) continue;
      if (override.title) cert.title = override.title;
    }
  }

  // Education array — override by index
  if (overrides.education) {
    for (const override of overrides.education) {
      const edu = translated.education[override.index];
      if (!edu) continue;
      if (override.degree) edu.degree = override.degree;
    }
  }

  return translated;
}

async function main() {
  console.log("Translating CV data...\n");

  for (const lang of TARGETS) {
    console.log(`── ${lang.toUpperCase()} ──`);
    let translated = await translateCV(cvData, lang);

    // Apply manual overrides if they exist
    translated = await applyOverrides(translated, lang);

    const output = `export const cvData = ${JSON.stringify(translated, null, 2)};\n`;
    const filePath = path.join(__dirname, `cvData_${lang}.js`);
    fs.writeFileSync(filePath, output);
    console.log(`  ✓ Saved: src/cvData_${lang}.js\n`);
  }

  console.log("Done!");
}

main();
