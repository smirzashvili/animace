import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import {useDispatch, useSelector} from "react-redux"
import { getSeries } from '../../redux/actions/serieActions';
import Rating from '../../components/rating/Rating';
import {useSearchParams} from "react-router-dom"
import * as api from '../../api/seriesApi';
import NotFound from '../../components/notFound/NotFound';
import Pages from '../../components/pages/Pages';

const Series = () => {
    
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()    
  const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page") as string) - 1 || 0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [notFound, setNotFound] = useState(false)   

  useEffect(() => {
    const getData = async () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      const res = await api.fetchSeries(pageNumber);
      if(res.data.series.length > 0) {
        dispatch(getSeries(res.data.series))
        setNumberOfPages(res.data.totalPages);
      } else {
        setNotFound(true)
      }
    }
    getData()
  }, [dispatch, pageNumber]);

  const {series} = useSelector((state: RootState)=>state.SeriesReducer)

  if(notFound) {
    return <NotFound />
  } else {
    return (
      <>
        <h1 className={styles.title}>Series</h1>
        <div className={styles.line}></div>
        <div className={styles.grid}>
          {series?.map((item: ISerie, i: number) => {
            return (
              <div key={i} className={styles.gridItem}>
                <a href={`series/${item.pathname}`}>
                  <img alt='a' src={item.photo} />
                </a>
                <div className={styles.gridTextArea}>
                  <Rating rating={item.rating}/>
                  <div><a href={`series/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                  <div className={styles.year}>{item.year}</div>
                </div>
              </div>
              )
            })
          }
        </div>
        {numberOfPages > 1 && <Pages path="series?" pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />}
      </>
    )
  }
}

export default Series