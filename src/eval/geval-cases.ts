import { supportPolicy } from "../context.js";

export const faithfulnessCases = [
  {
    id: "geval-1",
    input: `Research the main differences between Next.js App Router and TanStack Start.
Give me 3 key differences and cite your sources.`,
    expected: `
- Answers the actual question
- Provides exactly 3 key differences
- Includes source URLs
- Contains no irrelevant information
`,
  },
];
