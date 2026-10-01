export const gevalCases = [
  {
    id: "ambiguous-1",
    input: `Research React.`,
    expected: `
- Recognizes that the request is ambiguous.
- Asks a follow-up question to clarify what aspect of React the user wants to research.
- Does not start the research before the request is clarified.
`,
  },
];