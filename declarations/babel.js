declare module 'babylon' {
    import type {File} from '@babel/types';

    declare function parse(string, Object): File;
}

declare module '@babel/types' {
    declare class Comment {
        value: string;
        start: number;
        end: number;
        loc: SourceLocation;
    }

    declare class BlockComment extends Comment {
        type: 'BlockComment';
    }

    declare class LineComment extends Comment {
        type: 'LineComment';
    }

    declare class SourceLocation {
        start: {
            line: number;
            column: number;
        };

        end: {
            line: number;
            column: number;
        };
    }

    declare class Node {
        leadingComments: ?Array<Comment>;
        innerComments: ?Array<Comment>;
        trailingComments: ?Array<Comment>;
        start: ?number;
        end: ?number;
        loc: ?SourceLocation;
    }

    declare class ArrayExpression extends Node {
        type: 'ArrayExpression';
        elements?: any;
    }

    declare class AssignmentExpression extends Node {
        type: 'AssignmentExpression';
        operator: string;
        left: LVal;
        right: Expression;
    }

    declare class BinaryExpression extends Node {
        type: 'BinaryExpression';
        operator: '+' | '-' | '/' | '%' | '*' | '**' | '&' | '|' | '>>' | '>>>' | '<<' | '^' | '==' | '===' | '!=' | '!==' | 'in' | 'instanceof' | '>' | '<' | '>=' | '<=';
        left: Expression;
        right: Expression;
    }

    declare class Directive extends Node {
        type: 'Directive';
        value: DirectiveLiteral;
    }

    declare class DirectiveLiteral extends Node {
        type: 'DirectiveLiteral';
        value: string;
    }

    declare class BlockStatement extends Node {
        type: 'BlockStatement';
        body: any;
        directives?: any;
    }

    declare class BreakStatement extends Node {
        type: 'BreakStatement';
        label?: ?Identifier;
    }

    declare class CallExpression extends Node {
        type: 'CallExpression';
        callee: Expression;
        arguments: any;
        optional?: true | false;
        typeParameters?: ?TypeParameterInstantiation;
    }

    declare class CatchClause extends Node {
        type: 'CatchClause';
        param?: ?Identifier;
        body: BlockStatement;
    }

    declare class ConditionalExpression extends Node {
        type: 'ConditionalExpression';
        test: Expression;
        consequent: Expression;
        alternate: Expression;
    }

    declare class ContinueStatement extends Node {
        type: 'ContinueStatement';
        label?: ?Identifier;
    }

    declare class DebuggerStatement extends Node {
        type: 'DebuggerStatement';
    }

    declare class DoWhileStatement extends Node {
        type: 'DoWhileStatement';
        test: Expression;
        body: Statement;
    }

    declare class EmptyStatement extends Node {
        type: 'EmptyStatement';
    }

    declare class ExpressionStatement extends Node {
        type: 'ExpressionStatement';
        expression: Expression;
    }

    declare class File extends Node {
        type: 'File';
        program: Program;
        comments: any;
        tokens: any;
    }

    declare class ForInStatement extends Node {
        type: 'ForInStatement';
        left: VariableDeclaration | LVal;
        right: Expression;
        body: Statement;
    }

    declare class ForStatement extends Node {
        type: 'ForStatement';
        init?: ?VariableDeclaration | Expression;
        test?: ?Expression;
        update?: ?Expression;
        body: Statement;
    }

    declare class FunctionDeclaration extends Node {
        type: 'FunctionDeclaration';
        id?: ?Identifier;
        params: any;
        body: BlockStatement;
        generator?: boolean;
        async?: boolean;
        declare?: boolean;
        returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop;
        typeParameters?: ?TypeParameterDeclaration | Noop;
    }

    declare class FunctionExpression extends Node {
        type: 'FunctionExpression';
        id?: ?Identifier;
        params: any;
        body: BlockStatement;
        generator?: boolean;
        async?: boolean;
        returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop;
        typeParameters?: ?TypeParameterDeclaration | Noop;
    }

    declare class Identifier extends Node {
        type: 'Identifier';
        name: any;
        decorators?: any;
        optional?: boolean;
        typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop;
    }

    declare class IfStatement extends Node {
        type: 'IfStatement';
        test: Expression;
        consequent: Statement;
        alternate?: ?Statement;
    }

    declare class LabeledStatement extends Node {
        type: 'LabeledStatement';
        label: Identifier;
        body: Statement;
    }

    declare class StringLiteral extends Node {
        type: 'StringLiteral';
        value: string;
    }

    declare class NumericLiteral extends Node {
        type: 'NumericLiteral';
        value: number;
    }

    declare class NullLiteral extends Node {
        type: 'NullLiteral';
    }

    declare class BooleanLiteral extends Node {
        type: 'BooleanLiteral';
        value: boolean;
    }

    declare class RegExpLiteral extends Node {
        type: 'RegExpLiteral';
        pattern: string;
        flags?: string;
    }

    declare class LogicalExpression extends Node {
        type: 'LogicalExpression';
        operator: '||' | '&&' | '??';
        left: Expression;
        right: Expression;
    }

    declare class MemberExpression extends Node {
        type: 'MemberExpression';
        object: Expression;
        property: any;
        computed?: boolean;
        optional?: true | false;
    }

    declare class NewExpression extends Node {
        type: 'NewExpression';
        callee: Expression;
        arguments: any;
        optional?: true | false;
        typeParameters?: ?TypeParameterInstantiation;
    }

    declare class Program extends Node {
        type: 'Program';
        body: any;
        directives?: any;
        sourceType?: 'script' | 'module';
        sourceFile?: string;
    }

    declare class ObjectExpression extends Node {
        type: 'ObjectExpression';
        properties: any;
    }

    declare class ObjectMethod extends Node {
        type: 'ObjectMethod';
        kind?: any;
        key: any;
        params: any;
        body: BlockStatement;
        computed?: boolean;
        async?: boolean;
        decorators?: any;
        generator?: boolean;
        returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop;
        typeParameters?: ?TypeParameterDeclaration | Noop;
    }

    declare class ObjectProperty extends Node {
        type: 'ObjectProperty';
        key: any;
        value: Expression | PatternLike;
        computed?: boolean;
        shorthand?: boolean;
        decorators?: any;
    }

    declare class RestElement extends Node {
        type: 'RestElement';
        argument: LVal;
        decorators?: any;
        typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop;
    }

    declare class ReturnStatement extends Node {
        type: 'ReturnStatement';
        argument?: ?Expression;
    }

    declare class SequenceExpression extends Node {
        type: 'SequenceExpression';
        expressions: any;
    }

    declare class SwitchCase extends Node {
        type: 'SwitchCase';
        test?: ?Expression;
        consequent: any;
    }

    declare class SwitchStatement extends Node {
        type: 'SwitchStatement';
        discriminant: Expression;
        cases: any;
    }

    declare class ThisExpression extends Node {
        type: 'ThisExpression';
    }

    declare class ThrowStatement extends Node {
        type: 'ThrowStatement';
        argument: Expression;
    }

    declare class TryStatement extends Node {
        type: 'TryStatement';
        block: BlockStatement;
        handler?: ?CatchClause;
        finalizer?: ?BlockStatement;
    }

    declare class UnaryExpression extends Node {
        type: 'UnaryExpression';
        operator: 'void' | 'throw' | 'delete' | '!' | '+' | '-' | '~' | 'typeof';
        argument: Expression;
        prefix?: boolean;
    }

    declare class UpdateExpression extends Node {
        type: 'UpdateExpression';
        operator: '++' | '--';
        argument: Expression;
        prefix?: boolean;
    }

    declare class VariableDeclaration extends Node {
        type: 'VariableDeclaration';
        kind: any;
        declarations: any;
        declare?: boolean;
    }

    declare class VariableDeclarator extends Node {
        type: 'VariableDeclarator';
        id: LVal;
        init?: ?Expression;
    }

    declare class WhileStatement extends Node {
        type: 'WhileStatement';
        test: Expression;
        body: BlockStatement | Statement;
    }

    declare class WithStatement extends Node {
        type: 'WithStatement';
        object: any;
        body: BlockStatement | Statement;
    }

    declare class AssignmentPattern extends Node {
        type: 'AssignmentPattern';
        left: Identifier | ObjectPattern | ArrayPattern;
        right: Expression;
        decorators?: any;
        typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop;
    }

    declare class ArrayPattern extends Node {
        type: 'ArrayPattern';
        elements: any;
        decorators?: any;
        typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop;
    }

    declare class ArrowFunctionExpression extends Node {
        type: 'ArrowFunctionExpression';
        params: any;
        body: BlockStatement | Expression;
        async?: boolean;
        expression?: boolean;
        generator?: boolean;
        returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop;
        typeParameters?: ?TypeParameterDeclaration | Noop;
    }

    declare class ClassBody extends Node {
        type: 'ClassBody';
        body: any;
    }

    declare class ClassDeclaration extends Node {
        type: 'ClassDeclaration';
        id?: ?Identifier;
        superClass?: ?Expression;
        body: ClassBody;
        decorators?: any;
        abstract?: boolean;
        declare?: boolean;
        mixins?: any;
        superTypeParameters?: ?TypeParameterInstantiation;
        typeParameters?: ?TypeParameterDeclaration | Noop;
    }

    declare class ClassExpression extends Node {
        type: 'ClassExpression';
        id?: ?Identifier;
        superClass?: ?Expression;
        body: ClassBody;
        decorators?: any;
        mixins?: any;
        superTypeParameters?: ?TypeParameterInstantiation;
        typeParameters?: ?TypeParameterDeclaration | Noop;
    }

    declare class ExportAllDeclaration extends Node {
        type: 'ExportAllDeclaration';
        source: StringLiteral;
    }

    declare class ExportDefaultDeclaration extends Node {
        type: 'ExportDefaultDeclaration';
        declaration: FunctionDeclaration | TSDeclareFunction | ClassDeclaration | Expression;
    }

