import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType, UserProfileAttributes } from "../../user_profile";
import { UserProfile } from "../../user_profile";

const a: UserProfileAttributes = {
    role: "chief of staff",
    responsibility: "manage the company",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['project_plan', 'project_timeline', 'project_budget', 'project_risk_management', 'project_communication_plan', 'project_resource_allocation', 'project_status_report'],
    preferred_tools: ['excel', 'powerpoint', 'notion'],
    preferred_strategies: ['eisenhower_matrix', 'time_blocking', 'pomodoro_technique'],
    key_life_experiences: ['startup', 'growth', 'scale'],
    hobbies: ['reading', 'traveling', 'cooking', 'gardening'],
    education: ['mba', 'business_administration', 'finance'],
    work_history: ['startup', 'growth', 'scale'],
    birth_date: '1995-01-01',
    gender: 'female',
    location: 'New York, NY',
    heritage: 'Danish',
    interests: ['entrepreneurship', 'finance', 'technology'],
    values: ['integrity', 'innovation', 'customer_focus'],
    gallup_strengths: ['adaptability', 'communication', 'focus'],
    predictive_index: ['self_awareness', 'empathy', 'communication'],
    disc_profile: ['dominance', 'influence', 'steadiness', 'conformity'],
    family_status: 'single',
    sleep_level: "high",
    energy_level: "medium",
    focus_level: "high",
    political_views: "moderate",
    drug_use: "recreational",
    learning_rate: "high",
    favorite_activities: ["yoga", "reading", "traveling", "spinning"],
}

const cos = new UserProfile("John", "Chief of Staff", a);

export default cos;

