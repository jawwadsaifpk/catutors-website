"use client";

import { ALL_SUBJECTS } from "@/lib/subjects";
import { CA_CITIES } from "@/lib/cities";

const TEACHING_MODES = ["In-Person", "Online", "Both"];

type Props = {
  query: string;
  selSubject: string;
  selCity: string;
  selMode: string;
  anyFilter: boolean;
};

export default function TutorFilters({ query, selSubject, selCity, selMode, anyFilter }: Props) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-[49px] z-10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">

        {/* Text search */}
        <form method="GET" action="/tutors" className="flex flex-wrap gap-2 mb-3">
          {selSubject && <input type="hidden" name="subject" value={selSubject} />}
          {selCity    && <input type="hidden" name="city"    value={selCity} />}
          {selMode    && <input type="hidden" name="mode"    value={selMode} />}
          <input type="text" name="q" defaultValue={query}
            placeholder="Search name, area, subject…"
            className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 w-56" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Search</button>
          {anyFilter && (
            <a href="/tutors" className="px-4 py-2 text-sm text-gray-500 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">Reset</a>
          )}
        </form>

        {/* Dropdown filters */}
        <div className="flex flex-wrap gap-3 items-center">

          {/* Subject */}
          <form method="GET" action="/tutors">
            {query   && <input type="hidden" name="q"    value={query} />}
            {selCity && <input type="hidden" name="city" value={selCity} />}
            {selMode && <input type="hidden" name="mode" value={selMode} />}
            <select name="subject" defaultValue={selSubject}
              onChange={(e) => (e.target.form as HTMLFormElement).submit()}
              className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer">
              <option value="">All Subjects</option>
              {ALL_SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </form>

          {/* City */}
          <form method="GET" action="/tutors">
            {query      && <input type="hidden" name="q"       value={query} />}
            {selSubject && <input type="hidden" name="subject" value={selSubject} />}
            {selMode    && <input type="hidden" name="mode"    value={selMode} />}
            <select name="city" defaultValue={selCity}
              onChange={(e) => (e.target.form as HTMLFormElement).submit()}
              className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer">
              <option value="">All Cities</option>
              {CA_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </form>

          {/* Teaching Mode */}
          <form method="GET" action="/tutors">
            {query      && <input type="hidden" name="q"       value={query} />}
            {selSubject && <input type="hidden" name="subject" value={selSubject} />}
            {selCity    && <input type="hidden" name="city"    value={selCity} />}
            <select name="mode" defaultValue={selMode}
              onChange={(e) => (e.target.form as HTMLFormElement).submit()}
              className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer">
              <option value="">Teaching Mode</option>
              {TEACHING_MODES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </form>

        </div>
      </div>
    </div>
  );
}
