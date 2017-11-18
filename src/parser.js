import * as babylon from 'babylon';
import type {File} from '@babel/types';

export default class Parser {
    parse(code: string): File {
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
