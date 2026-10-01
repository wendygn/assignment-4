import { faithfulness, gEval, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../agent.js";

import { lens } from "../observer.js";

import { getModel } from "../model.js";
import { faithfulnessCases } from "./geval-cases.js";

const agent = createAgent();

const evalResult = await runEvalCli({
  name: "faithfulness-cases",
  cases: faithfulnessCases,
  target: (input: string) => {
    return agent.generate({ prompt: input });
  },
  metrics: [
    gEval({
        name : "geval-check",
      model: getModel(),
      threshold: 0.8,
      criteria: "the answer should be faithfull to the retrieval context.",
      evaluationParams: ["input", "actualOutput", "expectedOutput"],
    }),
  ],
  reporters: [lens.evalReporter({ includePayloads: true })],
});
console.log(evalResult.results);
lens.flush();
