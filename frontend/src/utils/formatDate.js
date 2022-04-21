export const formatDate = (date) => {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    const d = new Date(date);

    const day = d.getDate()
    const monthName = month[d.getMonth()]
    const year = d.getFullYear()

    return `${monthName} ${day}, ${year}`
}

