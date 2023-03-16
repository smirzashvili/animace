export const formatDate: (date: string) => string = (date) => {
    let month: Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    let d: Date = new Date(date);

    let day: number = d.getDate()
    let monthName: string = month[d.getMonth()]
    let year: number = d.getFullYear()

    return `${monthName} ${day}, ${year}`
}

