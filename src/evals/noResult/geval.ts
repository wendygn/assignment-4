import { gEval, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";

import { getModel } from "../../model.js";
import { lens } from "../../observer.js";
import { noUsefullResult } from "./geval-cases.js";

const agent = createAgent();

const evalResult = await runEvalCli({
  name: "noResult-geval",
  cases: noUsefullResult,
  target: (input: string) => {
    return agent.generate({ prompt: input });
  },
  metrics: [
    gEval({
      name: "geval-check",
      model: getModel(),
      threshold: 0.8,
      criteria: `
    Evaluate whether the agent handles a research request with no useful
    or reliable search results appropriately.

    The agent should:
    1. Clearly acknowledge that reliable information could not be found.
    2. Avoid inventing or hallucinating facts.
    3. Avoid presenting unsupported information as factual.
  `,
      evaluationParams: ["input", "actualOutput", "expectedOutput"],
    }),
  ],
  reporters: [lens.evalReporter({ includePayloads: true })],
});
console.log(evalResult.results);
lens.flush();
