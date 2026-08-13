import { scrubberMonths } from "../data";
import { iconMap } from "./Icons";

const dotIcons = [
  { key: "visit", cls: "bg-lime text-ink" },
  { key: "med", cls: "bg-ink text-paper" },
  { key: "lab", cls: "bg-orange-100 text-orange-600" },
];

export default function BottomScrubber({ activeMonth, onSelect }) {
  return (
    <div className="rounded-2xl bg-white border border-line px-4 sm:px-6 py-3 flex items-center gap-1 overflow-x-auto no-scrollbar">
      <span className="text-xs font-semibold text-muted shrink-0 pr-3 border-r border-line mr-2">
        2026
      </span>
      {scrubberMonths.map((mo) => {
        const active = mo.m === activeMonth;
        const hasEntries = Object.keys(mo.counts).length > 0;
        return (
          <button
            key={mo.m}
            onClick={() => onSelect(mo.m)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shrink-0 transition-colors ${
              active ? "bg-lime/50" : "hover:bg-paper"
            }`}
          >
            <span className={`text-xs font-medium ${active ? "text-ink" : "text-muted"}`}>
              {mo.m}
            </span>
            {hasEntries && (
              <span className="flex items-center -space-x-1">
                {dotIcons
                  .filter((d) => mo.counts[d.key])
                  .map((d) => {
                    const Icon = iconMap[d.key];
                    return (
                      <span
                        key={d.key}
                        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${d.cls}`}
                      >
                        <Icon width={10} height={10} />
                      </span>
                    );
                  })}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
