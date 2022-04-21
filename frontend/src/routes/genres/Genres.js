import React, {useEffect} from 'react'
import styles from "./styles.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { transformToUrl } from "../../utils/pathTransformation"
import { getGenres } from '../../redux/actions/genreActions.js';

const Genres = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
      }, [dispatch]);

    const {genres} = useSelector(state=>state.GenresReducer)

  return (
    <>
        <h1 className={styles.title}>Genres</h1>
        <div className={styles.line}></div>
        <div className={styles.grid}>
            {
                genres.map(item => {
                    return (
                        <div className={styles.gridItem}>
                            <a href={`./genres/${transformToUrl(item.title)}`}>
                                <img alt='a' src={item.photo}/>
                            </a>
                            <div className={styles.gridTitle}>
                                <a href={`./genres/${transformToUrl(item.title)}`}>{item.title}</a>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
    )
}

export default Genres