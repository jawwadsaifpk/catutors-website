"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const activeQuery = searchParams.get("q") ?? "";

  useEffect(() => {
    if (activeQuery) {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeQuery]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      <form onSubmit={handleSearch} className="flex gap-2 bg-white rounded-2xl shadow-2xl p-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by neighborhood or subject (Math, SAT Prep, Physics)..."
          className="flex-1 px-4 py-3 rounded-xl border-0 text-gray-900 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0 text-base"
        />
        <button type="submit" className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition-colors whitespace-nowrap shadow-md">
          Search
        </button>
      </form>

      {activeQuery && (
        <p className="text-sm text-white/80">
          Showing results for <span className="font-semibold text-white">"{activeQuery}"</span>{" "}—{" "}
          <button onClick={() => { setQuery(""); router.push("/"); }} className="text-blue-200 hover:underline">
            Clear search
          </button>
        </p>
      )}
    </div>
  );
}
