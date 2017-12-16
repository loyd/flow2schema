declare module 'ajv' {
    declare export default class Ajv {
        errors: {message: string}[];

        constructor(): void;

        validateSchema(schema: mixed): boolean;
    }
}
