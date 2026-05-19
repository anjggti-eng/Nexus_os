"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Terminal, Wallet, Server, Zap, Activity } from "lucide-react";

interface DashboardData {
  messagesToday: number;
  activeSessions: number;
  commandsExecuted: number;
  revenueToday: number;
  alertsActive: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    messagesToday: 0,
    activeSessions: 0,
    commandsExecuted: 0,
    revenueToday: 0,
    alertsActive: 0,
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Mensagens Hoje", value: data.messagesToday, icon: MessageSquare, color: "text-blue-400" },
    { label: "Sessões Ativas", value: data.activeSessions, icon: Zap, color: "text-green-400" },
    { label: "Comandos Executados", value: data.commandsExecuted, icon: Terminal, color: "text-purple-400" },
    { label: "Receita Hoje", value: `R$ ${data.revenueToday.toFixed(2)}`, icon: Wallet, color: "text-emerald-400" },
    { label: "Alertas", value: data.alertsActive, icon: Activity, color: data.alertsActive > 0 ? "text-red-400" : "text-gray-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-sm text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <Server className="w-4 h-4 text-gray-500" />
                <span className="text-gray-300">Nenhuma atividade recente</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">Status da Infraestrutura</h2>
          <div className="space-y-3">
            {[
              { name: "API Gateway", status: "online" },
              { name: "Auth Service", status: "online" },
              { name: "WhatsApp Service", status: "online" },
              { name: "PostgreSQL", status: "online" },
              { name: "Redis", status: "online" },
            ].map((svc) => (
              <div key={svc.name} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{svc.name}</span>
                <span className="flex items-center gap-1 text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  {svc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
