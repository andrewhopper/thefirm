import * as ts from 'typescript';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Specify the path to your TypeScript file
const filePath = path.resolve(__dirname, '../src/artifacts/artifacts.ts');

// Create a program to hold the source files
const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
});

// Get the type checker for type information
const checker = program.getTypeChecker();

// Get the source file to analyze
const sourceFile = program.getSourceFile(filePath);

if (!sourceFile) {
    throw new Error(`Source file not found: ${filePath}`);
}

// Function to convert enum information to JSON
function enumsToJson(node: ts.Node): any[] {
    const enums: any[] = [];

    function visit(node: ts.Node) {
        if (ts.isEnumDeclaration(node) && node.name) {
            const enumName = node.name.text;
            const members: any[] = [];

            node.members.forEach((member) => {
                if (member.name) {
                    const memberName = (member.name as ts.Identifier).text;
                    let value;

                    if (member.initializer && ts.isStringLiteral(member.initializer)) {
                        value = member.initializer.text;
                    } else if (member.initializer && ts.isNumericLiteral(member.initializer)) {
                        value = parseInt(member.initializer.text);
                    }

                    members.push({
                        name: memberName,
                        value: value
                    });
                }
            });

            enums.push({
                name: enumName,
                members: members
            });
        }

        ts.forEachChild(node, visit);
    }

    visit(node);
    return enums;
}

// Convert to JSON and write to file
const enumData = enumsToJson(sourceFile);
const jsonContent = JSON.stringify(enumData, null, 2);

import * as fs from 'fs';

// Ensure dist directory exists
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Write JSON file
fs.writeFileSync(path.resolve(distDir, 'enums-' + new Date().toISOString() + '.json'), jsonContent);
fs.writeFileSync(path.resolve(distDir, 'enums-latest.json'), jsonContent);