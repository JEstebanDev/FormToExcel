import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "../../context/FormContext";
import FormField from "../ui/FormField";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Combobox from "../ui/Combobox";
import { ROLES } from "../../constants/roles";
import {
  PROFESSION_OPTIONS,
  SENIORITY_NIVEL_OPTIONS,
  SENIORITY_LABEL_MAP,
  COLOMBIA_DEPARTMENTS,
} from "../../constants/allowedValues";

const DEPARTMENT_OPTIONS = COLOMBIA_DEPARTMENTS.map((d) => d.department);

const schema = z.object({
  nombre_completo: z.string().min(2, "El nombre completo es obligatorio"),
  cedula: z
    .string()
    .min(5, "La cédula es obligatoria")
    .regex(/^\d+$/, "La cédula solo debe contener números"),
  email: z.string().email("El email no es válido"),
  fecha_nacimiento: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
      "Formato inválido. Usa DD/MM/AAAA (ej: 15/04/1990)"
    ),
  departamento: z.string().min(2, "El departamento es obligatorio"),
  ciudad: z.string().min(2, "La ciudad es obligatoria"),
  profesion: z.string().min(1, "Selecciona el nivel académico"),
  seniority_nivel: z.string().min(1, "Selecciona el nivel L"),
  rol: z.string().min(1, "Selecciona el rol técnico"),
  anos_experiencia: z
    .string()
    .min(1, "Los años de experiencia son obligatorios")
    .regex(/^\d+$/, "Solo números permitidos")
    .refine((v) => Number(v) >= 0, "Debe ser un número válido"),
});

export default function Step1BasicInfo({ onNext }) {
  const { data, updateData } = useFormContext();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      nombre_completo: data.nombre_completo || "",
      cedula: data.cedula || "",
      email: data.email || "",
      fecha_nacimiento: data.fecha_nacimiento || "",
      departamento: data.departamento || "",
      ciudad: data.ciudad || "",
      profesion: data.profesion || "",
      seniority_nivel: data.seniority_nivel || "",
      rol: data.rol || "",
      anos_experiencia: data.anos_experiencia || "",
    },
  });

  const selectedDepartamento = watch("departamento");
  const seniorityNivel = watch("seniority_nivel");
  const nivelSeniority = SENIORITY_LABEL_MAP[seniorityNivel] ?? "";

  // Cities filtered by selected department; show all sorted if none selected
  const dept = COLOMBIA_DEPARTMENTS.find((d) => d.department === selectedDepartamento);
  const citiesForDept = dept
    ? dept.cities
    : COLOMBIA_DEPARTMENTS.flatMap((d) => d.cities).sort((a, b) => a.localeCompare(b));

  // Reset ciudad only when departamento actually changes to a different value
  const prevDepartamento = useRef(data.departamento || "");
  useEffect(() => {
    if (selectedDepartamento === prevDepartamento.current) return;
    prevDepartamento.current = selectedDepartamento;
    setValue("ciudad", "", { shouldValidate: false });
  }, [selectedDepartamento, setValue]);

  const onSubmit = (values) => {
    updateData({
      ...values,
      nivel_seniority: nivelSeniority,
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col gap-5">
      {/* Nombre completo + Cédula */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Nombre Completo" error={errors.nombre_completo?.message} required>
          <Input
            placeholder="Ej: Juan Carlos Pérez López"
            error={errors.nombre_completo}
            {...register("nombre_completo")}
          />
        </FormField>
        <FormField label="Número de Cédula" error={errors.cedula?.message} required>
          <Input
            placeholder="Ej: 1000123456"
            error={errors.cedula}
            allowOnlyNumbers
            {...register("cedula")}
          />
        </FormField>
      </div>

      {/* Email + Fecha de nacimiento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Email" error={errors.email?.message} required>
          <Input type="email" placeholder="nombre@email.com" error={errors.email} {...register("email")} />
        </FormField>
        <FormField
          label="Fecha de Nacimiento"
          error={errors.fecha_nacimiento?.message}
          hint="Formato: DD/MM/AAAA"
        >
          <Input
            placeholder="Ej: 15/04/1990"
            error={errors.fecha_nacimiento}
            allowPattern="0-9/"
            {...register("fecha_nacimiento")}
          />
        </FormField>
      </div>

      {/* Departamento + Ciudad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Departamento" error={errors.departamento?.message} required>
          <Controller
            control={control}
            name="departamento"
            render={({ field }) => (
              <Combobox
                options={DEPARTMENT_OPTIONS}
                placeholder="Buscar departamento..."
                error={errors.departamento}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
              />
            )}
          />
        </FormField>
        <FormField label="Ciudad" error={errors.ciudad?.message} required>
          <Controller
            control={control}
            name="ciudad"
            render={({ field }) => (
              <Combobox
                options={citiesForDept}
                placeholder="Buscar ciudad..."
                error={errors.ciudad}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
              />
            )}
          />
        </FormField>
      </div>

      {/* Nivel académico + Seniority nivel L */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Nivel Académico" error={errors.profesion?.message} required>
          <Select
            options={PROFESSION_OPTIONS}
            placeholder="Selecciona el nivel académico..."
            error={errors.profesion}
            {...register("profesion")}
          />
        </FormField>
        <FormField label="Nivel Seniority (L)" error={errors.seniority_nivel?.message} required>
          <Select
            options={SENIORITY_NIVEL_OPTIONS}
            placeholder="Selecciona..."
            error={errors.seniority_nivel}
            {...register("seniority_nivel")}
          />
        </FormField>
      </div>

      {/* Rol técnico */}
      <FormField label="Rol Técnico" error={errors.rol?.message} required>
        <Controller
          control={control}
          name="rol"
          render={({ field }) => (
            <Combobox
              options={ROLES.map((r) => ({ value: r.key, label: r.label }))}
              placeholder="Buscar rol técnico..."
              error={errors.rol}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />
      </FormField>

      {/* Años de experiencia */}
      <FormField
        label="Años de Experiencia Total"
        error={errors.anos_experiencia?.message}
        required
      >
        <Input
          type="text"
          placeholder="Ej: 5"
          error={errors.anos_experiencia}
          allowOnlyNumbers
          {...register("anos_experiencia")}
        />
      </FormField>

      <div className="flex justify-end pt-2">
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
