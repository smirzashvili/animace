import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import { useParams, useSearchParams } from 'react-router-dom'
import NoData from '../../components/noData/NoData';
import { useSelector, useDispatch } from 'react-redux';
import * as filtersApi from '../../api/filtersApi.js';
import { transformToUrl } from '../../utils/pathTransformation';
import Rating from '../../components/rating/Rating';
import { formatDate } from "../../utils/formatDate"
import Pages from '../../components/pages/Pages';

const SearchResult = () => {

    const [searchParams, setSearchParams] = useSearchParams()    
    const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page")) - 1 || 0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    
    const PAGE_SIZE = 12

    const [data, setData] = useState()

    const keyword = searchParams.get("kw")
    const type = searchParams.get("type") || ""

    document.title = `Search Results for "${keyword}" - ANIMACE`

    useEffect(() => {
        const getData = async () => {
            if(keyword.length > 0) {
                const data = {
                    type: type,
                    keyword: keyword,
                }
                const res = await filtersApi.search(data)
                if(res.data) {
                    setData(res.data)
                    setNumberOfPages(Math.ceil(res.data.length / PAGE_SIZE))
                }
            }
        }
        getData()
      }, [keyword, type]);

      useEffect(() => {
          window.scrollTo({top: 0,behavior: "smooth"});
      }, [pageNumber]);



      return (
        <>
            {
                data ? data.length > 0 ? 
                    <>
                        <h1 className={styles.title}>Search results for <span>{keyword}</span></h1>
                        <div className={styles.line}></div>
                        <div className={styles.grid}>
                            {data?.slice(pageNumber * PAGE_SIZE, (pageNumber + 1) * PAGE_SIZE).map(item => {
                                if(item.type === "reviews" || item.type === "articles") {
                                return (
                                    <div className={styles.gridItem}>
                                        <div className={styles.relative} >
                                            <a href={`../${item.type}/${item.pathname}`}>
                                                <img  alt='a' src={item.photo} />
                                            </a>
                                            {item.score && <div className={styles.score}>{item.score}</div>}
                                        </div>
                                        <div className={styles.gridTextArea}>
                                            <p>{formatDate(item.createdAt)}</p>
                                            <div><a href={`../${item.type}/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                                            <div className={styles.link}><a href={`authors/${transformToUrl(item.author.fullname)}`} className={styles.gridAuthor}>{item.author.fullname}</a></div>
                                            <div className={styles.buttons}>
                                            {item.category?.map(item => {return(
                                                        <a href={`../categories/${transformToUrl(item.title)}`}>
                                                            <button>{item.title}</button>
                                                        </a>
                                            )})}
                                            </div>
                                            <div className={styles.buttons}>
                                            {item.tag?.map(item => {return(
                                                <a href={`../tags/${transformToUrl(item.title)}`}>
                                                    <button>{item.title}</button>
                                                </a>
                                            )})}
                                            </div>
                                        </div>
                                    </div>
                                )} else {
                                    return(
                                        <div className={styles.gridItem1}>
                                            <a href={`../${item.type}/${item.pathname}`}>
                                                <img alt='a' src={item.photo} />
                                            </a>
                                            <div className={styles.gridTextArea}>
                                                <Rating rating={item.rating}/>
                                                <div><a href={`../${item.type}/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                                                <div className={styles.year}>{item.year}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        {numberOfPages > 1 && <Pages path={`search?kw=${keyword}&type=${type}&`} pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />}
                    </>
                : 
                <NoData />
                : ""
            }
        </>
  )
}

export default SearchResult