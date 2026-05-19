"use client";

import { useEffect, useState } from "react";

interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: string;
  executionCount: number;
  lastExecutedAt?: string;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflows`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((r) => r.json())
      .then((data) => setWorkflows(Array.isArray(data) ? data : []))
      .catch(() => setWorkflows([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Workflows</h1>
        <p className="text-gray-400 mt-1">Automações e triggers</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workflows.map((w) => (
          <div key={w.id} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">{w.name}</h3>
                {w.description && <p className="text-sm text-gray-400">{w.description}</p>}
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                w.status === "ACTIVE" ? "bg-green-900 text-green-300" : "bg-gray-800 text-gray-400"
              }`}>{w.status}</span>
            </div>
            <div className="flex gap-4 mt-3 text-sm text-gray-500">
              <span>Execuções: {w.executionCount}</span>
              {w.lastExecutedAt && <span>Última: {new Date(w.lastExecutedAt).toLocaleString("pt-BR")}</span>}
            </div>
          </div>
        ))}
        {workflows.length === 0 && (
          <p className="text-gray-500 text-center py-8">Nenhum workflow configurado</p>
        )}
      </div>
    </div>
  );
}
