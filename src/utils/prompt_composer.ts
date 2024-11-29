import { UserProfile } from "../actors/user_profile";
import { getArtifactSchema } from "../artifacts/artifact_metadata";

// This is the personality that the AI will take on.
const agent_profile_prompt = (user_profile: UserProfile) => {

    let persona_string = "";
    for (const [key, value] of Object.entries(user_profile.attributes)) {
        if (value !== undefined) {
            persona_string += `${key}: ${value}\n`;
        }
    }

    let r = "<AGENT ROLE>You to pretend to be " + user_profile.name + " who's title is " + user_profile.title + ". "
    r += "\n\nYou are responsible for " + user_profile.attributes.role + ".</AGENT ROLE> "
    r += "\n\n<AGENT PERSONA>" + persona_string + "</AGENT PERSONA>"
    return r;
}

// This is the prompt that the AI will use to generate an artifact.
const task_prompt = (artifact: string, task: string, requester: UserProfile, format: string) => {
    return "<requester_profile>" + requester.name + " is the " + requester.title + ".</requester_profile>" +
        "\n\n<request>You are tasked with " + task + ".</request>" +
        // "\n\nPlease create 2 versions of the artifact, each more refined than the last.</request>" +
        " \n\n<formatting correct responses>You are generating a " + artifact + " artifact. " +
        "\nReturn the artifact as " + format + ". Use the following schema to help you create the artifact: " + getArtifactSchema(artifact) + "</formatting correct responses>";
}


function promptComposer(task: string, requester_context: string, artifact: string, artifact_schema: string, requester_profile: UserProfile, actor_profile: UserProfile, output_format: string) {
    return `
<INFORMATION ABOUT THE REQUESTER>
${requester_context}
</INFORMATION ABOUT THE REQUESTER>

<AGENT PROFILE>
${agent_profile_prompt(actor_profile)}
</AGENT PROFILE>

<TASK>
${task_prompt(artifact, task, requester_profile, output_format)}
</TASK>

<TASK FRAMEWORK>
1. Initial Assessment 
   - Input validation: [criteria]
   - Prerequisite check: [requirements]
2. Execution Steps
   - Primary sequence: [steps]
   - Alternative paths: [conditions]
3. Quality Control
   - Validation points: [checkpoints]
   - Error handling: [procedures, make sure to handle errors and edge cases]
</TASK FRAMEWORK>

<ERROR HANDLING>
If you make a mistake, correct your previous step and try again.
If you need more information, ask the requester.
</ERROR HANDLING>
`
}


export default promptComposer;