
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

console.log("\nThe Workflows:");
flows.forEach(flow => {
    console.log(flow.name, flow.description, flow.from.name, flow.to.name, flow.timeout_seconds);
});



