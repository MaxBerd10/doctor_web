import { tabs, doctor } from "../data";
import { IconSearch, IconBell } from "./Icons";

export default function TopNav({ activeTab, onTab }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-ink flex items-center justify-center">
            <span className="text-lime font-display font-bold text-sm">Nu</span>
          </div>
          <div>
            <p className="font-display font-semibold text-sm leading-tight">{doctor.name}</p>
            <p className="text-xs text-muted leading-tight">{doctor.role}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm bg-white border border-line rounded-full px-3.5 py-2">
          <IconSearch className="text-muted" />
          <input
            placeholder="Bemorlarni qidirish..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-muted"
          />
        </div>

        <button className="w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center relative hover:bg-lime/30 transition-colors">
          <IconBell />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const active = t === activeTab;
          return (
            <button
              key={t}
              onClick={() => onTab(t)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active
                  ? "bg-lime text-ink"
                  : "bg-white border border-line text-ink/60 hover:text-ink"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
