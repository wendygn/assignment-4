import { gEval, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";

import { getModel } from "../../model.js";
import { lens } from "../../observer.js";
import {  reportFileCases } from "./geval-cases.js";

const agent = createAgent();

const evalResult = await runEvalCli({
  name: "report-file",
  cases: reportFileCases,
  target: (input: string) => {
    return agent.generate({ prompt: input });
    
  },
  metrics: [
    gEval({
      name: "geval-check",
      model: getModel("gpt-5.6-luna"),
      threshold: 0.8,
      criteria: `
Evaluate whether the agent successfully creates the requested research report file.

The agent should:
1. Create a report file in the Sandbox.
2. Use the requested filename, report.md.
3. Ensure the report file contains the research summary.
`,
      evaluationParams: ["input", "actualOutput", "expectedOutput"],
    }),
  ],
  reporters: [lens.evalReporter({ includePayloads: true })],
});
console.log(evalResult.results);
lens.flush();

