import { gEval, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";
import { sourceCitationCases } from "./geval-cases.js";
import { getModel } from "../../model.js";
import { lens } from "../../observer.js";

const agent = createAgent()
const evalResult = await runEvalCli({
  name: "sourceCitation-geval",
  cases: sourceCitationCases,
  target: (input: string) => {
    return agent.generate({ prompt: input });
  },
  metrics: [
    gEval({
      name: "geval-check",
      model: getModel(),
      threshold: 0.8,
      criteria: `
    Evaluate the quality of source citations in the research answer.

    The answer should:
    1. Include source URLs.
    2. Use sources that are relevant to the research topic.
    3. Use the sources to support the information presented.
    4. Avoid making factual claims without appropriate sources.
  `,
      evaluationParams: ["input", "actualOutput", "expectedOutput"],
    }),
  ],
  reporters: [lens.evalReporter({ includePayloads: true })],
});
console.log(evalResult.results);
  lens.flush();