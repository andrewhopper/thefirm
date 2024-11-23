import 'reflect-metadata';

import { UserProfile } from "../actors/user_profile";


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
}

class CodeArtifact extends Artifact {
    @PropertyType()
    language: string;
    @PropertyType()
    code: string;
}

class DocumentArtifact extends Artifact {
    @PropertyType()
    document: string;
}

class DesignArtifact extends Artifact {
    @PropertyType()
    design: string;
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
    type: LogoType;
}

class LogoLibrary extends DesignArtifact {
    @PropertyType()
    logo_library: Logo[]; // array of logos

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
}

class BrandStyleGuide extends Artifact {
    @PropertyType()
    color_palette: string[];
    @PropertyType()
    logo: LogoLibrary;
    @PropertyType()
    brand: Brand;
}

class DesignBrief extends DesignArtifact {
    @PropertyType()
    brief: string; // markdown design brief
}

class DesignMockup extends DesignArtifact {
    @PropertyType()
    mockup: string; // shadcnui mockup of a component or a page
}

class DesignStyleGuide extends DesignArtifact {
    @PropertyType()
    style_guide: string; // markdown style guide
}

class DesignPatternLibrary extends DesignArtifact {
    @PropertyType()
    component_library: DesignMockup[]; // array of shadcnui mockups of components
}

class DesignResearch extends DesignArtifact {
    @PropertyType()
    customer_segments: UserProfile[]; // array of user profiles
    @PropertyType()
    report: ReportArtifact; // markdown research report
}

class MemoArtifact extends Artifact {
    @PropertyType()
    title: string;
    @PropertyType()
    memo: string;
}

class ReportSectionContent extends Artifact {
    @PropertyType()
    content: string;
    @PropertyType()
    version: number;
}

class ReportSection extends Artifact {
    @PropertyType()
    section_title: string;
    @PropertyType()
    section_content: ReportSectionContent[];
    @PropertyType()
    position: number;
}

class ReportArtifact extends Artifact {
    @PropertyType()
    executive_summary: string;
    @PropertyType()
    sections: ReportSection[];
}

enum ReportType {
    RESEARCH = "research",
    REPORT = "report",
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
    content: ReportArtifact
    @PropertyType()
    type: ReportType
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
}

class PresentationArtifact extends Artifact {
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
}

export { Artifact, CodeArtifact, DocumentArtifact, DesignArtifact, ResearchArtifact, MemoArtifact, ReportArtifact, PresentationArtifact, EmailMessageArtifact, Logo, LogoLibrary, Brand, BrandStyleGuide, DesignBrief, DesignMockup, DesignPatternLibrary, DesignResearch, DesignStyleGuide };