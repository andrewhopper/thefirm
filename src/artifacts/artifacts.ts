import 'reflect-metadata';

import { UserProfile } from "../actors/user_profile";
import { unescapeLeadingUnderscores } from 'typescript';


function PropertyType(): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        // Decorator logic (can remain empty)
    };
}

class Artifact {
    @PropertyType()
    guid: string;
    @PropertyType()
    created_at: Date;
    @PropertyType()
    updated_at: Date;
    @PropertyType()
    creators: string[];
    @PropertyType()
    name: string;
    @PropertyType()
    description: string;
    @PropertyType()
    version: number;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number) {
        this.guid = guid;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.creators = creators;
        this.name = name;
        this.description = description;
        this.version = version;
    }
}

enum EisenHowerAttribute {
    IMPORTANT = "important",
    NOT_IMPORTANT = "not_important",
    URGENT = "urgent",
    NOT_URGENT = "not_urgent"
}

enum EisenHowerMatrix {
    DO_IT_NOW = "do_it_now",
    SCHEDULE_IT = "schedule_it",
    DELEGATE_IT = "delegate_it",
    DELETE_IT = "delete_it"
}

enum UrgencyOptions {
    NOW = "now",
    MORNING = "morning",
    AFTERNOON = "afternoon",
    EVENING = "evening",
    TODAY = "today",
    TOMORROW = "tomorrow",
    THIS_WEEK = "this_week",
    NEXT_WEEK = "next_week",
    THIS_MONTH = "this_month",
    NEXT_MONTH = "next_month",
    THIS_YEAR = "this_year",
    NEXT_YEAR = "next_year",
    ANYTIME = "anytime",
    UNSPECIFIED = "unspecified"
}


class Task extends Artifact {
    @PropertyType()
    task: string;
    @PropertyType()
    eh_importance: EisenHowerAttribute;
    @PropertyType()
    eh_urgency: EisenHowerAttribute;
    @PropertyType()
    eh_matrix: EisenHowerMatrix;
    urgency: UrgencyOptions;

    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, task: string, importance: EisenHowerAttribute, urgency: EisenHowerAttribute) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.task = task;
        this.eh_importance = importance;
        this.eh_urgency = urgency;
        this.eh_matrix = this.getEisenhowerMatrix(importance, urgency);
        this.urgency = UrgencyOptions.UNSPECIFIED;
    }

    getEisenhowerMatrix(importance: EisenHowerAttribute, urgency: EisenHowerAttribute): EisenHowerMatrix {
        if (importance === EisenHowerAttribute.IMPORTANT && urgency === EisenHowerAttribute.URGENT) {
            return EisenHowerMatrix.DO_IT_NOW;
        }
        if (importance === EisenHowerAttribute.IMPORTANT && urgency === EisenHowerAttribute.NOT_URGENT) {
            return EisenHowerMatrix.SCHEDULE_IT;
        }
        if (importance === EisenHowerAttribute.NOT_IMPORTANT && urgency === EisenHowerAttribute.URGENT) {
            return EisenHowerMatrix.DELEGATE_IT;
        }
        return EisenHowerMatrix.DELETE_IT;
    }

}

class TaskList extends Artifact {
    @PropertyType()
    tasks: Task[];
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, tasks: Task[]) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.tasks = tasks;
    }
}

class Code extends Artifact {
    @PropertyType()
    language: string;
    @PropertyType()
    code: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, language: string, code: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.language = language;
        this.code = code;
    }
}

class DocumentArtifact extends Artifact {
    @PropertyType()
    document: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, document: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.document = document;
    }
}

class DesignArtifact extends Artifact {
    @PropertyType()
    design: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, design: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.design = design;
    }
}

enum LogoType {
    LIGHT_BACKGROUND = "light_background",
    DARK_BACKGROUND = "dark_background",
    SQUARE = "square",
    SOCIAL = "social",
    RECTANGLE = "rectangle"
}

class Logo extends Artifact {
    @PropertyType()
    logo: string;
    @PropertyType()
    logo_type: LogoType;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, logo: string, logo_type: LogoType) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.logo = logo;
        this.logo_type = logo_type;
    }
}

class LogoLibrary extends DesignArtifact {
    @PropertyType()
    logo_library: Logo[];
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, design: string, logo_library: Logo[]) {
        super(guid, created_at, updated_at, creators, name, description, version, design);
        this.logo_library = logo_library;
    }
}

class Brand extends Artifact {
    @PropertyType()
    tone_of_voice: string;
    @PropertyType()
    brand_voice: string;
    @PropertyType()
    brand_promise: string;
    @PropertyType()
    brand_personality: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, tone_of_voice: string, brand_voice: string, brand_promise: string, brand_personality: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.tone_of_voice = tone_of_voice;
        this.brand_voice = brand_voice;
        this.brand_promise = brand_promise;
        this.brand_personality = brand_personality;
    }
}

class BrandStyleGuide extends Artifact {
    @PropertyType()
    color_palette: string[];
    @PropertyType()
    logo: LogoLibrary;
    @PropertyType()
    brand: Brand;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, color_palette: string[], logo: LogoLibrary, brand: Brand) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.color_palette = color_palette;
        this.logo = logo;
        this.brand = brand;
    }
}

class DesignBrief extends DesignArtifact {
    @PropertyType()
    brief: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, design: string, brief: string) {
        super(guid, created_at, updated_at, creators, name, description, version, design);
        this.brief = brief;
    }
}

