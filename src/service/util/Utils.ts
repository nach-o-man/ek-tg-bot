export function assertEnvVar(varName: string): string {
    const result = Deno.env.get(varName);
    if (!result) {
        throw new Error(`${varName} is not defined`);
    }
    return result;
}
