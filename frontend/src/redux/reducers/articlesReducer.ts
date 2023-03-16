import { GET_ARTICLES, GET_ARTICLE, GET_ARTICLES_BY_AUTHOR } from '../constants';

const initialState = {
    articles: [],
    articleInfo: {},
    filteredArticles: []
}
const ArticlesReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case GET_ARTICLES: 
        return {
            ...state,
            articles: action.payload
        }
        case GET_ARTICLE: 
        return {
            ...state,
            articleInfo: action.payload
        }
        default: return state
    }
}

export default ArticlesReducer