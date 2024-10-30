import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import { useParams, useSearchParams } from 'react-router-dom'
import NoData from '../../components/noData/NoData';
import { useSelector, useDispatch } from 'react-redux';
import * as filtersApi from '../../api/filtersApi';
import { transformToUrl } from '../../utils/pathTransformation';
import Rating from '../../components/rating/Rating';
import { formatDate } from "../../utils/formatDate"
import Pages from '../../components/pages/Pages';

const SearchResult = () => {

    const [searchParams, setSearchParams] = useSearchParams()    
    const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page") as string) - 1 || 0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    
    const PAGE_SIZE = 12

    const [data, setData] = useState<Array<IMovie | ISerie | IArticle | IManga | IReview>>()

    const keyword = searchParams.get("kw")
    const type = searchParams.get("type") || ""

    document.title = `Search Results for "${keyword}" - ANIMACE`

    useEffect(() => {
        const getData = async () => {
            if(keyword!.length > 0) {
                const data = {
                    type: type,
                    keyword: keyword as string,
                }
                const res = await filtersApi.search(data)
                if(res.data) {
                    setData(res.data)
                    setNumberOfPages(Math.ceil(res.data.length / PAGE_SIZE))
                }
            }
        }
        window.scrollTo({top: 0,behavior: "smooth"});
        getData()
      }, [keyword, type]);

      return (
        <>
            {
                data ? data.length > 0 ? 
                    <>
                        <h1 className={styles.title}>Search results for <span>{keyword}</span></h1>
                        <div className={styles.line}></div>
                        <div className={styles.grid}>
                            {(data as any)?.slice(pageNumber * PAGE_SIZE, (pageNumber + 1) * PAGE_SIZE).map((item: IArticle | IReview | IManga | IMovie | ISerie, i: number) => {
                                if(item.type === "reviews" || item.type === "articles") {
                                return (
                                    <div key={i} className={styles.gridItem}>
                                        <div className={styles.relative} >
                                            <a href={`../${item.type}/${item.pathname}`}>
                                                <img  alt='a' src={item.photo} />
                                            </a>
                                            {(item as IReview).score && <div className={styles.score}>{(item as IReview).score}</div>}
                                        </div>
                                        <div className={styles.gridTextArea}>
                                            <p>{formatDate(item.createdAt)}</p>
                                            <div><a href={`../${item.type}/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                                            <div className={styles.link}><a href={`authors/${transformToUrl((item as IArticle).author.fullname)}`} className={styles.gridAuthor}>{(item as IArticle).author.fullname}</a></div>
                                            <div className={styles.buttons}>
                                            {(item as IArticle).category?.map((item, i: number) => {return(
                                                        <a key={i} href={`../categories/${transformToUrl(item.title)}`}>
                                                            <button>{item.title}</button>
                                                        </a>
                                            )})}
                                            </div>
                                            <div className={styles.buttons}>
                                            {(item as IArticle).tag?.map((item, i: number) => {return(
                                                <a key={i} href={`../tags/${transformToUrl(item.title)}`}>
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
                                                <Rating rating={(item as IReview).rating}/>
                                                <div><a href={`../${item.type}/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                                                <div className={styles.year}>{(item as IMovie).year}</div>
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
                : <h1>...</h1>
            }
        </>
  )
}

export default SearchResult