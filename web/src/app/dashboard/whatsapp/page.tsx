"use client";

import { useEffect, useState } from "react";

interface Session {
  id: string;
  name: string;
  status: string;
  number?: string;
  qrCode?: string;
}

export default function WhatsAppPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSessions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/sessions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      setSessions([]);
    }
  };

  useEffect(() => { loadSessions() }, []);

  const createSession = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ name: newName }),
      });
      setNewName("");
      await loadSessions();
    } catch {}
    setLoading(false);
  };

  const deleteSession = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/sessions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      await loadSessions();
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">WhatsApp</h1>
        <p className="text-gray-400 mt-1">Gerenciar sessões do WhatsApp</p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nome da sessão"
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
        <button
          onClick={createSession}
          disabled={loading}
          className="px-4 py-2 bg-nexus-600 hover:bg-nexus-700 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Criando..." : "Nova Sessão"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">{session.name}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                session.status === "CONNECTED" ? "bg-green-900 text-green-300" :
                session.status === "SCANNING" ? "bg-yellow-900 text-yellow-300" :
                "bg-gray-800 text-gray-400"
              }`}>{session.status}</span>
            </div>
            {session.number && (
              <p className="text-sm text-gray-400">{session.number}</p>
            )}
            <button
              onClick={() => deleteSession(session.id)}
              className="mt-3 text-sm text-red-400 hover:text-red-300"
            >
              Remover
            </button>
          </div>
        ))}
        {sessions.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">
            Nenhuma sessão ativa. Crie uma nova sessão acima.
          </p>
        )}
      </div>
    </div>
  );
}
