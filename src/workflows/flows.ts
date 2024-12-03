import { UserProfile } from "../actors/user_profile";

import ceo from "../actors/team/ceo/profile";
import coo from "../actors/team/cmo/profile";
import ux_researcher from "../actors/team/ux-researcher/profile";
import techlead from "../actors/team/techlead/profile";
import ux_designer from "../actors/team/ux-designer/profile";
import brand_director from "../actors/team/brand_director/profile";
import product_manager from "../actors/team/product-manager/profile";
import cto from "../actors/team/cto/profile";
import cmo from "../actors/team/cmo/profile";
import business_analyst from "../actors/team/business_analyst/profile";
import copywriter from "../actors/team/copywriter/profile";
import marketing_strategist from "../actors/team/marketing-strategist/profile";
import frontend_eng from "../actors/team/frontend-eng/profile";
import chief_of_staff from "../actors/team/chief_of_staff/profile";
import ciso from "../actors/team/ciso/profile";
import andrew_context from "../context/context";

import { Artifact } from "../artifacts/artifacts";

class Flow {
   name: string;
   description: string;
   task: string;
   artifacts: string[];
   by: UserProfile;
   context: string;
   constructor(name: string, description: string, task: string, context: string, artifacts: string[], by: UserProfile) {
      this.name = name;
      this.description = description;
      this.task = task;
      this.artifacts = artifacts;
      this.by = by;
      this.context = context;
   }
}

const flows: Flow[] = [];



// const f1 = {} as Flow;
// f1.name = "brand design";
// f1.description = "create a brand for the company";
// f1.task = "create a brand style guide";
// f1.artifacts = ['Brand'];
// f1.by = brand_director;
// flows.push(f1);


// const f2 = {} as Flow;
// f2.name = "brand style guide";
// f2.description = "create a brand style guide";
// f2.task = "create a brand style guide";
// f1.artifacts = ['BrandStyleGuide'];
// f1.by = brand_director;

// flows.push(f2);

// const f3 = {} as Flow;
// f3.name = "brand presentation";
// f3.description = "create a presentation with the brand style guide";
// f3.task = "create a presentation for the brand";
// f3.artifacts = ['Presentation'];
// f3.by = brand_director;
// flows.push(f3);


// const f4 = {} as Flow;
// f4.name = 'build a facebook login form';
// f4.description = "create a facebook login form";
// f4.task = "create a facebook login form";
// f4.artifacts = ['Code'];
// f4.by = frontend_eng;
// flows.push(f4);


// const f5 = {} as Flow;
// f5.name = "research task management for adhd";
// f5.description = "research task management for adhd";
// f5.task = "research task management for adhd";
// f5.artifacts = ['ResearchArtifact'];
// f5.by = marketing_strategist;
// flows.push(f5);

// const f6 = {} as Flow;
// f6.name = "research AI agents to automate devops";
// f6.description = "research AI agents to automate devops";
// f6.task = "research AI agents to automate devops";
// f6.artifacts = ['ResearchArtifact'];
// f6.by = marketing_strategist;
// flows.push(f6);


// const f7 = {} as Flow;
// f7.name = "research apps for cultivating happiness";
// f7.description = "research apps for cultivating happiness";
// f7.task = "research apps for cultivating happiness";
// f7.artifacts = ['ResearchArtifact'];
// f7.by = marketing_strategist;
// flows.push(f7);


const context = `
${andrew_context}

<TASK FRAMEWORK>
1. Initial Assessment - Initiallly assess all the tasks for the day.
   - Input validation: [criteria]
   - Prerequisite check: [requirements]
2. Execution Steps
   - Primary sequence: [steps]
   - Alternative paths: [conditions]
3. Quality Control
   - Validation points: [checkpoints, make sure the task is well defined and has all the information needed to complete the task]
   - Error handling: [procedures, make sure to handle errors and edge cases]
</TASK FRAMEWORK>

<OUTPUT FORMAT>
The output should be a JSON as defined by the task framework.

Also product a markdown report of the tasks and their status.

After you have completed the task ask Andrew if you should do anything else.  Suggest 1-3 things that he might want to do like creating a gantt chart for the day, creating an eisenhower matrix for the day, or creating a list of tasks for the day or taking a minute to pray or check in with his body.
</OUTPUT FORMAT>

<ERROR HANDLING>
If you make a mistake, correct your previous step and try again.
If you need more information, ask Andrew.
If you are unable to complete a task, delegate it to the appropriate person.
If you are unable to delegate a task, add it to Andrew's task list.
</ERROR HANDLING>

`

const f8 = {} as Flow;
f8.name = "prioritize tasks";
f8.description = "prioritize tasks";
f8.context = context;
f8.task = `
prioritize tasks - triage slack, triage email, triage calendar, triage tasks, prep for manage check in, 
update Salesforce.com entries for annual reviews, get sausage for dinner,
 respond to messages from wife, get a haircut, move the boat to storage`;
f8.artifacts = ['TaskList'];
f8.by = chief_of_staff;
flows.push(f8);


export { flows };

