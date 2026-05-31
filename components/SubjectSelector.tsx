"use client";

import { useState, useRef, useEffect } from "react";
import { ALL_SUBJECTS } from "@/lib/subjects";

const MAX_SUBJECTS = 6;

export default function SubjectSelector() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch]     = useState("");
  const [open, setOpen]         = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filtered = ALL_SUBJECTS.filter(
    (s) => !selected.includes(s) && s.toLowerCase().includes(search.toLowerCase())
  );

  const atMax = selected.length >= MAX_SUBJECTS;

  return (
    <div ref={containerRef} className="relative">
      {selected.map((s) => <input key={s} type="hidden" name="subjects" value={s} />)}

      <div
        className="w-full min-h-[46px] px-3 py-2 border border-gray-300 rounded-xl flex flex-wrap gap-2 cursor-text focus-within:ring-2 focus-within:ring-blue-500 bg-white"
        onClick={() => !atMax && setOpen(true)}
      >
        {selected.map((s) => (
          <span key={s} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-2.5 py-1 rounded-full font-medium">
            {s}
            <button type="button" onClick={(e) => { e.stopPropagation(); setSelected((prev) => prev.filter((x) => x !== s)); }}
              className="text-blue-400 hover:text-blue-900 font-bold ml-0.5 text-base">×</button>
          </span>
        ))}

        {!atMax ? (
          <input
            type="text" value={search}
            onChange={(e) => { setSearch(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? "Type to search subjects…" : "Add another…"}
            className="flex-1 min-w-[160px] outline-none text-sm text-gray-700 bg-transparent py-1"
          />
        ) : (
          <span className="text-xs text-gray-400 self-center italic">Maximum 6 subjects reached</span>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-1">
        {selected.length} / {MAX_SUBJECTS} selected{atMax ? " — remove one to change" : ""}
      </p>

      {open && filtered.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
          {filtered.map((s) => (
            <li key={s}>
              <button type="button"
                onMouseDown={(e) => { e.preventDefault(); if (!atMax) { setSelected((prev) => [...prev, s]); setSearch(""); } }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && search.length > 0 && filtered.length === 0 && (
        <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm text-gray-400">
          No subjects found for &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  );
}