    declare class ExportNamedDeclaration extends Node {
        type: 'ExportNamedDeclaration';
        declaration?: ?Declaration;
        specifiers: any;
        source?: ?StringLiteral;
    }

    declare class ExportSpecifier extends Node {
        type: 'ExportSpecifier';
        local: Identifier;
        exported: Identifier;
    }

    declare class ForOfStatement extends Node {
        type: 'ForOfStatement';
        left: VariableDeclaration | LVal;
        right: Expression;
        body: Statement;
    }

    declare class ImportDeclaration extends Node {
        type: 'ImportDeclaration';
        specifiers: any;
        source: StringLiteral;
    }

    declare class ImportDefaultSpecifier extends Node {
        type: 'ImportDefaultSpecifier';
        local: Identifier;
    }

    declare class ImportNamespaceSpecifier extends Node {
        type: 'ImportNamespaceSpecifier';
        local: Identifier;
    }

    declare class ImportSpecifier extends Node {
        type: 'ImportSpecifier';
        local: Identifier;
        imported: Identifier;
        importKind?: null | 'type' | 'typeof';
    }

    declare class MetaProperty extends Node {
        type: 'MetaProperty';
        meta: Identifier;
        property: Identifier;
    }

    declare class ClassMethod extends Node {
        type: 'ClassMethod';
        kind?: any;
        key: any;
        params: any;
        body: BlockStatement;
        computed?: boolean;
        abstract?: boolean;
        access?: any;
        accessibility?: any;
        async?: boolean;
        decorators?: any;
        generator?: boolean;
        optional?: boolean;
        returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop;
        typeParameters?: ?TypeParameterDeclaration | Noop;
    }

    declare class ObjectPattern extends Node {
        type: 'ObjectPattern';
        properties: any;
        decorators?: any;
        typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop;
    }

    declare class SpreadElement extends Node {
        type: 'SpreadElement';
        argument: Expression;
    }

    declare class Super extends Node {
        type: 'Super';
    }

    declare class TaggedTemplateExpression extends Node {
        type: 'TaggedTemplateExpression';
        tag: Expression;
        quasi: TemplateLiteral;
    }

    declare class TemplateElement extends Node {
        type: 'TemplateElement';
        value: any;
        tail?: boolean;
    }

    declare class TemplateLiteral extends Node {
        type: 'TemplateLiteral';
        quasis: any;
        expressions: any;
    }

    declare class YieldExpression extends Node {
        type: 'YieldExpression';
        argument?: ?Expression;
        delegate?: boolean;
    }

    declare class AnyTypeAnnotation extends Node {
        type: 'AnyTypeAnnotation';
    }

    declare class ArrayTypeAnnotation extends Node {
        type: 'ArrayTypeAnnotation';
        elementType: any;
    }

    declare class BooleanTypeAnnotation extends Node {
        type: 'BooleanTypeAnnotation';
    }

    declare class BooleanLiteralTypeAnnotation extends Node {
        type: 'BooleanLiteralTypeAnnotation';
    }

    declare class NullLiteralTypeAnnotation extends Node {
        type: 'NullLiteralTypeAnnotation';
    }

    declare class ClassImplements extends Node {
        type: 'ClassImplements';
        id: any;
        typeParameters: any;
    }

    declare class DeclareClass extends Node {
        type: 'DeclareClass';
        id: any;
        typeParameters: any;
        body: any;
    }

    declare class DeclareFunction extends Node {
        type: 'DeclareFunction';
        id: any;
    }

    declare class DeclareInterface extends Node {
        type: 'DeclareInterface';
        id: any;
        typeParameters: any;
        body: any;
    }

    declare class DeclareModule extends Node {
        type: 'DeclareModule';
        id: any;
        body: any;
    }

    declare class DeclareModuleExports extends Node {
        type: 'DeclareModuleExports';
        typeAnnotation: any;
    }

    declare class DeclareTypeAlias extends Node {
        type: 'DeclareTypeAlias';
        id: any;
        typeParameters: any;
        right: any;
    }

    declare class DeclareOpaqueType extends Node {
        type: 'DeclareOpaqueType';
        id: any;
        typeParameters: any;
        supertype: any;
    }

    declare class DeclareVariable extends Node {
        type: 'DeclareVariable';
        id: any;
    }

    declare class DeclareExportDeclaration extends Node {
        type: 'DeclareExportDeclaration';
        declaration: any;
        specifiers: any;
        source: any;
    }

    declare class DeclareExportAllDeclaration extends Node {
        type: 'DeclareExportAllDeclaration';
        source: any;
    }

    declare class DeclaredPredicate extends Node {
        type: 'DeclaredPredicate';
        value: any;
    }

    declare class ExistsTypeAnnotation extends Node {
        type: 'ExistsTypeAnnotation';
    }

    declare class FunctionTypeAnnotation extends Node {
        type: 'FunctionTypeAnnotation';
        typeParameters: any;
        params: any;
        rest: any;
        returnType: any;
    }

    declare class FunctionTypeParam extends Node {
        type: 'FunctionTypeParam';
        name: any;
        typeAnnotation: any;
    }

    declare class GenericTypeAnnotation extends Node {
        type: 'GenericTypeAnnotation';
        id: any;
        typeParameters: any;
    }

    declare class InferredPredicate extends Node {
        type: 'InferredPredicate';
    }

    declare class InterfaceExtends extends Node {
        type: 'InterfaceExtends';
        id: any;
        typeParameters: any;
    }

    declare class InterfaceDeclaration extends Node {
        type: 'InterfaceDeclaration';
        id: any;
        typeParameters: any;
        body: any;
    }

    declare class IntersectionTypeAnnotation extends Node {
        type: 'IntersectionTypeAnnotation';
        types: any;
    }

    declare class MixedTypeAnnotation extends Node {
        type: 'MixedTypeAnnotation';
    }

    declare class EmptyTypeAnnotation extends Node {
        type: 'EmptyTypeAnnotation';
    }

    declare class NullableTypeAnnotation extends Node {
        type: 'NullableTypeAnnotation';
        typeAnnotation: any;
    }

    declare class NumberLiteralTypeAnnotation extends Node {
        type: 'NumberLiteralTypeAnnotation';
    }

    declare class NumberTypeAnnotation extends Node {
        type: 'NumberTypeAnnotation';
    }

    declare class ObjectTypeAnnotation extends Node {
        type: 'ObjectTypeAnnotation';
        properties: any;
        indexers: any;
        callProperties: any;
    }

    declare class ObjectTypeCallProperty extends Node {
        type: 'ObjectTypeCallProperty';
        value: any;
    }

    declare class ObjectTypeIndexer extends Node {
        type: 'ObjectTypeIndexer';
        id: any;
        key: any;
        value: any;
    }

    declare class ObjectTypeProperty extends Node {
        type: 'ObjectTypeProperty';
        key: any;
        value: any;
    }

    declare class ObjectTypeSpreadProperty extends Node {
        type: 'ObjectTypeSpreadProperty';
        argument: any;
    }

    declare class OpaqueType extends Node {
        type: 'OpaqueType';
        id: any;
        typeParameters: any;
        supertype: any;
        impltype: any;
    }

    declare class QualifiedTypeIdentifier extends Node {
        type: 'QualifiedTypeIdentifier';
        id: any;
        qualification: any;
    }

    declare class StringLiteralTypeAnnotation extends Node {
        type: 'StringLiteralTypeAnnotation';
    }

    declare class StringTypeAnnotation extends Node {
        type: 'StringTypeAnnotation';
    }

    declare class ThisTypeAnnotation extends Node {
        type: 'ThisTypeAnnotation';
    }

    declare class TupleTypeAnnotation extends Node {
        type: 'TupleTypeAnnotation';
        types: any;
    }

    declare class TypeofTypeAnnotation extends Node {
        type: 'TypeofTypeAnnotation';
        argument: any;
    }

    declare class TypeAlias extends Node {
        type: 'TypeAlias';
        id: any;
        typeParameters: any;
        right: any;
    }

    declare class TypeAnnotation extends Node {
        type: 'TypeAnnotation';
        typeAnnotation: Flow;
    }

    declare class TypeCastExpression extends Node {
        type: 'TypeCastExpression';
        expression: any;
        typeAnnotation: any;
    }

    declare class TypeParameter extends Node {
        type: 'TypeParameter';
        bound?: ?TypeAnnotation;
        name?: string;
    }

    declare class TypeParameterDeclaration extends Node {
        type: 'TypeParameterDeclaration';
        params: any;
    }

    declare class TypeParameterInstantiation extends Node {
        type: 'TypeParameterInstantiation';
        params: any;
    }

    declare class UnionTypeAnnotation extends Node {
        type: 'UnionTypeAnnotation';
        types: any;
    }

    declare class VoidTypeAnnotation extends Node {
        type: 'VoidTypeAnnotation';
    }

    declare class JSXAttribute extends Node {
        type: 'JSXAttribute';
        name: JSXIdentifier | JSXNamespacedName;
        value?: ?JSXElement | StringLiteral | JSXExpressionContainer;
    }

    declare class JSXClosingElement extends Node {
        type: 'JSXClosingElement';
        name: JSXIdentifier | JSXMemberExpression;
    }

    declare class JSXElement extends Node {
        type: 'JSXElement';
        openingElement: JSXOpeningElement;
        closingElement?: ?JSXClosingElement;
        children: any;
        selfClosing: any;
    }

    declare class JSXEmptyExpression extends Node {
        type: 'JSXEmptyExpression';
    }

    declare class JSXExpressionContainer extends Node {
        type: 'JSXExpressionContainer';
        expression: Expression;
    }

    declare class JSXSpreadChild extends Node {
        type: 'JSXSpreadChild';
        expression: Expression;
    }

    declare class JSXIdentifier extends Node {
        type: 'JSXIdentifier';
        name: string;
    }

    declare class JSXMemberExpression extends Node {
        type: 'JSXMemberExpression';
        object: JSXMemberExpression | JSXIdentifier;
        property: JSXIdentifier;
    }

