"use client";

import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState<any[]>([]);

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async () => {
    if (!project.trim()) return;

    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: project }),
    });

    setProject("");
    loadProjects();
  };

  const deleteProject = async (id: number) => {
    await fetch("/api/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadProjects();
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="bg-gray-800 p-6 rounded mb-6">
        <input
          type="text"
          placeholder="Project name"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
        />

        <button
          onClick={addProject}
          className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      <div>
        <h2 className="text-xl mb-4">Your Projects</h2>

        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 p-4 mb-3 rounded flex justify-between items-center"
          >
            <span>{p.name}</span>

            <button
              onClick={() => deleteProject(p.id)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}