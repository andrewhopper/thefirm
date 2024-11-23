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

class Flow {
    name: string;
    description: string;
    from: UserProfile;
    to: UserProfile;
    timeout_seconds: number;
    constructor(name: string, description: string, from: UserProfile, to: UserProfile, timeout_seconds: number) {
        this.name = name;
        this.description = description;
        this.from = from;
        this.to = to;
        this.timeout_seconds = timeout_seconds;
    }
}

const flows: Flow[] = [];

flows.push(new Flow(
    "brand approval",
    "ceo approves the brand",
    ceo,
    cmo,
    10
));

export { flows };

