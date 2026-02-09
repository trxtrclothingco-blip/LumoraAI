import fs from "fs";

const BASE_PATH = "./data/users/";

export function loadMemory(userId) {
  const path = `${BASE_PATH}${userId}.json`;

  if (!fs.existsSync(path)) {
    return {
      profile: {
        name: userId,
        communicationStyle: "direct",
        values: [],
        goals: []
      },
      reflections: [],
      history: []
    };
  }

  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

export function saveMemory(userId, memory) {
  fs.writeFileSync(
    `${BASE_PATH}${userId}.json`,
    JSON.stringify(memory, null, 2)
  );
}
