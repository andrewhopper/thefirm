"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var path = require("path");
var url_1 = require("url");
var path_1 = require("path");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = (0, path_1.dirname)(__filename);
// Specify the path to your TypeScript file
var filePath = path.resolve(__dirname, '../src/artifacts/artifacts.ts');
// Create a program to hold the source files
var program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
});
// Get the type checker for type information
var checker = program.getTypeChecker();
// Get the source file to analyze
var sourceFile = program.getSourceFile(filePath);
if (!sourceFile) {
    throw new Error("Source file not found: ".concat(filePath));
}
// Function to analyze nodes recursively
function analyzeNode(node) {
    if (ts.isClassDeclaration(node) && node.name) {
        var className = node.name.text;
        console.log("Class: ".concat(className));
        // Iterate over the class members
        node.members.forEach(function (member) {
            if (ts.isPropertyDeclaration(member) && member.name) {
                var propertyName = member.name.text;
                var symbol = checker.getSymbolAtLocation(member.name);
                if (symbol) {
                    var type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
                    if (['string', 'number', 'boolean'].includes(typeof type)) {
                    }
                    else {
                        console.log("----------------------------------");
                        console.log(propertyName);
                        console.log(type);
                    }
                    var typeString = checker.typeToString(type);
                    console.log("  Property: ".concat(propertyName, " (Type: ").concat(typeString, ")"));
                }
            }
        });
    }
    // Continue searching for classes in child nodes
    ts.forEachChild(node, analyzeNode);
}
// Function to convert class information to JSON
function classesToJson(node) {
    var classes = [];
    function visit(node) {
        if (ts.isClassDeclaration(node) && node.name) {
            var className = node.name.text;
            var properties_1 = [];
            node.members.forEach(function (member) {
                if (ts.isPropertyDeclaration(member) && member.name) {
                    var propertyName = member.name.text;
                    var symbol = checker.getSymbolAtLocation(member.name);
                    if (symbol) {
                        var type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
                        properties_1.push({
                            name: propertyName,
                            type: checker.typeToString(type)
                        });
                    }
                }
            });
            classes.push({
                name: className,
                properties: properties_1
            });
        }
        ts.forEachChild(node, visit);
    }
    visit(node);
    return classes;
}
// Convert to JSON and write to file
var classData = classesToJson(sourceFile);
var jsonContent = JSON.stringify(classData, null, 2);
var fs = require("fs");
// Ensure dist directory exists
var distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}
// Write JSON file
fs.writeFileSync(path.resolve(distDir, 'artifacts-' + new Date().toISOString() + '.json'), jsonContent);
// Start analyzing from the root node
analyzeNode(sourceFile);
