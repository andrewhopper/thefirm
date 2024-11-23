import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType } from "../user_profile";
import { UserProfile } from "../user_profile";

const backend_eng: UserProfile = {
    role: "business analyst",
    responsibilities: "analyze the business",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.MEDIUM,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['analyst_note', 'projection', 'excel_report'],
    preferred_tools: ['excel', 'powerpoint', 'notion'],
    preferred_strategies: ['proforma', 'financial_modeling', 'gaap', 'CFA', 'CFP']
}

console.log(backend_eng);