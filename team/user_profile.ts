enum WorkType {
    TACTICAL = "tactical",
    STRATEGIC = "strategic"
}

enum WorkResolution {
    Visionary = "visionary", // 30,000 ft view  
    Strategic = "strategic", // 10,000 ft view
    Tactical = "tactical", // 1,000 ft view
    Operational = "operational" // 100 ft view
}

enum AttentionToDetail {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}

enum CommunicationStyle {
    FORMAL = "formal",
    INFORMAL = "informal"
}

enum RiskTolerance {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}

enum Creativity {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}

enum ArtifactType {
    DOCUMENT = "document",
    CODE = "code",
    DESIGN = "design",
    IDEA = "idea",
    MEMO = "memo",
    REPORT = "report",
    EMAIL = "email",
    MEETING_NOTES = "meeting_notes",
    PRESENTATION = "presentation",
    TASK_LIST = "task_list",
    WORK_PLAN = "work_plan",
    COPY = "copy",
    ANALYSIS = "analysis",
    RESEARCH = "research",
    ANALYST_NOTE = "analyst_note",
    BRAND_ASSETS = "brand_assets",
    BRAND_LOGOS = "brand_logos",
    BRAND_STYLE_GUIDE = "brand_style_guide",
    BRAND_PRESENTATION = "brand_presentation",
    BRAND_COLORS = "brand_colors",
    BRAND_TYPOGRAPHY = "brand_typography",
    BRAND_IMAGES = "brand_images",
    BRAND_VIDEO = "brand_video",
    BRAND_SOUND = "brand_sound"
}

enum PreferredTool {
    V0 = "v0",
    BOLT_NEW = "bolt.new",
    NEXT_JS = "next.js",
    SUPABASE = "supabase",
    NEXTJS = "nextjs",
    TAILWIND = "tailwind",
    SHADCN = "shadcn",
    CHAKRA = "chakra",
    ANTHROPIC = "anthropic",
    TYPESCRIPT = "typescript",
    GOOGLE_SHEETS = "google_sheets",
    GOOGLE_SLIDES = "google_slides",
    GOOGLE_DOCS = "google_docs",
    MICROSOFT_WORD = "microsoft_word",
    MICROSOFT_EXCEL = "microsoft_excel",
    MICROSOFT_POWERPOINT = "microsoft_powerpoint"
}

enum PreferredStrategy {
    USER_RESEARCH = "user_research",
    A_B_TESTING = "a_b_testing",
    GUESS_AND_CHECK = "guess_and_check",
    LEAN_CANVAS = "lean_canvas",
    LEAN_STARTUP_CANVAS = "lean_startup_canvas",
    BUSINESS_MODEL_CANVAS = "business_model_canvas",
    CUSTOMER_DEVELOPMENT = "customer_development",
    CUSTOMER_SUPPORT = "customer_support",
    CUSTOMER_SUCCESS = "customer_success",
    CUSTOMER_DISCOVERY = "customer_discovery",
    SOLUTION_SELLING = "solution_selling",
    PERSONALIZATION = "personalization",
    PRODUCT_MARKET_FIT = "product_market_fit",
    AGILE_PROJECT_MANAGEMENT = "agile_project_management",
    SCRUM = "scrum",
    KANBAN = "kanban",
    TEST_DRIVEN_DEVELOPMENT = "test_driven_development",

}

export interface UserProfileAttributes {
    role: string; // role in the team,
    responsibilities: string; // what the user does,
    mbti_type: string; // mbti type of the user,
    work_type: WorkType; // tactical or strategic,
    attention_to_detail: AttentionToDetail; // how much the user pays attention to detail,
    communication_style: CommunicationStyle; // how the user communicates with the team
    risk_tolerance: RiskTolerance; // how much the user tolerates risk
    creativity: Creativity; // how creative the user is
    work_resolution: WorkResolution; // how deep the user dives into the work
    artifact_types: string[]; // types of artifacts the user creates
    preferred_tools: string[]; // tools the user prefers to use
    preferred_strategies: string[]; // strategies the user prefers to use
}

class UserProfile {
    name: string;
    title: string;
    attributes: UserProfileAttributes;
    constructor(role: string, attributes: UserProfileAttributes) {
        this.attributes = attributes;
    }
}

export { UserProfile, WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, AttentionToDetail, ArtifactType, PreferredTool, PreferredStrategy };