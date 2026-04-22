/**
 * Generador de Excel compatible con el mapeo de la extensión GFT.
 *
 * Mapeo de celdas (config/mapping/example_data.json):
 *   B2  → nombre_completo (nombre + apellidos juntos, la extensión lo separa)
 *   B3  → departamento
 *   B4  → ciudad
 *   B5  → profesion_academica
 *   B6  → fecha_nacimiento
 *   B7  → cedula
 *   B8  → email
 *   B9  → seniority_nivel  (L1/L2/L3/L4)
 *   B10 → nivel_seniority  (JUNIOR/SEMI-SENIOR/SENIOR)
 *   B11 → rol              (clave canónica)
 *   B12 → anos_experiencia
 *   A15:D15 → experiencia[0]  (compania, cargo, actividades, periodo)
 *   A16:D16 → experiencia[1]
 *   A17:D17 → experiencia[2]
 *   B19 → lenguajes_programacion  (separados por coma)
 *   B20 → bases_datos
 *   B21 → aplicaciones
 *   B22 → frameworks
 *   B23 → plataformas
 *   B24 → herramientas
 *   B25 → otros
 *   A28:D28 → certificaciones[0] (institucion, curso, —, fecha_obtencion)
 *   A29:D29 → certificaciones[1]
 *   A30:D30 → certificaciones[2]
 */

import * as XLSX from "xlsx";

/** Formatea un período como "MM/AAAA – MM/AAAA" */
function buildPeriodString(exp) {
  const inicio = exp.periodo_inicio?.trim() ?? "";
  let fin;
  if (exp.es_trabajo_actual) {
    fin = `12/${new Date().getFullYear()}`;
  } else {
    fin = exp.periodo_fin?.trim() ?? "";
  }
  if (!inicio && !fin) return "";
  if (!fin) return inicio;
  return `${inicio} – ${fin}`;
}

/**
 * Recibe el objeto completo de datos del formulario y genera/descarga el .xlsx.
 * @param {Object} formData - Estado completo del formulario (todos los pasos)
 */
export function generateAndDownloadExcel(formData) {
  const wb = XLSX.utils.book_new();
  const ws = {};

  /* ─── Función helper para escribir una celda ─── */
  const set = (ref, value) => {
    ws[ref] = { v: value ?? "", t: "s" };
  };

  /* ─── Etiquetas descriptivas en columna A (para legibilidad humana) ─── */
  const labels = {
    A2: "Nombre Completo",
    A3: "Departamento",
    A4: "Ciudad",
    A5: "Nivel Académico",
    A6: "Fecha de Nacimiento",
    A7: "Cédula",
    A8: "Email",
    A9: "Seniority Nivel (L)",
    A10: "Nivel Seniority",
    A11: "Rol",
    A12: "Años de Experiencia",
    A14: "Compañía",
    B14: "Cargo",
    C14: "Actividades",
    D14: "Período",
    A18: "Lenguajes de Programación",
    A19: "Lenguajes de Programación",
    A20: "Bases de Datos",
    A21: "Aplicaciones",
    A22: "Frameworks",
    A23: "Plataformas",
    A24: "Herramientas",
    A25: "Otros",
    A27: "Institución",
    B27: "Curso / Certificación",
    D27: "Fecha Obtención",
  };
  Object.entries(labels).forEach(([ref, label]) => {
    ws[ref] = { v: label, t: "s" };
  });

  /* ─── PASO 1: Información básica ─── */
  set("B2", formData.nombre_completo);
  set("B3", formData.departamento);
  set("B4", formData.ciudad);
  set("B5", formData.profesion_academica || formData.profesion);
  set("B6", formData.fecha_nacimiento);
  set("B7", formData.cedula);
  set("B8", formData.email);
  set("B9", formData.seniority_nivel);
  set("B10", formData.nivel_seniority);
  set("B11", formData.rol);
  set("B12", String(formData.anos_experiencia));

  /* ─── PASO 2: Experiencia laboral (filas 15, 16, 17) ─── */
  const experiencias = formData.experiencia ?? [];
  const expRows = [15, 16, 17];
  expRows.forEach((row, i) => {
    const exp = experiencias[i];
    if (exp) {
      set(`A${row}`, exp.compania ?? "");
      set(`B${row}`, exp.cargo ?? "");
      set(`C${row}`, exp.actividades ?? "");
      set(`D${row}`, buildPeriodString(exp));
    } else {
      set(`A${row}`, "");
      set(`B${row}`, "");
      set(`C${row}`, "");
      set(`D${row}`, "");
    }
  });

  /* ─── PASO 3: Habilidades técnicas (filas 19-25) ─── */
  const skills = formData.skills ?? {};
  set("B19", (skills.lenguaje ?? []).join(", "));
  set("B20", (skills.baseDeDatos ?? []).join(", "));
  set("B21", (skills.aplicacion ?? []).join(", "));
  set("B22", (skills.framework ?? []).join(", "));
  set("B23", (skills.plataforma ?? []).join(", "));
  set("B24", (skills.herramienta ?? []).join(", "));
  set("B25", (skills.otros ?? []).join(", "));

  /* ─── PASO 4: Certificaciones (filas 28, 29, 30) ─── */
  const certs = formData.certificaciones ?? [];
  const certRows = [28, 29, 30];
  certRows.forEach((row, i) => {
    const cert = certs[i];
    if (cert) {
      set(`A${row}`, cert.institucion ?? "");
      set(`B${row}`, cert.curso_certificacion ?? "");
      set(`D${row}`, cert.fecha_obtencion ?? "");
    } else {
      set(`A${row}`, "");
      set(`B${row}`, "");
      set(`D${row}`, "");
    }
  });

  /* ─── Rango de la hoja (necesario para SheetJS) ─── */
  ws["!ref"] = "A1:D30";

  /* ─── Anchos de columna ─── */
  ws["!cols"] = [
    { wch: 28 }, // A
    { wch: 40 }, // B
    { wch: 60 }, // C
    { wch: 20 }, // D
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Perfil");

  /* ─── Nombre del archivo: perfil_<nombre>_<fecha>.xlsx ─── */
  const nombre = (formData.nombre_completo ?? "candidato")
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
  const fecha = new Date().toISOString().slice(0, 10);
  const filename = `perfil_${nombre}_${fecha}.xlsx`;

  XLSX.writeFile(wb, filename);
}
