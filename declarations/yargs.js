declare module 'yargs' {
    declare type Option = {
        alias?: string,
        type?: string,
        demand?: boolean,
        default?: mixed,
        choices?: mixed[],
        coerce?: any => mixed,
    };

    declare class Yargs {
        usage(string): this;
        option(string, Option): this;
        get argv(): any;
    }

    declare export default function yargs(string|string[]): Yargs;
}
