# thefirm

This repository contains the code for thefirm, a tool for building and managing a startup using a team of AI agents that simulate the work of a startup team.

## How to run the code

Prerequisites:
- Node.js (brew install node)
- npm (brew install npm)
- Redis (brew install redis)
- tsx (npm install -g tsx)
- screen (brew install screen)

Overview:
* Frontend => Event => Websocket Server (node) => Redis (pub/sub) 
*  Workers (tsx) => LLM (openai) => Artifacts => Redis (pub/sub) => Websocket Server (Redis Subscriber) => Frontend

1. Clone the repository
2. Create a `.env.local` file and add your OpenAI API key
3. Run `npm install` to install the dependencies
4. Run `npm compile-types` to complete the classes and enums
5. Run `brew services start redis` to start the redis server
6. Run `./bin/start.sh` to start the websocket server and workers in screen sessions

   To manage the running services:
   - List all sessions: `screen -ls`
   - Attach to websocket server: `screen -r websocket-server`
   - Attach to worker: `screen -r worker`
   - Detach from a session: Press `Ctrl+A` then `d`
   - Kill a session: `screen -X -S [session-name] quit`

7. Run `npm run dev` to start the Next.js server

## Overview

The firm is a tool for building and managing a startup using a team of AI agents that simulate the work of a startup team.

The firm is built using Node.js and Typescript.

Configure the team in the `team` folder.

Configure the workflows in the `workflows` folder.

Configure the artifacts in the `artifacts` folder.

Configure the reports in the `reports` folder.

Configure the startup idea meta data in the `blueprint` folder.

## Architecture

The application is structured around four main components: Actors (Teams), Artifacts, and Flows. Below are diagrams illustrating the architecture.

### High-Level Component Overview

```mermaid
graph LR
    subgraph "The Firm - Core Components"
        Actors((Actors))
        Artifacts((Artifacts))
        Flows((Flows))
        
        Actors -- "create" --> Artifacts
        Actors -- "participate in" --> Flows
        Flows -- "produce" --> Artifacts
        Artifacts -- "used in" --> Flows
    end
```

### Actors and Teams Structure

```mermaid
graph TB
    UserProfile[User Profile Base]
    
    UserProfile --> Team[Team Members]
    UserProfile --> Customers[Customers]
    UserProfile --> Investors[Investors]
    UserProfile --> Suppliers[Suppliers]
    
    Team --> Executive[Executive Roles]
    Team --> Engineering[Engineering Roles]
    Team --> Design[Design Roles]
    Team --> Marketing[Marketing Roles]
    Team --> Product[Product Roles]
    
    Executive --> CEO[CEO]
    Executive --> CTO[CTO]
    Executive --> COO[COO]
    Executive --> CMO[CMO]
    Executive --> CPO[CPO]
    Executive --> CISO[CISO]
    Executive --> ChiefOfStaff[Chief of Staff]
    
    Engineering --> TechLead[Tech Lead]
    Engineering --> BackendEng[Backend Engineer]
    Engineering --> FrontendEng[Frontend Engineer]
    
    Design --> UXDesigner[UX Designer]
    Design --> UXResearcher[UX Researcher]
    
    Marketing --> BrandDirector[Brand Director]
    Marketing --> MarketingStrategist[Marketing Strategist]
    Marketing --> MarketingAnalyst[Marketing Analyst]
    Marketing --> Copywriter[Copywriter]
    Marketing --> SocialMediaMarketer[Social Media Marketer]
    
    Product --> ProductManager[Product Manager]
    Product --> BusinessAnalyst[Business Analyst]
    
    Customers --> Innovators[Innovators]
    Customers --> EarlyAdopters[Early Adopters]
    Customers --> EarlyMajority[Early Majority]
```

### Artifacts Hierarchy

```mermaid
graph TB
    Artifact[Base Artifact]
    
    Artifact --> Document[Document Artifacts]
    Artifact --> Design[Design Artifacts]
    Artifact --> Task[Task Artifacts]
    Artifact --> Code[Code Artifacts]
    Artifact --> Communication[Communication Artifacts]
    Artifact --> Feedback[Feedback]
    
    Document --> MemoArtifact[Memos]
    Document --> ReportArtifact[Reports]
    Document --> Presentation[Presentations]
    
    Design --> DesignBrief[Design Brief]
    Design --> DesignMockup[Design Mockup]
    Design --> DesignStyleGuide[Design Style Guide]
    Design --> DesignPatternLibrary[Design Pattern Library]
    Design --> DesignResearch[Design Research]
    
    Task --> TaskItem[Task]
    Task --> TaskList[Task List]
    Task --> NeededItems[Needed Items]
    
    Communication --> EmailMessage[Email Messages]
    Communication --> SocialMedia[Social Media Posts]
    SocialMedia --> LinkedInPost[LinkedIn Posts]
    SocialMedia --> TwitterPost[Twitter Posts]
    
    Design --> Brand[Brand Assets]
    Brand --> BrandStyleGuide[Brand Style Guide]
    Brand --> LogoLibrary[Logo Library]
    LogoLibrary --> Logo[Logo]
```

