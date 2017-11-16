import * as babylon from 'babylon';

export default class Parser {
    parse(code) {
        // This parse configuration is intended to be as permissive as possible.
        return babylon.parse(code, {
            allowImportExportEverywhere: true,
            allowReturnOutsideFunction: true,
            allowSuperOutsideMethod: true,
            sourceType: 'module',
            plugins: [ '*', 'jsx', 'flow' ],
        });
    }
}
