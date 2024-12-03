import * as fs from 'fs';
import * as path from 'path';
// @todo fix broken file

function loadClasses() {
    // const artifactsJsonPath = path.join(__dirname, '../../dist/artifacts-latest.json');
    // console.log('Attempting to read from:', artifactsJsonPath);
    // const fileContent = fs.readFileSync(artifactsJsonPath, 'utf-8');
    // console.log('File content:', fileContent);
    // const artifactsJson = JSON.parse(fileContent);

    const artifactsJson = require("../../dist/artifacts-latest.json");


    // Create a type mapping from the JSON data
    const artifactTypes: { [key: string]: { [key: string]: string } } = {};
    artifactsJson.forEach((classInfo: any) => {
        artifactTypes[classInfo.name] = {};
        classInfo.properties.forEach((prop: any) => {
            artifactTypes[classInfo.name][prop.name] = prop.type;
        });
    });
    return artifactTypes;
}

function loadEnums() {
    // const enumsJsonUrl = path.join(__dirname, '../../dist/enums-latest.json');
    // const enumsJson = JSON.parse(fs.readFileSync(enumsJsonUrl, 'utf-8'));

    const enumsJson = require("../../dist/enums-latest.json");


    // Create a type mapping from the JSON data
    const enums: { [key: string]: { [key: string]: string } } = {};
    enumsJson.forEach((classInfo: any) => {
        enums[classInfo.name] = {};
        classInfo.members.forEach((prop: any) => {
            enums[classInfo.name][prop.name] = prop.value;
        });
    });
    return enums;
}

function resolveSchema(artifactName: string): string {
    const artifactTypes = loadClasses();
    const enums = loadEnums();

    if (enums[artifactName]) {
        return "enum " + artifactName + "{" + JSON.stringify(enums[artifactName]) + "}";
    }

    // console.log("attempting to resolve schema for", artifactName);

    // console.log(artifactTypes);
    // console.log(enums);
    // resolve inheritance

    if (artifactTypes[artifactName]) {
        const class_schema = artifactTypes[artifactName];
        let parents = [];
        let x = [];

        for (const [key, value] of Object.entries(enums)) {
            if (key === 'enum ' + artifactName) {
                return JSON.stringify(value);
            }
        }

        x.push("guid: string;");
        x.push("created_at: Date;");
        x.push("updated_at: Date;");
        x.push("creators: string[];");
        x.push("name: string;");
        x.push("description: string;");
        x.push("version: number;");


        for (const [key, value] of Object.entries(class_schema)) {
            if (['string', 'number', 'boolean', 'string[]', 'Date'].includes(value)) {
                x.push(`${key}: ${value}`);
            }
            else {

                try {
                    const v = value.split("[]")[0];
                    if (v.includes("[]")) {
                        x.push(`${key}: ${v}[]`);
                    }
                    else {
                        x.push(`${key}: ${v}`);
                    }
                    //console.log("resolving", v);
                    parents.push(resolveSchema(v));
                }
                catch (e) {
                    if (enums[value]) {
                        x.push(`${key}: ${enums[value]}`);
                    }
                    else {
                        console.warn(`No type information found for artifact: ${artifactName} ${key}: ${value}`);
                    }
                }
            }
        }
        if (parents.length > 0) {
            const y = parents.join("\n") + "\n" + "class " + artifactName + " \n{" + x.join(", \n") + "\n\n}";
            // console.log("resolved schema for", artifactName, y);
            return y;
        }
        else {
            const z = "class " + artifactName + "\n {" + x.join(", \n") + "\n\n}";
            // console.log("resolved schema for", artifactName, z);
            return z;
        }
    }
    else {
        throw new Error(`No type information found for artifact: ${artifactName}`);
    }


}

function getArtifactSchema(artifactName: string): string {
    return resolveSchema(artifactName);
}


export { getArtifactSchema };