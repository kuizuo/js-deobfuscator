const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;

const code = `
var _0x52627b = {
 'QqaUY': "attribute",
}

console.log(_0x52627b["QqaUY"]);
`;

const ast = babel.parse(code, {
    sourceType: 'module',
});

// Store variable declarations in this object
const variableDeclarations = {};

// Traverse the AST to collect variable declarations
traverse(ast, {
    VariableDeclaration(path) {
        path.node.declarations.forEach((declaration) => {
            if (declaration.id.type === 'Identifier') {
                const variableName = declaration.id.name;
                variableDeclarations[variableName] = declaration.init;
            }
        });
    },
});

// Traverse the AST again to replace object property references
traverse(ast, {
    MemberExpression(path) {
        if (
            path.node.object.type === 'Identifier' &&
            path.node.property.type === 'StringLiteral'
        ) {
            const objectName = path.node.object.name;
            const propertyName = path.node.property.value;

            if (variableDeclarations[objectName]) {
                const objectInit = variableDeclarations[objectName];
                if (objectInit.type === 'ObjectExpression') {
                    const properties = objectInit.properties;
                    for (const prop of properties) {
                        if (prop.key.type === 'StringLiteral' && prop.key.value === propertyName) {
                            path.replaceWith(prop.value);
                        }
                    }
                }
            }
        }
    },
});

const { code: transformedCode } = babel.transformFromAst(ast, null, {});

console.log(transformedCode);
