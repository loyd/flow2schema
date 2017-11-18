declare module 'optimist' {
    declare type Optimist = {
        usage(string): Optimist,
        argv: {
            [string]: any,
            _: string[],
        },
    };

    declare module.exports: Optimist;
}
