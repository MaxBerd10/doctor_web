import MetricCard from "./MetricCard";
import SymptomCard from "./SymptomCard";
import MedPill from "./MedPill";
import { IconVisit, IconPlus } from "./Icons";

function TimelineNode({ node }) {
  return (
    <div className="flex flex-col min-w-[280px] sm:min-w-[320px] relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-lime flex items-center justify-center text-ink shrink-0 ring-4 ring-paper">
          <IconVisit />
        </span>
        <div>
          <p className="font-display font-semibold text-sm leading-tight">
            {node.month} {node.year}
          </p>
          <p className="text-xs text-muted leading-tight">{node.week}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {node.meds.map((m) => (
          <MedPill med={m} key={m.name} />
        ))}
        {node.cards.map((c, i) =>
          c.type === "symptom" ? (
            <SymptomCard card={c} key={i} />
          ) : (
            <MetricCard card={c} key={i} />
          )
        )}
      </div>
    </div>
  );
}

export default function Timeline({ timeline }) {
  return (
    <div className="relative">
      <div className="absolute left-4 right-20 top-4 h-px bg-line z-0" />
      <div className="flex gap-8 sm:gap-12 overflow-x-auto pb-2 no-scrollbar items-start">
        {timeline.map((node) => (
          <TimelineNode node={node} key={node.id} />
        ))}
        <div className="flex flex-col items-center shrink-0 relative z-10">
          <button className="w-8 h-8 rounded-full bg-ink text-lime flex items-center justify-center hover:scale-105 transition-transform ring-4 ring-paper">
            <IconPlus />
          </button>
          <p className="text-xs text-muted mt-2 whitespace-nowrap">Yangi yozuv</p>
        </div>
      </div>
    </div>
  );
}
