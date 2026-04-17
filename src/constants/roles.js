// Roles disponibles en el formulario GFT con su clave canónica y etiqueta visual.
// La clave se escribe tal cual en la celda B11 del Excel.

export const ROLES = [
  { key: "frontend", label: "Desarrollos Front-End" },
  { key: "backend", label: "Desarrollos Back-End" },
  { key: "fullstack", label: "Desarrollos Full-Stack" },
  { key: "automatizador", label: "Automatización de Pruebas" },
  { key: "mobile", label: "Desarrollos Mobile" },
  { key: "devops", label: "Ingeniería DevOps" },
  { key: "arquitectura", label: "Arquitectar Soluciones" },
  { key: "analista", label: "Análisis de Soluciones TI" },
  { key: "analista_performance", label: "Análisis de Performance" },
  { key: "datastage", label: "Desarrollos Datastage" },
  { key: "soa", label: "Desarrollos SOA-API" },
  { key: "bizagi", label: "Configuración Especializada - Bizagi" },
  { key: "controller_view", label: "Configuración Especializada Controller View" },
  { key: "murex_tecnico", label: "Murex Técnico" },
  { key: "murex_config", label: "Configuración Especializada - Murex" },
  { key: "finacle", label: "Consultor Finacle" },
  { key: "finacle_infra", label: "Consultor Infra Finacle / DBA Oracle" },
  { key: "ingeniero_datos", label: "Ingeniero de Datos" },
  { key: "ciberseguridad", label: "Diseño Ciberseguridad" },
];

// Roles que tienen catálogo de tecnologías definido (Step 3 las aplica)
export const ROLES_WITH_CATALOG = new Set([
  "frontend",
  "backend",
  "fullstack",
  "automatizador",
  "mobile",
  "devops",
  "arquitectura",
  "analista",
]);