    declare class JSXNamespacedName extends Node {
        type: 'JSXNamespacedName';
        namespace: JSXIdentifier;
        name: JSXIdentifier;
    }

    declare class JSXOpeningElement extends Node {
        type: 'JSXOpeningElement';
        name: JSXIdentifier | JSXMemberExpression;
        attributes: any;
        selfClosing?: boolean;
    }

    declare class JSXSpreadAttribute extends Node {
        type: 'JSXSpreadAttribute';
        argument: Expression;
    }

    declare class JSXText extends Node {
        type: 'JSXText';
        value: string;
    }

    declare class Noop extends Node {
        type: 'Noop';
    }

    declare class ParenthesizedExpression extends Node {
        type: 'ParenthesizedExpression';
        expression: Expression;
    }

    declare class AwaitExpression extends Node {
        type: 'AwaitExpression';
        argument: Expression;
    }

    declare class BindExpression extends Node {
        type: 'BindExpression';
        object: any;
        callee: any;
    }

    declare class ClassProperty extends Node {
        type: 'ClassProperty';
        key: any;
        value?: ?Expression;
        typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop;
        decorators?: any;
        computed?: boolean;
        abstract?: boolean;
        accessibility?: any;
        optional?: boolean;
        readonly?: boolean;
    }

    declare class Import extends Node {
        type: 'Import';
    }

    declare class Decorator extends Node {
        type: 'Decorator';
        expression: Expression;
    }

    declare class DoExpression extends Node {
        type: 'DoExpression';
        body: BlockStatement;
    }

    declare class ExportDefaultSpecifier extends Node {
        type: 'ExportDefaultSpecifier';
        exported: Identifier;
    }

    declare class ExportNamespaceSpecifier extends Node {
        type: 'ExportNamespaceSpecifier';
        exported: Identifier;
    }

    declare class TSParameterProperty extends Node {
        type: 'TSParameterProperty';
        parameter: Identifier | AssignmentPattern;
        accessibility?: 'public' | 'private' | 'protected';
        readonly?: boolean;
    }

    declare class TSDeclareFunction extends Node {
        type: 'TSDeclareFunction';
        id?: ?Identifier;
        typeParameters?: ?TypeParameterDeclaration | Noop;
        params: any;
        returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop;
        async?: boolean;
        declare?: boolean;
        generator?: boolean;
    }

    declare class TSDeclareMethod extends Node {
        type: 'TSDeclareMethod';
        decorators?: any;
        key: any;
        typeParameters?: ?TypeParameterDeclaration | Noop;
        params: any;
        returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop;
        abstract?: boolean;
        access?: any;
        accessibility?: any;
        async?: boolean;
        computed?: boolean;
        generator?: boolean;
        kind?: any;
        optional?: boolean;
    }

    declare class TSQualifiedName extends Node {
        type: 'TSQualifiedName';
        left: TSEntityName;
        right: Identifier;
    }

    declare class TSCallSignatureDeclaration extends Node {
        type: 'TSCallSignatureDeclaration';
        typeParameters?: ?TypeParameterDeclaration;
        parameters?: any;
        typeAnnotation?: ?TSTypeAnnotation;
    }

    declare class TSConstructSignatureDeclaration extends Node {
        type: 'TSConstructSignatureDeclaration';
        typeParameters?: ?TypeParameterDeclaration;
        parameters?: any;
        typeAnnotation?: ?TSTypeAnnotation;
    }

    declare class TSPropertySignature extends Node {
        type: 'TSPropertySignature';
        key: Expression;
        typeAnnotation?: ?TSTypeAnnotation;
        initializer?: ?Expression;
        computed?: boolean;
        optional?: boolean;
        readonly?: boolean;
    }

    declare class TSMethodSignature extends Node {
        type: 'TSMethodSignature';
        key: Expression;
        typeParameters?: ?TypeParameterDeclaration;
        parameters?: any;
        typeAnnotation?: ?TSTypeAnnotation;
        computed?: boolean;
        optional?: boolean;
    }

    declare class TSIndexSignature extends Node {
        type: 'TSIndexSignature';
        parameters: any;
        typeAnnotation?: ?TSTypeAnnotation;
        readonly?: boolean;
    }

    declare class TSAnyKeyword extends Node {
        type: 'TSAnyKeyword';
    }

    declare class TSNumberKeyword extends Node {
        type: 'TSNumberKeyword';
    }

    declare class TSObjectKeyword extends Node {
        type: 'TSObjectKeyword';
    }

    declare class TSBooleanKeyword extends Node {
        type: 'TSBooleanKeyword';
    }

    declare class TSStringKeyword extends Node {
        type: 'TSStringKeyword';
    }

    declare class TSSymbolKeyword extends Node {
        type: 'TSSymbolKeyword';
    }

    declare class TSVoidKeyword extends Node {
        type: 'TSVoidKeyword';
    }

    declare class TSUndefinedKeyword extends Node {
        type: 'TSUndefinedKeyword';
    }

    declare class TSNullKeyword extends Node {
        type: 'TSNullKeyword';
    }

    declare class TSNeverKeyword extends Node {
        type: 'TSNeverKeyword';
    }

    declare class TSThisType extends Node {
        type: 'TSThisType';
    }

    declare class TSFunctionType extends Node {
        type: 'TSFunctionType';
        typeParameters?: ?TypeParameterDeclaration;
        typeAnnotation?: ?TSTypeAnnotation;
        parameters?: any;
    }

    declare class TSConstructorType extends Node {
        type: 'TSConstructorType';
        typeParameters?: ?TypeParameterDeclaration;
        typeAnnotation?: ?TSTypeAnnotation;
        parameters?: any;
    }

    declare class TSTypeReference extends Node {
        type: 'TSTypeReference';
        typeName: TSEntityName;
        typeParameters?: ?TypeParameterInstantiation;
    }

    declare class TSTypePredicate extends Node {
        type: 'TSTypePredicate';
        parameterName: Identifier | TSThisType;
        typeAnnotation: TSTypeAnnotation;
    }

    declare class TSTypeQuery extends Node {
        type: 'TSTypeQuery';
        exprName: TSEntityName;
    }

    declare class TSTypeLiteral extends Node {
        type: 'TSTypeLiteral';
        members: any;
    }

    declare class TSArrayType extends Node {
        type: 'TSArrayType';
        elementType: TSType;
    }

    declare class TSTupleType extends Node {
        type: 'TSTupleType';
        elementTypes: any;
    }

    declare class TSUnionType extends Node {
        type: 'TSUnionType';
        types: any;
    }

    declare class TSIntersectionType extends Node {
        type: 'TSIntersectionType';
        types: any;
    }

    declare class TSParenthesizedType extends Node {
        type: 'TSParenthesizedType';
        typeAnnotation: TSType;
    }

    declare class TSTypeOperator extends Node {
        type: 'TSTypeOperator';
        typeAnnotation: TSType;
        operator?: string;
    }

    declare class TSIndexedAccessType extends Node {
        type: 'TSIndexedAccessType';
        objectType: TSType;
        indexType: TSType;
    }

    declare class TSMappedType extends Node {
        type: 'TSMappedType';
        typeParameter: TypeParameter;
        typeAnnotation?: ?TSType;
        optional?: boolean;
        readonly?: boolean;
    }

    declare class TSLiteralType extends Node {
        type: 'TSLiteralType';
        literal: NumericLiteral | StringLiteral | BooleanLiteral;
    }

    declare class TSExpressionWithTypeArguments extends Node {
        type: 'TSExpressionWithTypeArguments';
        expression: TSEntityName;
        typeParameters?: ?TypeParameterInstantiation;
    }

    declare class TSInterfaceDeclaration extends Node {
        type: 'TSInterfaceDeclaration';
        id: Identifier;
        typeParameters?: ?TypeParameterDeclaration;
        body: TSInterfaceBody;
        declare?: boolean;
    }

    declare class TSInterfaceBody extends Node {
        type: 'TSInterfaceBody';
        body: any;
    }

    declare class TSTypeAliasDeclaration extends Node {
        type: 'TSTypeAliasDeclaration';
        id: Identifier;
        typeParameters?: ?TypeParameterDeclaration;
        typeAnnotation: TSType;
        declare?: boolean;
    }

    declare class TSAsExpression extends Node {
        type: 'TSAsExpression';
        expression: Expression;
        typeAnnotation: TSType;
    }

    declare class TSTypeAssertion extends Node {
        type: 'TSTypeAssertion';
        typeAnnotation: TSType;
        expression: Expression;
    }

    declare class TSEnumDeclaration extends Node {
        type: 'TSEnumDeclaration';
        id: Identifier;
        members: any;
        declare?: boolean;
        initializer?: ?Expression;
    }

    declare class TSEnumMember extends Node {
        type: 'TSEnumMember';
        id: Identifier | StringLiteral;
        initializer?: ?Expression;
    }

    declare class TSModuleDeclaration extends Node {
        type: 'TSModuleDeclaration';
        id: Identifier | StringLiteral;
        body: TSModuleBlock | TSModuleDeclaration;
        declare?: boolean;
        global?: boolean;
    }

    declare class TSModuleBlock extends Node {
        type: 'TSModuleBlock';
        body: any;
    }

    declare class TSImportEqualsDeclaration extends Node {
        type: 'TSImportEqualsDeclaration';
        id: Identifier;
        moduleReference: TSEntityName | TSExternalModuleReference;
        isExport?: boolean;
    }

    declare class TSExternalModuleReference extends Node {
        type: 'TSExternalModuleReference';
        expression: StringLiteral;
    }

    declare class TSNonNullExpression extends Node {
        type: 'TSNonNullExpression';
        expression: Expression;
    }

    declare class TSExportAssignment extends Node {
        type: 'TSExportAssignment';
        expression: Expression;
    }

    declare class TSNamespaceExportDeclaration extends Node {
        type: 'TSNamespaceExportDeclaration';
        id: Identifier;
    }

    declare class TSTypeAnnotation extends Node {
        type: 'TSTypeAnnotation';
        typeAnnotation: TSType;
    }

