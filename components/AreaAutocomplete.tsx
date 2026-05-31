"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function AreaInput({ index, required, placeholder }: { index: number; required: boolean; placeholder: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [verifiedArea, setVerifiedArea] = useState("");

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY!,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (!inputRef.current) return;
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        // Restrict suggestions to California, USA
        componentRestrictions: { country: "us" },
        types: ["(regions)"],
        fields: ["name"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place?.name) setVerifiedArea(place.name);
      });
    });
  }, []);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        required={required}
        onChange={() => setVerifiedArea("")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8 bg-white text-gray-900 placeholder-gray-400"
      />
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📍</span>
      <input type="hidden" name={`area${index}`} value={verifiedArea} />
      {verifiedArea && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">✓</span>
      )}
    </div>
  );
}

export default function AreaAutocomplete() {
  return (
    <div className="flex flex-col gap-3">
      <AreaInput index={1} required={true}  placeholder="Area 1 — e.g. Beverly Hills, Palo Alto, Mission Valley..." />
      <AreaInput index={2} required={false} placeholder="Area 2 (optional) — e.g. Santa Monica, Fremont, Chula Vista..." />
      <AreaInput index={3} required={false} placeholder="Area 3 (optional) — e.g. Pasadena, Irvine, Oakland Hills..." />
      <p className="text-xs text-gray-400">Type a neighborhood and select from suggestions. At least 1 area required.</p>
    </div>
  );
}
