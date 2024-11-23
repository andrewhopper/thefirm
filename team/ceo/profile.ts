import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType, UserProfileAttributes } from "../user_profile";
import { UserProfile } from "../user_profile";

const a: UserProfileAttributes = {
    role: "ceo",
    responsibilities: "lead the company",
    mbti_type: "ENTP",
    work_type: WorkType.STRATEGIC,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.HIGH,
    creativity: Creativity.HIGH,
    work_resolution: WorkResolution.Visionary,
    artifact_types: ['business_plan', 'pitch_deck', 'financial_projections', 'strategic_initiatives', 'key_performance_indicators', 'risk_management', 'investor_relations'],
    preferred_tools: ['excel', 'powerpoint', 'notion'],
    preferred_strategies: ['lean_canvas', 'lean_startup_canvas', 'business_model_canvas']
}

const ceo = new UserProfile("John", "CEO", a);

export default ceo;