    declare class TSTypeParameterInstantiation extends Node {
        type: 'TSTypeParameterInstantiation';
        params: any;
    }

    declare class TSTypeParameterDeclaration extends Node {
        type: 'TSTypeParameterDeclaration';
        params: any;
    }

    declare class TSTypeParameter extends Node {
        type: 'TSTypeParameter';
        constraint?: ?TSType;
        name?: string;
    }

    declare type A = string;
    declare type Expression = ArrayExpression | AssignmentExpression | BinaryExpression | CallExpression | ConditionalExpression | FunctionExpression | Identifier | StringLiteral | NumericLiteral | NullLiteral | BooleanLiteral | RegExpLiteral | LogicalExpression | MemberExpression | NewExpression | ObjectExpression | SequenceExpression | ThisExpression | UnaryExpression | UpdateExpression | ArrowFunctionExpression | ClassExpression | MetaProperty | Super | TaggedTemplateExpression | TemplateLiteral | YieldExpression | TypeCastExpression | JSXElement | JSXEmptyExpression | JSXIdentifier | JSXMemberExpression | ParenthesizedExpression | AwaitExpression | BindExpression | Import | DoExpression | TSAsExpression | TSTypeAssertion | TSNonNullExpression;
    declare type Binary = BinaryExpression | LogicalExpression;
    declare type Scopable = BlockStatement | CatchClause | DoWhileStatement | ForInStatement | ForStatement | FunctionDeclaration | FunctionExpression | Program | ObjectMethod | SwitchStatement | WhileStatement | ArrowFunctionExpression | ClassDeclaration | ClassExpression | ForOfStatement | ClassMethod;
    declare type BlockParent = BlockStatement | CatchClause | DoWhileStatement | ForInStatement | ForStatement | FunctionDeclaration | FunctionExpression | Program | ObjectMethod | SwitchStatement | WhileStatement | ArrowFunctionExpression | ForOfStatement | ClassMethod;
    declare type Block = BlockStatement | Program;
    declare type Statement = BlockStatement | BreakStatement | ContinueStatement | DebuggerStatement | DoWhileStatement | EmptyStatement | ExpressionStatement | ForInStatement | ForStatement | FunctionDeclaration | IfStatement | LabeledStatement | ReturnStatement | SwitchStatement | ThrowStatement | TryStatement | VariableDeclaration | WhileStatement | WithStatement | ClassDeclaration | ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ForOfStatement | ImportDeclaration | DeclareClass | DeclareFunction | DeclareInterface | DeclareModule | DeclareModuleExports | DeclareTypeAlias | DeclareOpaqueType | DeclareVariable | DeclareExportDeclaration | DeclareExportAllDeclaration | InterfaceDeclaration | OpaqueType | TypeAlias | TSDeclareFunction | TSInterfaceDeclaration | TSTypeAliasDeclaration | TSEnumDeclaration | TSModuleDeclaration | TSImportEqualsDeclaration | TSExportAssignment | TSNamespaceExportDeclaration;
    declare type Terminatorless = BreakStatement | ContinueStatement | ReturnStatement | ThrowStatement | YieldExpression | AwaitExpression;
    declare type CompletionStatement = BreakStatement | ContinueStatement | ReturnStatement | ThrowStatement;
    declare type Conditional = ConditionalExpression | IfStatement;
    declare type Loop = DoWhileStatement | ForInStatement | ForStatement | WhileStatement | ForOfStatement;
    declare type While = DoWhileStatement | WhileStatement;
    declare type ExpressionWrapper = ExpressionStatement | TypeCastExpression | ParenthesizedExpression;
    declare type For = ForInStatement | ForStatement | ForOfStatement;
    declare type ForXStatement = ForInStatement | ForOfStatement;
    declare type Function = FunctionDeclaration | FunctionExpression | ObjectMethod | ArrowFunctionExpression | ClassMethod;
    declare type FunctionParent = FunctionDeclaration | FunctionExpression | ObjectMethod | ArrowFunctionExpression | ClassMethod;
    declare type Pureish = FunctionDeclaration | FunctionExpression | StringLiteral | NumericLiteral | NullLiteral | BooleanLiteral | ArrowFunctionExpression | ClassDeclaration | ClassExpression;
    declare type Declaration = FunctionDeclaration | VariableDeclaration | ClassDeclaration | ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ImportDeclaration | DeclareClass | DeclareFunction | DeclareInterface | DeclareModule | DeclareModuleExports | DeclareTypeAlias | DeclareOpaqueType | DeclareVariable | DeclareExportDeclaration | DeclareExportAllDeclaration | InterfaceDeclaration | OpaqueType | TypeAlias | TSDeclareFunction | TSInterfaceDeclaration | TSTypeAliasDeclaration | TSEnumDeclaration | TSModuleDeclaration;
    declare type PatternLike = Identifier | RestElement | AssignmentPattern | ArrayPattern | ObjectPattern;
    declare type LVal = Identifier | MemberExpression | RestElement | AssignmentPattern | ArrayPattern | ObjectPattern | TSParameterProperty;
    declare type TSEntityName = Identifier | TSQualifiedName;
    declare type Literal = StringLiteral | NumericLiteral | NullLiteral | BooleanLiteral | RegExpLiteral | TemplateLiteral;
    declare type Immutable = StringLiteral | NumericLiteral | NullLiteral | BooleanLiteral | JSXAttribute | JSXClosingElement | JSXElement | JSXExpressionContainer | JSXSpreadChild | JSXOpeningElement | JSXText;
    declare type UserWhitespacable = ObjectMethod | ObjectProperty | ObjectTypeCallProperty | ObjectTypeIndexer | ObjectTypeProperty | ObjectTypeSpreadProperty;
    declare type Method = ObjectMethod | ClassMethod;
    declare type ObjectMember = ObjectMethod | ObjectProperty;
    declare type Property = ObjectProperty | ClassProperty;
    declare type UnaryLike = UnaryExpression | SpreadElement;
    declare type Pattern = AssignmentPattern | ArrayPattern | ObjectPattern;
    declare type Class = ClassDeclaration | ClassExpression;
    declare type ModuleDeclaration = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ImportDeclaration;
    declare type ExportDeclaration = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration;
    declare type ModuleSpecifier = ExportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier | ExportDefaultSpecifier | ExportNamespaceSpecifier;
    declare type Flow = AnyTypeAnnotation | ArrayTypeAnnotation | BooleanTypeAnnotation | BooleanLiteralTypeAnnotation | NullLiteralTypeAnnotation | ClassImplements | DeclareClass | DeclareFunction | DeclareInterface | DeclareModule | DeclareModuleExports | DeclareTypeAlias | DeclareOpaqueType | DeclareVariable | DeclareExportDeclaration | DeclareExportAllDeclaration | DeclaredPredicate | ExistsTypeAnnotation | FunctionTypeAnnotation | FunctionTypeParam | GenericTypeAnnotation | InferredPredicate | InterfaceExtends | InterfaceDeclaration | IntersectionTypeAnnotation | MixedTypeAnnotation | EmptyTypeAnnotation | NullableTypeAnnotation | NumberLiteralTypeAnnotation | NumberTypeAnnotation | ObjectTypeAnnotation | ObjectTypeCallProperty | ObjectTypeIndexer | ObjectTypeProperty | ObjectTypeSpreadProperty | OpaqueType | QualifiedTypeIdentifier | StringLiteralTypeAnnotation | StringTypeAnnotation | ThisTypeAnnotation | TupleTypeAnnotation | TypeofTypeAnnotation | TypeAlias | TypeAnnotation | TypeCastExpression | TypeParameter | TypeParameterDeclaration | TypeParameterInstantiation | UnionTypeAnnotation | VoidTypeAnnotation;
    declare type FlowBaseAnnotation = AnyTypeAnnotation | BooleanTypeAnnotation | NullLiteralTypeAnnotation | MixedTypeAnnotation | EmptyTypeAnnotation | NumberTypeAnnotation | StringTypeAnnotation | ThisTypeAnnotation | VoidTypeAnnotation;
    declare type FlowDeclaration = DeclareClass | DeclareFunction | DeclareInterface | DeclareModule | DeclareModuleExports | DeclareTypeAlias | DeclareOpaqueType | DeclareVariable | DeclareExportDeclaration | DeclareExportAllDeclaration | InterfaceDeclaration | OpaqueType | TypeAlias;
    declare type FlowPredicate = DeclaredPredicate | InferredPredicate;
    declare type JSX = JSXAttribute | JSXClosingElement | JSXElement | JSXEmptyExpression | JSXExpressionContainer | JSXSpreadChild | JSXIdentifier | JSXMemberExpression | JSXNamespacedName | JSXOpeningElement | JSXSpreadAttribute | JSXText;
    declare type TSTypeElement = TSCallSignatureDeclaration | TSConstructSignatureDeclaration | TSPropertySignature | TSMethodSignature | TSIndexSignature;
    declare type TSType = TSAnyKeyword | TSNumberKeyword | TSObjectKeyword | TSBooleanKeyword | TSStringKeyword | TSSymbolKeyword | TSVoidKeyword | TSUndefinedKeyword | TSNullKeyword | TSNeverKeyword | TSThisType | TSFunctionType | TSConstructorType | TSTypeReference | TSTypePredicate | TSTypeQuery | TSTypeLiteral | TSArrayType | TSTupleType | TSUnionType | TSIntersectionType | TSParenthesizedType | TSTypeOperator | TSIndexedAccessType | TSMappedType | TSLiteralType | TSExpressionWithTypeArguments;

