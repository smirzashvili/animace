import React, { useState, useEffect,  } from 'react';
import styles from "./styles.module.css"
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { transformToName, transformToUrl } from "../../../utils/pathTransformation"
import { getArticles } from '../../../redux/actions/articleActions';
import { getReviews } from '../../../redux/actions/reviewActions';
import * as api from '../../../api/filtersApi';
import NoData from '../../../components/noData/NoData';
import { formatDate } from '../../../utils/formatDate';

const TagsSingle = () => {

    const [data, setData] = useState([])
        
    let { name } = useParams()

    document.title = `${transformToName(name as string)} - ANIMACE`

    useEffect(() => {
        const getData = async () => {
            const data = {
                name: transformToName(name as string),
                type: "tag"
            }
            const res = await api.filterPosts(data)
            if(res.data) {
                setData(res.data)
            }
        }
        getData()
    }, [name]);
        
    
    return (
        <>
            {
                data ? data.length > 0 ? 
                    <>
                        <h1 className={styles.title}>{transformToName(name as string)}</h1>
                        <div className={styles.line}></div>
                        <div className={styles.grid}>
                            {data?.map((item: IArticle, i: number) => {
                                return (
                                    <div key={i} className={styles.gridItem}>
                                        <a href={`../${item.type}/${item.pathname}`}>
                                            <img alt='a' src={item.photo} />
                                        </a>
                                        <div className={styles.gridTextArea}>
                                            <p>{formatDate(item.createdAt)}</p>
                                            <div><a href={`../${item.type}/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                                            <div className={styles.link}><a href={`../authors/${transformToUrl(item.author.fullname)}`} className={styles.gridAuthor}>{item.author.fullname}</a></div>
                                            <div className={styles.buttons}>
                                                {item.category.map((item, i: number) => {return(
                                                    <a key={i} href={`../categories/${transformToUrl(item.title)}`}>
                                                        <button>{item.title}</button>
                                                    </a>
                                                )})}
                                            </div>
                                            <div className={styles.buttons}>
                                                {item.tag.map((item, i: number) => {
                                                    if(!item.type)
                                                    return(
                                                    <a key={i} href={`../tags/${transformToUrl(item.title)}`}>
                                                        <button>{item.title}</button>
                                                    </a>
                                                )})}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                : <NoData />
                : ""
            } 
        </>
    )
}

export default TagsSingle