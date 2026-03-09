"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  const loadData = async () => {
    const logsRes = await fetch("/api/logs");
    const logsData = await logsRes.json();

    const projectsRes = await fetch("/api/projects");
    const projectsData = await projectsRes.json();

    const resourcesRes = await fetch("/api/resources");
    const resourcesData = await resourcesRes.json();

    setLogs(logsData);
    setProjects(projectsData);
    setResources(resourcesData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const completed = projects.filter((p) => p.completed);
  const pending = projects.filter((p) => !p.completed);

  const progress =
    projects.length === 0
      ? 0
      : Math.round((completed.length / projects.length) * 100);

  return (
    <div className="text-white p-4 md:p-6">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Top Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-600 p-6 rounded-xl shadow">
          <h2 className="text-sm opacity-80">Logs</h2>
          <p className="text-3xl font-bold">{logs.length}</p>
        </div>

        <div className="bg-green-600 p-6 rounded-xl shadow">
          <h2 className="text-sm opacity-80">Projects</h2>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>

        <div className="bg-purple-600 p-6 rounded-xl shadow">
          <h2 className="text-sm opacity-80">Resources</h2>
          <p className="text-3xl font-bold">{resources.length}</p>
        </div>

      </div>

      {/* Progress Section */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Projects Progress */}

        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl">

          <h2 className="text-xl font-bold mb-4">
            Projects Progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Completed */}

            <div>
              <h3 className="text-green-400 mb-2 font-semibold">
                ✔ Completed
              </h3>

              {completed.length === 0 && (
                <p className="text-gray-400 text-sm">
                  No completed projects
                </p>
              )}

              {completed.map((p) => (
                <div key={p.id} className="text-sm mb-1">
                  ✔ {p.name}
                </div>
              ))}
            </div>

            {/* Pending */}

            <div>
              <h3 className="text-yellow-400 mb-2 font-semibold">
                ☐ Pending
              </h3>

              {pending.length === 0 && (
                <p className="text-gray-400 text-sm">
                  No pending projects
                </p>
              )}

              {pending.map((p) => (
                <div key={p.id} className="text-sm mb-1">
                  ☐ {p.name}
                </div>
              ))}
            </div>

          </div>

          {/* Progress Bar */}

          <div className="mt-6">

            <p className="mb-2 text-sm">
              Progress: {progress}%
            </p>

            <div className="w-full bg-gray-700 rounded h-3">

              <div
                className="bg-blue-500 h-3 rounded"
                style={{ width: `${progress}%` }}
              ></div>

            </div>

          </div>

        </div>

        {/* Calendar */}

        <div className="bg-slate-800 p-6 rounded-xl text-center">

          <h2 className="text-xl font-bold mb-4">
            📅 Today
          </h2>

          <p className="text-lg mb-4">
            {new Date().toDateString()}
          </p>

          <input
            type="date"
            className="bg-slate-700 p-2 rounded w-full"
          />

        </div>

      </div>

    </div>
  );
}