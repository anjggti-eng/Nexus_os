"use client";

import { useState } from "react";

export default function CommandsPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commands/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setResult(data);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Comandos</h1>
        <p className="text-gray-400 mt-1">Execute comandos operacionais</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && execute()}
            placeholder="Ex: status servidores, reinicia api produção, cobrar João 150"
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono"
          />
          <button
            onClick={execute}
            disabled={loading}
            className="px-6 py-2 bg-nexus-600 hover:bg-nexus-700 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Executando..." : "Executar"}
          </button>
        </div>

        {result && (
          <div className={`mt-4 p-4 rounded-lg ${result.success ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}>
            <p className="font-mono text-sm">{result.message}</p>
            {result.executionTimeMs && (
              <p className="text-xs text-gray-500 mt-2">Execução: {result.executionTimeMs}ms</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-3">Comandos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            { cmd: "status servidores", desc: "Verificar status da infraestrutura" },
            { cmd: "reinicia api produção", desc: "Reiniciar container da API" },
            { cmd: "deploy api main", desc: "Publicar nova versão" },
            { cmd: "sessoes", desc: "Listar sessões WhatsApp" },
            { cmd: "cobrar João 150", desc: "Criar cobrança" },
            { cmd: "relatorio mensal", desc: "Gerar relatório financeiro" },
            { cmd: "ajuda", desc: "Listar todos os comandos" },
          ].map((c) => (
            <div key={c.cmd} className="p-3 bg-gray-800 rounded-lg">
              <code className="text-nexus-300">{c.cmd}</code>
              <p className="text-gray-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
