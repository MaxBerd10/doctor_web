import { WaveChart, SpikeChart } from "./Charts";
import { IconScale, IconTrendUp, IconTrendDown } from "./Icons";

export default function MetricCard({ card }) {
  const isFlow = card.type === "flow";
  return (
    <div className="rounded-2xl bg-white border border-line p-4 shadow-[0_1px_2px_rgba(20,20,15,0.04)] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-1">
        <h4 className="font-display font-semibold text-[15px] leading-tight">{card.title}</h4>
        <button className="shrink-0 w-8 h-8 rounded-full bg-paper flex items-center justify-center text-ink/60 hover:text-ink hover:bg-lime/40 transition-colors">
          <IconScale />
        </button>
      </div>
      {card.day && <p className="text-xs text-muted mb-2">{card.day}</p>}

      <div className="relative -mx-1 my-1">
        {isFlow ? <SpikeChart data={card.data} /> : <WaveChart data={card.data} />}
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 bg-ink text-paper text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
          {card.value} {card.unit}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-line">
        <p className="text-xs text-muted">
          {card.avgLabel}: <span className="text-ink font-medium">{card.avg}</span>
        </p>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            card.deltaUp ? "text-orange-500" : "text-lime-600"
          }`}
        >
          {card.delta}
          {card.deltaUp ? <IconTrendUp /> : <IconTrendDown />}
        </span>
      </div>
    </div>
  );
}
