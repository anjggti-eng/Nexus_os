"use client";

import { useEffect, useState } from "react";

interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
  ports: string[];
}

export default function InfraPage() {
  const [containers, setContainers] = useState<Container[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/infra/docker/containers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((r) => r.json())
      .then((data) => setContainers(Array.isArray(data) ? data : []))
      .catch(() => setContainers([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Infraestrutura</h1>
        <p className="text-gray-400 mt-1">Docker containers e servidores</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-4">Containers</h2>
        <div className="grid grid-cols-1 gap-3">
          {containers.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">{c.name}</p>
                <p className="text-xs text-gray-400">{c.image}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  c.status === "running" ? "bg-green-900 text-green-300" :
                  c.status === "exited" || c.status === "stopped" ? "bg-red-900 text-red-300" :
                  "bg-yellow-900 text-yellow-300"
                }`}>{c.status}</span>
                <span className="text-xs text-gray-500">{c.id}</span>
              </div>
            </div>
          ))}
          {containers.length === 0 && (
            <p className="text-gray-500 text-center py-8">Nenhum container encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
}
