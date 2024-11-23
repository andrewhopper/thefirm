import { UserProfile } from "../team/user_profile";

import ceo from "../team/ceo/profile";
import coo from "../team/cmo/profile";
import ux_researcher from "../team/ux-researcher/profile";
import techlead from "../team/techlead/profile";
import ux_designer from "../team/ux-designer/profile";
import product_manager from "../team/product-manager/profile";
import cto from "../team/cto/profile";
import cmo from "../team/cmo/profile";
import business_analyst from "../team/business-analyst/profile";
import copywriter from "../team/copywriter/profile";
import marketing_strategist from "../team/marketing-strategist/profile";
import frontend_eng from "../team/frontend-eng/profile";
import chief_of_staff from "../team/chief-of-staff/profile";
import ciso from "../team/ciso/profile";

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