    declare function arrayExpression(elements?: any): ArrayExpression;
    declare function assignmentExpression(operator: string, left: LVal, right: Expression): AssignmentExpression;
    declare function binaryExpression(operator: '+' | '-' | '/' | '%' | '*' | '**' | '&' | '|' | '>>' | '>>>' | '<<' | '^' | '==' | '===' | '!=' | '!==' | 'in' | 'instanceof' | '>' | '<' | '>=' | '<=', left: Expression, right: Expression): BinaryExpression;
    declare function directive(value: DirectiveLiteral): Directive;
    declare function directiveLiteral(value: string): DirectiveLiteral;
    declare function blockStatement(body: any, directives?: any): BlockStatement;
    declare function breakStatement(label?: ?Identifier): BreakStatement;
    declare function callExpression(callee: Expression, _arguments: any, optional?: true | false, typeParameters?: ?TypeParameterInstantiation): CallExpression;
    declare function catchClause(param?: ?Identifier, body: BlockStatement): CatchClause;
    declare function conditionalExpression(test: Expression, consequent: Expression, alternate: Expression): ConditionalExpression;
    declare function continueStatement(label?: ?Identifier): ContinueStatement;
    declare function debuggerStatement(): DebuggerStatement;
    declare function doWhileStatement(test: Expression, body: Statement): DoWhileStatement;
    declare function emptyStatement(): EmptyStatement;
    declare function expressionStatement(expression: Expression): ExpressionStatement;
    declare function file(program: Program, comments: any, tokens: any): File;
    declare function forInStatement(left: VariableDeclaration | LVal, right: Expression, body: Statement): ForInStatement;
    declare function forStatement(init?: ?VariableDeclaration | Expression, test?: ?Expression, update?: ?Expression, body: Statement): ForStatement;
    declare function functionDeclaration(id?: ?Identifier, params: any, body: BlockStatement, generator?: boolean, async?: boolean, declare?: boolean, returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop, typeParameters?: ?TypeParameterDeclaration | Noop): FunctionDeclaration;
    declare function functionExpression(id?: ?Identifier, params: any, body: BlockStatement, generator?: boolean, async?: boolean, returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop, typeParameters?: ?TypeParameterDeclaration | Noop): FunctionExpression;
    declare function identifier(name: any, decorators?: any, optional?: boolean, typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop): Identifier;
    declare function ifStatement(test: Expression, consequent: Statement, alternate?: ?Statement): IfStatement;
    declare function labeledStatement(label: Identifier, body: Statement): LabeledStatement;
    declare function stringLiteral(value: string): StringLiteral;
    declare function numericLiteral(value: number): NumericLiteral;
    declare function nullLiteral(): NullLiteral;
    declare function booleanLiteral(value: boolean): BooleanLiteral;
    declare function regExpLiteral(pattern: string, flags?: string): RegExpLiteral;
    declare function logicalExpression(operator: '||' | '&&' | '??', left: Expression, right: Expression): LogicalExpression;
    declare function memberExpression(object: Expression, property: any, computed?: boolean, optional?: true | false): MemberExpression;
    declare function newExpression(callee: Expression, _arguments: any, optional?: true | false, typeParameters?: ?TypeParameterInstantiation): NewExpression;
    declare function program(body: any, directives?: any, sourceType?: 'script' | 'module', sourceFile?: string): Program;
    declare function objectExpression(properties: any): ObjectExpression;
    declare function objectMethod(kind?: any, key: any, params: any, body: BlockStatement, computed?: boolean, async?: boolean, decorators?: any, generator?: boolean, returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop, typeParameters?: ?TypeParameterDeclaration | Noop): ObjectMethod;
    declare function objectProperty(key: any, value: Expression | PatternLike, computed?: boolean, shorthand?: boolean, decorators?: any): ObjectProperty;
    declare function restElement(argument: LVal, decorators?: any, typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop): RestElement;
    declare function returnStatement(argument?: ?Expression): ReturnStatement;
    declare function sequenceExpression(expressions: any): SequenceExpression;
    declare function switchCase(test?: ?Expression, consequent: any): SwitchCase;
    declare function switchStatement(discriminant: Expression, cases: any): SwitchStatement;
    declare function thisExpression(): ThisExpression;
    declare function throwStatement(argument: Expression): ThrowStatement;
    declare function tryStatement(block: BlockStatement, handler?: ?CatchClause, finalizer?: ?BlockStatement): TryStatement;
    declare function unaryExpression(operator: 'void' | 'throw' | 'delete' | '!' | '+' | '-' | '~' | 'typeof', argument: Expression, prefix?: boolean): UnaryExpression;
    declare function updateExpression(operator: '++' | '--', argument: Expression, prefix?: boolean): UpdateExpression;
    declare function variableDeclaration(kind: any, declarations: any, declare?: boolean): VariableDeclaration;
    declare function variableDeclarator(id: LVal, init?: ?Expression): VariableDeclarator;
    declare function whileStatement(test: Expression, body: BlockStatement | Statement): WhileStatement;
    declare function withStatement(object: any, body: BlockStatement | Statement): WithStatement;
    declare function assignmentPattern(left: Identifier | ObjectPattern | ArrayPattern, right: Expression, decorators?: any, typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop): AssignmentPattern;
    declare function arrayPattern(elements: any, decorators?: any, typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop): ArrayPattern;
    declare function arrowFunctionExpression(params: any, body: BlockStatement | Expression, async?: boolean, expression?: boolean, generator?: boolean, returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop, typeParameters?: ?TypeParameterDeclaration | Noop): ArrowFunctionExpression;
    declare function classBody(body: any): ClassBody;
    declare function classDeclaration(id?: ?Identifier, superClass?: ?Expression, body: ClassBody, decorators?: any, abstract?: boolean, declare?: boolean, _implements?: any, mixins?: any, superTypeParameters?: ?TypeParameterInstantiation, typeParameters?: ?TypeParameterDeclaration | Noop): ClassDeclaration;
    declare function classExpression(id?: ?Identifier, superClass?: ?Expression, body: ClassBody, decorators?: any, _implements?: any, mixins?: any, superTypeParameters?: ?TypeParameterInstantiation, typeParameters?: ?TypeParameterDeclaration | Noop): ClassExpression;
    declare function exportAllDeclaration(source: StringLiteral): ExportAllDeclaration;
    declare function exportDefaultDeclaration(declaration: FunctionDeclaration | TSDeclareFunction | ClassDeclaration | Expression): ExportDefaultDeclaration;
    declare function exportNamedDeclaration(declaration?: ?Declaration, specifiers: any, source?: ?StringLiteral): ExportNamedDeclaration;
    declare function exportSpecifier(local: Identifier, exported: Identifier): ExportSpecifier;
    declare function forOfStatement(left: VariableDeclaration | LVal, right: Expression, body: Statement, _await?: boolean): ForOfStatement;
    declare function importDeclaration(specifiers: any, source: StringLiteral): ImportDeclaration;
    declare function importDefaultSpecifier(local: Identifier): ImportDefaultSpecifier;
    declare function importNamespaceSpecifier(local: Identifier): ImportNamespaceSpecifier;
    declare function importSpecifier(local: Identifier, imported: Identifier, importKind?: null | 'type' | 'typeof'): ImportSpecifier;
    declare function metaProperty(meta: Identifier, property: Identifier): MetaProperty;
    declare function classMethod(kind?: any, key: any, params: any, body: BlockStatement, computed?: boolean, _static?: boolean, abstract?: boolean, access?: any, accessibility?: any, async?: boolean, decorators?: any, generator?: boolean, optional?: boolean, returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop, typeParameters?: ?TypeParameterDeclaration | Noop): ClassMethod;
    declare function objectPattern(properties: any, decorators?: any, typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop): ObjectPattern;
    declare function spreadElement(argument: Expression): SpreadElement;
    declare function taggedTemplateExpression(tag: Expression, quasi: TemplateLiteral): TaggedTemplateExpression;
    declare function templateElement(value: any, tail?: boolean): TemplateElement;
    declare function templateLiteral(quasis: any, expressions: any): TemplateLiteral;
    declare function yieldExpression(argument?: ?Expression, delegate?: boolean): YieldExpression;
    declare function anyTypeAnnotation(): AnyTypeAnnotation;
    declare function arrayTypeAnnotation(elementType: any): ArrayTypeAnnotation;
    declare function booleanTypeAnnotation(): BooleanTypeAnnotation;
    declare function booleanLiteralTypeAnnotation(): BooleanLiteralTypeAnnotation;
    declare function nullLiteralTypeAnnotation(): NullLiteralTypeAnnotation;
    declare function classImplements(id: any, typeParameters: any): ClassImplements;
    declare function declareClass(id: any, typeParameters: any, _extends: any, body: any): DeclareClass;
    declare function declareFunction(id: any): DeclareFunction;
    declare function declareInterface(id: any, typeParameters: any, _extends: any, body: any): DeclareInterface;
    declare function declareModule(id: any, body: any): DeclareModule;
    declare function declareModuleExports(typeAnnotation: any): DeclareModuleExports;
    declare function declareTypeAlias(id: any, typeParameters: any, right: any): DeclareTypeAlias;
    declare function declareOpaqueType(id: any, typeParameters: any, supertype: any): DeclareOpaqueType;
    declare function declareVariable(id: any): DeclareVariable;
    declare function declareExportDeclaration(declaration: any, specifiers: any, source: any): DeclareExportDeclaration;
    declare function declareExportAllDeclaration(source: any): DeclareExportAllDeclaration;
    declare function declaredPredicate(value: any): DeclaredPredicate;
    declare function existsTypeAnnotation(): ExistsTypeAnnotation;
    declare function functionTypeAnnotation(typeParameters: any, params: any, rest: any, returnType: any): FunctionTypeAnnotation;
    declare function functionTypeParam(name: any, typeAnnotation: any): FunctionTypeParam;
    declare function genericTypeAnnotation(id: any, typeParameters: any): GenericTypeAnnotation;
    declare function inferredPredicate(): InferredPredicate;
    declare function interfaceExtends(id: any, typeParameters: any): InterfaceExtends;
    declare function interfaceDeclaration(id: any, typeParameters: any, _extends: any, body: any): InterfaceDeclaration;
    declare function intersectionTypeAnnotation(types: any): IntersectionTypeAnnotation;
    declare function mixedTypeAnnotation(): MixedTypeAnnotation;
    declare function emptyTypeAnnotation(): EmptyTypeAnnotation;
    declare function nullableTypeAnnotation(typeAnnotation: any): NullableTypeAnnotation;
    declare function numberLiteralTypeAnnotation(): NumberLiteralTypeAnnotation;
    declare function numberTypeAnnotation(): NumberTypeAnnotation;
    declare function objectTypeAnnotation(properties: any, indexers: any, callProperties: any): ObjectTypeAnnotation;
    declare function objectTypeCallProperty(value: any): ObjectTypeCallProperty;
    declare function objectTypeIndexer(id: any, key: any, value: any): ObjectTypeIndexer;
    declare function objectTypeProperty(key: any, value: any): ObjectTypeProperty;
    declare function objectTypeSpreadProperty(argument: any): ObjectTypeSpreadProperty;
    declare function opaqueType(id: any, typeParameters: any, supertype: any, impltype: any): OpaqueType;
    declare function qualifiedTypeIdentifier(id: any, qualification: any): QualifiedTypeIdentifier;
    declare function stringLiteralTypeAnnotation(): StringLiteralTypeAnnotation;
    declare function stringTypeAnnotation(): StringTypeAnnotation;
    declare function thisTypeAnnotation(): ThisTypeAnnotation;
    declare function tupleTypeAnnotation(types: any): TupleTypeAnnotation;
    declare function typeofTypeAnnotation(argument: any): TypeofTypeAnnotation;
    declare function typeAlias(id: any, typeParameters: any, right: any): TypeAlias;
    declare function typeAnnotation(typeAnnotation: Flow): TypeAnnotation;
    declare function typeCastExpression(expression: any, typeAnnotation: any): TypeCastExpression;
    declare function typeParameter(bound?: ?TypeAnnotation, _default?: ?Flow, name?: string): TypeParameter;
    declare function typeParameterDeclaration(params: any): TypeParameterDeclaration;
    declare function typeParameterInstantiation(params: any): TypeParameterInstantiation;
    declare function unionTypeAnnotation(types: any): UnionTypeAnnotation;
    declare function voidTypeAnnotation(): VoidTypeAnnotation;
    declare function jSXAttribute(name: JSXIdentifier | JSXNamespacedName, value?: ?JSXElement | StringLiteral | JSXExpressionContainer): JSXAttribute;
    declare function jSXClosingElement(name: JSXIdentifier | JSXMemberExpression): JSXClosingElement;
    declare function jSXElement(openingElement: JSXOpeningElement, closingElement?: ?JSXClosingElement, children: any, selfClosing: any): JSXElement;
    declare function jSXEmptyExpression(): JSXEmptyExpression;
    declare function jSXExpressionContainer(expression: Expression): JSXExpressionContainer;
    declare function jSXSpreadChild(expression: Expression): JSXSpreadChild;
    declare function jSXIdentifier(name: string): JSXIdentifier;
    declare function jSXMemberExpression(object: JSXMemberExpression | JSXIdentifier, property: JSXIdentifier): JSXMemberExpression;
    declare function jSXNamespacedName(namespace: JSXIdentifier, name: JSXIdentifier): JSXNamespacedName;
    declare function jSXOpeningElement(name: JSXIdentifier | JSXMemberExpression, attributes: any, selfClosing?: boolean): JSXOpeningElement;
    declare function jSXSpreadAttribute(argument: Expression): JSXSpreadAttribute;
    declare function jSXText(value: string): JSXText;
    declare function noop(): Noop;
    declare function parenthesizedExpression(expression: Expression): ParenthesizedExpression;
    declare function awaitExpression(argument: Expression): AwaitExpression;
    declare function bindExpression(object: any, callee: any): BindExpression;
    declare function classProperty(key: any, value?: ?Expression, typeAnnotation?: ?TypeAnnotation | TSTypeAnnotation | Noop, decorators?: any, computed?: boolean, abstract?: boolean, accessibility?: any, optional?: boolean, readonly?: boolean, _static?: boolean): ClassProperty;
    declare function decorator(expression: Expression): Decorator;
    declare function doExpression(body: BlockStatement): DoExpression;
    declare function exportDefaultSpecifier(exported: Identifier): ExportDefaultSpecifier;
    declare function exportNamespaceSpecifier(exported: Identifier): ExportNamespaceSpecifier;
    declare function tSParameterProperty(parameter: Identifier | AssignmentPattern, accessibility?: 'public' | 'private' | 'protected', readonly?: boolean): TSParameterProperty;
    declare function tSDeclareFunction(id?: ?Identifier, typeParameters?: ?TypeParameterDeclaration | Noop, params: any, returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop, async?: boolean, declare?: boolean, generator?: boolean): TSDeclareFunction;
    declare function tSDeclareMethod(decorators?: any, key: any, typeParameters?: ?TypeParameterDeclaration | Noop, params: any, returnType?: ?TypeAnnotation | TSTypeAnnotation | Noop, abstract?: boolean, access?: any, accessibility?: any, async?: boolean, computed?: boolean, generator?: boolean, kind?: any, optional?: boolean, _static?: boolean): TSDeclareMethod;
    declare function tSQualifiedName(left: TSEntityName, right: Identifier): TSQualifiedName;
    declare function tSCallSignatureDeclaration(typeParameters?: ?TypeParameterDeclaration, parameters?: any, typeAnnotation?: ?TSTypeAnnotation): TSCallSignatureDeclaration;
    declare function tSConstructSignatureDeclaration(typeParameters?: ?TypeParameterDeclaration, parameters?: any, typeAnnotation?: ?TSTypeAnnotation): TSConstructSignatureDeclaration;
    declare function tSPropertySignature(key: Expression, typeAnnotation?: ?TSTypeAnnotation, initializer?: ?Expression, computed?: boolean, optional?: boolean, readonly?: boolean): TSPropertySignature;
    declare function tSMethodSignature(key: Expression, typeParameters?: ?TypeParameterDeclaration, parameters?: any, typeAnnotation?: ?TSTypeAnnotation, computed?: boolean, optional?: boolean): TSMethodSignature;
    declare function tSIndexSignature(parameters: any, typeAnnotation?: ?TSTypeAnnotation, readonly?: boolean): TSIndexSignature;
    declare function tSAnyKeyword(): TSAnyKeyword;
    declare function tSNumberKeyword(): TSNumberKeyword;
    declare function tSObjectKeyword(): TSObjectKeyword;
    declare function tSBooleanKeyword(): TSBooleanKeyword;
    declare function tSStringKeyword(): TSStringKeyword;
    declare function tSSymbolKeyword(): TSSymbolKeyword;
    declare function tSVoidKeyword(): TSVoidKeyword;
    declare function tSUndefinedKeyword(): TSUndefinedKeyword;
    declare function tSNullKeyword(): TSNullKeyword;
    declare function tSNeverKeyword(): TSNeverKeyword;
    declare function tSThisType(): TSThisType;
    declare function tSFunctionType(typeParameters?: ?TypeParameterDeclaration, typeAnnotation?: ?TSTypeAnnotation, parameters?: any): TSFunctionType;
    declare function tSConstructorType(typeParameters?: ?TypeParameterDeclaration, typeAnnotation?: ?TSTypeAnnotation, parameters?: any): TSConstructorType;
    declare function tSTypeReference(typeName: TSEntityName, typeParameters?: ?TypeParameterInstantiation): TSTypeReference;
    declare function tSTypePredicate(parameterName: Identifier | TSThisType, typeAnnotation: TSTypeAnnotation): TSTypePredicate;
    declare function tSTypeQuery(exprName: TSEntityName): TSTypeQuery;
    declare function tSTypeLiteral(members: any): TSTypeLiteral;
    declare function tSArrayType(elementType: TSType): TSArrayType;
    declare function tSTupleType(elementTypes: any): TSTupleType;
    declare function tSUnionType(types: any): TSUnionType;
    declare function tSIntersectionType(types: any): TSIntersectionType;
    declare function tSParenthesizedType(typeAnnotation: TSType): TSParenthesizedType;
    declare function tSTypeOperator(typeAnnotation: TSType, operator?: string): TSTypeOperator;
    declare function tSIndexedAccessType(objectType: TSType, indexType: TSType): TSIndexedAccessType;
    declare function tSMappedType(typeParameter: TypeParameter, typeAnnotation?: ?TSType, optional?: boolean, readonly?: boolean): TSMappedType;
    declare function tSLiteralType(literal: NumericLiteral | StringLiteral | BooleanLiteral): TSLiteralType;
    declare function tSExpressionWithTypeArguments(expression: TSEntityName, typeParameters?: ?TypeParameterInstantiation): TSExpressionWithTypeArguments;
    declare function tSInterfaceDeclaration(id: Identifier, typeParameters?: ?TypeParameterDeclaration, _extends?: any, body: TSInterfaceBody, declare?: boolean): TSInterfaceDeclaration;
    declare function tSInterfaceBody(body: any): TSInterfaceBody;
    declare function tSTypeAliasDeclaration(id: Identifier, typeParameters?: ?TypeParameterDeclaration, typeAnnotation: TSType, declare?: boolean): TSTypeAliasDeclaration;
    declare function tSAsExpression(expression: Expression, typeAnnotation: TSType): TSAsExpression;
    declare function tSTypeAssertion(typeAnnotation: TSType, expression: Expression): TSTypeAssertion;
    declare function tSEnumDeclaration(id: Identifier, members: any, _const?: boolean, declare?: boolean, initializer?: ?Expression): TSEnumDeclaration;
    declare function tSEnumMember(id: Identifier | StringLiteral, initializer?: ?Expression): TSEnumMember;
    declare function tSModuleDeclaration(id: Identifier | StringLiteral, body: TSModuleBlock | TSModuleDeclaration, declare?: boolean, global?: boolean): TSModuleDeclaration;
    declare function tSModuleBlock(body: any): TSModuleBlock;
    declare function tSImportEqualsDeclaration(id: Identifier, moduleReference: TSEntityName | TSExternalModuleReference, isExport?: boolean): TSImportEqualsDeclaration;
    declare function tSExternalModuleReference(expression: StringLiteral): TSExternalModuleReference;
    declare function tSNonNullExpression(expression: Expression): TSNonNullExpression;
    declare function tSExportAssignment(expression: Expression): TSExportAssignment;
    declare function tSNamespaceExportDeclaration(id: Identifier): TSNamespaceExportDeclaration;
    declare function tSTypeAnnotation(typeAnnotation: TSType): TSTypeAnnotation;
    declare function tSTypeParameterInstantiation(params: any): TSTypeParameterInstantiation;
    declare function tSTypeParameterDeclaration(params: any): TSTypeParameterDeclaration;
    declare function tSTypeParameter(constraint?: ?TSType, _default?: ?TSType, name?: string): TSTypeParameter;
    declare function isArrayExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof ArrayExpression);
    declare function isAssignmentExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof AssignmentExpression);
    declare function isBinaryExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof BinaryExpression);
    declare function isDirective(node: Object, opts?: ?Object): boolean %checks (node instanceof Directive);
    declare function isDirectiveLiteral(node: Object, opts?: ?Object): boolean %checks (node instanceof DirectiveLiteral);
    declare function isBlockStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof BlockStatement);
    declare function isBreakStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof BreakStatement);
    declare function isCallExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof CallExpression);
    declare function isCatchClause(node: Object, opts?: ?Object): boolean %checks (node instanceof CatchClause);
    declare function isConditionalExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof ConditionalExpression);
    declare function isContinueStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof ContinueStatement);
    declare function isDebuggerStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof DebuggerStatement);
    declare function isDoWhileStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof DoWhileStatement);
    declare function isEmptyStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof EmptyStatement);
    declare function isExpressionStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof ExpressionStatement);
    declare function isFile(node: Object, opts?: ?Object): boolean %checks (node instanceof File);
    declare function isForInStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof ForInStatement);
    declare function isForStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof ForStatement);
    declare function isFunctionDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof FunctionDeclaration);
    declare function isFunctionExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof FunctionExpression);
    declare function isIdentifier(node: Object, opts?: ?Object): boolean %checks (node instanceof Identifier);
    declare function isIfStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof IfStatement);
    declare function isLabeledStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof LabeledStatement);
    declare function isStringLiteral(node: Object, opts?: ?Object): boolean %checks (node instanceof StringLiteral);
    declare function isNumericLiteral(node: Object, opts?: ?Object): boolean %checks (node instanceof NumericLiteral);
    declare function isNullLiteral(node: Object, opts?: ?Object): boolean %checks (node instanceof NullLiteral);
    declare function isBooleanLiteral(node: Object, opts?: ?Object): boolean %checks (node instanceof BooleanLiteral);
    declare function isRegExpLiteral(node: Object, opts?: ?Object): boolean %checks (node instanceof RegExpLiteral);
    declare function isLogicalExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof LogicalExpression);
    declare function isMemberExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof MemberExpression);
    declare function isNewExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof NewExpression);
    declare function isProgram(node: Object, opts?: ?Object): boolean %checks (node instanceof Program);
    declare function isObjectExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectExpression);
    declare function isObjectMethod(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectMethod);
    declare function isObjectProperty(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectProperty);
    declare function isRestElement(node: Object, opts?: ?Object): boolean %checks (node instanceof RestElement);
    declare function isReturnStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof ReturnStatement);
    declare function isSequenceExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof SequenceExpression);
    declare function isSwitchCase(node: Object, opts?: ?Object): boolean %checks (node instanceof SwitchCase);
    declare function isSwitchStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof SwitchStatement);
    declare function isThisExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof ThisExpression);
    declare function isThrowStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof ThrowStatement);
    declare function isTryStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof TryStatement);
    declare function isUnaryExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof UnaryExpression);
    declare function isUpdateExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof UpdateExpression);
    declare function isVariableDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof VariableDeclaration);
    declare function isVariableDeclarator(node: Object, opts?: ?Object): boolean %checks (node instanceof VariableDeclarator);
    declare function isWhileStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof WhileStatement);
    declare function isWithStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof WithStatement);
    declare function isAssignmentPattern(node: Object, opts?: ?Object): boolean %checks (node instanceof AssignmentPattern);
    declare function isArrayPattern(node: Object, opts?: ?Object): boolean %checks (node instanceof ArrayPattern);
    declare function isArrowFunctionExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof ArrowFunctionExpression);
    declare function isClassBody(node: Object, opts?: ?Object): boolean %checks (node instanceof ClassBody);
    declare function isClassDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof ClassDeclaration);
    declare function isClassExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof ClassExpression);
    declare function isExportAllDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof ExportAllDeclaration);
    declare function isExportDefaultDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof ExportDefaultDeclaration);
    declare function isExportNamedDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof ExportNamedDeclaration);
    declare function isExportSpecifier(node: Object, opts?: ?Object): boolean %checks (node instanceof ExportSpecifier);
    declare function isForOfStatement(node: Object, opts?: ?Object): boolean %checks (node instanceof ForOfStatement);
    declare function isImportDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof ImportDeclaration);
    declare function isImportDefaultSpecifier(node: Object, opts?: ?Object): boolean %checks (node instanceof ImportDefaultSpecifier);
    declare function isImportNamespaceSpecifier(node: Object, opts?: ?Object): boolean %checks (node instanceof ImportNamespaceSpecifier);
    declare function isImportSpecifier(node: Object, opts?: ?Object): boolean %checks (node instanceof ImportSpecifier);
    declare function isMetaProperty(node: Object, opts?: ?Object): boolean %checks (node instanceof MetaProperty);
    declare function isClassMethod(node: Object, opts?: ?Object): boolean %checks (node instanceof ClassMethod);
    declare function isObjectPattern(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectPattern);
    declare function isSpreadElement(node: Object, opts?: ?Object): boolean %checks (node instanceof SpreadElement);
    declare function isSuper(node: Object, opts?: ?Object): boolean %checks (node instanceof Super);
    declare function isTaggedTemplateExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof TaggedTemplateExpression);
    declare function isTemplateElement(node: Object, opts?: ?Object): boolean %checks (node instanceof TemplateElement);
    declare function isTemplateLiteral(node: Object, opts?: ?Object): boolean %checks (node instanceof TemplateLiteral);
    declare function isYieldExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof YieldExpression);
    declare function isAnyTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof AnyTypeAnnotation);
    declare function isArrayTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof ArrayTypeAnnotation);
    declare function isBooleanTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof BooleanTypeAnnotation);
    declare function isBooleanLiteralTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof BooleanLiteralTypeAnnotation);
    declare function isNullLiteralTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof NullLiteralTypeAnnotation);
    declare function isClassImplements(node: Object, opts?: ?Object): boolean %checks (node instanceof ClassImplements);
    declare function isDeclareClass(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareClass);
    declare function isDeclareFunction(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareFunction);
    declare function isDeclareInterface(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareInterface);
    declare function isDeclareModule(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareModule);
    declare function isDeclareModuleExports(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareModuleExports);
    declare function isDeclareTypeAlias(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareTypeAlias);
    declare function isDeclareOpaqueType(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareOpaqueType);
    declare function isDeclareVariable(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareVariable);
    declare function isDeclareExportDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareExportDeclaration);
    declare function isDeclareExportAllDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclareExportAllDeclaration);
    declare function isDeclaredPredicate(node: Object, opts?: ?Object): boolean %checks (node instanceof DeclaredPredicate);
    declare function isExistsTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof ExistsTypeAnnotation);
    declare function isFunctionTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof FunctionTypeAnnotation);
    declare function isFunctionTypeParam(node: Object, opts?: ?Object): boolean %checks (node instanceof FunctionTypeParam);
    declare function isGenericTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof GenericTypeAnnotation);
    declare function isInferredPredicate(node: Object, opts?: ?Object): boolean %checks (node instanceof InferredPredicate);
    declare function isInterfaceExtends(node: Object, opts?: ?Object): boolean %checks (node instanceof InterfaceExtends);
    declare function isInterfaceDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof InterfaceDeclaration);
    declare function isIntersectionTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof IntersectionTypeAnnotation);
    declare function isMixedTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof MixedTypeAnnotation);
    declare function isEmptyTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof EmptyTypeAnnotation);
    declare function isNullableTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof NullableTypeAnnotation);
    declare function isNumberLiteralTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof NumberLiteralTypeAnnotation);
    declare function isNumberTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof NumberTypeAnnotation);
    declare function isObjectTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectTypeAnnotation);
    declare function isObjectTypeCallProperty(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectTypeCallProperty);
    declare function isObjectTypeIndexer(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectTypeIndexer);
    declare function isObjectTypeProperty(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectTypeProperty);
    declare function isObjectTypeSpreadProperty(node: Object, opts?: ?Object): boolean %checks (node instanceof ObjectTypeSpreadProperty);
    declare function isOpaqueType(node: Object, opts?: ?Object): boolean %checks (node instanceof OpaqueType);
    declare function isQualifiedTypeIdentifier(node: Object, opts?: ?Object): boolean %checks (node instanceof QualifiedTypeIdentifier);
    declare function isStringLiteralTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof StringLiteralTypeAnnotation);
    declare function isStringTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof StringTypeAnnotation);
    declare function isThisTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof ThisTypeAnnotation);
    declare function isTupleTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof TupleTypeAnnotation);
    declare function isTypeofTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof TypeofTypeAnnotation);
    declare function isTypeAlias(node: Object, opts?: ?Object): boolean %checks (node instanceof TypeAlias);
    declare function isTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof TypeAnnotation);
    declare function isTypeCastExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof TypeCastExpression);
    declare function isTypeParameter(node: Object, opts?: ?Object): boolean %checks (node instanceof TypeParameter);
    declare function isTypeParameterDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TypeParameterDeclaration);
    declare function isTypeParameterInstantiation(node: Object, opts?: ?Object): boolean %checks (node instanceof TypeParameterInstantiation);
    declare function isUnionTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof UnionTypeAnnotation);
    declare function isVoidTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof VoidTypeAnnotation);
    declare function isJSXAttribute(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXAttribute);
    declare function isJSXClosingElement(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXClosingElement);
    declare function isJSXElement(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXElement);
    declare function isJSXEmptyExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXEmptyExpression);
    declare function isJSXExpressionContainer(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXExpressionContainer);
    declare function isJSXSpreadChild(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXSpreadChild);
    declare function isJSXIdentifier(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXIdentifier);
    declare function isJSXMemberExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXMemberExpression);
    declare function isJSXNamespacedName(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXNamespacedName);
    declare function isJSXOpeningElement(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXOpeningElement);
    declare function isJSXSpreadAttribute(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXSpreadAttribute);
    declare function isJSXText(node: Object, opts?: ?Object): boolean %checks (node instanceof JSXText);
    declare function isNoop(node: Object, opts?: ?Object): boolean %checks (node instanceof Noop);
    declare function isParenthesizedExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof ParenthesizedExpression);
    declare function isAwaitExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof AwaitExpression);
    declare function isBindExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof BindExpression);
    declare function isClassProperty(node: Object, opts?: ?Object): boolean %checks (node instanceof ClassProperty);
    declare function isImport(node: Object, opts?: ?Object): boolean %checks (node instanceof Import);
    declare function isDecorator(node: Object, opts?: ?Object): boolean %checks (node instanceof Decorator);
    declare function isDoExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof DoExpression);
    declare function isExportDefaultSpecifier(node: Object, opts?: ?Object): boolean %checks (node instanceof ExportDefaultSpecifier);
    declare function isExportNamespaceSpecifier(node: Object, opts?: ?Object): boolean %checks (node instanceof ExportNamespaceSpecifier);
    declare function isTSParameterProperty(node: Object, opts?: ?Object): boolean %checks (node instanceof TSParameterProperty);
    declare function isTSDeclareFunction(node: Object, opts?: ?Object): boolean %checks (node instanceof TSDeclareFunction);
    declare function isTSDeclareMethod(node: Object, opts?: ?Object): boolean %checks (node instanceof TSDeclareMethod);
    declare function isTSQualifiedName(node: Object, opts?: ?Object): boolean %checks (node instanceof TSQualifiedName);
    declare function isTSCallSignatureDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSCallSignatureDeclaration);
    declare function isTSConstructSignatureDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSConstructSignatureDeclaration);
    declare function isTSPropertySignature(node: Object, opts?: ?Object): boolean %checks (node instanceof TSPropertySignature);
    declare function isTSMethodSignature(node: Object, opts?: ?Object): boolean %checks (node instanceof TSMethodSignature);
    declare function isTSIndexSignature(node: Object, opts?: ?Object): boolean %checks (node instanceof TSIndexSignature);
    declare function isTSAnyKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSAnyKeyword);
    declare function isTSNumberKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSNumberKeyword);
    declare function isTSObjectKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSObjectKeyword);
    declare function isTSBooleanKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSBooleanKeyword);
    declare function isTSStringKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSStringKeyword);
    declare function isTSSymbolKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSSymbolKeyword);
    declare function isTSVoidKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSVoidKeyword);
    declare function isTSUndefinedKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSUndefinedKeyword);
    declare function isTSNullKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSNullKeyword);
    declare function isTSNeverKeyword(node: Object, opts?: ?Object): boolean %checks (node instanceof TSNeverKeyword);
    declare function isTSThisType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSThisType);
    declare function isTSFunctionType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSFunctionType);
    declare function isTSConstructorType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSConstructorType);
    declare function isTSTypeReference(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeReference);
    declare function isTSTypePredicate(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypePredicate);
    declare function isTSTypeQuery(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeQuery);
    declare function isTSTypeLiteral(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeLiteral);
    declare function isTSArrayType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSArrayType);
    declare function isTSTupleType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTupleType);
    declare function isTSUnionType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSUnionType);
    declare function isTSIntersectionType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSIntersectionType);
    declare function isTSParenthesizedType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSParenthesizedType);
    declare function isTSTypeOperator(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeOperator);
    declare function isTSIndexedAccessType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSIndexedAccessType);
    declare function isTSMappedType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSMappedType);
    declare function isTSLiteralType(node: Object, opts?: ?Object): boolean %checks (node instanceof TSLiteralType);
    declare function isTSExpressionWithTypeArguments(node: Object, opts?: ?Object): boolean %checks (node instanceof TSExpressionWithTypeArguments);
    declare function isTSInterfaceDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSInterfaceDeclaration);
    declare function isTSInterfaceBody(node: Object, opts?: ?Object): boolean %checks (node instanceof TSInterfaceBody);
    declare function isTSTypeAliasDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeAliasDeclaration);
    declare function isTSAsExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof TSAsExpression);
    declare function isTSTypeAssertion(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeAssertion);
    declare function isTSEnumDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSEnumDeclaration);
    declare function isTSEnumMember(node: Object, opts?: ?Object): boolean %checks (node instanceof TSEnumMember);
    declare function isTSModuleDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSModuleDeclaration);
    declare function isTSModuleBlock(node: Object, opts?: ?Object): boolean %checks (node instanceof TSModuleBlock);
    declare function isTSImportEqualsDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSImportEqualsDeclaration);
    declare function isTSExternalModuleReference(node: Object, opts?: ?Object): boolean %checks (node instanceof TSExternalModuleReference);
    declare function isTSNonNullExpression(node: Object, opts?: ?Object): boolean %checks (node instanceof TSNonNullExpression);
    declare function isTSExportAssignment(node: Object, opts?: ?Object): boolean %checks (node instanceof TSExportAssignment);
    declare function isTSNamespaceExportDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSNamespaceExportDeclaration);
    declare function isTSTypeAnnotation(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeAnnotation);
    declare function isTSTypeParameterInstantiation(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeParameterInstantiation);
    declare function isTSTypeParameterDeclaration(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeParameterDeclaration);
    declare function isTSTypeParameter(node: Object, opts?: ?Object): boolean %checks (node instanceof TSTypeParameter);
    declare function isExpression(node: Object, opts?: ?Object): boolean;
    declare function isBinary(node: Object, opts?: ?Object): boolean;
    declare function isScopable(node: Object, opts?: ?Object): boolean;
    declare function isBlockParent(node: Object, opts?: ?Object): boolean;
    declare function isBlock(node: Object, opts?: ?Object): boolean;
    declare function isStatement(node: Object, opts?: ?Object): boolean;
    declare function isTerminatorless(node: Object, opts?: ?Object): boolean;
    declare function isCompletionStatement(node: Object, opts?: ?Object): boolean;
    declare function isConditional(node: Object, opts?: ?Object): boolean;
    declare function isLoop(node: Object, opts?: ?Object): boolean;
    declare function isWhile(node: Object, opts?: ?Object): boolean;
    declare function isExpressionWrapper(node: Object, opts?: ?Object): boolean;
    declare function isFor(node: Object, opts?: ?Object): boolean;
    declare function isForXStatement(node: Object, opts?: ?Object): boolean;
    declare function isFunction(node: Object, opts?: ?Object): boolean;
    declare function isFunctionParent(node: Object, opts?: ?Object): boolean;
    declare function isPureish(node: Object, opts?: ?Object): boolean;
    declare function isDeclaration(node: Object, opts?: ?Object): boolean;
    declare function isPatternLike(node: Object, opts?: ?Object): boolean;
    declare function isLVal(node: Object, opts?: ?Object): boolean;
    declare function isTSEntityName(node: Object, opts?: ?Object): boolean;
    declare function isLiteral(node: Object, opts?: ?Object): boolean;
    declare function isImmutable(node: Object, opts?: ?Object): boolean;
    declare function isUserWhitespacable(node: Object, opts?: ?Object): boolean;
    declare function isMethod(node: Object, opts?: ?Object): boolean;
    declare function isObjectMember(node: Object, opts?: ?Object): boolean;
    declare function isProperty(node: Object, opts?: ?Object): boolean;
    declare function isUnaryLike(node: Object, opts?: ?Object): boolean;
    declare function isPattern(node: Object, opts?: ?Object): boolean;
    declare function isClass(node: Object, opts?: ?Object): boolean;
    declare function isModuleDeclaration(node: Object, opts?: ?Object): boolean;
    declare function isExportDeclaration(node: Object, opts?: ?Object): boolean;
    declare function isModuleSpecifier(node: Object, opts?: ?Object): boolean;
    declare function isFlow(node: Object, opts?: ?Object): boolean;
    declare function isFlowBaseAnnotation(node: Object, opts?: ?Object): boolean;
    declare function isFlowDeclaration(node: Object, opts?: ?Object): boolean;
    declare function isFlowPredicate(node: Object, opts?: ?Object): boolean;
    declare function isJSX(node: Object, opts?: ?Object): boolean;
    declare function isTSTypeElement(node: Object, opts?: ?Object): boolean;
    declare function isTSType(node: Object, opts?: ?Object): boolean;
    declare function isNumberLiteral(node: Object, opts?: ?Object): boolean;
    declare function isRegexLiteral(node: Object, opts?: ?Object): boolean;
    declare function validate(n: Node, key: string, value: mixed): void;
    declare function clone<T>(n: T): T;
    declare function cloneDeep<T>(n: T): T;
    declare function removeProperties<T>(n: T, opts: ?{}): void;
    declare function removePropertiesDeep<T>(n: T, opts: ?{}): T;
    declare type TraversalAncestors = Array<{
        node: Node,
        key: string,
        index?: number,
    }>;
    declare type TraversalHandler<T> = (Node, TraversalAncestors, T) => void;
    declare type TraversalHandlers<T> = {
        enter?: TraversalHandler<T>,
        exit?: TraversalHandler<T>,
    };

    declare function traverse<T>(n: Node, TraversalHandler<T> | TraversalHandlers<T>, state?: T): void;
    declare function traverseFast(n: Node, enter: (Node) => void, opts?: Object): void;

    declare var VISITOR_KEYS: {[string]: string[]};
}
