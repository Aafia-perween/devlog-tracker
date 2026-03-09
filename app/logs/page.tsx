"use client";

import { useState, useEffect } from "react";

export default function LogsPage() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [logs, setLogs] = useState<any[]>([]);

  const loadLogs = async () => {
    const res = await fetch("/api/logs");
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const addLog = async () => {
    if (!topic.trim() || !notes.trim()) return;

    await fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, notes }),
    });

    setTopic("");
    setNotes("");
    loadLogs();
  };

  const deleteLog = async (id: number) => {
    await fetch("/api/logs", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadLogs();
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Learning Logs</h1>

      <div className="bg-gray-800 p-6 rounded mb-6">
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
        />

        <textarea
          placeholder="What did you learn?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
        />

        <button
          onClick={addLog}
          className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Log
        </button>
      </div>

      {logs.map((log) => (
        <div
          key={log.id}
          className="bg-gray-800 p-4 mb-3 rounded flex justify-between"
        >
          <div>
            <h3 className="font-bold">{log.topic}</h3>
            <p>{log.notes}</p>
          </div>

          <button
            onClick={() => deleteLog(log.id)}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}