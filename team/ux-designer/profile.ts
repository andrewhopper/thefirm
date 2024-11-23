import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType } from "../user_profile";
import { UserProfile } from "../user_profile";

const ux_designer: UserProfile = {
    role: "ux designer",
    responsibilities: "design the company's user experience",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['user_interface_design', 'user_experience_design', 'user_interface_design', 'user_experience_design'],
    preferred_tools: ['notion', 'google_docs', 'figma'],
    preferred_strategies: ['user_interface_design', 'user_experience_design']
}

export default ux_designer;