import { UserProfile } from "../user_profile";
import brand_director from "./brand_director/profile";
import backend_eng from "./backend_eng/profile";
import business_analyst from "./business_analyst/profile";
import ceo from "./ceo/profile";
import chief_of_staff from "./chief_of_staff/profile";
import cmo from "./cmo/profile";
import coo from "./coo/profile";
import copywriter from "./copywriter/profile";
import cpo from "./cpo/profile";
//import cro from "./cro/profile";
import cto from "./cto/profile";
//import customer_success from "./customer-success/profile";
//import ea from "./ea/profile";
import frontend_eng from "./frontend-eng/profile";
import marketing_analyst from "./marketing_analyst/profile";
import marketing_strategist from "./marketing-strategist/profile";
import product_manager from "./product-manager/profile";
import social_media_marketer from "./social_media_marketing/profile";
import techlead from "./techlead/profile";
import ux_designer from "./ux-designer/profile";
import ux_researcher from "./ux-researcher/profile";

const roles: { [key: string]: UserProfile } = {
    'brand_director': brand_director, 'backend_eng': backend_eng,
    'business_analyst': business_analyst, 'ceo': ceo, 'chief_of_staff': chief_of_staff,
    'cmo': cmo, 'coo': coo, 'copywriter': copywriter, 'cpo': cpo, 'frontend_eng':
        frontend_eng, 'marketing_analyst': marketing_analyst,
    'marketing_strategist': marketing_strategist, 'product_manager':
        product_manager, 'social_media_marketer':
        social_media_marketer, 'techlead': techlead, 'ux_designer': ux_designer,
    'ux_researcher': ux_researcher
};

const getUserProfile = (role: string) => {
    console.log("fetching user profile for role: ", role);
    if (roles[role] === undefined) {
        throw new Error("User profile is undefined");
    }
    return roles[role];
}

export { roles, getUserProfile };

