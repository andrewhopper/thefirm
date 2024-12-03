import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';

import 'reflect-metadata';

import { UserProfile } from "../actors/user_profile";
import ceo from "../actors/team/ceo/profile";
import coo from "../actors/team/cmo/profile";
import ux_researcher from "../actors/team/ux-researcher/profile";
import techlead from "../actors/team/techlead/profile";
import ux_designer from "../actors/team/ux-designer/profile";
import product_manager from "../actors/team/product-manager/profile";
import cto from "../actors/team/cto/profile";
import cmo from "../actors/team/cmo/profile";
import business_analyst from "../actors/team/business_analyst/profile";
import copywriter from "../actors/team/copywriter/profile";
import marketing_strategist from "../actors/team/marketing-strategist/profile";
import frontend_eng from "../actors/team/frontend-eng/profile";
import chief_of_staff from "../actors/team/chief_of_staff/profile";
import ciso from "../actors/team/ciso/profile";
import { flows } from "../workflows/flows";
import innovators from "../actors/customers/innovators/profile";
import early_adopters from "../actors/customers/early_adopters/profile";
import early_majority from "../actors/customers/early_majority/profile";
import customer from "../actors/customers/profile";
import supplier from "../actors/suppliers/profile";
import investor from "../actors/investors/profile";
import { DesignArtifact, Brand } from "../artifacts/artifacts";

const profiles: UserProfile[] = [ceo, cto, cmo, chief_of_staff, ciso, business_analyst, copywriter, marketing_strategist, frontend_eng, ux_researcher, ux_designer, product_manager, techlead];

console.log("\nTThe Team:");
profiles.forEach(profile => {
    console.log(profile.name, profile.title, profile.attributes.mbti_type, profile.attributes.work_type);
});

const customers: UserProfile[] = [innovators, early_adopters, early_majority, customer];

console.log("\nThe Customers:")
customers.forEach(profile => {
    console.log(profile.name, profile.title);
});

const suppliers: UserProfile[] = [supplier];

console.log("\nThe Suppliers:")
suppliers.forEach(profile => {
    console.log(profile.name, profile.title);
});

const investors: UserProfile[] = [investor];

console.log("\nThe Investors:")
investors.forEach(profile => {
    console.log(profile.name, profile.title);
});




// Mapping of class names to their constructors
const classMap: { [key: string]: any } = {
    DesignArtifact: DesignArtifact,
    Brand: Brand,
    // Add other classes here if needed
};

// Function to dynamically print class attributes
function printClassAttributes(className: string) {
    const cls = classMap[className]; // Get the class constructor

    if (!cls) {
        console.error(`Class ${className} not found.`);
        return;
    }

    const instance = new cls(); // Create an instance of the class

    // Get the own property names of the instance
    const properties = Object.getOwnPropertyNames(instance);

    console.log(`Attributes of ${className}:`);
    properties.forEach((prop) => {
        const type = Reflect.getMetadata('design:type', instance, prop);
        const typeName = type && type.name ? type.name : 'unknown';
        console.log(`- ${prop}: ${instance[prop]} (Type: ${typeName})`);
    });
}

// Load and parse the artifacts types from JSON


const artifactsJsonUrl = new URL('../../dist/artifacts-latest.json', import.meta.url);
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

// Function to get type information for an artifact
function getArtifactTypes(artifactName: string) {
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


const user_profile_prompt = (user_profile: UserProfile) => {

    let persona_string = "";
    for (const [key, value] of Object.entries(user_profile.attributes)) {
        if (value !== undefined) {
            persona_string += `${key}: ${value}\n`;
        }
    }

    let r = "<USER ROLE>You are a " + user_profile.name + " who's title is " + user_profile.title + ". "
    r += "\n\nYou are responsible for " + user_profile.attributes.role + ".</USER ROLE> "
    r += "\n\n<USER PERSONA>" + persona_string + "</USER PERSONA>"
    return r;
}

const generatePrompt = (artifact: string, artifact_schema: string, context: any, task: string, requester: UserProfile) => {
    return user_profile_prompt(requester) +
        "\n\n<background> The context is " + context + ". </background>" +
        "\n\n<request>You are tasked with " + task + ".</request>" +
        "\n\nPlease create 2 versions of the artifact, each more refined than the last.</request>" +
        " \n\n<formatting correct responses>You are generating a " + artifact + " artifact.Return the artifact in JSON format using the following schema: " + artifact_schema + "</formatting correct responses>";
}


console.log("\nThe Workflows:");
flows.forEach(flow => {
    console.log("\n\n---------------------------------- \nFlow: " + flow.name + "\n");
    console.log(flow.description + "\n" + flow.task + "\n" + (flow.by ? flow.by.name : ""));
    try {
        flow.artifacts.forEach(artifact => {
            console.log("Output of :\n\n" + getArtifactTypes(artifact));
            console.log("\n\nPrompt:\n");
            console.log(generatePrompt(artifact, JSON.stringify(getArtifactTypes(artifact)), flow.context, flow.task, flow.by));
        });
    }
    catch (e) {
        console.log(flow.artifacts);
        console.warn(`No type information found for artifact: ${e}`);
    }
});




