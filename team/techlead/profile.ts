import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType } from "../user_profile";
import { UserProfile } from "../user_profile";

const techlead: UserProfile = {
    role: "tech lead",
    responsibilities: "lead the company's technical team",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['technical_specification', 'user_interface_design', 'user_experience_design', 'technical_specification', 'user_interface_design', 'user_experience_design'],
    preferred_tools: ['notion', 'google_docs', 'figma'],
    preferred_strategies: ['technical_specification', 'user_interface_design', 'user_experience_design']
}

export default techlead;