import { useState } from "react";
import { useFormContext } from "../../context/FormContext";
import MultiSelect from "../ui/MultiSelect";
import { ROLES } from "../../constants/roles";

export default function Step3Skills({ onNext, onPrev }) {
  const { data, updateData } = useFormContext();
  const [skills, setSkills] = useState(data.skills ?? {
    lenguaje: [], framework: [], baseDeDatos: [], aplicacion: [],
    plataforma: [], herramienta: [], otros: [],
  });

  const rolLabel = ROLES.find((r) => r.key === data.rol)?.label ?? data.rol;

  const handleNext = () => {
    updateData({ skills });
    onNext();
  };

  return (
    <div className="flex flex-col gap-6">


      <MultiSelect rol={data.rol} skills={skills} onChange={setSkills} />

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          ← Anterior
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2.5 bg-gft-lightblue hover:bg-gft-blue text-white rounded-lg font-medium text-sm transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
