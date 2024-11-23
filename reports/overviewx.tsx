
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
import { flows } from "../workflows/flows";


const profiles: UserProfile[] = [ceo, cto, cmo, chief_of_staff, ciso, business_analyst, copywriter, marketing_strategist, frontend_eng, ux_researcher, ux_designer, product_manager, techlead];

profiles.forEach(profile => {
    console.log(profile.name, profile.title, profile.attributes.mbti_type, profile.attributes.work_type);
});

flows.forEach(flow => {
    console.log(flow.name, flow.description, flow.from.name, flow.to.name, flow.timeout_seconds);
});




