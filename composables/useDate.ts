import type { DataHolder } from "~/constants/constants"


export const jsonFormatter = (jsonData : any) : DataHolder => {
    const start = jsonData?.timeInterval?.start
    const end = jsonData?.timeInterval?.end
    const description = jsonData?.description
    const date = dateTimeFormatter(start)
    const duration = iso8601(jsonData?.timeInterval?.duration)
  
    return {
      Date: date,
      dateTime : start,
      Task: description,
      Start: dateTimeFormatter(start, "Time"),
      End: dateTimeFormatter(end, "Time"),
      Duration: duration
    }
  }
  
export function parseDate(dateString:any) : any {
      return new Date(dateString.replace('T', ' '));
  }
  
export function iso8601(durationString : string){
    return ["H","M","S"].map((data:any) => {
      const inputs = durationString.match(new RegExp("(\\d+)" + data)) 
      return (inputs ? inputs[1] : "0").padStart(2, '0')
    }).join(":")
  }