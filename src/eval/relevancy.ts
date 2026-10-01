import { answerRelevancy, contains, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../agent.js";

import { lens } from "../observer.js";
import { relevancyCases } from "./relevancy-cases.js";
import { getModel } from "../model.js";

const agent = createAgent();

const evalResult = await runEvalCli({
  name: "relevansy-check",
  cases: relevancyCases,
  target: (input: string) => {
    return agent.generate({ prompt: input });
  },
  metrics: [
    answerRelevancy({ model: getModel("gpt-5.6-luna"), threshold: 0.8 }),
  ],
  reporters: [lens.evalReporter({ includePayloads: true })],
});
console.log(evalResult.results);
lens.flush();
