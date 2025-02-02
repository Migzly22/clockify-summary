export const useDate = () => {

  type FormatDateType = Intl.DateTimeFormatOptions | 'datetime' | 'date' | 'time' | 'time24' | 'YYYY-MM-DD' | 'hh-mm';
  const dateFormatter = (date?: Date, type?: FormatDateType) => {
      if (!date) return date;
      var dt = new Date(date);

      if (type === "datetime")
          type = { hour12: true, year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit" };
      if (type === "date")
          type = { day: "2-digit", month: "long", year: "numeric", };
      else if (type === "time")
          type = { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" };
      else if (type === "hh-mm")
          type = { hour12: true, hour: "2-digit", minute: "2-digit", };
      else if (type === "time24")
          type = { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
      else if (type === "YYYY-MM-DD")
          type = { year: "numeric", month: "2-digit", day: "2-digit", };

      if (!type || typeof type === 'string')
          type = { year: "numeric", month: "long", day: "2-digit" };

      return dt.toLocaleString("en-US", type);
  }

  const getWeekNo = ( date?: Date) =>  {
    if(!date) return "Week#"
    const dateData = new Date(date);
  
    const dayOfMonth = new Date(dateData.getFullYear(), dateData.getMonth(), 1);
    const dayOfWeek = dayOfMonth.getDay(); 
    
    // Calculate the week number
    const weekNumber = Math.ceil((dateData.getDate() + dayOfWeek) / 7);
  
    return `Week#${weekNumber}`;
  }

  const isoDate = (data:Date | string) =>{
    const date = new Date(data);
    const localeDateString = date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
    });
  
    const [month, day, year] = localeDateString.match(/\d+/g)!;
    return `${year}-${month}-${day}`;
  }

  return {
    dateFormatter,
    getWeekNo,
    isoDate
  }
}