import { gEval, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";
import { gevalCases } from "./geval-cases.js";
import { getModel } from "../../model.js";
import { lens } from "../../observer.js";

const agent = createAgent()

const evalResult = await runEvalCli({
  name: "ambigous-geval",
  cases: gevalCases,
  target: (input: string) => {
    return agent.generate({ prompt: input });
  },
  metrics: [
    gEval({
      name: "geval-check",
      model: getModel(),
      threshold: 0.8,
      criteria: `
    The agent should correctly handle an ambiguous research request.
    The agent should recognize that the request is unclear,
    ask a relevant follow-up question,
    and avoid starting the research before the user clarifies their intent.
  `,
      evaluationParams: ["input", "actualOutput", "expectedOutput"],
    }),
  ],
    reporters: [lens.evalReporter({ includePayloads: true })],
  });
  console.log(evalResult.results);
  lens.flush();