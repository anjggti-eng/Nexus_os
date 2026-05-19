"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface Charge {
  id: string;
  amount: number;
  description: string;
  status: string;
  method: string;
  dueDate: string;
}

export default function FinancePage() {
  const [charges, setCharges] = useState<Charge[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/finance/charges`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
      .then((r) => r.json())
      .then((data) => setCharges(Array.isArray(data) ? data : []))
      .catch(() => setCharges([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Financeiro</h1>
        <p className="text-gray-400 mt-1">Cobranças e transações</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-3">Descrição</th>
              <th className="pb-3">Valor</th>
              <th className="pb-3">Método</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Vencimento</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {charges.map((c) => (
              <tr key={c.id} className="border-t border-gray-800">
                <td className="py-3 text-white">{c.description}</td>
                <td className="py-3 text-white">{formatCurrency(c.amount)}</td>
                <td className="py-3 text-gray-400">{c.method}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    c.status === "PAID" ? "bg-green-900 text-green-300" :
                    c.status === "OVERDUE" ? "bg-red-900 text-red-300" :
                    c.status === "PENDING" ? "bg-yellow-900 text-yellow-300" :
                    "bg-gray-800 text-gray-400"
                  }`}>{c.status}</span>
                </td>
                <td className="py-3 text-gray-400">{new Date(c.dueDate).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {charges.length === 0 && (
          <p className="text-gray-500 text-center py-8">Nenhuma cobrança encontrada</p>
        )}
      </div>
    </div>
  );
}
