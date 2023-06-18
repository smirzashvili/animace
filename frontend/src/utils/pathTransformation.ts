export const transformToUrl: (name: string) => string = (name: string) => {
    return name?.replace(/\ /g, "-").toLowerCase()
}

export const transformToName: (url: string) => string = (url: string) => {
    url = url.replace(/\-/g, " ")
    function capitalize(url: string) {
        return url.charAt(0).toUpperCase() + url.slice(1);
    }  
    url = url.split(' ').map(capitalize).join(' ');
    return url
}
