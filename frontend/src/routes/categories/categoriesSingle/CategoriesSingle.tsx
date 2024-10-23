import React, { useState, useEffect,  } from 'react';
import styles from "./styles.module.css"
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../../api/filtersApi';
import { getCategory } from '../../../redux/actions/categoryActions';
import { transformToName, transformToUrl } from "../../../utils/pathTransformation"
import NoData from '../../../components/noData/NoData';
import { formatDate } from "../../../utils/formatDate"

const CategoriesSingle = () => {

    const [data, setData] = useState<Array<IArticle | IReview>>()

    let { name } = useParams()    
    
    document.title = `${transformToName(name as string)} - ANIMACE`
    
    useEffect(() => {
        window.scrollTo({top: 0,behavior: "smooth"});
        const getData = async () => {
            const data = {
                name: transformToName(name as string),
                type: "category"
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
            {/* hi */}
            {
                data ? data.length > 0 ? 
                    <>
                        <h1 className={styles.title}>{transformToName(name as string)}</h1>
                        <div className={styles.line}></div>
                        <div className={styles.grid}>
                            {data?.map(item => {
                                return (
                                    <div className={styles.gridItem}>
                                        <a href={`../${item.type}/${item.pathname}`}>
                                            <img alt='a' src={item.photo} />
                                        </a>
                                        <div className={styles.gridTextArea}>
                                            <p>{formatDate(item.createdAt)}</p>
                                            <div><a href={`../${item.type}/${item.pathname}`} className={styles.gridTitle}>{item.title}</a></div>
                                            <div className={styles.link}><a href={`../authors/${transformToUrl(item.author.fullname)}`} className={styles.gridAuthor}>{item.author.fullname}</a></div>
                                            <div className={styles.buttons}>
                                                {item.category.map(item => {return(
                                                    <a href={`./${transformToUrl(item.title)}`}>
                                                        <button>{item.title}</button>
                                                    </a>
                                                )})}
                                            </div>
                                            <div className={styles.buttons}>
                                                {item.tag?.map(item => {
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
                            })}
                        </div>
                    </>
                : <NoData />
                : ""
            } 
        </>
    )
}

export default CategoriesSingle