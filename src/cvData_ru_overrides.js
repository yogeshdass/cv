/**
 * Manual corrections for the Russian CV translation.
 * These overrides are merged on top of the auto-translated cvData_ru.js
 * after running `npm run translate`.
 *
 * Structure mirrors cvData — only include fields you want to override.
 * Nested arrays use index to target specific items.
 */

export const overrides = {
  title: "Cloud Solutions Architect (Облачная безопасность)",
  summary: "11 лет опыта в области облачной безопасности, DevSecOps и Platform Engineering. Я проектирую безопасные и соответствующие требованиям облачные платформы, руковожу техническими командами и реализую облачные миграции и событийно-ориентированные архитектуры.",
  experience: [
    {
      index: 0,
      position: "Cloud Architect / Technical Manager (Облачный архитектор)",
    },
    {
      index: 1,
      position: "AWS Engineer (AWS-инженер / Разработчик)",
    },
    {
      index: 2,
      position: "Senior Systems Engineer (Старший системный инженер)",
    },
    {
      index: 3,
      position: "Senior DevOps Engineer (Старший DevOps-инженер)",
    },
    {
      index: 4,
      position: "Senior DevOps Engineer (Старший DevOps-инженер)",
    },
    {
      index: 5,
      position: "AWS Solution Architect (AWS Архитектор)",
    },
    {
      index: 6,
      position: "Server Engineer / DevSecOps (Системный инженер)",
    },
  ],
  languages: [
    { index: 0, level: "Свободно" },
  ],
};
