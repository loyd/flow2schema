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

    declare class CommentBlock extends Comment {
        type: "CommentBlock";
    }

    declare class CommentLine extends Comment {
        type: "CommentLine";
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
        +type: string;
        leadingComments?: Comment[];
        innerComments?: Comment[];
        trailingComments?: Comment[];
        start: number;
        end: number;
        loc: SourceLocation;
    }

    declare class ArrayExpression extends Node {
        type: "ArrayExpression";
        elements: Array<Expression | SpreadElement>;
    }

    declare class AssignmentExpression extends Node {
        type: "AssignmentExpression";
        operator: "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=";
        left: LVal;
        right: Expression;
    }

    declare class BinaryExpression extends Node {
        type: "BinaryExpression";
        operator: "+" | "-" | "/" | "%" | "*" | "**" | "&" | "|" | ">>" | ">>>" | "<<" | "^" | "==" | "===" | "!=" | "!==" | "in" | "instanceof" | ">" | "<" | ">=" | "<=";
        left: Expression;
        right: Expression;
    }

    declare class Directive extends Node {
        type: "Directive";
        value: DirectiveLiteral;
    }

    declare class DirectiveLiteral extends Node {
        type: "DirectiveLiteral";
        value: string;
    }

    declare class BlockStatement extends Node {
        type: "BlockStatement";
        directives?: Directive[];
        body: Statement[];
    }

    declare class BreakStatement extends Node {
        type: "BreakStatement";
        label: Identifier;
    }

    declare class CallExpression extends Node {
        type: "CallExpression";
        callee: Expression | Super;
        arguments: Array<Expression | SpreadElement>;
    }

    declare class CatchClause extends Node {
        type: "CatchClause";
        param: Identifier;
        body: BlockStatement;
    }

    declare class ConditionalExpression extends Node {
        type: "ConditionalExpression";
        test: Expression;
        consequent: Expression;
        alternate: Expression;
    }

    declare class ContinueStatement extends Node {
        type: "ContinueStatement";
        label: Identifier;
    }

    declare class DebuggerStatement extends Node {
        type: "DebuggerStatement";
    }

    declare class DoWhileStatement extends Node {
        type: "DoWhileStatement";
        test: Expression;
        body: Statement;
    }

    declare class EmptyStatement extends Node {
        type: "EmptyStatement";
    }

    declare class ExpressionStatement extends Node {
        type: "ExpressionStatement";
        expression: Expression;
    }

    declare class File extends Node {
        type: "File";
        program: Program;
        comments: Comment[];
        tokens: any[];
    }

    declare class ForInStatement extends Node {
        type: "ForInStatement";
        left: VariableDeclaration | LVal;
        right: Expression;
        body: Statement;
    }

    declare class ForStatement extends Node {
        type: "ForStatement";
        init: VariableDeclaration | Expression;
        test: Expression;
        update: Expression;
        body: Statement;
    }

    declare class FunctionDeclaration extends Node {
        type: "FunctionDeclaration";
        id: Identifier;
        params: LVal[];
        body: BlockStatement;
        generator: boolean;
        async: boolean;
        returnType?: TypeAnnotation;
        typeParameters?: TypeParameterDeclaration;
    }

    declare class FunctionExpression extends Node {
        type: "FunctionExpression";
        id: Identifier;
        params: LVal[];
        body: BlockStatement;
        generator: boolean;
        async: boolean;
        returnType?: TypeAnnotation;
        typeParameters?: TypeParameterDeclaration;
    }

    declare class Identifier extends Node {
        type: "Identifier";
        name: string;
        typeAnnotation?: TypeAnnotation;
    }

    declare class IfStatement extends Node {
        type: "IfStatement";
        test: Expression;
        consequent: Statement;
        alternate: Statement;
    }

    declare class LabeledStatement extends Node {
        type: "LabeledStatement";
        label: Identifier;
        body: Statement;
    }

    declare class StringLiteral extends Node {
        type: "StringLiteral";
        value: string;
    }

    declare class NumericLiteral extends Node {
        type: "NumericLiteral";
        value: number;
    }

    declare class NullLiteral extends Node {
        type: "NullLiteral";
    }

    declare class BooleanLiteral extends Node {
        type: "BooleanLiteral";
        value: boolean;
    }

    declare class RegExpLiteral extends Node {
        type: "RegExpLiteral";
        pattern: string;
        flags?: string;
    }

    declare class LogicalExpression extends Node {
        type: "LogicalExpression";
        operator: "||" | "&&";
        left: Expression;
        right: Expression;
    }

    declare class MemberExpression extends Node {
        type: "MemberExpression";
        Object: Expression | Super;
        property: Expression;
        computed: boolean;
    }

    declare class NewExpression extends Node {
        type: "NewExpression";
        callee: Expression | Super;
        arguments: Array<Expression | SpreadElement>;
    }

    declare class Program extends Node {
        type: "Program";
        sourceType: "script" | "module";
        directives?: Directive[];
        body: Array<Statement | ModuleDeclaration>;
    }

    declare class ObjectExpression extends Node {
        type: "ObjectExpression";
        properties: Array<ObjectProperty | ObjectMethod | SpreadProperty>;
    }

    declare class ObjectMethod extends Node {
        type: "ObjectMethod";
        key: Expression;
        kind: "get" | "set" | "method";
        shorthand: boolean;
        computed: boolean;
        value: Expression;
        decorators?: Decorator[];
        id: Identifier;
        params: LVal[];
        body: BlockStatement;
        generator: boolean;
        async: boolean;
        returnType?: TypeAnnotation;
        typeParameters?: TypeParameterDeclaration;
    }

    declare class ObjectProperty extends Node {
        type: "ObjectProperty";
        key: Expression;
        computed: boolean;
        value: Expression;
        decorators?: Decorator[];
        shorthand: boolean;
    }

    declare class RestElement extends Node {
        type: "RestElement";
        argument: LVal;
        typeAnnotation?: TypeAnnotation;
    }

    declare class ReturnStatement extends Node {
        type: "ReturnStatement";
        argument: Expression;
    }

    declare class SequenceExpression extends Node {
        type: "SequenceExpression";
        expressions: Expression[];
    }

    declare class SwitchCase extends Node {
        type: "SwitchCase";
        test: Expression;
        consequent: Statement[];
    }

    declare class SwitchStatement extends Node {
        type: "SwitchStatement";
        discriminant: Expression;
        cases: SwitchCase[];
    }

    declare class ThisExpression extends Node {
        type: "ThisExpression";
    }

    declare class ThrowStatement extends Node {
        type: "ThrowStatement";
        argument: Expression;
    }

    declare class TryStatement extends Node {
        type: "TryStatement";
        block: BlockStatement;
        handler: CatchClause;
        finalizer: BlockStatement;
    }

    declare class UnaryExpression extends Node {
        type: "UnaryExpression";
        operator: "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";
        prefix: boolean;
        argument: Expression;
    }

    declare class UpdateExpression extends Node {
        type: "UpdateExpression";
        operator: "++" | "--";
        prefix: boolean;
        argument: Expression;
    }

    declare class VariableDeclaration extends Node {
        type: "VariableDeclaration";
        declarations: VariableDeclarator[];
        kind: "var" | "let" | "const";
    }

    declare class VariableDeclarator extends Node {
        type: "VariableDeclarator";
        id: LVal;
        init: Expression;
    }

    declare class WhileStatement extends Node {
        type: "WhileStatement";
        test: Expression;
        body: Statement;
    }

    declare class WithStatement extends Node {
        type: "WithStatement";
        Object: Expression;
        body: BlockStatement | Statement;
    }

    declare class AssignmentPattern extends Node {
        type: "AssignmentPattern";
        left: Identifier;
        right: Expression;
    }

    declare class ArrayPattern extends Node {
        type: "ArrayPattern";
        elements: Expression[];
        typeAnnotation?: TypeAnnotation;
    }

    declare class ArrowFunctionExpression extends Node {
        type: "ArrowFunctionExpression";
        id: Identifier;
        params: LVal[];
        body: BlockStatement | Expression;
        generator: boolean;
        async: boolean;
        expression: boolean;
        returnType?: TypeAnnotation;
        typeParameters?: TypeParameterDeclaration;
    }

    declare class ClassBody extends Node {
        type: "ClassBody";
        body: Array<ClassMethod | ClassProperty>;
    }

    declare class ClassDeclaration extends Node {
        type: "ClassDeclaration";
        id: Identifier;
        superClass: Expression;
        body: ClassBody;
        decorators?: Decorator[];
        implements?: ClassImplements[];
        mixins?: any[];
        typeParameters?: TypeParameterDeclaration;
        superTypeParameters?: TypeParameterInstantiation;
    }

    declare class ClassExpression extends Node {
        type: "ClassExpression";
        id: Identifier;
        superClass: Expression;
        body: ClassBody;
        decorators?: Decorator[];
        implements?: ClassImplements[];
        mixins?: any[];
        typeParameters?: TypeParameterDeclaration;
        superTypeParameters?: TypeParameterInstantiation;
    }

    declare class ExportAllDeclaration extends Node {
        type: "ExportAllDeclaration";
        source: StringLiteral;
    }

    declare class ExportDefaultDeclaration extends Node {
        type: "ExportDefaultDeclaration";
        declaration: Declaration | Expression;
    }

    declare class ExportNamedDeclaration extends Node {
        type: "ExportNamedDeclaration";
        declaration: Declaration;
        specifiers: ExportSpecifier[];
        source: StringLiteral;
    }

    declare class ExportSpecifier extends Node {
        type: "ExportSpecifier";
        local: Identifier;
        imported: Identifier;
        exported: Identifier;
    }

    declare class ForOfStatement extends Node {
        type: "ForOfStatement";
        left: VariableDeclaration | LVal;
        right: Expression;
        body: Statement;
    }

    declare class ImportDeclaration extends Node {
        type: "ImportDeclaration";
        specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
        source: StringLiteral;
    }

    declare class ImportDefaultSpecifier extends Node {
        type: "ImportDefaultSpecifier";
        local: Identifier;
    }

    declare class ImportNamespaceSpecifier extends Node {
        type: "ImportNamespaceSpecifier";
        local: Identifier;
    }

    declare class ImportSpecifier extends Node {
        type: "ImportSpecifier";
        local: Identifier;
        imported: Identifier;
    }

    declare class MetaProperty extends Node {
        type: "MetaProperty";
        meta: Identifier;
        property: Identifier;
    }

    declare class ClassMethod extends Node {
        type: "ClassMethod";
        key: Expression;
        value?: FunctionExpression;
        kind: "constructor" | "method" | "get" | "set";
        computed: boolean;
        //static: boolean;
        decorators?: Decorator[];
        id: Identifier;
        params: LVal[];
        body: BlockStatement;
        generator: boolean;
        async: boolean;
        expression: boolean;
        returnType?: TypeAnnotation;
        typeParameters?: TypeParameterDeclaration;
    }

    // See: https://github.com/babel/babel/blob/master/doc/ast/spec.md#objectpattern
    declare class AssignmentProperty extends Node {
        type: "ObjectProperty";
        key: Expression;
        computed: boolean;
        value: Pattern;
        decorators?: Decorator[];
        shorthand: boolean;
    }

    declare class ObjectPattern extends Node {
        type: "ObjectPattern";
        properties: Array<AssignmentProperty | RestProperty>;
        typeAnnotation?: TypeAnnotation;
    }

    declare class SpreadElement extends Node {
        type: "SpreadElement";
        argument: Expression;
    }

    declare class Super extends Node {
        type: "Super";
    }

    declare class TaggedTemplateExpression extends Node {
        type: "TaggedTemplateExpression";
        tag: Expression;
        quasi: TemplateLiteral;
    }

    declare class TemplateElement extends Node {
        type: "TemplateElement";
        tail: boolean;
        value: {
            cooked: string;
            raw: string;
        };
    }

    declare class TemplateLiteral extends Node {
        type: "TemplateLiteral";
        quasis: TemplateElement[];
        expressions: Expression[];
    }

    declare class YieldExpression extends Node {
        type: "YieldExpression";
        argument: Expression;
        delegate: boolean;
    }

    declare class AnyTypeAnnotation extends Node {
        type: "AnyTypeAnnotation";
    }

    declare class ArrayTypeAnnotation extends Node {
        type: "ArrayTypeAnnotation";
        elementType: FlowTypeAnnotation;
    }

    declare class BooleanTypeAnnotation extends Node {
        type: "BooleanTypeAnnotation";
    }

    declare class BooleanLiteralTypeAnnotation extends Node {
        type: "BooleanLiteralTypeAnnotation";
    }

    declare class NullLiteralTypeAnnotation extends Node {
        type: "NullLiteralTypeAnnotation";
    }

    declare class ClassImplements extends Node {
        type: "ClassImplements";
        id: Identifier;
        typeParameters: TypeParameterInstantiation;
    }

    declare class ClassProperty extends Node {
        type: "ClassProperty";
        key: Identifier;
        value: Expression;
        decorators?: Decorator[];
        typeAnnotation?: TypeAnnotation;
    }

    declare class DeclareClass extends Node {
        type: "DeclareClass";
        id: Identifier;
        typeParameters: TypeParameterDeclaration;
        extends: InterfaceExtends[];
        body: ObjectTypeAnnotation;
    }

    declare class DeclareFunction extends Node {
        type: "DeclareFunction";
        id: Identifier;
    }

    declare class DeclareInterface extends Node {
        type: "DeclareInterface";
        id: Identifier;
        typeParameters: TypeParameterDeclaration;
        extends: InterfaceExtends[];
        body: ObjectTypeAnnotation;
    }

    declare class DeclareModule extends Node {
        type: "DeclareModule";
        id: StringLiteral | Identifier;
        body: BlockStatement;
    }

    declare class DeclareTypeAlias extends Node {
        type: "DeclareTypeAlias";
        id: Identifier;
        typeParameters: TypeParameterDeclaration;
        right: FlowTypeAnnotation;
    }

    declare class DeclareVariable extends Node {
        type: "DeclareVariable";
        id: Identifier;
    }

    declare class ExistentialTypeParam extends Node {
        type: "ExistentialTypeParam";
    }

    declare class FunctionTypeAnnotation extends Node {
        type: "FunctionTypeAnnotation";
        typeParameters: TypeParameterDeclaration;
        params: FunctionTypeParam[];
        rest: FunctionTypeParam;
        returnType: FlowTypeAnnotation;
    }

    declare class FunctionTypeParam extends Node {
        type: "FunctionTypeParam";
        name: Identifier;
        typeAnnotation: FlowTypeAnnotation;
    }

    declare class GenericTypeAnnotation extends Node {
        type: "GenericTypeAnnotation";
        id: Identifier;
        typeParameters: TypeParameterInstantiation;
    }

    declare class InterfaceExtends extends Node {
        type: "InterfaceExtends";
        id: Identifier;
        typeParameters: TypeParameterInstantiation;
    }

    declare class InterfaceDeclaration extends Node {
        type: "InterfaceDeclaration";
        id: Identifier;
        typeParameters: TypeParameterDeclaration;
        extends: InterfaceExtends[];
        mixins?: any[];
        body: ObjectTypeAnnotation;
    }

    declare class IntersectionTypeAnnotation extends Node {
        type: "IntersectionTypeAnnotation";
        types: FlowTypeAnnotation[];
    }

    declare class MixedTypeAnnotation extends Node {
        type: "MixedTypeAnnotation";
    }

    declare class NullableTypeAnnotation extends Node {
        type: "NullableTypeAnnotation";
        typeAnnotation: FlowTypeAnnotation;
    }

    declare class NumericLiteralTypeAnnotation extends Node {
        type: "NumericLiteralTypeAnnotation";
    }

    declare class NumberTypeAnnotation extends Node {
        type: "NumberTypeAnnotation";
    }

    declare class StringLiteralTypeAnnotation extends Node {
        type: "StringLiteralTypeAnnotation";
    }

    declare class StringTypeAnnotation extends Node {
        type: "StringTypeAnnotation";
    }

    declare class ThisTypeAnnotation extends Node {
        type: "ThisTypeAnnotation";
    }

    declare class TupleTypeAnnotation extends Node {
        type: "TupleTypeAnnotation";
        types: FlowTypeAnnotation[];
    }

    declare class TypeofTypeAnnotation extends Node {
        type: "TypeofTypeAnnotation";
        argument: FlowTypeAnnotation;
    }

    declare class TypeAlias extends Node {
        type: "TypeAlias";
        id: Identifier;
        typeParameters: TypeParameterDeclaration;
        right: FlowTypeAnnotation;
    }

    declare class TypeAnnotation extends Node {
        type: "TypeAnnotation";
        typeAnnotation: FlowTypeAnnotation;
    }

    declare class TypeCastExpression extends Node {
        type: "TypeCastExpression";
        expression: Expression;
        typeAnnotation: FlowTypeAnnotation;
    }

    declare class TypeParameterDeclaration extends Node {
        type: "TypeParameterDeclaration";
        params: Identifier[];
    }

    declare class TypeParameterInstantiation extends Node {
        type: "TypeParameterInstantiation";
        params: FlowTypeAnnotation[];
    }

    declare class ObjectTypeAnnotation extends Node {
        type: "ObjectTypeAnnotation";
        properties: ObjectTypeProperty[];
        indexers: ObjectTypeIndexer[];
        callProperties: ObjectTypeCallProperty[];
    }

    declare class ObjectTypeCallProperty extends Node {
        type: "ObjectTypeCallProperty";
        value: FlowTypeAnnotation;
    }

    declare class ObjectTypeIndexer extends Node {
        type: "ObjectTypeIndexer";
        id: Expression;
        key: FlowTypeAnnotation;
        value: FlowTypeAnnotation;
    }

    declare class ObjectTypeProperty extends Node {
        type: "ObjectTypeProperty";
        key: Expression;
        value: FlowTypeAnnotation;
    }

    declare class QualifiedTypeIdentifier extends Node {
        type: "QualifiedTypeIdentifier";
        id: Identifier;
        qualification: Identifier | QualifiedTypeIdentifier;
    }

    declare class UnionTypeAnnotation extends Node {
        type: "UnionTypeAnnotation";
        types: FlowTypeAnnotation[];
    }

    declare class VoidTypeAnnotation extends Node {
        type: "VoidTypeAnnotation";
    }

    declare class JSXAttribute extends Node {
        type: "JSXAttribute";
        name: JSXIdentifier | JSXNamespacedName;
        value: JSXElement | StringLiteral | JSXExpressionContainer;
    }

    declare class JSXClosingElement extends Node {
        type: "JSXClosingElement";
        name: JSXIdentifier | JSXMemberExpression;
    }

    declare class JSXElement extends Node {
        type: "JSXElement";
        openingElement: JSXOpeningElement;
        closingElement: JSXClosingElement;
        children: Array<JSXElement | JSXExpressionContainer | JSXText>;
        selfClosing?: boolean;
    }

    declare class JSXEmptyExpression extends Node {
        type: "JSXEmptyExpression";
    }

    declare class JSXExpressionContainer extends Node {
        type: "JSXExpressionContainer";
        expression: Expression;
    }

    declare class JSXIdentifier extends Node {
        type: "JSXIdentifier";
        name: string;
    }

    declare class JSXMemberExpression extends Node {
        type: "JSXMemberExpression";
        Object: JSXMemberExpression | JSXIdentifier;
        property: JSXIdentifier;
    }

    declare class JSXNamespacedName extends Node {
        type: "JSXNamespacedName";
        namespace: JSXIdentifier;
        name: JSXIdentifier;
    }

    declare class JSXOpeningElement extends Node {
        type: "JSXOpeningElement";
        name: JSXIdentifier | JSXMemberExpression;
        selfClosing: boolean;
        attributes: JSXAttribute[];
    }

    declare class JSXSpreadAttribute extends Node {
        type: "JSXSpreadAttribute";
        argument: Expression;
    }

    declare class JSXText extends Node {
        type: "JSXText";
        value: string;
    }

    declare class Noop extends Node {
        type: "Noop";
    }

    declare class ParenthesizedExpression extends Node {
        type: "ParenthesizedExpression";
        expression: Expression;
    }

    declare class AwaitExpression extends Node {
        type: "AwaitExpression";
        argument: Expression;
    }

    declare class BindExpression extends Node {
        type: "BindExpression";
        Object: Expression;
        callee: Expression;
    }

    declare class Decorator extends Node {
        type: "Decorator";
        expression: Expression;
    }

    declare class DoExpression extends Node {
        type: "DoExpression";
        body: BlockStatement;
    }

    declare class ExportDefaultSpecifier extends Node {
        type: "ExportDefaultSpecifier";
        exported: Identifier;
    }

    declare class ExportNamespaceSpecifier extends Node {
        type: "ExportNamespaceSpecifier";
        exported: Identifier;
    }

    declare class RestProperty extends Node {
        type: "RestProperty";
        argument: LVal;
    }

    declare class SpreadProperty extends Node {
        type: "SpreadProperty";
        argument: Expression;
    }

    declare type Expression = ArrayExpression | AssignmentExpression | BinaryExpression | CallExpression
        | ConditionalExpression | FunctionExpression | Identifier | StringLiteral | NumericLiteral | BooleanLiteral
        | NullLiteral | RegExpLiteral | LogicalExpression | MemberExpression | NewExpression | ObjectExpression
        | SequenceExpression | ThisExpression | UnaryExpression | UpdateExpression | ArrowFunctionExpression
        | ClassExpression | MetaProperty | Super | TaggedTemplateExpression | TemplateLiteral | YieldExpression
        | TypeCastExpression | JSXElement | JSXEmptyExpression | JSXIdentifier | JSXMemberExpression
        | ParenthesizedExpression | AwaitExpression | BindExpression | DoExpression;

    declare type Binary = BinaryExpression | LogicalExpression;

    declare type Scopable = BlockStatement | CatchClause | DoWhileStatement | ForInStatement | ForStatement
        | FunctionDeclaration | FunctionExpression | Program | ObjectMethod | SwitchStatement | WhileStatement
        | ArrowFunctionExpression | ClassDeclaration | ClassExpression | ForOfStatement | ClassMethod;

    declare type BlockParent = BlockStatement | DoWhileStatement | ForInStatement | ForStatement | FunctionDeclaration
        | FunctionExpression | Program | ObjectMethod | SwitchStatement | WhileStatement | ArrowFunctionExpression
        | ForOfStatement | ClassMethod;

    declare type Block = BlockStatement | Program;

    declare type Statement = BlockStatement | BreakStatement | ContinueStatement | DebuggerStatement | DoWhileStatement
        | EmptyStatement | ExpressionStatement | ForInStatement | ForStatement | FunctionDeclaration | IfStatement
        | LabeledStatement | ReturnStatement | SwitchStatement | ThrowStatement | TryStatement | VariableDeclaration
        | WhileStatement | WithStatement | ClassDeclaration | ExportAllDeclaration | ExportDefaultDeclaration
        | ExportNamedDeclaration | ForOfStatement | ImportDeclaration | DeclareClass | DeclareFunction | DeclareInterface
        | DeclareModule | DeclareTypeAlias | DeclareVariable | InterfaceDeclaration | TypeAlias;

    declare type Terminatorless = BreakStatement | ContinueStatement | ReturnStatement | ThrowStatement | YieldExpression | AwaitExpression;
    declare type CompletionStatement = BreakStatement | ContinueStatement | ReturnStatement | ThrowStatement;
    declare type Conditional = ConditionalExpression | IfStatement;
    declare type Loop = DoWhileStatement | ForInStatement | ForStatement | WhileStatement | ForOfStatement;
    declare type While = DoWhileStatement | WhileStatement;
    declare type ExpressionWrapper = ExpressionStatement | TypeCastExpression | ParenthesizedExpression;
    declare type For = ForInStatement | ForStatement | ForOfStatement;
    declare type ForXStatement = ForInStatement | ForOfStatement;
    declare type Function = FunctionDeclaration | FunctionExpression | ObjectMethod | ArrowFunctionExpression | ClassMethod;
    declare type FunctionParent = FunctionDeclaration | FunctionExpression | Program | ObjectMethod | ArrowFunctionExpression | ClassMethod;
    declare type Pureish = FunctionDeclaration | FunctionExpression | StringLiteral | NumericLiteral | BooleanLiteral | NullLiteral | ArrowFunctionExpression | ClassDeclaration | ClassExpression;

    declare type Declaration = FunctionDeclaration | VariableDeclaration | ClassDeclaration | ExportAllDeclaration
        | ExportDefaultDeclaration | ExportNamedDeclaration | ImportDeclaration | DeclareClass | DeclareFunction
        | DeclareInterface | DeclareModule | DeclareTypeAlias | DeclareVariable | InterfaceDeclaration | TypeAlias;

    declare type LVal = Identifier | MemberExpression | RestElement | AssignmentPattern | ArrayPattern | ObjectPattern;
    declare type Literal = StringLiteral | NumericLiteral | BooleanLiteral | NullLiteral | RegExpLiteral | TemplateLiteral;
    declare type Immutable = StringLiteral | NumericLiteral | BooleanLiteral | NullLiteral | JSXAttribute | JSXClosingElement | JSXElement | JSXExpressionContainer | JSXOpeningElement;
    declare type UserWhitespacable = ObjectMethod | ObjectProperty | ObjectTypeCallProperty | ObjectTypeIndexer | ObjectTypeProperty;
    declare type Method = ObjectMethod | ClassMethod;
    declare type ObjectMember = ObjectMethod | ObjectProperty;
    declare type Property = ObjectProperty | ClassProperty;
    declare type UnaryLike = UnaryExpression | SpreadElement | RestProperty | SpreadProperty;
    declare type Pattern = AssignmentPattern | ArrayPattern | ObjectPattern;
    declare type Class = ClassDeclaration | ClassExpression;
    declare type ModuleDeclaration = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration | ImportDeclaration;
    declare type ExportDeclaration = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration;
    declare type ModuleSpecifier = ExportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier | ExportDefaultSpecifier | ExportNamespaceSpecifier;

    declare type Flow = AnyTypeAnnotation | ArrayTypeAnnotation | BooleanTypeAnnotation | BooleanLiteralTypeAnnotation
        | ClassImplements | ClassProperty | DeclareClass | DeclareFunction | DeclareInterface | DeclareModule
        | DeclareTypeAlias | DeclareVariable | ExistentialTypeParam | FunctionTypeAnnotation | FunctionTypeParam
        | GenericTypeAnnotation | InterfaceExtends | InterfaceDeclaration | IntersectionTypeAnnotation
        | MixedTypeAnnotation | NullableTypeAnnotation | NumericLiteralTypeAnnotation | NumberTypeAnnotation
        | StringLiteralTypeAnnotation | StringTypeAnnotation | ThisTypeAnnotation | TupleTypeAnnotation
        | TypeofTypeAnnotation | TypeAlias | TypeAnnotation | TypeCastExpression | TypeParameterDeclaration
        | TypeParameterInstantiation | ObjectTypeAnnotation | ObjectTypeCallProperty | ObjectTypeIndexer
        | ObjectTypeProperty | QualifiedTypeIdentifier | UnionTypeAnnotation | VoidTypeAnnotation;

    declare type FlowTypeAnnotation = AnyTypeAnnotation | ArrayTypeAnnotation | BooleanTypeAnnotation
        | BooleanLiteralTypeAnnotation | FunctionTypeAnnotation | GenericTypeAnnotation | IntersectionTypeAnnotation
        | MixedTypeAnnotation | NullableTypeAnnotation | NumericLiteralTypeAnnotation | NumberTypeAnnotation
        | StringLiteralTypeAnnotation | StringTypeAnnotation | ThisTypeAnnotation | TupleTypeAnnotation
        | TypeofTypeAnnotation | TypeAnnotation | ObjectTypeAnnotation | UnionTypeAnnotation | VoidTypeAnnotation;

    declare type FlowBaseAnnotation = AnyTypeAnnotation | BooleanTypeAnnotation | MixedTypeAnnotation | NumberTypeAnnotation | StringTypeAnnotation | ThisTypeAnnotation | VoidTypeAnnotation;
    declare type FlowDeclaration = DeclareClass | DeclareFunction | DeclareInterface | DeclareModule | DeclareTypeAlias | DeclareVariable | InterfaceDeclaration | TypeAlias;

    declare type JSX = JSXAttribute | JSXClosingElement | JSXElement | JSXEmptyExpression | JSXExpressionContainer
        | JSXIdentifier | JSXMemberExpression | JSXNamespacedName | JSXOpeningElement | JSXSpreadAttribute | JSXText;

    declare function arrayExpression(elements?: Array<Expression | SpreadElement>): ArrayExpression;
    declare function assignmentExpression(operator?: string, left?: LVal, right?: Expression): AssignmentExpression;
    declare function binaryExpression(
        operator?: "+" | "-" | "/" | "%" | "*" | "**" | "&" | "|" | ">>" | ">>>" | "<<" | "^" | "==" | "===" | "!=" | "!==" | "in" | "instanceof" | ">" | "<" | ">=" | "<=",
        left?: Expression,
        right?: Expression
    ): BinaryExpression;

    declare function directive(value?: DirectiveLiteral): Directive;
    declare function directiveLiteral(value?: string): DirectiveLiteral;
    declare function blockStatement(body?: Statement[], directives?: Directive[]): BlockStatement;
    declare function breakStatement(label?: Identifier): BreakStatement;
    declare function callExpression(callee?: Expression, _arguments?: Array<Expression | SpreadElement>): CallExpression;
    declare function catchClause(param?: Identifier, body?: BlockStatement): CatchClause;
    declare function conditionalExpression(test?: Expression, consequent?: Expression, alternate?: Expression): ConditionalExpression;
    declare function continueStatement(label?: Identifier): ContinueStatement;
    declare function debuggerStatement(): DebuggerStatement;
    declare function doWhileStatement(test?: Expression, body?: Statement): DoWhileStatement;
    declare function emptyStatement(): EmptyStatement;
    declare function expressionStatement(expression?: Expression): ExpressionStatement;
    declare function file(program?: Program, comments?: Comment[], tokens?: any[]): File;
    declare function forInStatement(left?: VariableDeclaration | LVal, right?: Expression, body?: Statement): ForInStatement;
    declare function forStatement(init?: VariableDeclaration | Expression, test?: Expression, update?: Expression, body?: Statement): ForStatement;
    declare function functionDeclaration(id?: Identifier, params?: LVal[], body?: BlockStatement, generator?: boolean, async?: boolean): FunctionDeclaration;
    declare function functionExpression(id?: Identifier, params?: LVal[], body?: BlockStatement, generator?: boolean, async?: boolean): FunctionExpression;
    declare function identifier(name?: string): Identifier;
    declare function ifStatement(test?: Expression, consequent?: Statement, alternate?: Statement): IfStatement;
    declare function labeledStatement(label?: Identifier, body?: Statement): LabeledStatement;
    declare function stringLiteral(value?: string): StringLiteral;
    declare function numericLiteral(value?: number): NumericLiteral;
    declare function nullLiteral(): NullLiteral;
    declare function booleanLiteral(value?: boolean): BooleanLiteral;
    declare function regExpLiteral(pattern?: string, flags?: string): RegExpLiteral;
    declare function logicalExpression(operator?: "||" | "&&", left?: Expression, right?: Expression): LogicalExpression;
    declare function memberExpression(Object?: Expression | Super, property?: Expression, computed?: boolean): MemberExpression;
    declare function newExpression(callee?: Expression | Super, _arguments?: Array<Expression | SpreadElement>): NewExpression;
    declare function program(body?: Array<Statement | ModuleDeclaration>, directives?: Directive[]): Program;
    declare function objectExpression(properties?: Array<ObjectProperty | ObjectMethod | SpreadProperty>): ObjectExpression;
    declare function objectMethod(kind?: "get" | "set" | "method", key?: Expression, params?: LVal[], body?: BlockStatement, computed?: boolean): ObjectMethod;
    declare function objectProperty(key?: Expression, value?: Expression, computed?: boolean, shorthand?: boolean, decorators?: Decorator[]): ObjectProperty;
    declare function restElement(argument?: LVal, typeAnnotation?: TypeAnnotation): RestElement;
    declare function returnStatement(argument?: Expression): ReturnStatement;
    declare function sequenceExpression(expressions?: Expression[]): SequenceExpression;
    declare function switchCase(test?: Expression, consequent?: Statement[]): SwitchCase;
    declare function switchStatement(discriminant?: Expression, cases?: SwitchCase[]): SwitchStatement;
    declare function thisExpression(): ThisExpression;
    declare function throwStatement(argument?: Expression): ThrowStatement;
    declare function tryStatement(block?: BlockStatement, handler?: CatchClause, finalizer?: BlockStatement): TryStatement;
    declare function unaryExpression(operator?: "void" | "delete" | "!" | "+" | "-" | "++" | "--" | "~" | "typeof", argument?: Expression, prefix?: boolean): UnaryExpression;
    declare function updateExpression(operator?: "++" | "--", argument?: Expression, prefix?: boolean): UpdateExpression;
    declare function variableDeclaration(kind?: "var" | "let" | "const", declarations?: VariableDeclarator[]): VariableDeclaration;
    declare function variableDeclarator(id?: LVal, init?: Expression): VariableDeclarator;
    declare function whileStatement(test?: Expression, body?: BlockStatement | Statement): WhileStatement;
    declare function withStatement(Object?: Expression, body?: BlockStatement | Statement): WithStatement;
    declare function assignmentPattern(left?: Identifier, right?: Expression): AssignmentPattern;
    declare function arrayPattern(elements?: Expression[], typeAnnotation?: TypeAnnotation): ArrayPattern;
    declare function arrowFunctionExpression(params?: LVal[], body?: BlockStatement | Expression, async?: boolean): ArrowFunctionExpression;
    declare function classBody(body?: Array<ClassMethod | ClassProperty>): ClassBody;
    declare function classDeclaration(id?: Identifier, superClass?: Expression, body?: ClassBody, decorators?: Decorator[]): ClassDeclaration;
    declare function classExpression(id?: Identifier, superClass?: Expression, body?: ClassBody, decorators?: Decorator[]): ClassExpression;
    declare function exportAllDeclaration(source?: StringLiteral): ExportAllDeclaration;
    declare function exportDefaultDeclaration(declaration?: FunctionDeclaration | ClassDeclaration | Expression): ExportDefaultDeclaration;
    declare function exportNamedDeclaration(declaration?: Declaration, specifiers?: ExportSpecifier[], source?: StringLiteral): ExportNamedDeclaration;
    declare function exportSpecifier(local?: Identifier, exported?: Identifier): ExportSpecifier;
    declare function forOfStatement(left?: VariableDeclaration | LVal, right?: Expression, body?: Statement): ForOfStatement;
    declare function importDeclaration(specifiers?: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>, source?: StringLiteral): ImportDeclaration;
    declare function importDefaultSpecifier(local?: Identifier): ImportDefaultSpecifier;
    declare function importNamespaceSpecifier(local?: Identifier): ImportNamespaceSpecifier;
    declare function importSpecifier(local?: Identifier, imported?: Identifier): ImportSpecifier;
    declare function metaProperty(meta?: string, property?: string): MetaProperty;
    declare function classMethod(kind?: "constructor" | "method" | "get" | "set", key?: Expression, params?: LVal[], body?: BlockStatement, computed?: boolean, _static?: boolean): ClassMethod;
    declare function objectPattern(properties?: Array<AssignmentProperty | RestProperty>, typeAnnotation?: TypeAnnotation): ObjectPattern;
    declare function spreadElement(argument?: Expression): SpreadElement;
    declare function taggedTemplateExpression(tag?: Expression, quasi?: TemplateLiteral): TaggedTemplateExpression;
    declare function templateElement(value?: { cooked?: string; raw?: string; }, tail?: boolean): TemplateElement;
    declare function templateLiteral(quasis?: TemplateElement[], expressions?: Expression[]): TemplateLiteral;
    declare function yieldExpression(argument?: Expression, delegate?: boolean): YieldExpression;
    declare function anyTypeAnnotation(): AnyTypeAnnotation;
    declare function arrayTypeAnnotation(elementType?: FlowTypeAnnotation): ArrayTypeAnnotation;
    declare function booleanTypeAnnotation(): BooleanTypeAnnotation;
    declare function booleanLiteralTypeAnnotation(): BooleanLiteralTypeAnnotation;
    declare function nullLiteralTypeAnnotation(): NullLiteralTypeAnnotation;
    declare function classImplements(id?: Identifier, typeParameters?: TypeParameterInstantiation): ClassImplements;
    declare function classProperty(key?: Identifier, value?: Expression, typeAnnotation?: TypeAnnotation, decorators?: Decorator[]): ClassProperty;
    declare function declareClass(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): DeclareClass;
    declare function declareFunction(id?: Identifier): DeclareFunction;
    declare function declareInterface(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): DeclareInterface;
    declare function declareModule(id?: StringLiteral | Identifier, body?: BlockStatement): DeclareModule;
    declare function declareTypeAlias(id?: Identifier, typeParameters?: TypeParameterDeclaration, right?: FlowTypeAnnotation): DeclareTypeAlias;
    declare function declareVariable(id?: Identifier): DeclareVariable;
    declare function existentialTypeParam(): ExistentialTypeParam;
    declare function functionTypeAnnotation(typeParameters?: TypeParameterDeclaration, params?: FunctionTypeParam[], rest?: FunctionTypeParam, returnType?: FlowTypeAnnotation): FunctionTypeAnnotation;
    declare function functionTypeParam(name?: Identifier, typeAnnotation?: FlowTypeAnnotation): FunctionTypeParam;
    declare function genericTypeAnnotation(id?: Identifier, typeParameters?: TypeParameterInstantiation): GenericTypeAnnotation;
    declare function interfaceExtends(id?: Identifier, typeParameters?: TypeParameterInstantiation): InterfaceExtends;
    declare function interfaceDeclaration(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): InterfaceDeclaration;
    declare function intersectionTypeAnnotation(types?: FlowTypeAnnotation[]): IntersectionTypeAnnotation;
    declare function mixedTypeAnnotation(): MixedTypeAnnotation;
    declare function nullableTypeAnnotation(typeAnnotation?: FlowTypeAnnotation): NullableTypeAnnotation;
    declare function numericLiteralTypeAnnotation(): NumericLiteralTypeAnnotation;
    declare function numberTypeAnnotation(): NumberTypeAnnotation;
    declare function stringLiteralTypeAnnotation(): StringLiteralTypeAnnotation;
    declare function stringTypeAnnotation(): StringTypeAnnotation;
    declare function thisTypeAnnotation(): ThisTypeAnnotation;
    declare function tupleTypeAnnotation(types?: FlowTypeAnnotation[]): TupleTypeAnnotation;
    declare function typeofTypeAnnotation(argument?: FlowTypeAnnotation): TypeofTypeAnnotation;
    declare function typeAlias(id?: Identifier, typeParameters?: TypeParameterDeclaration, right?: FlowTypeAnnotation): TypeAlias;
    declare function typeAnnotation(typeAnnotation?: FlowTypeAnnotation): TypeAnnotation;
    declare function typeCastExpression(expression?: Expression, typeAnnotation?: FlowTypeAnnotation): TypeCastExpression;
    declare function typeParameterDeclaration(params?: Identifier[]): TypeParameterDeclaration;
    declare function typeParameterInstantiation(params?: FlowTypeAnnotation[]): TypeParameterInstantiation;
    declare function objectTypeAnnotation(properties?: ObjectTypeProperty[], indexers?: ObjectTypeIndexer[], callProperties?: ObjectTypeCallProperty[]): ObjectTypeAnnotation;
    declare function objectTypeCallProperty(value?: FlowTypeAnnotation): ObjectTypeCallProperty;
    declare function objectTypeIndexer(id?: Expression, key?: FlowTypeAnnotation, value?: FlowTypeAnnotation): ObjectTypeIndexer;
    declare function objectTypeProperty(key?: Expression, value?: FlowTypeAnnotation): ObjectTypeProperty;
    declare function qualifiedTypeIdentifier(id?: Identifier, qualification?: Identifier | QualifiedTypeIdentifier): QualifiedTypeIdentifier;
    declare function unionTypeAnnotation(types?: FlowTypeAnnotation[]): UnionTypeAnnotation;
    declare function voidTypeAnnotation(): VoidTypeAnnotation;
    declare function jSXAttribute(name?: JSXIdentifier | JSXNamespacedName, value?: JSXElement | StringLiteral | JSXExpressionContainer): JSXAttribute;
    declare function jSXClosingElement(name?: JSXIdentifier | JSXMemberExpression): JSXClosingElement;
    declare function jSXElement(openingElement?: JSXOpeningElement, closingElement?: JSXClosingElement, children?: Array<JSXElement | JSXExpressionContainer | JSXText>, selfClosing?: boolean): JSXElement;
    declare function jSXEmptyExpression(): JSXEmptyExpression;
    declare function jSXExpressionContainer(expression?: Expression): JSXExpressionContainer;
    declare function jSXIdentifier(name?: string): JSXIdentifier;
    declare function jSXMemberExpression(Object?: JSXMemberExpression | JSXIdentifier, property?: JSXIdentifier): JSXMemberExpression;
    declare function jSXNamespacedName(namespace?: JSXIdentifier, name?: JSXIdentifier): JSXNamespacedName;
    declare function jSXOpeningElement(name?: JSXIdentifier | JSXMemberExpression, attributes?: JSXAttribute[], selfClosing?: boolean): JSXOpeningElement;
    declare function jSXSpreadAttribute(argument?: Expression): JSXSpreadAttribute;
    declare function jSXText(value?: string): JSXText;
    declare function noop(): Noop;
    declare function parenthesizedExpression(expression?: Expression): ParenthesizedExpression;
    declare function awaitExpression(argument?: Expression): AwaitExpression;
    declare function bindExpression(Object?: Expression, callee?: Expression): BindExpression;
    declare function decorator(expression?: Expression): Decorator;
    declare function doExpression(body?: BlockStatement): DoExpression;
    declare function exportDefaultSpecifier(exported?: Identifier): ExportDefaultSpecifier;
    declare function exportNamespaceSpecifier(exported?: Identifier): ExportNamespaceSpecifier;
    declare function restProperty(argument?: LVal): RestProperty;
    declare function spreadProperty(argument?: Expression): SpreadProperty;

    declare function isArrayExpression(node: Object, opts?: Object): boolean %checks (node instanceof ArrayExpression);
    declare function isAssignmentExpression(node: Object, opts?: Object): boolean %checks (node instanceof AssignmentExpression);
    declare function isBinaryExpression(node: Object, opts?: Object): boolean %checks (node instanceof BinaryExpression);
    declare function isDirective(node: Object, opts?: Object): boolean %checks (node instanceof Directive);
    declare function isDirectiveLiteral(node: Object, opts?: Object): boolean %checks (node instanceof DirectiveLiteral);
    declare function isBlockStatement(node: Object, opts?: Object): boolean %checks (node instanceof BlockStatement);
    declare function isBreakStatement(node: Object, opts?: Object): boolean %checks (node instanceof BreakStatement);
    declare function isCallExpression(node: Object, opts?: Object): boolean %checks (node instanceof CallExpression);
    declare function isCatchClause(node: Object, opts?: Object): boolean %checks (node instanceof CatchClause);
    declare function isConditionalExpression(node: Object, opts?: Object): boolean %checks (node instanceof ConditionalExpression);
    declare function isContinueStatement(node: Object, opts?: Object): boolean %checks (node instanceof ContinueStatement);
    declare function isDebuggerStatement(node: Object, opts?: Object): boolean %checks (node instanceof DebuggerStatement);
    declare function isDoWhileStatement(node: Object, opts?: Object): boolean %checks (node instanceof DoWhileStatement);
    declare function isEmptyStatement(node: Object, opts?: Object): boolean %checks (node instanceof EmptyStatement);
    declare function isExpressionStatement(node: Object, opts?: Object): boolean %checks (node instanceof ExpressionStatement);
    declare function isFile(node: Object, opts?: Object): boolean %checks (node instanceof File);
    declare function isForInStatement(node: Object, opts?: Object): boolean %checks (node instanceof ForInStatement);
    declare function isForStatement(node: Object, opts?: Object): boolean %checks (node instanceof ForStatement);
    declare function isFunctionDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof FunctionDeclaration);
    declare function isFunctionExpression(node: Object, opts?: Object): boolean %checks (node instanceof FunctionExpression);
    declare function isIdentifier(node: Object, opts?: Object): boolean %checks (node instanceof Identifier);
    declare function isIfStatement(node: Object, opts?: Object): boolean %checks (node instanceof IfStatement);
    declare function isLabeledStatement(node: Object, opts?: Object): boolean %checks (node instanceof LabeledStatement);
    declare function isStringLiteral(node: Object, opts?: Object): boolean %checks (node instanceof StringLiteral);
    declare function isNumericLiteral(node: Object, opts?: Object): boolean %checks (node instanceof NumericLiteral);
    declare function isNullLiteral(node: Object, opts?: Object): boolean %checks (node instanceof NullLiteral);
    declare function isBooleanLiteral(node: Object, opts?: Object): boolean %checks (node instanceof BooleanLiteral);
    declare function isRegExpLiteral(node: Object, opts?: Object): boolean %checks (node instanceof RegExpLiteral);
    declare function isLogicalExpression(node: Object, opts?: Object): boolean %checks (node instanceof LogicalExpression);
    declare function isMemberExpression(node: Object, opts?: Object): boolean %checks (node instanceof MemberExpression);
    declare function isNewExpression(node: Object, opts?: Object): boolean %checks (node instanceof NewExpression);
    declare function isProgram(node: Object, opts?: Object): boolean %checks (node instanceof Program);
    declare function isObjectExpression(node: Object, opts?: Object): boolean %checks (node instanceof ObjectExpression);
    declare function isObjectMethod(node: Object, opts?: Object): boolean %checks (node instanceof ObjectMethod);
    declare function isObjectProperty(node: Object, opts?: Object): boolean %checks (node instanceof ObjectProperty);
    declare function isRestElement(node: Object, opts?: Object): boolean %checks (node instanceof RestElement);
    declare function isReturnStatement(node: Object, opts?: Object): boolean %checks (node instanceof ReturnStatement);
    declare function isSequenceExpression(node: Object, opts?: Object): boolean %checks (node instanceof SequenceExpression);
    declare function isSwitchCase(node: Object, opts?: Object): boolean %checks (node instanceof SwitchCase);
    declare function isSwitchStatement(node: Object, opts?: Object): boolean %checks (node instanceof SwitchStatement);
    declare function isThisExpression(node: Object, opts?: Object): boolean %checks (node instanceof ThisExpression);
    declare function isThrowStatement(node: Object, opts?: Object): boolean %checks (node instanceof ThrowStatement);
    declare function isTryStatement(node: Object, opts?: Object): boolean %checks (node instanceof TryStatement);
    declare function isUnaryExpression(node: Object, opts?: Object): boolean %checks (node instanceof UnaryExpression);
    declare function isUpdateExpression(node: Object, opts?: Object): boolean %checks (node instanceof UpdateExpression);
    declare function isVariableDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof VariableDeclaration);
    declare function isVariableDeclarator(node: Object, opts?: Object): boolean %checks (node instanceof VariableDeclarator);
    declare function isWhileStatement(node: Object, opts?: Object): boolean %checks (node instanceof WhileStatement);
    declare function isWithStatement(node: Object, opts?: Object): boolean %checks (node instanceof WithStatement);
    declare function isAssignmentPattern(node: Object, opts?: Object): boolean %checks (node instanceof AssignmentPattern);
    declare function isArrayPattern(node: Object, opts?: Object): boolean %checks (node instanceof ArrayPattern);
    declare function isArrowFunctionExpression(node: Object, opts?: Object): boolean %checks (node instanceof ArrowFunctionExpression);
    declare function isClassBody(node: Object, opts?: Object): boolean %checks (node instanceof ClassBody);
    declare function isClassDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof ClassDeclaration);
    declare function isClassExpression(node: Object, opts?: Object): boolean %checks (node instanceof ClassExpression);
    declare function isExportAllDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof ExportAllDeclaration);
    declare function isExportDefaultDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof ExportDefaultDeclaration);
    declare function isExportNamedDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof ExportNamedDeclaration);
    declare function isExportSpecifier(node: Object, opts?: Object): boolean %checks (node instanceof ExportSpecifier);
    declare function isForOfStatement(node: Object, opts?: Object): boolean %checks (node instanceof ForOfStatement);
    declare function isImportDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof ImportDeclaration);
    declare function isImportDefaultSpecifier(node: Object, opts?: Object): boolean %checks (node instanceof ImportDefaultSpecifier);
    declare function isImportNamespaceSpecifier(node: Object, opts?: Object): boolean %checks (node instanceof ImportNamespaceSpecifier);
    declare function isImportSpecifier(node: Object, opts?: Object): boolean %checks (node instanceof ImportSpecifier);
    declare function isMetaProperty(node: Object, opts?: Object): boolean %checks (node instanceof MetaProperty);
    declare function isClassMethod(node: Object, opts?: Object): boolean %checks (node instanceof ClassMethod);
    declare function isObjectPattern(node: Object, opts?: Object): boolean %checks (node instanceof ObjectPattern);
    declare function isSpreadElement(node: Object, opts?: Object): boolean %checks (node instanceof SpreadElement);
    declare function isSuper(node: Object, opts?: Object): boolean %checks (node instanceof Super);
    declare function isTaggedTemplateExpression(node: Object, opts?: Object): boolean %checks (node instanceof TaggedTemplateExpression);
    declare function isTemplateElement(node: Object, opts?: Object): boolean %checks (node instanceof TemplateElement);
    declare function isTemplateLiteral(node: Object, opts?: Object): boolean %checks (node instanceof TemplateLiteral);
    declare function isYieldExpression(node: Object, opts?: Object): boolean %checks (node instanceof YieldExpression);
    declare function isAnyTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof AnyTypeAnnotation);
    declare function isArrayTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof ArrayTypeAnnotation);
    declare function isBooleanTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof BooleanTypeAnnotation);
    declare function isBooleanLiteralTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof BooleanLiteralTypeAnnotation);
    declare function isNullLiteralTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof NullLiteralTypeAnnotation);
    declare function isClassImplements(node: Object, opts?: Object): boolean %checks (node instanceof ClassImplements);
    declare function isClassProperty(node: Object, opts?: Object): boolean %checks (node instanceof ClassProperty);
    declare function isDeclareClass(node: Object, opts?: Object): boolean %checks (node instanceof DeclareClass);
    declare function isDeclareFunction(node: Object, opts?: Object): boolean %checks (node instanceof DeclareFunction);
    declare function isDeclareInterface(node: Object, opts?: Object): boolean %checks (node instanceof DeclareInterface);
    declare function isDeclareModule(node: Object, opts?: Object): boolean %checks (node instanceof DeclareModule);
    declare function isDeclareTypeAlias(node: Object, opts?: Object): boolean %checks (node instanceof DeclareTypeAlias);
    declare function isDeclareVariable(node: Object, opts?: Object): boolean %checks (node instanceof DeclareVariable);
    declare function isExistentialTypeParam(node: Object, opts?: Object): boolean %checks (node instanceof ExistentialTypeParam);
    declare function isFunctionTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof FunctionTypeAnnotation);
    declare function isFunctionTypeParam(node: Object, opts?: Object): boolean %checks (node instanceof FunctionTypeParam);
    declare function isGenericTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof GenericTypeAnnotation);
    declare function isInterfaceExtends(node: Object, opts?: Object): boolean %checks (node instanceof InterfaceExtends);
    declare function isInterfaceDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof InterfaceDeclaration);
    declare function isIntersectionTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof IntersectionTypeAnnotation);
    declare function isMixedTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof MixedTypeAnnotation);
    declare function isNullableTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof NullableTypeAnnotation);
    declare function isNumericLiteralTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof NumericLiteralTypeAnnotation);
    declare function isNumberTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof NumberTypeAnnotation);
    declare function isStringLiteralTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof StringLiteralTypeAnnotation);
    declare function isStringTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof StringTypeAnnotation);
    declare function isThisTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof ThisTypeAnnotation);
    declare function isTupleTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof TupleTypeAnnotation);
    declare function isTypeofTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof TypeofTypeAnnotation);
    declare function isTypeAlias(node: Object, opts?: Object): boolean %checks (node instanceof TypeAlias);
    declare function isTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof TypeAnnotation);
    declare function isTypeCastExpression(node: Object, opts?: Object): boolean %checks (node instanceof TypeCastExpression);
    declare function isTypeParameterDeclaration(node: Object, opts?: Object): boolean %checks (node instanceof TypeParameterDeclaration);
    declare function isTypeParameterInstantiation(node: Object, opts?: Object): boolean %checks (node instanceof TypeParameterInstantiation);
    declare function isObjectTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof ObjectTypeAnnotation);
    declare function isObjectTypeCallProperty(node: Object, opts?: Object): boolean %checks (node instanceof ObjectTypeCallProperty);
    declare function isObjectTypeIndexer(node: Object, opts?: Object): boolean %checks (node instanceof ObjectTypeIndexer);
    declare function isObjectTypeProperty(node: Object, opts?: Object): boolean %checks (node instanceof ObjectTypeProperty);
    declare function isQualifiedTypeIdentifier(node: Object, opts?: Object): boolean %checks (node instanceof QualifiedTypeIdentifier);
    declare function isUnionTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof UnionTypeAnnotation);
    declare function isVoidTypeAnnotation(node: Object, opts?: Object): boolean %checks (node instanceof VoidTypeAnnotation);
    declare function isJSXAttribute(node: Object, opts?: Object): boolean %checks (node instanceof JSXAttribute);
    declare function isJSXClosingElement(node: Object, opts?: Object): boolean %checks (node instanceof JSXClosingElement);
    declare function isJSXElement(node: Object, opts?: Object): boolean %checks (node instanceof JSXElement);
    declare function isJSXEmptyExpression(node: Object, opts?: Object): boolean %checks (node instanceof JSXEmptyExpression);
    declare function isJSXExpressionContainer(node: Object, opts?: Object): boolean %checks (node instanceof JSXExpressionContainer);
    declare function isJSXIdentifier(node: Object, opts?: Object): boolean %checks (node instanceof JSXIdentifier);
    declare function isJSXMemberExpression(node: Object, opts?: Object): boolean %checks (node instanceof JSXMemberExpression);
    declare function isJSXNamespacedName(node: Object, opts?: Object): boolean %checks (node instanceof JSXNamespacedName);
    declare function isJSXOpeningElement(node: Object, opts?: Object): boolean %checks (node instanceof JSXOpeningElement);
    declare function isJSXSpreadAttribute(node: Object, opts?: Object): boolean %checks (node instanceof JSXSpreadAttribute);
    declare function isJSXText(node: Object, opts?: Object): boolean %checks (node instanceof JSXText);
    declare function isNoop(node: Object, opts?: Object): boolean %checks (node instanceof Noop);
    declare function isParenthesizedExpression(node: Object, opts?: Object): boolean %checks (node instanceof ParenthesizedExpression);
    declare function isAwaitExpression(node: Object, opts?: Object): boolean %checks (node instanceof AwaitExpression);
    declare function isBindExpression(node: Object, opts?: Object): boolean %checks (node instanceof BindExpression);
    declare function isDecorator(node: Object, opts?: Object): boolean %checks (node instanceof Decorator);
    declare function isDoExpression(node: Object, opts?: Object): boolean %checks (node instanceof DoExpression);
    declare function isExportDefaultSpecifier(node: Object, opts?: Object): boolean %checks (node instanceof ExportDefaultSpecifier);
    declare function isExportNamespaceSpecifier(node: Object, opts?: Object): boolean %checks (node instanceof ExportNamespaceSpecifier);
    declare function isRestProperty(node: Object, opts?: Object): boolean %checks (node instanceof RestProperty);
    declare function isSpreadProperty(node: Object, opts?: Object): boolean %checks (node instanceof SpreadProperty);
    declare function isExpression(node: Object, opts?: Object): boolean //%checks (node instanceof Expression);
    declare function isBinary(node: Object, opts?: Object): boolean //%checks (node instanceof Binary);
    declare function isScopable(node: Object, opts?: Object): boolean //%checks (node instanceof Scopable);
    declare function isBlockParent(node: Object, opts?: Object): boolean //%checks (node instanceof BlockParent);
    declare function isBlock(node: Object, opts?: Object): boolean //%checks (node instanceof Block);
    declare function isStatement(node: Object, opts?: Object): boolean //%checks (node instanceof Statement);
    declare function isTerminatorless(node: Object, opts?: Object): boolean //%checks (node instanceof Terminatorless);
    declare function isCompletionStatement(node: Object, opts?: Object): boolean //%checks (node instanceof CompletionStatement);
    declare function isConditional(node: Object, opts?: Object): boolean //%checks (node instanceof Conditional);
    declare function isLoop(node: Object, opts?: Object): boolean //%checks (node instanceof Loop);
    declare function isWhile(node: Object, opts?: Object): boolean //%checks (node instanceof While);
    declare function isExpressionWrapper(node: Object, opts?: Object): boolean //%checks (node instanceof ExpressionWrapper);
    declare function isFor(node: Object, opts?: Object): boolean //%checks (node instanceof For);
    declare function isForXStatement(node: Object, opts?: Object): boolean //%checks (node instanceof ForXStatement);
    declare function isFunction(node: Object, opts?: Object): boolean //%checks (node instanceof Function);
    declare function isFunctionParent(node: Object, opts?: Object): boolean //%checks (node instanceof FunctionParent);
    declare function isPureish(node: Object, opts?: Object): boolean //%checks (node instanceof Pureish);
    declare function isDeclaration(node: Object, opts?: Object): boolean //%checks (node instanceof Declaration);
    declare function isLVal(node: Object, opts?: Object): boolean //%checks (node instanceof LVal);
    declare function isLiteral(node: Object, opts?: Object): boolean //%checks (node instanceof Literal);
    declare function isImmutable(node: Object, opts?: Object): boolean //%checks (node instanceof Immutable);
    declare function isUserWhitespacable(node: Object, opts?: Object): boolean //%checks (node instanceof UserWhitespacable);
    declare function isMethod(node: Object, opts?: Object): boolean //%checks (node instanceof Method);
    declare function isObjectMember(node: Object, opts?: Object): boolean //%checks (node instanceof ObjectMember);
    declare function isProperty(node: Object, opts?: Object): boolean //%checks (node instanceof Property);
    declare function isUnaryLike(node: Object, opts?: Object): boolean //%checks (node instanceof UnaryLike);
    declare function isPattern(node: Object, opts?: Object): boolean //%checks (node instanceof Pattern);
    declare function isClass(node: Object, opts?: Object): boolean //%checks (node instanceof Class);
    declare function isModuleDeclaration(node: Object, opts?: Object): boolean //%checks (node instanceof ModuleDeclaration);
    declare function isExportDeclaration(node: Object, opts?: Object): boolean //%checks (node instanceof ExportDeclaration);
    declare function isModuleSpecifier(node: Object, opts?: Object): boolean //%checks (node instanceof ModuleSpecifier);
    declare function isFlow(node: Object, opts?: Object): boolean //%checks (node instanceof Flow);
    declare function isFlowBaseAnnotation(node: Object, opts?: Object): boolean //%checks (node instanceof FlowBaseAnnotation);
    declare function isFlowDeclaration(node: Object, opts?: Object): boolean //%checks (node instanceof FlowDeclaration);
    declare function isJSX(node: Object, opts?: Object): boolean //%checks (node instanceof JSX);
    declare function isNumberLiteral(node: Object, opts?: Object): boolean %checks (node instanceof NumericLiteral);
    declare function isRegexLiteral(node: Object, opts?: Object): boolean %checks (node instanceof RegExpLiteral);

    declare function isReferencedIdentifier(node: Object, opts?: Object): boolean;
    declare function isReferencedMemberExpression(node: Object, opts?: Object): boolean;
    declare function isBindingIdentifier(node: Object, opts?: Object): boolean;
    declare function isScope(node: Object, opts?: Object): boolean;
    declare function isReferenced(node: Object, opts?: Object): boolean;
    declare function isBlockScoped(node: Object, opts?: Object): boolean;
    declare function isVar(node: Object, opts?: Object): boolean;
    declare function isUser(node: Object, opts?: Object): boolean;
    declare function isGenerated(node: Object, opts?: Object): boolean;
    declare function isPure(node: Object, opts?: Object): boolean;

    declare var react: {
        isCompatTag(tagName?: string): boolean;
        buildChildren(node: Object): Node[];
    };

    declare function assertArrayExpression(node: Object, opts?: Object): void;
    declare function assertAssignmentExpression(node: Object, opts?: Object): void;
    declare function assertBinaryExpression(node: Object, opts?: Object): void;
    declare function assertDirective(node: Object, opts?: Object): void;
    declare function assertDirectiveLiteral(node: Object, opts?: Object): void;
    declare function assertBlockStatement(node: Object, opts?: Object): void;
    declare function assertBreakStatement(node: Object, opts?: Object): void;
    declare function assertCallExpression(node: Object, opts?: Object): void;
    declare function assertCatchClause(node: Object, opts?: Object): void;
    declare function assertConditionalExpression(node: Object, opts?: Object): void;
    declare function assertContinueStatement(node: Object, opts?: Object): void;
    declare function assertDebuggerStatement(node: Object, opts?: Object): void;
    declare function assertDoWhileStatement(node: Object, opts?: Object): void;
    declare function assertEmptyStatement(node: Object, opts?: Object): void;
    declare function assertExpressionStatement(node: Object, opts?: Object): void;
    declare function assertFile(node: Object, opts?: Object): void;
    declare function assertForInStatement(node: Object, opts?: Object): void;
    declare function assertForStatement(node: Object, opts?: Object): void;
    declare function assertFunctionDeclaration(node: Object, opts?: Object): void;
    declare function assertFunctionExpression(node: Object, opts?: Object): void;
    declare function assertIdentifier(node: Object, opts?: Object): void;
    declare function assertIfStatement(node: Object, opts?: Object): void;
    declare function assertLabeledStatement(node: Object, opts?: Object): void;
    declare function assertStringLiteral(node: Object, opts?: Object): void;
    declare function assertNumericLiteral(node: Object, opts?: Object): void;
    declare function assertNullLiteral(node: Object, opts?: Object): void;
    declare function assertBooleanLiteral(node: Object, opts?: Object): void;
    declare function assertRegExpLiteral(node: Object, opts?: Object): void;
    declare function assertLogicalExpression(node: Object, opts?: Object): void;
    declare function assertMemberExpression(node: Object, opts?: Object): void;
    declare function assertNewExpression(node: Object, opts?: Object): void;
    declare function assertProgram(node: Object, opts?: Object): void;
    declare function assertObjectExpression(node: Object, opts?: Object): void;
    declare function assertObjectMethod(node: Object, opts?: Object): void;
    declare function assertObjectProperty(node: Object, opts?: Object): void;
    declare function assertRestElement(node: Object, opts?: Object): void;
    declare function assertReturnStatement(node: Object, opts?: Object): void;
    declare function assertSequenceExpression(node: Object, opts?: Object): void;
    declare function assertSwitchCase(node: Object, opts?: Object): void;
    declare function assertSwitchStatement(node: Object, opts?: Object): void;
    declare function assertThisExpression(node: Object, opts?: Object): void;
    declare function assertThrowStatement(node: Object, opts?: Object): void;
    declare function assertTryStatement(node: Object, opts?: Object): void;
    declare function assertUnaryExpression(node: Object, opts?: Object): void;
    declare function assertUpdateExpression(node: Object, opts?: Object): void;
    declare function assertVariableDeclaration(node: Object, opts?: Object): void;
    declare function assertVariableDeclarator(node: Object, opts?: Object): void;
    declare function assertWhileStatement(node: Object, opts?: Object): void;
    declare function assertWithStatement(node: Object, opts?: Object): void;
    declare function assertAssignmentPattern(node: Object, opts?: Object): void;
    declare function assertArrayPattern(node: Object, opts?: Object): void;
    declare function assertArrowFunctionExpression(node: Object, opts?: Object): void;
    declare function assertClassBody(node: Object, opts?: Object): void;
    declare function assertClassDeclaration(node: Object, opts?: Object): void;
    declare function assertClassExpression(node: Object, opts?: Object): void;
    declare function assertExportAllDeclaration(node: Object, opts?: Object): void;
    declare function assertExportDefaultDeclaration(node: Object, opts?: Object): void;
    declare function assertExportNamedDeclaration(node: Object, opts?: Object): void;
    declare function assertExportSpecifier(node: Object, opts?: Object): void;
    declare function assertForOfStatement(node: Object, opts?: Object): void;
    declare function assertImportDeclaration(node: Object, opts?: Object): void;
    declare function assertImportDefaultSpecifier(node: Object, opts?: Object): void;
    declare function assertImportNamespaceSpecifier(node: Object, opts?: Object): void;
    declare function assertImportSpecifier(node: Object, opts?: Object): void;
    declare function assertMetaProperty(node: Object, opts?: Object): void;
    declare function assertClassMethod(node: Object, opts?: Object): void;
    declare function assertObjectPattern(node: Object, opts?: Object): void;
    declare function assertSpreadElement(node: Object, opts?: Object): void;
    declare function assertSuper(node: Object, opts?: Object): void;
    declare function assertTaggedTemplateExpression(node: Object, opts?: Object): void;
    declare function assertTemplateElement(node: Object, opts?: Object): void;
    declare function assertTemplateLiteral(node: Object, opts?: Object): void;
    declare function assertYieldExpression(node: Object, opts?: Object): void;
    declare function assertAnyTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertArrayTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertBooleanTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertBooleanLiteralTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertNullLiteralTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertClassImplements(node: Object, opts?: Object): void;
    declare function assertClassProperty(node: Object, opts?: Object): void;
    declare function assertDeclareClass(node: Object, opts?: Object): void;
    declare function assertDeclareFunction(node: Object, opts?: Object): void;
    declare function assertDeclareInterface(node: Object, opts?: Object): void;
    declare function assertDeclareModule(node: Object, opts?: Object): void;
    declare function assertDeclareTypeAlias(node: Object, opts?: Object): void;
    declare function assertDeclareVariable(node: Object, opts?: Object): void;
    declare function assertExistentialTypeParam(node: Object, opts?: Object): void;
    declare function assertFunctionTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertFunctionTypeParam(node: Object, opts?: Object): void;
    declare function assertGenericTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertInterfaceExtends(node: Object, opts?: Object): void;
    declare function assertInterfaceDeclaration(node: Object, opts?: Object): void;
    declare function assertIntersectionTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertMixedTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertNullableTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertNumericLiteralTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertNumberTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertStringLiteralTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertStringTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertThisTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertTupleTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertTypeofTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertTypeAlias(node: Object, opts?: Object): void;
    declare function assertTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertTypeCastExpression(node: Object, opts?: Object): void;
    declare function assertTypeParameterDeclaration(node: Object, opts?: Object): void;
    declare function assertTypeParameterInstantiation(node: Object, opts?: Object): void;
    declare function assertObjectTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertObjectTypeCallProperty(node: Object, opts?: Object): void;
    declare function assertObjectTypeIndexer(node: Object, opts?: Object): void;
    declare function assertObjectTypeProperty(node: Object, opts?: Object): void;
    declare function assertQualifiedTypeIdentifier(node: Object, opts?: Object): void;
    declare function assertUnionTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertVoidTypeAnnotation(node: Object, opts?: Object): void;
    declare function assertJSXAttribute(node: Object, opts?: Object): void;
    declare function assertJSXClosingElement(node: Object, opts?: Object): void;
    declare function assertJSXElement(node: Object, opts?: Object): void;
    declare function assertJSXEmptyExpression(node: Object, opts?: Object): void;
    declare function assertJSXExpressionContainer(node: Object, opts?: Object): void;
    declare function assertJSXIdentifier(node: Object, opts?: Object): void;
    declare function assertJSXMemberExpression(node: Object, opts?: Object): void;
    declare function assertJSXNamespacedName(node: Object, opts?: Object): void;
    declare function assertJSXOpeningElement(node: Object, opts?: Object): void;
    declare function assertJSXSpreadAttribute(node: Object, opts?: Object): void;
    declare function assertJSXText(node: Object, opts?: Object): void;
    declare function assertNoop(node: Object, opts?: Object): void;
    declare function assertParenthesizedExpression(node: Object, opts?: Object): void;
    declare function assertAwaitExpression(node: Object, opts?: Object): void;
    declare function assertBindExpression(node: Object, opts?: Object): void;
    declare function assertDecorator(node: Object, opts?: Object): void;
    declare function assertDoExpression(node: Object, opts?: Object): void;
    declare function assertExportDefaultSpecifier(node: Object, opts?: Object): void;
    declare function assertExportNamespaceSpecifier(node: Object, opts?: Object): void;
    declare function assertRestProperty(node: Object, opts?: Object): void;
    declare function assertSpreadProperty(node: Object, opts?: Object): void;
    declare function assertExpression(node: Object, opts?: Object): void;
    declare function assertBinary(node: Object, opts?: Object): void;
    declare function assertScopable(node: Object, opts?: Object): void;
    declare function assertBlockParent(node: Object, opts?: Object): void;
    declare function assertBlock(node: Object, opts?: Object): void;
    declare function assertStatement(node: Object, opts?: Object): void;
    declare function assertTerminatorless(node: Object, opts?: Object): void;
    declare function assertCompletionStatement(node: Object, opts?: Object): void;
    declare function assertConditional(node: Object, opts?: Object): void;
    declare function assertLoop(node: Object, opts?: Object): void;
    declare function assertWhile(node: Object, opts?: Object): void;
    declare function assertExpressionWrapper(node: Object, opts?: Object): void;
    declare function assertFor(node: Object, opts?: Object): void;
    declare function assertForXStatement(node: Object, opts?: Object): void;
    declare function assertFunction(node: Object, opts?: Object): void;
    declare function assertFunctionParent(node: Object, opts?: Object): void;
    declare function assertPureish(node: Object, opts?: Object): void;
    declare function assertDeclaration(node: Object, opts?: Object): void;
    declare function assertLVal(node: Object, opts?: Object): void;
    declare function assertLiteral(node: Object, opts?: Object): void;
    declare function assertImmutable(node: Object, opts?: Object): void;
    declare function assertUserWhitespacable(node: Object, opts?: Object): void;
    declare function assertMethod(node: Object, opts?: Object): void;
    declare function assertObjectMember(node: Object, opts?: Object): void;
    declare function assertProperty(node: Object, opts?: Object): void;
    declare function assertUnaryLike(node: Object, opts?: Object): void;
    declare function assertPattern(node: Object, opts?: Object): void;
    declare function assertClass(node: Object, opts?: Object): void;
    declare function assertModuleDeclaration(node: Object, opts?: Object): void;
    declare function assertExportDeclaration(node: Object, opts?: Object): void;
    declare function assertModuleSpecifier(node: Object, opts?: Object): void;
    declare function assertFlow(node: Object, opts?: Object): void;
    declare function assertFlowBaseAnnotation(node: Object, opts?: Object): void;
    declare function assertFlowDeclaration(node: Object, opts?: Object): void;
    declare function assertJSX(node: Object, opts?: Object): void;
    declare function assertNumberLiteral(node: Object, opts?: Object): void;
    declare function assertRegexLiteral(node: Object, opts?: Object): void;

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
