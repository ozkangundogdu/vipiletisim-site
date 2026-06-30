"use client";

import { useState } from "react";

type Model = { model: string; aktif: boolean };

export function ModellerAccordion({ modeller }: { modeller: Model[] }) {
  const [open, setOpen] = useState(false);

  if (modeller.length === 0) return null;

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 text-[13px] font-black text-zinc-500 hover:text-zinc-800 transition-colors group"
        aria-expanded={open}
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-300 group-hover:border-zinc-500 transition-colors text-[10px] font-black"
          style={{ transform: open ? "rotate(180deg)" : undefined, transition: "transform 0.2s" }}
        >
          ▼
        </span>
        {open ? "Diğer modelleri gizle" : `${modeller.length} model daha göster`}
      </button>

      {open && (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {modeller.map((m) => (
            <div
              key={m.model}
              className="flex items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5"
            >
              <span className="shrink-0 text-green-500 font-black text-sm">✓</span>
              <span className="text-[13px] font-bold text-zinc-800">{m.model}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
