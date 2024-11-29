


function GenericCall(context: string) -> string {
  client CustomGPT4o
 
  prompt #"
    {{ context }} 

    {{ ctx.output_format }}
  "#
}


test market_research {
    functions [GenericCall]
    args {
        context #"
          You are a market research expert.

        "#
      
    }
} 