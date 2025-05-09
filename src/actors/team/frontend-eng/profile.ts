import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType, UserProfileAttributes } from "../../user_profile";
import { UserProfile } from "../../user_profile";

const a: UserProfileAttributes = {
    role: "frontend engineer",
    responsibility: "build the company's frontend",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['website', 'web_app', 'mobile_app', 'api_documentation', 'technical_specification', 'user_interface_design', 'user_experience_design'],
    preferred_tools: ['notion', 'google_docs', 'figma'],
    preferred_strategies: ['user_experience_design', 'user_interface_design', 'technical_specification']
}

const frontend_eng = new UserProfile("John", "Frontend Engineer", a);

export default frontend_eng;
