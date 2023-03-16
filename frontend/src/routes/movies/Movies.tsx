import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import {useDispatch, useSelector} from "react-redux"
import {useSearchParams} from "react-router-dom"
import { getMovies } from '../../redux/actions/movieActions';
import Rating from '../../components/rating/Rating';
import * as api from '../../api/moviesApi';
import NotFound from '../../components/notFound/NotFound';
import Pages from '../../components/pages/Pages';

const Movies = () => {

  const [searchParams, setSearchParams] = useSearchParams()    
  const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page") as string) - 1 || 0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [notFound, setNotFound] = useState(false)   

  const dispatch = useDispatch()

  useEffect(() => {
      const getData = async () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
        const res = await api.fetchMovies(pageNumber);
        if(res.data.movies.length > 0) {
          dispatch(getMovies(res.data.movies))
          setNumberOfPages(res.data.totalPages);
        } else {
          setNotFound(true)
        }
      }
      getData()
    }, [dispatch, pageNumber]);

  const {movies} = useSelector((state: RootState)=>state.MoviesReducer)

  if(notFound) {
    return <NotFound />
  } else {
    return (
      <>
        <h1 className={styles.title}>Movies</h1>
        <div className={styles.line}></div>
        <div className={styles.grid}>
          {movies?.map((item: IMovie) => {
            return (
              <div className={styles.gridItem}>
                <a href={`movies/${item.pathname}`}>
                  <img alt='a' src={item.photo} />
                </a>
                <div className={styles.gridTextArea}>
                  <Rating rating={item.rating} size={undefined}/>
                  <div><a href={`movies/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                  <div className={styles.year}>{item.year}</div>
                </div>
              </div>
              )
            })
          }
        </div>
        {numberOfPages > 1 && <Pages path="movies?" pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />}
      </>
    )
  }
}

export default Movies