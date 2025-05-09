import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType, UserProfileAttributes } from "../../user_profile";
import { UserProfile } from "../../user_profile";

const a: UserProfileAttributes = {
    role: "chief product officer",
    responsibility: "manage the company's product",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['product_roadmap', 'product_specification', 'product_development_plan', 'product_release_plan', 'product_launch_plan', 'product_marketing_plan', 'product_sales_plan'],
    preferred_tools: ['notion', 'google_docs', 'excel'],
    preferred_strategies: ['product_management', 'agile_product_management', 'lean_product_management']
}

const cpo = new UserProfile("John", "CPO", a);

export default cpo;
