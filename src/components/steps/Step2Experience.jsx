import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "../../context/FormContext";
import FormField from "../ui/FormField";
import Input from "../ui/Input";

const experienciaSchema = z.object({
  compania: z.string().min(1, "El nombre de la compañía es obligatorio"),
  cargo: z.string().min(1, "El cargo es obligatorio"),
  actividades: z
    .string()
    .min(10, "Describe las actividades realizadas")
    .max(1500, "Máximo 1500 caracteres"),
  periodo_inicio: z
    .string()
    .min(1, "Ingresa el período de inicio")
    .regex(/^\d{2}\/\d{4}$/, "Formato inválido. Usa MM/AAAA (ej: 03/2021)"),
  periodo_fin: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "actualidad" || /^\d{2}\/\d{4}$/.test(val),
      "Formato inválido. Usa MM/AAAA (ej: 12/2023)"
    ),
  es_trabajo_actual: z.boolean().optional(),
});

const schema = z.object({
  experiencia: z.array(experienciaSchema).min(1, "Agrega al menos una experiencia"),
});

const EMPTY_EXPERIENCIA = {
  compania: "",
  cargo: "",
  actividades: "",
  periodo_inicio: "",
  periodo_fin: "",
  es_trabajo_actual: false,
};

export default function Step2Experience({ onNext, onPrev }) {
  const { data, updateData } = useFormContext();

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      experiencia: data.experiencia?.length > 0 ? data.experiencia : [{ ...EMPTY_EXPERIENCIA }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "experiencia" });

  const watchedExperiencia = watch("experiencia");

  const onSubmit = (values) => {
    updateData({ experiencia: values.experiencia });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col gap-6">
      {fields.map((field, index) => {
        const errs = errors.experiencia?.[index];
        const isActual = watchedExperiencia?.[index]?.es_trabajo_actual;
        const charCount = watchedExperiencia?.[index]?.actividades?.length ?? 0;

        return (
          <div
            key={field.id}
            className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col gap-4 relative"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gft-blue">
                Experiencia {index + 1}
              </h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  ✕ Eliminar
                </button>
              )}
            </div>

            {/* Compañía + Cargo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Compañía" error={errs?.compania?.message} required>
                <Input
                  placeholder="Ej: Bancolombia S.A."
                  error={errs?.compania}
                  {...register(`experiencia.${index}.compania`)}
                />
              </FormField>
              <FormField label="Cargo" error={errs?.cargo?.message} required>
                <Input
                  placeholder="Ej: Desarrollador Frontend Sr."
                  error={errs?.cargo}
                  {...register(`experiencia.${index}.cargo`)}
                />
              </FormField>
            </div>

            {/* Actividades */}
            <FormField
              label="Actividades Realizadas"
              error={errs?.actividades?.message}
              required
              hint={`${charCount}/1500 caracteres`}
            >
              <textarea
                rows={4}
                maxLength={1500}
                autoComplete="off"
                placeholder="Describe las principales actividades y responsabilidades..."
                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gft-lightblue focus:border-transparent transition-all resize-y ${
                  errs?.actividades ? "border-red-400" : "border-gray-300"
                }`}
                {...register(`experiencia.${index}.actividades`)}
              />
            </FormField>

            {/* Períodos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Período de Inicio"
                error={errs?.periodo_inicio?.message}
                required
                hint="Formato: MM/AAAA (ej: 03/2021)"
              >
                <Input
                  placeholder="03/2021"
                  error={errs?.periodo_inicio}
                  allowPattern="0-9/"
                  {...register(`experiencia.${index}.periodo_inicio`, {
                    onBlur: () => trigger(`experiencia.${index}.periodo_inicio`)
                  })}
                />
              </FormField>
              <FormField
                label="Período de Fin"
                error={errs?.periodo_fin?.message}
                hint={isActual ? "Se usará 'actualidad' automáticamente" : "Formato: MM/AAAA"}
              >
                <Input
                  placeholder="12/2023"
                  disabled={isActual}
                  error={errs?.periodo_fin}
                  allowPattern="0-9/"
                  {...register(`experiencia.${index}.periodo_fin`, {
                    onBlur: () => trigger(`experiencia.${index}.periodo_fin`)
                  })}
                />
              </FormField>
            </div>

            {/* Trabajo actual */}
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-gft-lightblue w-4 h-4"
                {...register(`experiencia.${index}.es_trabajo_actual`)}
              />
              Trabajo actualmente aquí
            </label>
          </div>
        );
      })}

      {/* Agregar experiencia */}
      {fields.length < 3 && (
        <button
          type="button"
          onClick={() => append({ ...EMPTY_EXPERIENCIA })}
          className="flex items-center gap-2 text-sm text-gft-lightblue hover:text-gft-blue font-medium transition-colors self-start"
        >
          + Agregar experiencia
        </button>
      )}

      {/* Navegación */}
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          ← Anterior
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-gft-lightblue hover:bg-gft-blue text-white rounded-lg font-medium text-sm transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </form>
  );
}
