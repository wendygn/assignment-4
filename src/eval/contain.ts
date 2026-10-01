import { contains, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../agent.js";
import { cases } from "./contain-cases.js";
import { lens } from "../observer.js";

const agent = createAgent()

const evalResult = await runEvalCli({
    name : "contain-check",
    cases : cases,
    target : (input : string) => {
      return  agent.generate({prompt : input})
    },
    metrics : [contains()],
    reporters : [
        lens.evalReporter({includePayloads : true })
    ]
})
console.log(evalResult.results)
lens.flush()