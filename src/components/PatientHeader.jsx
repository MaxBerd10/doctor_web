import { categories } from "../data";
import { iconMap } from "./Icons";

export default function PatientHeader({ patient, activeCategory, onCategory }) {
  return (
    <div className="rounded-3xl bg-white border border-line p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex items-center gap-4 shrink-0">
          <img
            src={patient.photo}
            alt={patient.name}
            className="w-16 h-16 rounded-2xl object-cover"
          />
          <div>
            <p className="text-xs text-muted">
              {patient.sex}, {patient.age} yosh · {patient.mrn}
            </p>
            <h2 className="font-display font-semibold text-lg">{patient.name}</h2>
          </div>
        </div>

        <div className="hidden lg:block w-px h-12 bg-line" />

        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted">Diagnoz</p>
          <h3 className="font-display font-semibold text-xl leading-tight mb-1">
            {patient.diagnosis}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 shrink-0">
          {patient.vitals.map((v) => (
            <div key={v.label}>
              <p className="text-xs text-muted whitespace-nowrap">{v.label}</p>
              <p className="font-display font-semibold text-lg">
                {v.value}
                {v.unit && <span className="text-xs font-medium text-muted ml-1">{v.unit}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-line">
        {categories.map((c) => {
          const Icon = iconMap[c.icon];
          const active = activeCategory === c.key;
          return (
            <button
              key={c.key}
              onClick={() => onCategory(c.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                active
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink/70 hover:bg-lime/40 hover:text-ink"
              }`}
            >
              <Icon />
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
