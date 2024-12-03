enum EisenHowerAttribute {
    IMPORTANT
    NOT_IMPORTANT
    URGENT
    NOT_URGENT
}

enum EisenHowerMatrix {
    DO_IT_NOW
    SCHEDULE_IT
    DELEGATE_IT
    DELETE_IT
}

enum UrgencyOptions {
    NOW
    MORNING
    AFTERNOON
    EVENING
    TODAY
    TOMORROW
    THIS_WEEK
    NEXT_WEEK
    THIS_MONTH
    NEXT_MONTH
    THIS_YEAR
    NEXT_YEAR
    ANYTIME
    UNSPECIFIED
}


class Task  {
    guid string
    created_at string
    updated_at string
    creators string[]
    name string
    description string
    version int
    task string
    eh_importance EisenHowerAttribute
    eh_urgency EisenHowerAttribute
    eh_matrix EisenHowerMatrix
    urgency UrgencyOptions
}


class TaskList  {
      guid string
    created_at string

    updated_at string
    
    creators string[]
    
    name string
    
    description string
    
    version int
    tasks Task[]
   
}


function DailyPlan(prompt: string) -> TaskList {
  client CustomGPT4o
  prompt #"
    {{ prompt }}

    {{ ctx.output_format }}
  "#
}

test daily_plan_1 {
    functions [DailyPlan]
    args {
        prompt #"
          Brush teeth, eat breakfast, go to work.
        "#
    }
} 