export const titleGenerator: (path: string) => void = (path: string) => {
    switch(path) {
        case "/": 
            document.title = "ANIMACE – Movie News, Reviews, Blog and Database"
            break
        case "/contact": 
            document.title = "Contact - ANIMACE"
            break
        case "/reset-password": 
            document.title = "Reset Password - ANIMACE"
            break
        case "/about": 
            document.title = "About - ANIMACE"
            break
        case "/actors": 
            document.title = "Actors A-Z - ANIMACE"
            break
        case "/sign-up": 
            document.title = "Sign Up - ANIMACE"
            break
        case "/sign-in": 
            document.title = "Sign In - ANIMACE"
            break
        case "/edit-profile": 
            document.title = "Edit Profile - ANIMACE"
            break
        case "/movies": 
            document.title = "Movies - ANIMACE"
            break
        case "/series": 
            document.title = "Series - ANIMACE"
            break
        case "/mangas": 
            document.title = "Mangas - ANIMACE"
            break
        case "/genres": 
            document.title = "Genres - ANIMACE"
            break
        case "/articles": 
            document.title = "Posts - ANIMACE"
            break 
        case "/reviews": 
            document.title = "Reviews - ANIMACE"
            break         
        case "/mangasSingle": 
            break
        default:
    }
}