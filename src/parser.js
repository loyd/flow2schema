// @flow

import * as babylon from 'babylon';
import type {File} from '@babel/types';

export default class Parser {
    parse(code: string): File {
        // TODO: customization.

        // This parse configuration is intended to be as permissive as possible.
        return babylon.parse(code, {
            allowImportExportEverywhere: true,
            allowReturnOutsideFunction: true,
            allowSuperOutsideMethod: true,
            sourceType: 'module',
            // TODO: review other plugins.
            plugins: ['*', 'jsx', 'flow', 'classProperties', 'objectRestSpread'],
        });
    }
}
