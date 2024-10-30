import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../../api/authorsApi';
import * as filtersApi from '../../../api/filtersApi';
import { getAuthor } from '../../../redux/actions/authorActions';
import { transformToName, transformToUrl } from "../../../utils/pathTransformation"
import NotFound from '../../../components/notFound/NotFound';
import { formatDate } from "../../../utils/formatDate"

const AuthorsSingle: React.FC<{darkMode: boolean}> = ({darkMode}) => {
    
    const [data, setData] = useState<Array<IArticle | IReview>>()

    const [notFound, setNotFound] = useState(false)

    const dispatch = useDispatch()
    
    let { name } = useParams()
    
    useEffect(() => {
        const getData = async () => {
            const data = {
                name: transformToName(name as string),
                type: "author"
            }
            const res = await filtersApi.filterPosts(data)
            if(res.data) {
                setData(res.data)
            } 
        }
        const getAuthorInfo = async () => {
            const res = await api.fetchAuthor(transformToName(name as string))
            if(res.data) {
                document.title = `${transformToName(name as string)} - ANIMACE`
                dispatch(getAuthor(res.data))
                
            } else {
                setNotFound(true)
            } 
        }
        getData()
        getAuthorInfo()
    }, [dispatch, name]);

    const {authorInfo} = useSelector((state: RootState) => state.AuthorsReducer)

    if(notFound === true) {
        return <NotFound />
    } else {
  return (
    <>
        <div className={styles.headerFlex}>
            <img alt='a' src={authorInfo.photo} />
            <div className={styles.titleArea}>
                <h1 className={styles.title}>{authorInfo.fullname}</h1>
                <div className={styles.interests}>{authorInfo.interests}</div>
            </div>
        </div>
        <div className={styles.line}></div>

        <div className={styles.grid}>
            {data?.map((item: IReview | IArticle, i: number) => {
            return (
                <div key={i} className={styles.gridItem}>
                <a href={`../articles/${item.pathname}`}>
                    <img alt='a' src={item.photo} />
                </a>
                <div className={styles.gridTextArea}>
                    <p>{formatDate(item.createdAt)}</p>
                    <div className={styles.link}><a href={`../articles/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                    <div className={styles.buttons}>
                    {
                        item.category.map((item, i: number) => {
                            return (
                                <a key={i} href={`../../categories/${transformToUrl(item.title)}`}>
                                    <button>{item.title}</button>
                                </a>
                            )
                        })
                    }
                    </div>
                    <div className={styles.buttons}>
                    {
                        item.tag.map((item, i: number) => {
                            return (
                                <a key={i} href={`../../tags/${transformToUrl(item.title)}`}>
                                    <button>{item.title}</button>
                                </a>
                            )
                        })
                    }
                    </div>
                </div>
                </div>
                )
                })
            } 
        </div>
    </>
  )
        }
}

export default AuthorsSingle