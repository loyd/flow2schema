declare module 'yaml-js' {
    declare function load(string): mixed;
    declare function dump(mixed, null, null, {indent?: number, width?: number}): string;
}
