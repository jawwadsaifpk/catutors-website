"use client";

import { useState } from "react";
import { CA_CITIES } from "@/lib/cities";

export default function CitySelector() {
  const [isOther, setIsOther] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <select
        name="city"
        onChange={(e) => setIsOther(e.target.value === "Other")}
        defaultValue="Los Angeles"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
      >
        {CA_CITIES.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
        <option value="Other">Other (type below)</option>
      </select>

      {isOther && (
        <input
          type="text"
          name="city"
          required
          placeholder="Type your city name..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
        />
      )}
    </div>
  );
}
