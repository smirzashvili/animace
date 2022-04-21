import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import {useDispatch, useSelector} from "react-redux"
import { transformToUrl } from "../../utils/pathTransformation"
import { getArticles } from '../../redux/actions/articleActions'
import {useSearchParams} from "react-router-dom"
import * as api from '../../api/articlesApi'
import NotFound from '../../components/notFound/NotFound'
import Pages from '../../components/pages/Pages'
import { formatDate } from "../../utils/formatDate"

const Articles = () => {

  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()    
  const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page")) - 1 || 0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [notFound, setNotFound] = useState(false)   

  useEffect(() => {
    const getData = async () => {
      window.scrollTo({
        top: "0px",
        behavior: "smooth"
      })
      const res = await api.fetchArticles(pageNumber);
      if(res.data.articles.length > 0) {
        dispatch(getArticles(res.data.articles))
        setNumberOfPages(res.data.totalPages);
      } else {
        setNotFound(true)
      }
    }
    getData()
  }, [dispatch, pageNumber]);

  const {articles} = useSelector(state=>state.ArticlesReducer)

  if(notFound) {
    return <NotFound />
  } else {
    return (
      <>
        <h1 className={styles.title}>All News</h1>
        <div className={styles.line}></div>
        <div className={styles.grid}>
          {articles?.map(item => {
            return (
              <div className={styles.gridItem}>
                <a href={`articles/${item.pathname}`}>
                  <img alt='a' src={item.photo} />
                </a>
                <div className={styles.gridTextArea}>
                  <p>{formatDate(item.createdAt)}</p>
                  <div><a href={`articles/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                  <div className={styles.link}><a href={`authors/${transformToUrl(item.author.fullname)}`} className={styles.gridAuthor}>{item.author.fullname}</a></div>
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
        {numberOfPages > 1 && <Pages path="articles?" pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />}
      </>
    )
  }
}

export default Articles