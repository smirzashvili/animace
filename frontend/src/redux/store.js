import {createStore, applyMiddleware, combineReducers} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import UsersReducer from './reducers/usersReducer'
import ActorsReducer from './reducers/actorsReducer'
import CategoriesReducer from './reducers/categoriesReducer'
import ArticlesReducer from './reducers/articlesReducer'
import AuthorsReducer from './reducers/authorsReducer'
import ReviewsReducer from './reducers/reviewsReducer'
import MoviesReducer from './reducers/moviesReducer'
import SeriesReducer from './reducers/seriesReducer'
import MangasReducer from './reducers/mangasReducer'
import GenresReducer from './reducers/genresReducer'
import FiltersReducer from './reducers/filtersReducer'
import StaffReducer from './reducers/staffReducer'
import CommentsReducer from './reducers/commentsReducer'

const rootReducer = combineReducers({
    UsersReducer,
    ActorsReducer,
    CategoriesReducer,
    ArticlesReducer,
    AuthorsReducer,
    ReviewsReducer,
    MoviesReducer,
    SeriesReducer,
    MangasReducer,
    GenresReducer,
    FiltersReducer,
    StaffReducer,
    CommentsReducer
})


const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store