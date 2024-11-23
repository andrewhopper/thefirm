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

// Function to analyze nodes recursively
function analyzeNode(node: ts.Node) {
    if (ts.isClassDeclaration(node) && node.name) {
        const className = node.name.text;
        console.log(`Class: ${className}`);

        // Iterate over the class members
        node.members.forEach((member) => {
            if (ts.isPropertyDeclaration(member) && member.name) {
                const propertyName = (member.name as ts.Identifier).text;
                const symbol = checker.getSymbolAtLocation(member.name);

                if (symbol) {
                    const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
                    const typeString = checker.typeToString(type);
                    console.log(`  Property: ${propertyName} (Type: ${typeString})`);
                }
            }
        });
    }

    // Continue searching for classes in child nodes
    ts.forEachChild(node, analyzeNode);
}

// Function to convert class information to JSON
function classesToJson(node: ts.Node): any[] {
    const classes: any[] = [];

    function visit(node: ts.Node) {
        if (ts.isClassDeclaration(node) && node.name) {
            const className = node.name.text;
            const properties: any[] = [];

            node.members.forEach((member) => {
                if (ts.isPropertyDeclaration(member) && member.name) {
                    const propertyName = (member.name as ts.Identifier).text;
                    const symbol = checker.getSymbolAtLocation(member.name);

                    if (symbol) {
                        const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
                        properties.push({
                            name: propertyName,
                            type: checker.typeToString(type)
                        });
                    }
                }
            });

            classes.push({
                name: className,
                properties: properties
            });
        }

        ts.forEachChild(node, visit);
    }

    visit(node);
    return classes;
}

// Convert to JSON and write to file
const classData = classesToJson(sourceFile);
const jsonContent = JSON.stringify(classData, null, 2);

import * as fs from 'fs';

// Ensure dist directory exists
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Write JSON file
fs.writeFileSync(path.resolve(distDir, 'artifacts-' + new Date().toISOString() + '.json'), jsonContent);

// Start analyzing from the root node
analyzeNode(sourceFile);