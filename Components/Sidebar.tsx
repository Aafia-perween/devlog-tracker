"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-slate-900 text-white p-4 transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}

      <button
        onClick={() => setOpen(!open)}
        className="mb-8 text-xl"
      >
        ☰
      </button>

      <ul className="space-y-6">

        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 hover:text-blue-400"
          >
            📊 {open && "Dashboard"}
          </Link>
        </li>

        <li>
          <Link
            href="/logs"
            className="flex items-center gap-3 hover:text-blue-400"
          >
            📘 {open && "Logs"}
          </Link>
        </li>

        <li>
          <Link
            href="/projects"
            className="flex items-center gap-3 hover:text-blue-400"
          >
            💻 {open && "Projects"}
          </Link>
        </li>

        <li>
          <Link
            href="/resources"
            className="flex items-center gap-3 hover:text-blue-400"
          >
            🔗 {open && "Resources"}
          </Link>
        </li>

      </ul>
    </div>
  );
}