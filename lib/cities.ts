// California cities supported by catutors.com
export const CA_CITIES = [
  "Los Angeles",
  "San Francisco",
  "San Diego",
  "San Jose",
  "Sacramento",
  "Fresno",
  "Oakland",
  "Long Beach",
  "Bakersfield",
  "Anaheim",
  "Santa Ana",
  "Riverside",
  "Stockton",
  "Irvine",
  "Chula Vista",
  "Fremont",
  "Glendale",
  "Huntington Beach",
  "Santa Clarita",
  "Pasadena",
] as const;

export type CACity = (typeof CA_CITIES)[number];

// URL-safe slug → display name mapping
export const CITY_SLUGS: Record<string, string> = Object.fromEntries(
  CA_CITIES.map((city) => [city.toLowerCase().replace(/\s+/g, "-"), city])
);
