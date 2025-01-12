export const truncate = (input: string, maxSymbols: number) =>
    input?.length > maxSymbols ? `${input.substring(0, maxSymbols)}...` : input;
