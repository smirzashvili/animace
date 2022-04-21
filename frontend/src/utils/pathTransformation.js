export const transformToUrl = (name) => {
    return name?.replaceAll(" ", "-").toLowerCase()
}

export const transformToName = (url) => {
    url = url.replaceAll("-", " ")
    function capitalize(url) {
        return url.charAt(0).toUpperCase() + url.slice(1);
    }  
    url = url.split(' ').map(capitalize).join(' ');
    return url
}
