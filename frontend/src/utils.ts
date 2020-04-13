export function truthyString(s: string | undefined | null): boolean {
    return s !== undefined && s !== null && s !== "";
}