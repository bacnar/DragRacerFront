export function ParseTimeToString(time: number | undefined): string {
  if (time != undefined) {
    return (time/1000).toString()    
  } else {
    return ""
  }
}