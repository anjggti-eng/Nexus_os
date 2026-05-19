"use client";

import { useState } from "react";

export default function AiPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setReply(data.reply || "Sem resposta");
    } catch {
      setReply("Erro ao comunicar com IA");
    }
    setLoading(false);
  };

  const loadSuggestions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/suggest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ context: "inicio do dia" }),
      });
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Assistente IA</h1>
        <p className="text-gray-400 mt-1">Copiloto operacional</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Pergunte algo sobre a operação..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-2 bg-nexus-600 hover:bg-nexus-700 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "..." : "Enviar"}
            </button>
          </div>

          {reply && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-200">{reply}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-white">Sugestões</h2>
            <button onClick={loadSuggestions} className="text-xs text-nexus-400 hover:text-nexus-300">
              Atualizar
            </button>
          </div>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => { setMessage(s); }}
                className="w-full text-left p-2 bg-gray-800 rounded text-sm text-gray-300 hover:bg-gray-700"
              >
                {s}
              </button>
            ))}
            {suggestions.length === 0 && (
              <p className="text-gray-500 text-sm">Clique em "Atualizar" para ver sugestões</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
