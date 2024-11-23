import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType } from "../user_profile";
import { UserProfile, UserProfileAttributes } from "../user_profile";



const cooAttributes: UserProfileAttributes = {
    role: "chief operating officer",
    responsibilities: "manage the company's operations",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['project_plan', 'project_timeline', 'project_budget', 'project_risk_management', 'project_communication_plan', 'project_resource_allocation', 'project_status_report'],
    preferred_tools: ['excel', 'powerpoint', 'notion'],
    preferred_strategies: ['agile_project_management', 'scrum', 'kanban']
}

const coo = new UserProfile("John Doe", "COO", cooAttributes);

export default coo;