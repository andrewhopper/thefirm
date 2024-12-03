import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType, UserProfileAttributes } from "../../user_profile";
import { UserProfile } from "../../user_profile";

const a: UserProfileAttributes = {
    role: "marketing strategy",
    responsibility: "develop and implement the company's marketing strategy",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['marketing_plan', 'marketing_strategy', 'marketing_budget', 'marketing_campaign', 'marketing_report', 'marketing_analysis', 'marketing_evaluation'],
    preferred_tools: ['notion', 'google_docs', 'excel'],
    preferred_strategies: ['marketing_strategy', 'marketing_planning', 'marketing_analysis']
}

const marketing_strategist = new UserProfile("Lilly", "Marketing Strategist", a);

export default marketing_strategist;
