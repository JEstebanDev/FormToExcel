import { createContext, useContext, useState, useCallback } from "react";

const EMPTY_FORM = {
  // Step 1 — Información Básica
  nombre_completo: "",
  cedula: "",
  email: "",
  fecha_nacimiento: "",
  departamento: "",
  ciudad: "",
  profesion: "",
  seniority_nivel: "",
  nivel_seniority: "",
  rol: "",
  anos_experiencia: "",

  // Step 2 — Experiencia (hasta 3 entradas)
  experiencia: [
    { compania: "", cargo: "", actividades: "", periodo_inicio: "", periodo_fin: "", es_trabajo_actual: false },
  ],

  // Step 3 — Habilidades técnicas (por categoría, array de strings seleccionados)
  skills: {
    lenguaje: [],
    framework: [],
    baseDeDatos: [],
    aplicacion: [],
    plataforma: [],
    herramienta: [],
    otros: [],
  },

  // Step 4 — Educación y Certificaciones
  profesion_academica: "",
  certificaciones: [
    { institucion: "", curso_certificacion: "", fecha_obtencion: "" },
  ],
};

const FormContext = createContext(null);

export function FormProvider({ children }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY_FORM);
  const [stepErrors, setStepErrors] = useState({});

  const updateData = useCallback((updates) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goNext = useCallback(() => setStep((s) => Math.min(s + 1, 3)), []);
  const goPrev = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const goToStep = useCallback((n) => setStep(n), []);

  const setErrors = useCallback((stepIndex, errors) => {
    setStepErrors((prev) => ({ ...prev, [stepIndex]: errors }));
  }, []);

  return (
    <FormContext.Provider value={{ step, data, stepErrors, updateData, goNext, goPrev, goToStep, setErrors }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used inside FormProvider");
  return ctx;
}
