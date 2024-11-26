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
    responsibility: string; // what the user does,
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
    key_life_experiences: string[]; // key life experiences the user has had
    hobbies: string[]; // hobbies the user has
    education: string[]; // education the user has
    work_history: string[]; // work history the user has
    birth_date: string; // birth date of the user
    gender: string; // gender of the user
    location: string; // location of the user
    heritage: string; // heritage of the user
    interests: string[]; // interests of the user
    values: string[]; // values of the user
    gallup_strengths: string[]; // gallup strengths of the user
    predictive_index: string[]; // predictive index of the user
    disc_profile: string[]; // disc profile of the user
    family_status: string; // family status of the user
    pets: string[]; // pets the user has
    children: string[]; // children the user has
    political_views: string; // political views of the user
    religious_views: string; // religious views of the user
    favorite_books: string[]; // favorite books of the user
    favorite_movies: string[]; // favorite movies of the user
    favorite_music: string[]; // favorite music of the user
    favorite_sports: string[]; // favorite sports of the user
    favorite_foods: string[]; // favorite foods of the user
    favorite_colors: string[]; // favorite colors of the user
    favorite_animals: string[]; // favorite animals of the user
    favorite_activities: string[]; // favorite activities of the user
    favorite_destinations: string[]; // favorite destinations of the user
    key_accomplishments: string[]; // key accomplishments of the user
    key_failures: string[]; // key failures of the user
    learning_style: string; // learning style of the user
    preferred_learning_methods: string[]; // preferred learning methods of the user 
    preferred_feedback_style: string; // preferred feedback style of the user
    preferred_feedback_frequency: string; // preferred feedback frequency of the user
    preferred_communication_style: string; // preferred communication style of the user
    preferred_meeting_style: string; // preferred meeting style of the user
    key_influencers: string[]; // key influencers of the user
    mother: UserProfile;
    father: UserProfile;
    spouse: UserProfile;
    best_friend: UserProfile;
    mentor: UserProfile;
    role_model: UserProfile;
    parent_profile_id: UserProfile;
    emotional_state: ['emotional_stability', 'emotional_instability'];
    emotional_variance: ['low', 'medium', 'high'];
}

const roboticNames = [
    "RoboRachel",
    "CyberChloe",
    "AIAshley",
    "BinaryBen",
    "ComputerCarl",
    "AgentAlice",
    "DataDave",
    "ProcessorPete",
    "MachineMia",
    "AlgorithmAlex",
    "TechTessa",
    "RoboRyan",
    "CircuitCara",
    "AgentAiden",
    "BotBrenda",
    "CyberChris",
    "AIAnna",
    "ComputerCole",
    "RoboRuby",
    "ProcessorPaul",
    "DataDiana",
    "BinaryBella",
    "TechThomas",
    "CircuitCody",
    "MachineMark",
    "AlgorithmAva",
    "BotBrandon",
    "CyberCassie",
    "AIAndrew",
    "RoboRose"
];

class UserProfile {
    name: string;
    title: string;
    attributes: UserProfileAttributes;
    constructor(name: string, title: string, attributes: UserProfileAttributes) {
        this.name = roboticNames[Math.floor(Math.random() * roboticNames.length)];
        this.title = title;
        this.attributes = attributes;
    }
}

export { UserProfile, WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, AttentionToDetail, ArtifactType, PreferredTool, PreferredStrategy };