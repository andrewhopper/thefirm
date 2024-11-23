import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType } from "../user_profile";
import { UserProfile } from "../user_profile";

const ciso: UserProfile = {
    role: "chief information security officer",
    responsibilities: "manage the company's information security",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['security_policy', 'security_procedure', 'security_audit', 'security_report'],
    preferred_tools: ['excel', 'powerpoint', 'notion'],
    preferred_strategies: ['iso_27001', 'iso_27002', 'iso_27003', 'iso_27004', 'iso_27005', 'iso_27006', 'iso_27007', 'iso_27008', 'iso_27009']
}

export default ciso;