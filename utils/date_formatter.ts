export const dateTimeFormatter = (date : Date, type ?: string ) => {
    let dates = new Date(date) 
    let dateData : any;

    switch (type) {
        case "Time":
            dateData = {
                hour: '2-digit',
                minute: '2-digit',
            }
            break;
        default:
            dateData = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }
            break;
    }

    dateData.timeZone = 'Asia/Manila'
    return dates.toLocaleString('en-US', dateData);
}

//format date to => YYYY-MM-DD
export const isoDate = (data:Date | string) =>{
    const date = new Date(data);
    const localeDateString = date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
    });
  
    const [month, day, year] = localeDateString.match(/\d+/g)!;
    return `${year}-${month}-${day}`;
  }