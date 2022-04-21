export const isEmpty = value => {
    if(!value.trim()) return true
    return false
}

export const isEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isLength = password => {
    if(password.length < 8) return true
    return false
}
export const isUsername = username => {
    const re = /[!@#$%^&*()+=[\]{};':"\\|,.<>/?]+/;
    return re.test(username)
}
export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}
export const isImageSize = (size) => {
    if(size > 1024 * 1024) return true
    return false
}
export const isImageType = (type) => {
    if(type !== undefined && !type.includes("image")) return true
    return false
}