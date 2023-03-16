export const isEmpty: (value: string) => boolean = (value: string) => {
    if(!value.trim()) return true
    return false
}

export const isEmail: (email: string) => boolean = (email: string) => {
    let re: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isLength: (password: string) => boolean = (password :string) => {
    if(password.length < 8) return true
    return false
}
export const isUsername: (username: string) => boolean = (username :string) => {
    const re: RegExp = /[!@#$%^&*()+=[\]{};':"\\|,.<>/?]+/;
    return re.test(username)
}
export const isMatch: (password: string, cf_password: string) => boolean = (password: string, cf_password: string) => {
    if(password === cf_password) return true
    return false
}
export const isImageSize: (size: number) => boolean = (size: number) => {
    if(size > 1024 * 1024) return true
    return false
}
export const isImageType: (type: string) => boolean = (type: string) => {
    if(type !== undefined && !type.includes("image")) return true
    return false
}