### Workflow Flows

```mermaid
graph LR
    Flow[Flow]
    
    Flow --> FlowName[Name]
    Flow --> Description[Description]
    Flow --> Task[Task Definition]
    Flow --> Context[Context]
    Flow --> Artifacts[Output Artifacts]
    Flow --> Actor[Responsible Actor]
    
    subgraph "Flow Execution"
        Actor -- "executes" --> Task
        Task -- "operates in" --> Context
        Task -- "produces" --> Artifacts
    end
    
    subgraph "Example Flows"
        BrandDesign[Brand Design Flow]
        PrioritizeTasks[Task Prioritization Flow]
        Research[Research Flow]
        
        BrandDesign -- "creates" --> BrandArtifacts[Brand Assets]
        PrioritizeTasks -- "creates" --> TaskListArtifact[Task List]
        Research -- "creates" --> ResearchReport[Research Report]
    end
```

### UML Class Diagram

```mermaid
classDiagram
    %% Base classes
    class Artifact {
        +string guid
        +Date created_at
        +Date updated_at
        +string[] creators
        +string name
        +string description
        +number version
    }
    
    class UserProfile {
        +string role
        +string name
        +string[] responsibilities
    }
    
    class Flow {
        +string name
        +string description
        +string task
        +string[] artifacts
        +UserProfile by
        +string context
    }
    
    %% Artifact hierarchy
    Artifact <|-- DocumentArtifact
    Artifact <|-- DesignArtifact
    Artifact <|-- Code
    Artifact <|-- Feedback
    Artifact <|-- Task
    
    DocumentArtifact <|-- MemoArtifact
    DocumentArtifact <|-- ReportArtifact
    DocumentArtifact <|-- Presentation
    DocumentArtifact <|-- EmailMessageArtifact
    
    DesignArtifact <|-- DesignBrief
    DesignArtifact <|-- DesignMockup
    DesignArtifact <|-- DesignStyleGuide
    DesignArtifact <|-- DesignPatternLibrary
    DesignArtifact <|-- DesignResearch
    DesignArtifact <|-- Brand
    DesignArtifact <|-- LogoLibrary
    
    Task <|-- TaskList
    
    %% UserProfile hierarchy
    UserProfile <|-- TeamMember
    UserProfile <|-- Customer
    UserProfile <|-- Investor
    UserProfile <|-- Supplier
    
    %% Relationships
    Flow "1" --> "1" UserProfile : executed by
    Flow "1" --> "*" Artifact : produces
    UserProfile "1" --> "*" Artifact : creates
    TaskList "*" --> "*" Task : contains
    ReportArtifact "*" --> "*" ReportSection : contains
    ReportSection "*" --> "*" ReportSectionContent : contains
    LogoLibrary "1" --> "*" Logo : contains
    DesignPatternLibrary "1" --> "*" DesignMockup : contains
    
    %% Class details
    class DocumentArtifact {
        +string document
    }
    
    class DesignArtifact {
        +string design
    }
    
    class Code {
        +string language
        +string code
    }
    
    class Task {
        +string task
        +EisenHowerAttribute eh_importance
        +EisenHowerAttribute eh_urgency
        +EisenHowerMatrix eh_matrix
        +UrgencyOptions urgency
        +NeededItems items_needed
        +TaskStatus status
        +getEisenhowerMatrix()
    }
    
    class TaskList {
        +Task[] tasks
    }
    
    class ReportArtifact {
        +string executive_summary
        +ReportSection[] sections
    }
    
    class Brand {
        +string tone_of_voice
        +string brand_voice
        +string brand_promise
        +string brand_personality
    }
```

## Component Tables

### Actors Table

