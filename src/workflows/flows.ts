import { UserProfile } from "../actors/user_profile";

import ceo from "../actors/team/ceo/profile";
import coo from "../actors/team/cmo/profile";
import ux_researcher from "../actors/team/ux-researcher/profile";
import techlead from "../actors/team/techlead/profile";
import ux_designer from "../actors/team/ux-designer/profile";
import brand_director from "../actors/team/brand-director/profile";
import product_manager from "../actors/team/product-manager/profile";
import cto from "../actors/team/cto/profile";
import cmo from "../actors/team/cmo/profile";
import business_analyst from "../actors/team/business-analyst/profile";
import copywriter from "../actors/team/copywriter/profile";
import marketing_strategist from "../actors/team/marketing-strategist/profile";
import frontend_eng from "../actors/team/frontend-eng/profile";
import chief_of_staff from "../actors/team/chief-of-staff/profile";
import ciso from "../actors/team/ciso/profile";

import { Artifact } from "../artifacts/artifacts";

class Flow {
    name: string;
    description: string;
    task: string;
    artifacts: string[];
    by: UserProfile;
    constructor(name: string, description: string, task: string, artifacts: string[], by: UserProfile) {
        this.name = name;
        this.description = description;
        this.task = task;
        this.artifacts = artifacts;
        this.by = by;
    }
}

const flows: Flow[] = [];



const f1 = {} as Flow;
f1.name = "brand design";
f1.description = "create a brand for the company";
f1.task = "create a brand style guide";
f1.artifacts = ['Brand'];
f1.by = brand_director;
flows.push(f1);


const f2 = {} as Flow;
f2.name = "brand style guide";
f2.description = "create a brand style guide";
f2.task = "create a brand style guide";
f1.artifacts = ['BrandStyleGuide'];
f1.by = brand_director;

flows.push(f2);

const f3 = {} as Flow;
f3.name = "brand presentation";
f3.description = "create a presentation with the brand style guide";
f3.task = "create a presentation for the brand";
f3.artifacts = ['Presentation'];
f3.by = brand_director;
flows.push(f3);

export { flows };

