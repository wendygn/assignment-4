import { Studio } from "@anvia/studio";
import { createAgent } from "./agent.js";
import { lens } from "./observer.js";
import { sandbox } from "./sandbox.js";

const supportAgent = createAgent()
export const studio = new Studio([supportAgent]).serve({
    port : 3000,
    onShutdown : async () => sandbox.destroy()
})