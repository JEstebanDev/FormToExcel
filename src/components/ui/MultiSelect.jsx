// Selector multi-opción con checkboxes, agrupado por categoría.
// Filtra las opciones disponibles según el rol activo (usando ROLE_TECH_CATALOG).
// Limita a MAX_ITEMS_PER_CATEGORY selecciones por grupo.

import { CATEGORY_LABELS, CATEGORY_ORDER, MAX_ITEMS_PER_CATEGORY, ROLE_TECH_CATALOG } from "../../constants/roleCatalog";

export default function MultiSelect({ rol, skills, onChange }) {
  const catalog = ROLE_TECH_CATALOG[rol] ?? null;

  const handleToggle = (category, item) => {
    const current = skills[category] ?? [];
    let updated;
    if (current.includes(item)) {
      updated = current.filter((v) => v !== item);
    } else {
      if (current.length >= MAX_ITEMS_PER_CATEGORY) return; // límite alcanzado
      updated = [...current, item];
    }
    onChange({ ...skills, [category]: updated });
  };

  if (!catalog) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        ⚠ El rol seleccionado no tiene catálogo de tecnologías definido. Las habilidades técnicas no
        aplican para este perfil o se ingresarán manualmente.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {CATEGORY_ORDER.map((catKey) => {
        const items = catalog[catKey] ?? [];
        if (items.length === 0) return null;

        const selected = skills[catKey] ?? [];
        const limitReached = selected.length >= MAX_ITEMS_PER_CATEGORY;

        return (
          <div key={catKey}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gft-blue">{CATEGORY_LABELS[catKey]}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                limitReached ? "bg-gft-lightblue text-white" : "bg-gray-100 text-gray-600"
              }`}>
                {selected.length}/{MAX_ITEMS_PER_CATEGORY}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {items.map((item) => {
                const isChecked = selected.includes(item);
                const isDisabled = !isChecked && limitReached;

                return (
                  <label
                    key={item}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer select-none transition-all ${
                      isChecked
                        ? "bg-gft-lightblue/10 border-gft-lightblue text-gft-blue font-medium"
                        : isDisabled
                        ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                        : "border-gray-200 text-gray-700 hover:border-gft-accent hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-gft-lightblue w-4 h-4 flex-shrink-0"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleToggle(catKey, item)}
                    />
                    <span className="leading-tight">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
