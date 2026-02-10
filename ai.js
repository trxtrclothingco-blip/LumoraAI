import { loadMemory, saveMemory } from "./memory.js";
import { reflect } from "./reflect.js";

export async function askLumora(userId, message) {
  const memory = loadMemory(userId);

  memory.history.push({ role: "user", content: message });
  memory.history = memory.history.slice(-20);

  const prompt = `
You are Lumora.
A private, intelligent female AI companion.

Personality:
- Calm
- Direct
- Insightful
- Will challenge the user when needed
- No fluff

USER PROFILE:
${JSON.stringify(memory.profile, null, 2)}

REFLECTIONS:
${memory.reflections.join("\n")}

RECENT CONVERSATION:
${memory.history.map(m => `${m.role}: ${m.content}`).join("\n")}

Respond as Lumora.
`;

  // 🔁 REPLACE THIS WITH A REAL MODEL CALL LATER
  const reply = await fakeModel(prompt);

  memory.history.push({ role: "assistant", content: reply });

  const insight = reflect(message);
  if (insight) memory.reflections.push(insight);

  saveMemory(userId, memory);
  return reply;
}

async function fakeModel(prompt) {
  return "I hear you. If you want progress, we need clarity on the next decisive step.";
}
