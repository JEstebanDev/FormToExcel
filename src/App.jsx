import { useState } from "react";
import { FormProvider, useFormContext } from "./context/FormContext";
import Stepper from "./components/Stepper";
import Step1BasicInfo from "./components/steps/Step1BasicInfo";
import Step2Experience from "./components/steps/Step2Experience";
import Step3Skills from "./components/steps/Step3Skills";
import Step4Education from "./components/steps/Step4Education";
import { generateAndDownloadExcel } from "./utils/excelGenerator";

function FormWizard() {
  const { step, goNext, goPrev } = useFormContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async (finalData) => {
    setIsGenerating(true);
    try {
      generateAndDownloadExcel(finalData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gft-gray flex flex-col items-center py-10 px-4">
      {/* Card principal */}
      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <Stepper currentStep={step} />

        {step === 0 && <Step1BasicInfo onNext={goNext} />}
        {step === 1 && <Step2Experience onNext={goNext} onPrev={goPrev} />}
        {step === 2 && <Step3Skills onNext={goNext} onPrev={goPrev} />}
        {step === 3 && (
          <Step4Education onPrev={goPrev} onGenerate={handleGenerate} isGenerating={isGenerating} />
        )}
      </main>

      {/* Banner de éxito */}
      {success && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-bounce-once z-50">
          ✅ Excel generado y descargado correctamente. ¡Ya puedes cargarlo en la extensión!
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 text-xs text-gray-400 text-center">
        Herramienta interna de generación de perfiles de candidatos
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <FormProvider>
      <FormWizard />
    </FormProvider>
  );
}
