import { IconScale } from "./Icons";

export default function SymptomCard({ card }) {
  const scoreNum = parseInt(card.score);
  const pct = Math.min(100, (scoreNum / 35) * 100);

  return (
    <div className="rounded-2xl bg-white border border-line p-4 shadow-[0_1px_2px_rgba(20,20,15,0.04)] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-display font-semibold text-[15px] leading-tight">{card.title}</h4>
        <button className="shrink-0 w-8 h-8 rounded-full bg-paper flex items-center justify-center text-ink/60 hover:text-ink hover:bg-lime/40 transition-colors">
          <IconScale />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {card.tags.map((t) => (
          <span
            key={t}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100"
          >
            {t}
          </span>
        ))}
      </div>

      <div>
        <div className="h-2 rounded-full bg-paper overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime to-orange-400"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted mt-2">{card.score}</p>
      </div>
    </div>
  );
}
