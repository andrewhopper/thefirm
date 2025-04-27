import { WorkType, CommunicationStyle, RiskTolerance, Creativity, WorkResolution, PreferredTool, PreferredStrategy, AttentionToDetail, ArtifactType, UserProfileAttributes } from "../../user_profile";
import { UserProfile } from "../../user_profile";
import { KaiNeuroStructure, KAIStrengthEnum } from "../../user_profile";

const kaiNeuroStructure: KaiNeuroStructure = {
    hates_rules: KAIStrengthEnum.STRONG_PREFERENCE,
    like_reframing: KAIStrengthEnum.STRONG_PREFERENCE,
    like_risk: KAIStrengthEnum.STRONG_PREFERENCE,
    like_disruptive_change: KAIStrengthEnum.STRONG_PREFERENCE,
    like_spontaneity: KAIStrengthEnum.STRONG_PREFERENCE,
    like_big_picture: KAIStrengthEnum.STRONG_PREFERENCE,
    like_freedom: KAIStrengthEnum.STRONG_PREFERENCE,
}


const a: UserProfileAttributes = {
    role: "big picture dreamer",
    responsibility: "build the company",
    mbti_type: "ENTP",
    work_type: WorkType.STRATEGIC,
    attention_to_detail: AttentionToDetail.LOW,
    communication_style: CommunicationStyle.INFORMAL,
    risk_tolerance: RiskTolerance.HIGH,
    creativity: Creativity.HIGH,
    work_resolution: WorkResolution.Strategic,
    artifact_types: [ArtifactType.CODE],
    preferred_tools: ['ai', 'whatever is new'],
    preferred_strategies: ['test_driven_development'],
    // @TODO - fix these

    // add each 

    kai_dimensions: kaiNeuroStructure,

    key_life_experiences: ['start_up', 'growth_stage', 'exit'],
    hobbies: ['reading', 'traveling', 'golf'],
    education: ['mba', 'university'],
    work_history: ['startup', 'corporate'],
    birth_date: "1975-03-15",
    gender: "male",
    location: "San Francisco, CA",
    heritage: "Irish-American",
    interests: ["technology", "entrepreneurship", "venture capital", "leadership"],
    values: ["innovation", "integrity", "excellence", "growth"],
    gallup_strengths: ["strategic", "achiever", "command", "activator", "self-assurance"],
    predictive_index: ["dominant", "extraverted", "patient", "precise"],
    disc_profile: ["D", "I"],
    family_status: "married",
    pets: ["golden retriever"],
    children: ["daughter (15)", "son (12)"],
    political_views: "moderate",
    religious_views: "agnostic",
    favorite_books: ["Good to Great", "Zero to One", "The Innovator's Dilemma"],
    favorite_movies: ["The Godfather", "The Social Network", "Moneyball"],
    favorite_music: ["classical", "jazz", "rock"],
    favorite_sports: ["golf", "tennis"],
    favorite_foods: ["sushi", "italian"],
    favorite_colors: ["blue", "gray"],
    favorite_animals: ["dogs", "dolphins"],
    favorite_activities: ["golfing", "mentoring", "public speaking"],
    favorite_destinations: ["Tokyo", "London", "New York"],
    key_accomplishments: ["IPO", "successful exit", "industry awards"],
    key_failures: ["failed startup", "missed market timing"],
    learning_style: "experiential",
    preferred_learning_methods: ["reading", "hands-on", "mentoring others"],
    preferred_feedback_style: "direct",
    preferred_feedback_frequency: "weekly",
    preferred_communication_style: "concise",
    preferred_meeting_style: "standing",
    key_influencers: ["Steve Jobs", "Warren Buffett", "Jeff Bezos"],
    mother: null,
    father: null,
    spouse: null,
    best_friend: null,
    mentor: null,
    role_model: null,
    parent_profile_id: null,
    emotional_state: ["emotional_stability"],
    emotional_variance: ["low"],
    sleep_level: "medium",
    energy_level: "high",
    focus_level: "high",
    motivation_level: "high",
    creativity_level: "high",
    productivity_level: "high",
    drug_use: "none",
    learning_rate: "high"
}

const be = new UserProfile("James", "Backend Engineer", a);

export default be;
