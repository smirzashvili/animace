import React, {useState, useEffect} from 'react'
import styles from "./styles.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useParams, useSearchParams } from 'react-router-dom'
import { getMovies } from '../../../redux/actions/movieActions';
import { transformToName } from "../../../utils/pathTransformation"
import * as api from '../../../api/filtersApi';
import NoData from '../../../components/noData/NoData';
import Rating from '../../../components/rating/Rating';
import Pages from '../../../components/pages/Pages';

const GenresSingle = () => {

  const [searchParams, setSearchParams] = useSearchParams()    
  const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page") as string) - 1 || 0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [data, setData] = useState<Array<IMovie | ISerie>>([])

  const PAGE_SIZE = 12

  const keyword = searchParams.get("kw")
  const type = searchParams.get("type") || ""

    let { name } = useParams()

    document.title = `${transformToName(name as string)} - ANIMACE`

    useEffect(() => {
      const getData = async () => {
          const data = {
            name: transformToName(name as string),
            type: "genre"
          }
          const res = await api.filterMedia(data)
          if(res.data) {
              setData(res.data)
              setNumberOfPages(Math.ceil(res.data.length / PAGE_SIZE))
          }
      }
      getData()
    }, [name]);

    useEffect(() => {
      window.scrollTo({top: 0,behavior: "smooth"});
  }, [pageNumber]);
        
  return (
    <>
      {data ? data.length > 0 ? 
        <>
      <h1 className={styles.title}>{transformToName(name as string)}</h1>
      <div className={styles.line}></div>
      <div className={styles.grid}>
        {data?.slice(pageNumber * PAGE_SIZE, (pageNumber + 1) * PAGE_SIZE).map(item => {
            return (
              <div className={styles.gridItem}>
                <a href={`../${item.type}/${item.pathname}`}>
                  <img alt='a' src={item.photo} />
                </a>
                <div className={styles.gridTextArea}>
                  <Rating rating={item.rating} size={undefined} />
                  <div><a href={`../${item.type}/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                  <div className={styles.year}>{item.year}</div>
                </div>
              </div>
              )
          })
          
        }
        
      </div>
      {numberOfPages > 1 && <Pages path={`genres/${name}?`} pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} />}
        </>
      : <NoData />
      : ""
      }
    </> 
  )
}

export default GenresSingle