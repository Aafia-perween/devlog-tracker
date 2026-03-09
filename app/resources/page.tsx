"use client";

import { useState, useEffect } from "react";

export default function ResourcesPage() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [resources, setResources] = useState<any[]>([]);

  const loadResources = async () => {
    const res = await fetch("/api/resources");
    const data = await res.json();
    setResources(data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const addResource = async () => {
    if (!title.trim() || !link.trim()) return;

    await fetch("/api/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, link }),
    });

    setTitle("");
    setLink("");
    loadResources();
  };

  const deleteResource = async (id: number) => {
    await fetch("/api/resources", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadResources();
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>

      <div className="bg-gray-800 p-6 rounded mb-6">
        <input
          type="text"
          placeholder="Resource title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
        />

        <input
          type="text"
          placeholder="Resource link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
        />

        <button
          onClick={addResource}
          className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Resource
        </button>
      </div>

      {resources.map((r) => (
        <div
          key={r.id}
          className="bg-gray-800 p-4 mb-3 rounded flex justify-between"
        >
          <div>
            <h3>{r.title}</h3>
            <a
              href={r.link}
              target="_blank"
              className="text-blue-400 underline"
            >
              {r.link}
            </a>
          </div>

          <button
            onClick={() => deleteResource(r.id)}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}