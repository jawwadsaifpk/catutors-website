import Link from "next/link";

type TutorCardProps = {
  id: number;
  name: string;
  subjects: string[];
  areas: string[];
  city: string;
  bio: string;
  photoUrl?: string | null;
  teachingMode?: string | null;
  featured?: boolean;
};

const subjectColors: Record<string, string> = {
  Mathematics:      "bg-blue-100 text-blue-800",
  Calculus:         "bg-blue-100 text-blue-800",
  Physics:          "bg-purple-100 text-purple-800",
  Chemistry:        "bg-green-100 text-green-800",
  Biology:          "bg-emerald-100 text-emerald-800",
  English:          "bg-yellow-100 text-yellow-800",
  "SAT Prep":       "bg-orange-100 text-orange-800",
  "ACT Prep":       "bg-orange-100 text-orange-800",
  "Computer Science": "bg-indigo-100 text-indigo-800",
  Statistics:       "bg-cyan-100 text-cyan-800",
};
const defaultColor = "bg-gray-100 text-gray-700";

export default function TutorCard({ id, name, subjects, areas, city, bio, photoUrl, teachingMode, featured }: TutorCardProps) {
  return (
    <div className={`relative bg-white rounded-2xl shadow-md border flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${featured ? "border-yellow-300" : "border-gray-100"}`}>

      {featured && <div className="h-1 bg-gradient-to-r from-yellow-400 to-amber-500 w-full flex-shrink-0" />}

      <div className="p-6 flex flex-col gap-4 flex-1">

        {featured && (
          <span className="self-start bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
            ⭐ Featured
          </span>
        )}

        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 ring-2 ring-blue-50 flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ring-2 ring-blue-100">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">📍 {city}, CA</p>
          </div>
        </div>

        {/* Subject chips */}
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((subject) => (
            <span key={subject} className={`px-2.5 py-1 rounded-full text-xs font-medium ${subjectColors[subject] ?? defaultColor}`}>
              {subject}
            </span>
          ))}
        </div>

        {/* Areas */}
        <div className="flex flex-wrap gap-1.5">
          {areas.slice(0, 3).map((area) => (
            <span key={area} className="px-2.5 py-1 rounded-full text-xs bg-gray-50 text-gray-600 border border-gray-200">
              {area}
            </span>
          ))}
          {areas.length > 3 && (
            <span className="px-2.5 py-1 rounded-full text-xs bg-gray-50 text-gray-400 border border-gray-200">
              +{areas.length - 3} more
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 line-clamp-2">{bio}</p>

        {teachingMode && (
          <span className="self-start px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            {teachingMode}
          </span>
        )}

        <div className="flex gap-2 mt-auto">
          <Link href={`/tutors/${id}`} className="w-full text-center px-3 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
