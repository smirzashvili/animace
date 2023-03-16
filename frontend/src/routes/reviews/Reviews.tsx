import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import {useDispatch, useSelector} from "react-redux"
import { transformToUrl } from "../../utils/pathTransformation"
import { getReviews } from '../../redux/actions/reviewActions'
import {useSearchParams} from "react-router-dom"
import * as api from '../../api/reviewsApi'
import NotFound from '../../components/notFound/NotFound'
import Pages from '../../components/pages/Pages'
import { formatDate } from "../../utils/formatDate"

const Reviews = () => {

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
      const res = await api.fetchReviews(pageNumber);
      if(res.data.reviews.length > 0) {
        dispatch(getReviews(res.data.reviews))
        setNumberOfPages(res.data.totalPages);
      } else {
        setNotFound(true)
      }
    }
    getData()
  }, [dispatch, pageNumber]);

  const {reviews} = useSelector((state: RootState)=>state.ReviewsReducer)

  if(notFound) {
    return <NotFound />
  } else {
    return (
      <>
        <h1 className={styles.title}>Editor Reviews</h1>
        <div className={styles.line}></div>
        <div className={styles.grid}>
          {reviews.map((item: IReview) => {
            return (
              <div className={styles.gridItem}>
                <div className={styles.relative}> 
                  <a href={`./reviews/${item.pathname}`}>
                    <img alt='a' src={item.photo} />
                  </a>
                  <div className={`${styles.score} ${item.score < 5 ? styles.low : item.score < 7 ? styles.medium : styles.high}`}>{item.score}</div>
                </div>
                <div className={styles.gridTextArea}>
                  <p>{formatDate(item.createdAt)}</p>
                  <div><a href={`./reviews/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                  <div className={styles.link}><a href={`authors/${transformToUrl(item.author?.fullname)}`} className={styles.gridAuthor}>{item.author?.fullname}</a></div>
                  <div className={styles.buttons}>
                    {item.category.map(item => {return(
                      <a href={`../categories/${transformToUrl(item.title)}`}>
                          <button>{item.title}</button>
                      </a>
                    )})}
                  </div>
                  <div className={styles.buttons}>
                    {item.tag.map(item => {
                      if(!item.type)
                      return(
                      <a href={`../tags/${transformToUrl(item.title)}`}>
                          <button>{item.title}</button>
                      </a>
                    )})}
                  </div>
                </div>
              </div>
              )
          })
        } 
        </div>
        {numberOfPages > 1 && <Pages path="reviews?" pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />}
      </>
    )
  }
}

export default Reviews