import { Agent } from "@anvia/core";
import { getModel } from "./model.js";
import { lens } from "./observer.js";
import { tools } from "./sandbox.js";
import { BASE_INSTRUCTION } from "./instruction.js";
import { readFile, searchWeb } from "./tools.js";

export function createAgent(modelId?: string) {
  const agent = new Agent({
    id: "assistant",
    model: getModel("gpt-5.6-luna"),
    instructions: BASE_INSTRUCTION,
    tools: [...tools, readFile, searchWeb],
    observability: {
      observers: {
        tracing: lens.observer({ captureMode: "full" }),
      },
    },
    maxTurns: 75,
  });
  return agent;
}
