import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType } from "../user_profile";
import { UserProfile } from "../user_profile";

const backend_eng: UserProfile = {
    role: "brand director",
    responsibilities: "create and enforce the brand",
    mbti_type: "ENFP",
    work_type: WorkType.STRATEGIC,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.HIGH,
    creativity: Creativity.HIGH,
    work_resolution: WorkResolution.Visionary,
    artifact_types: ['brand_assets', 'brand_logos', 'brand_style_guide', 'brand_presentation', 'brand_colors', 'brand_typography', 'brand_images', 'brand_video', 'brand_sound'],
    preferred_tools: ['figma'],
    preferred_strategies: ['user_persona', 'user centered design']
}

console.log(backend_eng);