| Role | Type | Description | Implementation |
|------|------|-------------|----------------|
| CEO | Executive | Chief Executive Officer | [src/actors/team/ceo/profile.ts](src/actors/team/ceo/profile.ts) |
| CTO | Executive | Chief Technology Officer | [src/actors/team/cto/profile.ts](src/actors/team/cto/profile.ts) |
| COO | Executive | Chief Operating Officer | [src/actors/team/coo/profile.ts](src/actors/team/coo/profile.ts) |
| CMO | Executive | Chief Marketing Officer | [src/actors/team/cmo/profile.ts](src/actors/team/cmo/profile.ts) |
| CPO | Executive | Chief Product Officer | [src/actors/team/cpo/profile.ts](src/actors/team/cpo/profile.ts) |
| CISO | Executive | Chief Information Security Officer | [src/actors/team/ciso/profile.ts](src/actors/team/ciso/profile.ts) |
| Chief of Staff | Executive | Executive support and coordination | [src/actors/team/chief_of_staff/profile.ts](src/actors/team/chief_of_staff/profile.ts) |
| Tech Lead | Engineering | Technical leadership and architecture | [src/actors/team/techlead/profile.ts](src/actors/team/techlead/profile.ts) |
| Backend Engineer | Engineering | Server-side development | [src/actors/team/backend_eng/profile.ts](src/actors/team/backend_eng/profile.ts) |
| Frontend Engineer | Engineering | Client-side development | [src/actors/team/frontend-eng/profile.ts](src/actors/team/frontend-eng/profile.ts) |
| UX Designer | Design | User experience design | [src/actors/team/ux-designer/profile.ts](src/actors/team/ux-designer/profile.ts) |
| UX Researcher | Design | User research and testing | [src/actors/team/ux-researcher/profile.ts](src/actors/team/ux-researcher/profile.ts) |
| Brand Director | Marketing | Brand strategy and management | [src/actors/team/brand_director/profile.ts](src/actors/team/brand_director/profile.ts) |
| Marketing Strategist | Marketing | Marketing planning and strategy | [src/actors/team/marketing-strategist/profile.ts](src/actors/team/marketing-strategist/profile.ts) |
| Marketing Analyst | Marketing | Marketing data analysis | [src/actors/team/marketing_analyst/profile.ts](src/actors/team/marketing_analyst/profile.ts) |
| Copywriter | Marketing | Content creation | [src/actors/team/copywriter/profile.ts](src/actors/team/copywriter/profile.ts) |
| Social Media Marketer | Marketing | Social media management | [src/actors/team/social_media_marketing/profile.ts](src/actors/team/social_media_marketing/profile.ts) |
| Product Manager | Product | Product planning and roadmap | [src/actors/team/product-manager/profile.ts](src/actors/team/product-manager/profile.ts) |
| Business Analyst | Product | Business requirements and analysis | [src/actors/team/business_analyst/profile.ts](src/actors/team/business_analyst/profile.ts) |
| Innovators | Customers | Early technology adopters | [src/actors/customers/innovators/profile.ts](src/actors/customers/innovators/profile.ts) |
| Early Adopters | Customers | First wave of customers | [src/actors/customers/early_adopters/profile.ts](src/actors/customers/early_adopters/profile.ts) |
| Early Majority | Customers | Mainstream early customers | [src/actors/customers/early_majority/profile.ts](src/actors/customers/early_majority/profile.ts) |
| Investors | External | Funding partners | [src/actors/investors/profile.ts](src/actors/investors/profile.ts) |
| Suppliers | External | Resource providers | [src/actors/suppliers/profile.ts](src/actors/suppliers/profile.ts) |

### Artifacts Table

| Artifact Type | Category | Description | Implementation |
|--------------|----------|-------------|----------------|
| Document | Base | Generic document artifact | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L82) |
| Memo | Document | Short-form communication | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L267) |
| Report | Document | Detailed analysis or findings | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L313) |
| Presentation | Document | Slide-based presentation | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L359) |
| Design | Base | Generic design artifact | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L91) |
| Design Brief | Design | Project requirements and goals | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L217) |
| Design Mockup | Design | Visual representation of design | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L226) |
| Design Style Guide | Design | Design standards and guidelines | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L235) |
| Design Pattern Library | Design | Reusable design components | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L244) |
| Design Research | Design | User research findings | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L253) |
| Task | Base | Individual work item | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L133) |
| Task List | Base | Collection of related tasks | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L166) |
| Needed Items | Base | Resources required for tasks | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L124) |
| Code | Base | Software code artifact | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L175) |
| Email Message | Communication | Email communication | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L377) |
| LinkedIn Post | Social Media | LinkedIn platform content | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L339) |
| Twitter Post | Social Media | Twitter platform content | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L348) |
| Brand | Design | Brand identity elements | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L189) |
| Brand Style Guide | Design | Brand usage guidelines | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L201) |
| Logo | Design | Visual brand identifier | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L180) |
| Logo Library | Design | Collection of logo variants | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L208) |
| Feedback | Base | Evaluation and suggestions | [src/artifacts/artifacts.ts](src/artifacts/artifacts.ts#L73) |

### Flows Table

| Flow Name | Description | Responsible Actor | Output Artifacts | Implementation |
|-----------|-------------|-------------------|------------------|----------------|
| Prioritize Tasks | Triage and prioritize work items | Chief of Staff | Task List | [src/workflows/flows.ts](src/workflows/flows.ts#L108) |
| Brand Design | Create brand identity | Brand Director | Brand | [src/workflows/flows.ts](src/workflows/flows.ts#L42) |
| Brand Style Guide | Create brand usage guidelines | Brand Director | Brand Style Guide | [src/workflows/flows.ts](src/workflows/flows.ts#L51) |
| Brand Presentation | Present brand identity | Brand Director | Presentation | [src/workflows/flows.ts](src/workflows/flows.ts#L60) |
| Research Task Management | Research task management for ADHD | Marketing Strategist | Research Artifact | [src/workflows/flows.ts](src/workflows/flows.ts#L78) |
| Research AI Agents | Research AI agents for DevOps | Marketing Strategist | Research Artifact | [src/workflows/flows.ts](src/workflows/flows.ts#L87) |
| Research Happiness Apps | Research apps for cultivating happiness | Marketing Strategist | Research Artifact | [src/workflows/flows.ts](src/workflows/flows.ts#L96) |
