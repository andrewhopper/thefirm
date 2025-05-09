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

/**
 * The Kirton Adaption-Innovation (KAI) theory measures individual preferences for creative problem solving and managing change.
 * It defines a spectrum from Adaptors, who prefer structured, incremental improvements within existing systems,
 * to Innovators, who prefer challenging norms and creating novel solutions. KAI emphasizes that both styles are equally valuable
 * and necessary for effective collaboration. This model structures dimensions based on cognitive preferences observed in KAI,
 * providing a scalable way to capture individual problem-solving styles across a -10 (Adaptor) to +10 (Innovator) range.
 */

enum PreferenceType {
    Adaptor = "Adaptor",
    Innovator = "Innovator",
}

// Lived experience at each endpoint
interface LivedExperience {
    cognitivePreference: string;
    preferenceType: PreferenceType;
}

// Dimension with slugs
interface Dimension {
    name: string;
    slug: string; // added slug
    leftEndpoint: LivedExperience;
    rightEndpoint: LivedExperience;
}

// Person with multiple dimensions
interface Person {
    name: string;
    dimensions: Dimension[];
}

interface IndicatorNumberToLabel {
    // Maps numeric preference scores (-10 to 10) to descriptive labels
    preferenceScale: {
        "-10": "Strong Dispreference";
        "-5": "Slight Dispreference";
        "0": "Neutral";
        "5": "Slight Preference";
        "10": "Strong Preference";
    };
}

enum KAIStrengthEnum {
    STRONG_DISPREFERENCE = "Strong Dispreference",
    SLIGHT_DISPREFERENCE = "Slight Dispreference",
    NEUTRAL = "Neutral",
    SLIGHT_PREFERENCE = "Slight Preference",
    STRONG_PREFERENCE = "Strong Preference"
}

interface KAIStrengthEnumToNumber {
    [KAIStrengthEnum.STRONG_DISPREFERENCE]: -10,
    [KAIStrengthEnum.SLIGHT_DISPREFERENCE]: -5,
    [KAIStrengthEnum.NEUTRAL]: 0,
    [KAIStrengthEnum.SLIGHT_PREFERENCE]: 5,
    [KAIStrengthEnum.STRONG_PREFERENCE]: 10
}

// do a meta analysis of Predictive Index, DISC, and Gallup Strengths to look how they cluster these traits
interface KaiNeuroStructure {
    name: string;

    // I love following rules and structure
    // I hate rules and prefer making my own way
    hates_rules: KAIStrengthEnum //(-10 to 10),

    // I like solving problems as they are given
    // I constantly question and reframe problems
    like_reframing: KAIStrengthEnum //(-10 to 10),

    // I prefer safe, predictable approaches
    // I willingly take risks and embrace uncertainty
    like_risk: KAIStrengthEnum //(-10 to 10),

    // I prefer gradual and controlled changes  
    // I seek sweeping, disruptive changes
    like_disruptive_change: KAIStrengthEnum //(-10 to 10),

    // I like working in an organized, planned way
    // I work best when I can be spontaneous and fluid
    like_spontaneity: KAIStrengthEnum //(-10 to 10),

    // I focus heavily on details and precision
    like_big_picture: KAIStrengthEnum //(-10 to 10),

    // I cooperate naturally with authority figures
    // I question and often challenge authority
    like_freedom: KAIStrengthEnum //(-10 to 10),
}




// KAI-inspired Dimensions with slugs
const KAI_Dimensions: Dimension[] = [
    {
        name: "Approach to Rules",
        slug: "approach-to-rules",
        leftEndpoint: {
            cognitivePreference: "I love following rules and structure",
            preferenceType: PreferenceType.Adaptor,
        },
        rightEndpoint: {
            cognitivePreference: "I hate rules and prefer making my own way",
            preferenceType: PreferenceType.Innovator,
        },
    },
    {
        name: "Problem Framing",
        slug: "problem-framing",
        leftEndpoint: {
            cognitivePreference: "I like solving problems as they are given",
            preferenceType: PreferenceType.Adaptor,
        },
        rightEndpoint: {
            cognitivePreference: "I constantly question and reframe problems",
            preferenceType: PreferenceType.Innovator,
        },
    },
    {
        name: "Risk Tolerance",
        slug: "risk-tolerance",
        leftEndpoint: {
            cognitivePreference: "I prefer safe, predictable approaches",
            preferenceType: PreferenceType.Adaptor,
        },
        rightEndpoint: {
            cognitivePreference: "I willingly take risks and embrace uncertainty",
            preferenceType: PreferenceType.Innovator,
        },
    },
    {
        name: "Preferred Change",
        slug: "preferred-change",
        leftEndpoint: {
            cognitivePreference: "I prefer gradual and controlled changes",
            preferenceType: PreferenceType.Adaptor,
        },
        rightEndpoint: {
            cognitivePreference: "I seek sweeping, disruptive changes",
            preferenceType: PreferenceType.Innovator,
        },
    },
    {
        name: "Work Style",
        slug: "work-style",
        leftEndpoint: {
            cognitivePreference: "I like working in an organized, planned way",
            preferenceType: PreferenceType.Adaptor,
        },
        rightEndpoint: {
            cognitivePreference: "I work best when I can be spontaneous and fluid",
            preferenceType: PreferenceType.Innovator,
        },
    },
    {
        name: "Attention to Detail",
        slug: "attention-to-detail",
        leftEndpoint: {
            cognitivePreference: "I focus heavily on details and precision",
            preferenceType: PreferenceType.Adaptor,
        },
        rightEndpoint: {
            cognitivePreference: "I focus more on big ideas than small details",
            preferenceType: PreferenceType.Innovator,
        },
    },
    {
        name: "Response to Authority",
        slug: "response-to-authority",
        leftEndpoint: {
            cognitivePreference: "I cooperate naturally with authority figures",
            preferenceType: PreferenceType.Adaptor,
        },
        rightEndpoint: {
            cognitivePreference: "I question and often challenge authority",
            preferenceType: PreferenceType.Innovator,
        },
    },
];

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
    kai_dimensions: Dimension[]; // KAI cognitive preferences across dimensions
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
    mother: UserProfile | null;
    father: UserProfile | null;
    spouse: UserProfile | null;
    best_friend: UserProfile | null;
    mentor: UserProfile | null;
    role_model: UserProfile | null;
    parent_profile_id: UserProfile | null;
    emotional_state: string[]; //['emotional_stability', 'emotional_instability'];
    emotional_variance: string[]; //['low', 'medium', 'high'];
    sleep_level: string; //['low', 'medium', 'high'];
    energy_level: string; //['low', 'medium', 'high'];
    focus_level: string; //['low', 'medium', 'high'];
    motivation_level: string; //['low', 'medium', 'high'];
    creativity_level: string; //['low', 'medium', 'high'];
    productivity_level: string; //['low', 'medium', 'high'];
    drug_use: string; //['none', 'alcohol', 'drugs'];
    learning_rate: string; //['low', 'medium', 'high']; // for in context learning
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

export { UserProfile, WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, AttentionToDetail, ArtifactType, PreferredTool, PreferredStrategy, PreferenceType };
export type { LivedExperience, Dimension, Person };
export { KAI_Dimensions };