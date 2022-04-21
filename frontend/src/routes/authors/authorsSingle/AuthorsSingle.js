import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../../api/authorsApi.js';
import * as filtersApi from '../../../api/filtersApi';
import { getAuthor } from '../../../redux/actions/authorActions';
import { getArticles, getArticlesByAuthor } from '../../../redux/actions/articleActions';
import { transformToName, transformToUrl } from "../../../utils/pathTransformation"
import NotFound from '../../../components/notFound/NotFound';
import { formatDate } from "../../../utils/formatDate"

const AuthorsSingle = ({darkMode, darkStyleHome}) => {
    
    const [data, setData] = useState()

    const [notFound, setNotFound] = useState(false)

    const dispatch = useDispatch()
    
    let { name } = useParams()
    
    useEffect(() => {
        const getData = async () => {
            const data = {
                name: transformToName(name),
                type: "author"
            }
            const res = await filtersApi.filterPosts(data)
            if(res.data) {
                setData(res.data)
            } 
        }
        const getAuthorInfo = async () => {
            const res = await api.fetchAuthor(transformToName(name))
            if(res.data) {
                document.title = `${transformToName(name)} - ANIMACE`
                dispatch(getAuthor(res.data))
                
            } else {
                setNotFound(true)
            } 
        }
        getData()
        getAuthorInfo()
    }, [dispatch, name]);

    const {authorInfo} = useSelector(state=>state.AuthorsReducer)

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
            {data?.map(item => {
            return (
                <div className={styles.gridItem}>
                <a href={`../articles/${item.pathname}`}>
                    <img alt='a' src={item.photo} />
                </a>
                <div className={styles.gridTextArea}>
                    <p>{formatDate(item.createdAt)}</p>
                    <div className={styles.link}><a href={`../articles/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                    <div className={styles.buttons}>
                    {
                        item.category.map(item => {
                            return (
                                <a href={`../../categories/${transformToUrl(item.title)}`}>
                                    <button>{item.title}</button>
                                </a>
                            )
                        })
                    }
                    </div>
                    <div className={styles.buttons}>
                    {
                        item.tag.map(item => {
                            return (
                                <a href={`../../tags/${transformToUrl(item.title)}`}>
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