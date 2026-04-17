import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "../../context/FormContext";
import FormField from "../ui/FormField";
import Input from "../ui/Input";

const certificacionSchema = z.object({
  institucion: z.string().optional(),
  curso_certificacion: z.string().optional(),
  fecha_obtencion: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{2}\/\d{4}$/.test(val),
      "Formato inválido. Usa MM/AAAA (ej: 06/2023)"
    ),
});

const schema = z.object({
  certificaciones: z.array(certificacionSchema),
});

const EMPTY_CERT = { institucion: "", curso_certificacion: "", fecha_obtencion: "" };

export default function Step4Education({ onPrev, onGenerate, isGenerating }) {
  const { data, updateData } = useFormContext();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      certificaciones:
        data.certificaciones?.length > 0 ? data.certificaciones : [{ ...EMPTY_CERT }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "certificaciones" });

  const onSubmit = (values) => {
    updateData({
      certificaciones: values.certificaciones,
    });
    onGenerate({
      ...data,
      certificaciones: values.certificaciones,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gft-blue border-b border-gray-200 pb-2">
        Paso 4 — Certificaciones
      </h2>

      {/* Certificaciones */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Cursos y Certificaciones{" "}
          <span className="font-normal text-gray-500">(máx. 3)</span>
        </h3>

        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            const errs = errors.certificaciones?.[index];

            return (
              <div
                key={field.id}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gft-blue">
                    Certificación {index + 1}
                  </span>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Institución" error={errs?.institucion?.message}>
                    <Input
                      placeholder="Ej: Platzi, Coursera, SENA..."
                      {...register(`certificaciones.${index}.institucion`)}
                    />
                  </FormField>
                  <FormField
                    label="Fecha de Obtención"
                    error={errs?.fecha_obtencion?.message}
                    hint="Formato: MM/AAAA (ej: 06/2023)"
                  >
                    <Input
                      placeholder="06/2023"
                      allowPattern="0-9/"
                      {...register(`certificaciones.${index}.fecha_obtencion`, {
                        onBlur: () => trigger(`certificaciones.${index}.fecha_obtencion`)
                      })}
                    />
                  </FormField>
                </div>

                <FormField label="Curso / Certificación" error={errs?.curso_certificacion?.message}>
                  <Input
                    placeholder="Ej: React — The Complete Guide, AWS Cloud Practitioner..."
                    {...register(`certificaciones.${index}.curso_certificacion`)}
                  />
                </FormField>
              </div>
            );
          })}
        </div>

        {fields.length < 3 && (
          <button
            type="button"
            onClick={() => append({ ...EMPTY_CERT })}
            className="mt-3 flex items-center gap-2 text-sm text-gft-lightblue hover:text-gft-blue font-medium transition-colors"
          >
            + Agregar certificación
          </button>
        )}
      </div>

      {/* Navegación */}
      <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          ← Anterior
        </button>
        <button
          type="submit"
          disabled={isGenerating}
          className="px-8 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin">⏳</span> Generando...
            </>
          ) : (
            <>📥 Generar y Descargar Excel</>
          )}
        </button>
      </div>
    </form>
  );
}
