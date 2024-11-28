import * as fs from 'fs';

// @todo fix broken file

// Function to get type information for an artifact
function getArtifactTypes(artifactName: string): string {

    const artifactsJsonUrl = new URL('../..//dist/artifacts-latest.json', import.meta.url);
    const artifactsJson = JSON.parse(fs.readFileSync(artifactsJsonUrl, 'utf-8'));

    // Create a type mapping from the JSON data
    const artifactTypes: { [key: string]: { [key: string]: string } } = {};
    artifactsJson.forEach((classInfo: any) => {
        artifactTypes[classInfo.name] = {};
        classInfo.properties.forEach((prop: any) => {
            artifactTypes[classInfo.name][prop.name] = prop.type;
        });
    });


    const enumsJsonUrl = new URL('../../dist/enums-latest.json', import.meta.url);
    const enumsJson = JSON.parse(fs.readFileSync(enumsJsonUrl, 'utf-8'));

    // Create a type mapping from the JSON data
    const enums: { [key: string]: { [key: string]: string } } = {};
    enumsJson.forEach((classInfo: any) => {
        enums[classInfo.name] = {};
        classInfo.members.forEach((prop: any) => {
            enums[classInfo.name][prop.name] = prop.value;
        });
    });

    const class_schema = artifactTypes[artifactName];
    let parents = [];
    let x = [];
    for (const [key, value] of Object.entries(class_schema)) {
        if (['string', 'number', 'boolean', 'string[]', 'Date'].includes(value)) {
            x.push(`${key}: ${value}`);
        }
        else {

            try {
                const v = value.split("[]")[0];
                parents.push(getArtifactTypes(v));
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
        return parents.join("\n") + "\n" + "class " + artifactName + " {" + x.join(", ") + "}";
    }
    else {
        return "class " + artifactName + " {" + x.join(", ") + "}";
    }

    console.warn(`No type information found for artifact: ${artifactName}`);
}

export { getArtifactTypes };