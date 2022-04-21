import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css"
import { IoIosArrowBack } from 'react-icons/io';
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../../api/actorsApi.js';
import * as filtersApi from '../../../api/filtersApi.js';
import { getActor } from '../../../redux/actions/actorActions';
import { transformToName, transformToUrl } from "../../../utils/pathTransformation"
import NotFound from '../../../components/notFound/NotFound';
import { formatDate } from "../../../utils/formatDate"

const ActorsSingle = ({darkMode, darkStyleHome}) => {

    const [notFound, setNotFound] = useState(false)
    const [knownFor, setKnownFor] = useState()
    const [news, setNews] = useState()

    const dispatch = useDispatch()
    
    let { name } = useParams()

    useEffect(() => {
        const getKnownFor = async () => {
            const data = {
                name: transformToName(name),
                type: "actor"
            }
            const res = await filtersApi.filterMedia(data)
            if(res.data) {
                setKnownFor(res.data)
            } 
        }
        const getActorInfo = async () => {
            const res = await api.fetchActor(transformToName(name))
            if(res.data) {
                document.title = `${transformToName(name)} - ANIMACE`
                dispatch(getActor(res.data))
            } else {
                setNotFound(true)
            } 
        }
        const getNews = async () => {
            const data = {
                name: transformToName(name),
                type: "tag"
            }            
            const res = await filtersApi.filterPosts(data)
            if(res.data) {
                setNews(res.data)
            } 
        }

        getKnownFor()
        getActorInfo()
        getNews()

    }, [dispatch, name]);

    
    const {actorInfo} = useSelector(state=>state.ActorsReducer)

    const [buttonActive, setButtonActive] = useState({"Known For": true})

    const handleActive = (e) => {
        setButtonActive({
            [e.target.name]: true
        })
    }

    if(notFound === true) {
        return <NotFound />
    } else {
  return (
    <>
        <h1 className={styles.title}>{actorInfo.fullName}</h1>
        <div className={styles.line}></div>
        <div className={styles.flex}>
            <div className={styles.flexItem}>
                <img className={styles.flexItemImage} alt='a' src={actorInfo.photo} />
            </div>
            <div className={styles.flexItem}>
                <div id="buttons" className={styles.buttons}>
                    <button style={darkMode ? {"backgroundColor": "grey", "color": "white" } : {}} name="Known For" onClick={(e)=>handleActive(e)} className={buttonActive["Known For"] ? styles.activeButton : ""}>Known For</button>
                    <button style={darkMode ? {"backgroundColor": "grey", "color": "white" } : {}} name="Bio" onClick={(e)=>handleActive(e)} className={buttonActive["Bio"] ? styles.activeButton : ""}>Bio</button>
                    <button style={darkMode ? {"backgroundColor": "grey", "color": "white" } : {}} name="News" onClick={(e)=>handleActive(e)} className={buttonActive["News"] ? styles.activeButton : ""}>News</button>
                </div>
                {buttonActive["Known For"] ?
                <div className={styles.grid}>
                    {knownFor?.map(item => {
                        return (
                            <div style={darkMode ? darkStyleHome : {}} className={styles.gridItem}>
                                <a href={`../../${item.type}/${item.pathname}`}>
                                    <img className={styles.gridItemImage} alt='a' src={item.photo} />
                                </a>
                                <div>
                                    <a href={`../../${item.type}/${item.pathname}`}>
                                        <div className={styles.gridItemHeader}>{item.title}</div>
                                    </a>
                                    <div className={styles.gridItemSaber}>
                                        {item.actors.map(item => {
                                            if(item.actor.fullName === actorInfo.fullName) {
                                                return <div>{item.role}</div>
                                            }
                                        })}
                                    </div>
                                    <div className={styles.gridItemYear}>{`${item.type.charAt(0).toUpperCase() + item.type.slice(1)} | ${item.year}`}</div>
                                </div>
                            </div>            
                        )
                    })}
                </div>
                : buttonActive["Bio"] ?
                <div style={darkMode ? darkStyleHome : {}} className={actorInfo.bio ? styles.bio : ""}>
                    {
                        actorInfo.bio?.split('\n').map(item => {
                            if(item === "") {
                                return <br/>
                            } else {
                                return <p>{item}</p>
                            }
                        })
                    }
                </div>
                :
                <div className={styles.news}>
                    {
                        news?.length > 0 ? 
                        <div className={styles.newsGrid}>
                        {    
                            news?.map(item => {
                                return ( 
                                    <div style={darkMode ? darkStyleHome : {}} className={styles.newsGridItem}>
                                        <a href={`../../${item.type}/${item.pathname}`}>
                                            <img alt="a" src={item.photo} />
                                        </a>
                                        <div className={styles.newsGridText}>
                                            <div className={styles.newsGridDate}>{formatDate(item.createdAt)}</div>
                                            <a href={`../../${item.type}/${item.pathname}`}>
                                                <div className={styles.newsGridTitle}>{item.title}</div>
                                            </a>
                                            <div className={styles.newsGridSubTitle}>{item.subtitle}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> :
                        <>
                            <div className={styles.noPosts}>No posts founded for this Actor/Actress or Director</div>
                            <button className={styles.returnButton}><IoIosArrowBack />Return to home</button>
                        </>
                    }              
                </div>
                }
            </div>
        </div>
    </>
  )
            }
};

export default ActorsSingle;
