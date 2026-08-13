import { IconMed } from "./Icons";

export default function MedPill({ med }) {
  return (
    <div className="flex items-center gap-2 bg-ink text-paper rounded-full pl-2 pr-4 py-1.5 w-fit">
      <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
        <IconMed />
      </span>
      <span className="text-sm font-medium">{med.name}</span>
      <span className="text-sm text-lime">{med.dose}</span>
    </div>
  );
}
