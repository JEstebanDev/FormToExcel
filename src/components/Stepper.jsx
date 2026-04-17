// Barra de progreso con los 4 pasos del formulario

const STEPS = [
  { label: "Información Básica", icon: "👤" },
  { label: "Experiencia", icon: "💼" },
  { label: "Habilidades", icon: "⚙️" },
  { label: "Educación", icon: "🎓" },
];

export default function Stepper({ currentStep }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Línea de fondo */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />
        {/* Línea de progreso */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-gft-lightblue z-0 transition-all duration-500"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((s, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;

          return (
            <div key={i} className="flex flex-col items-center z-10 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold border-2 transition-all duration-300 ${
                  isDone
                    ? "bg-gft-lightblue border-gft-lightblue text-white"
                    : isActive
                    ? "bg-white border-gft-lightblue text-gft-lightblue shadow-md"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {isDone ? "✓" : s.icon}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center max-w-[80px] leading-tight ${
                  isActive ? "text-gft-lightblue" : isDone ? "text-gft-lightblue" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
