import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType } from "../user_profile";
import { UserProfile } from "../user_profile";

const ux_researcher: UserProfile = {
    role: "ux researcher",
    responsibilities: "research the company's user experience",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['user_experience_research', 'user_experience_research'],
    preferred_tools: ['notion', 'google_docs', 'figma'],
    preferred_strategies: ['user_experience_research']
}

export default ux_researcher;