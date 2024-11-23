import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType } from "../user_profile";
import { UserProfile } from "../user_profile";

const copywriter: UserProfile = {
    role: "copywriter",
    responsibilities: "write copy for the company",
    mbti_type: "ENTJ",
    work_type: WorkType.TACTICAL,
    attention_to_detail: AttentionToDetail.HIGH,
    communication_style: CommunicationStyle.FORMAL,
    risk_tolerance: RiskTolerance.MEDIUM,
    creativity: Creativity.MEDIUM,
    work_resolution: WorkResolution.Tactical,
    artifact_types: ['copy', 'blog_post', 'email_copy', 'social_media_copy', 'product_description', 'website_copy', 'sales_copy', 'marketing_copy'],
    preferred_tools: ['notion', 'google_docs', 'copy.ai'],
    preferred_strategies: ['seo', 'copywriting_techniques', 'content_marketing']
}

export default copywriter;