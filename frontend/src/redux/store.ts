import {createStore, applyMiddleware, combineReducers} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import {
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
} from './reducers'

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

export {store, rootReducer}