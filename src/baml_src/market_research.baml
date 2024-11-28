class ReportSectionContent{
   guid string
    created_at string
    upstringd_at string
    creators string[]
    name string
    description string
    version int
    content string
    
}

class ReportSection{
    guid string
    created_at string
    upstringd_at string
    creators string[]
    name string
    description string
    version int
    section_title string
    section_content ReportSectionContent[]
    position int
    
}

class ReportArtifact{
     guid string
    created_at string
    upstringd_at string
    creators string[]
    name string
    description string
    version int
    executive_summary string
    
}

enum ReportType {
    RESEARCH
    REPORT
    MARKET_RESEARCH
    UX_RESEARCH
    UX_DESIGN
    UX_PROTOTYPE
    UX_TESTING
    BUSINESS_PLAN
    MARKETING_PLAN
    FINANCIAL_PLAN
    OPERATIONAL_PLAN
}

class ResearchArtifact  {
    guid string
    created_at string
    upstringd_at string
    creators string[]
    name string
    description string
    version int
    authors string[]
    title string
    content ReportArtifact
}


function MarketResearch(context: string, task: string) -> string {
  client CustomGPT4o
 
  prompt #"
    {{ context }} 
    {{ task }}

    {{ ctx.output_format }}
  "#
}


test market_research {
    functions [MarketResearch]
    args {
        context #"
          You are a market research expert.

        "#
        task #"
          Generate a market research report on the topic of "AI in healthcare".
        "#
    }
} 