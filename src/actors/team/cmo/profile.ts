import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType, UserProfileAttributes } from "../../user_profile";
import { UserProfile } from "../../user_profile";

const a: UserProfileAttributes = {
    role: "chief marketing officer",
    responsibility: "manage the company's marketing",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['marketing_plan', 'marketing_strategy', 'marketing_campaign', 'marketing_plan', 'marketing_strategy', 'marketing_campaign'],
    preferred_tools: ['notion', 'google_docs', 'figma'],
    preferred_strategies: ['marketing_plan', 'marketing_strategy', 'marketing_campaign']
}

const cmo = new UserProfile("John", "CMO", a);

export default cmo;
