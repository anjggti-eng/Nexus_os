import { Injectable, Logger } from "@nestjs/common";
import OpenAI from "openai";

interface MemoryEntry {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

@Injectable()
export class AiService {
  private openai: OpenAI | null = null;
  private memory: Map<string, MemoryEntry[]> = new Map();
  private logger = new Logger(AiService.name);

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async chat(message: string, sessionId = "default") {
    if (!this.openai) {
      return {
        reply: "AI não configurada. Defina OPENAI_API_KEY para ativar.",
        source: "fallback",
      };
    }

    const history = this.memory.get(sessionId) || [];
    history.push({ role: "user", content: message, timestamp: Date.now() });

    const messages = history.slice(-20).map((m) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    }));

    messages.unshift({
      role: "system",
      content: "Você é o NexusOS, um assistente operacional que controla infraestrutura, WhatsApp, finanças e automações. Responda de forma direta e técnica em português.",
    });

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages as any,
        max_tokens: 500,
      });

      const reply = response.choices[0]?.message?.content || "Sem resposta";
      history.push({ role: "assistant", content: reply, timestamp: Date.now() });
      this.memory.set(sessionId, history);

      return { reply, source: "openai" };
    } catch (err: any) {
      this.logger.error(`OpenAI error: ${err.message}`);
      return { reply: "Erro ao processar mensagem com IA", source: "error" };
    }
  }

  async suggest(context: string) {
    if (!this.openai) {
      return { suggestions: ["reinicia api produção", "status servidores", "criar cobrança"] };
    }

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sugira 3 comandos operacionais para o NexusOS baseado no contexto fornecido. Responda apenas JSON array." },
        { role: "user", content: context },
      ],
    });

    try {
      const text = response.choices[0]?.message?.content || "[]";
      return { suggestions: JSON.parse(text) };
    } catch {
      return { suggestions: ["reinicia api produção", "status", "relatorio mensal"] };
    }
  }

  async getMemory() {
    const entries: Record<string, number> = {};
    this.memory.forEach((msgs, key) => {
      entries[key] = msgs.length;
    });
    return { sessions: entries, totalEntries: Array.from(this.memory.values()).flat().length };
  }
}