class DesignMockup extends DesignArtifact {
    @PropertyType()
    mockup: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, design: string, mockup: string) {
        super(guid, created_at, updated_at, creators, name, description, version, design);
        this.mockup = mockup;
    }
}

class DesignStyleGuide extends DesignArtifact {
    @PropertyType()
    style_guide: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, design: string, style_guide: string) {
        super(guid, created_at, updated_at, creators, name, description, version, design);
        this.style_guide = style_guide;
    }
}

class DesignPatternLibrary extends DesignArtifact {
    @PropertyType()
    component_library: DesignMockup[];
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, design: string, component_library: DesignMockup[]) {
        super(guid, created_at, updated_at, creators, name, description, version, design);
        this.component_library = component_library;
    }
}

class DesignResearch extends DesignArtifact {
    @PropertyType()
    customer_segments: UserProfile[];
    @PropertyType()
    report: ReportArtifact;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, design: string, customer_segments: UserProfile[], report: ReportArtifact) {
        super(guid, created_at, updated_at, creators, name, description, version, design);
        this.customer_segments = customer_segments;
        this.report = report;
    }
}

class MemoArtifact extends Artifact {
    @PropertyType()
    title: string;
    @PropertyType()
    memo: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, title: string, memo: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.title = title;
        this.memo = memo;
    }
}

class ReportSectionContent extends Artifact {
    @PropertyType()
    content: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, content: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.content = content;
    }
}

class ReportSection extends Artifact {
    @PropertyType()
    section_title: string;
    @PropertyType()
    section_content: ReportSectionContent[];
    @PropertyType()
    position: number;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, section_title: string, section_content: ReportSectionContent[], position: number) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.section_title = section_title;
        this.section_content = section_content;
        this.position = position;
    }
}

class ReportArtifact extends Artifact {
    @PropertyType()
    executive_summary: string;
    @PropertyType()
    sections: ReportSection[];
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, executive_summary: string, sections: ReportSection[]) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.executive_summary = executive_summary;
        this.sections = sections;
    }
}

enum ReportType {
    RESEARCH = "research",
    REPORT = "report",
    MARKET_RESEARCH = "market_research",
    UX_RESEARCH = "ux_research",
    UX_DESIGN = "ux_design",
    UX_PROTOTYPE = "ux_prototype",
    UX_TESTING = "ux_testing",
    BUSINESS_PLAN = "business_plan",
    MARKETING_PLAN = "marketing_plan",
    FINANCIAL_PLAN = "financial_plan",
    OPERATIONAL_PLAN = "operational_plan"
}

class ResearchArtifact extends Artifact {
    @PropertyType()
    guid: string;
    @PropertyType()
    created_at: Date;
    @PropertyType()
    updated_at: Date;
    @PropertyType()
    authors: string[];
    @PropertyType()
    title: string;
    @PropertyType()
    content: ReportArtifact;
    @PropertyType()
    type: ReportType;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, authors: string[], title: string, content: ReportArtifact, type: ReportType) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.guid = guid;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.authors = authors;
        this.title = title;
        this.content = content;
        this.type = type;
    }
}

class Slide {
    @PropertyType()
    guid: string;
    @PropertyType()
    title: string;
    @PropertyType()
    content: string;
    @PropertyType()
    communication_objective: string;
    @PropertyType()
    presenter_notes: string;
    @PropertyType()
    position: number;
    constructor(guid: string, title: string, content: string, communication_objective: string, presenter_notes: string, position: number) {
        this.guid = guid;
        this.title = title;
        this.content = content;
        this.communication_objective = communication_objective;
        this.presenter_notes = presenter_notes;
        this.position = position;
    }
}

class LinkedInPost extends Artifact {
    @PropertyType()
    post: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, post: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.post = post;
    }
}

class TwitterPost extends Artifact {
    @PropertyType()
    post: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, post: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.post = post;
    }
}

class Presentation extends Artifact {
    @PropertyType()
    guid: string;
    @PropertyType()
    title: string;
    @PropertyType()
    created_at: Date;
    @PropertyType()
    updated_at: Date;
    @PropertyType()
    authors: string[];
    @PropertyType()
    slides: Slide[];
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, title: string, authors: string[], slides: Slide[]) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.guid = guid;
        this.title = title;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.authors = authors;
        this.slides = slides;
    }
}

class EmailMessageArtifact extends Artifact {
    @PropertyType()
    guid: string;
    @PropertyType()
    created_at: Date;
    @PropertyType()
    updated_at: Date;
    @PropertyType()
    sender: string;
    @PropertyType()
    recipient: string;
    @PropertyType()
    subject: string;
    @PropertyType()
    body: string;
    constructor(guid: string, created_at: Date, updated_at: Date, creators: string[], name: string, description: string, version: number, sender: string, recipient: string, subject: string, body: string) {
        super(guid, created_at, updated_at, creators, name, description, version);
        this.guid = guid;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.sender = sender;
        this.recipient = recipient;
        this.subject = subject;
        this.body = body;
    }
}

export { Artifact, Code, DocumentArtifact, DesignArtifact, ResearchArtifact, MemoArtifact, ReportArtifact, Presentation, EmailMessageArtifact, Logo, LogoLibrary, Brand, BrandStyleGuide, DesignBrief, DesignMockup, DesignPatternLibrary, DesignResearch, DesignStyleGuide };