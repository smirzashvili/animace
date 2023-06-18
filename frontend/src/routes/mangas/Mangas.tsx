import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import {useDispatch, useSelector} from "react-redux"
import { getMangas } from '../../redux/actions/mangaActions';
import Rating from '../../components/rating/Rating';
import NotFound from '../../components/notFound/NotFound';
import Pages from '../../components/pages/Pages';
import {useSearchParams} from "react-router-dom"
import * as api from '../../api/mangasApi';

const Mangas = () => {

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
      const res = await api.fetchMangas(pageNumber);
      if(res.data.mangas.length > 0) {
        dispatch(getMangas(res.data.mangas))
        setNumberOfPages(res.data.totalPages);
      } else {
        setNotFound(true)
      }
    }
    getData()
  }, [dispatch, pageNumber]);

  const {mangas} = useSelector((state:RootState)=>state.MangasReducer)
  if(notFound) {
    return <NotFound />
  } else {
    return (
      <>
        <h1 className={styles.title}>Mangas</h1>
        <div className={styles.line}></div>
        <div className={styles.grid}>
          {mangas?.map((item:IManga) => {
            return (
              <div className={styles.gridItem}>
                <a href={`mangas/${item.pathname}`}>
                  <img alt='a' src={item.photo} />
                </a>
                <div className={styles.gridTextArea}>
                  <Rating rating={item.rating}/>
                  <div><a href={`mangas/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                  <div className={styles.year}>{item.year}</div>
                </div>
              </div>
              )
            })
          }
        </div>
        {numberOfPages > 1 && <Pages path="mangas?" pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />} 
      </>
    )
  }
}

export default Mangas