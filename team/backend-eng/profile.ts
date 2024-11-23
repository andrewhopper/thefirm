import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType, UserProfileAttributes } from "../user_profile";
import { UserProfile } from "../user_profile";

const a: UserProfileAttributes = {
    role: "backend engineer",
    responsibilities: "build the backend",
    mbti_type: "INTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.HIGH,
    work_resolution: WorkResolution.Tactical,
    artifact_types: [ArtifactType.CODE],
    preferred_tools: ['nextjs', 'tailwind', 'supabase', 'postgres', 'nodejs', 'typescript'],
    preferred_strategies: ['test_driven_development']
}

const be = new UserProfile("James", "Backend Engineer", a);

export default be;
