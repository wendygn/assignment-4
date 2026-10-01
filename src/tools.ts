import { createTool } from "@anvia/core";
import z from "zod";
import { sandbox } from "./sandbox.js";
import { tavily } from "@tavily/core";
import "dotenv/config";

export const readFile = createTool({
  name: "read-file",
  description: "find the data/ report file that agent created",
  inputSchema: z.object({
    path: z.string(),
  }),
  execute(args) {
    return sandbox.runtime.readFile({ path: args.path });
  },
});

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});
export const searchWeb = createTool({
  name: "search-web",
  description: "use this tool to search the web",
  inputSchema: z.object({
    query: z.string(),
  }),
  async execute(args) {
    const result = await tavilyClient.search(args.query, {
      includeAnswers: true,
      includeRawcontent: "markdown",
    });
    return JSON.stringify(result);
  },
});
