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
import business_analyst from "../actors/team/business-analyst/profile";
import copywriter from "../actors/team/copywriter/profile";
import marketing_strategist from "../actors/team/marketing-strategist/profile";
import frontend_eng from "../actors/team/frontend-eng/profile";
import chief_of_staff from "../actors/team/chief-of-staff/profile";
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


const artifactsJsonUrl = new URL('../../dist/artifacts.json', import.meta.url);
const artifactsJson = JSON.parse(fs.readFileSync(artifactsJsonUrl, 'utf-8'));

// Create a type mapping from the JSON data
const artifactTypes: { [key: string]: { [key: string]: string } } = {};
artifactsJson.forEach((classInfo: any) => {
    artifactTypes[classInfo.name] = {};
    classInfo.properties.forEach((prop: any) => {
        artifactTypes[classInfo.name][prop.name] = prop.type;
    });
});

// Function to get type information for an artifact
function getArtifactTypes(artifactName: string) {
    if (artifactTypes[artifactName]) {
        return artifactTypes[artifactName];
    }
    console.warn(`No type information found for artifact: ${artifactName}`);
    return {};
}



const generatePrompt = (artifact: string, artifact_schema: string, context: any, requester: UserProfile) => {
    return "\n\nYou are a " + requester.name + " who's title is " + requester.title + ". " +
        " \n\nYou are generating a " + artifact + " artifact. The context is " + context + ". "
        + "\n\nPlease create 5 versions of the artifact, each more refined than the last. " +
        " \n\nReturn the artifact in JSON format using the following schema: " + artifact_schema + "\n";
}


console.log("\nThe Workflows:");
flows.forEach(flow => {
    console.log("\n\n---------------------------------- \n\n");
    console.log(flow.name, flow.description, flow.from.name, flow.to.name, flow.timeout_seconds);
    flow.artifacts.forEach(artifact => {
        console.log(getArtifactTypes(artifact));
        console.log(generatePrompt(artifact, JSON.stringify(getArtifactTypes(artifact)), flow.description, flow.from));
    });
});




