import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { getActors, filterActors } from '../../redux/actions/actorActions';
import { transformToUrl } from "../../utils/pathTransformation"

const Actors = () => {

    const [alphabetState, setAlphabetState] = useState<Array<string>>([])
    const [activeButton, setActiveButton] = useState("")

    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(getActors())
    }, [dispatch]);

    const {actors} = useSelector((state: RootState)=>state.ActorsReducer)

    for(let i = 0; i<actors?.length; i++) {
        if(!alphabetState.includes(actors[i].fullName.charAt(0))) {
            alphabetState.push(actors[i].fullName.charAt(0))
        }
    }

    const handleFilterActors = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, letter: string) => {
        setActiveButton(letter)
    }

  return (
    <>
        <div className={styles.title}>Actors</div>
        <div className={styles.line}></div>
        <div className={styles.filterButtons}>
        <button className={activeButton === "#" ? styles.activeButton : ""} onClick={(e) => handleFilterActors(e, "#")}>#</button>
            {
            alphabetState?.map(letter => {
                return (
                    <button className={activeButton === letter ? styles.activeButton : ""} onClick={(e) => handleFilterActors(e, letter)}>{letter}</button>
                )
            })
            }
        </div>
        {
            alphabetState?.map(letter => {
                return (
                    <div className={activeButton === letter || activeButton === "#" || activeButton === "" ? styles.animation : styles.animation1}>
                        <div className={styles.letter}>{letter}</div>
                        <div className={styles.line}></div>
                        <div className={styles.grid}>
                            {
                            actors?.map((item: IActor) => {
                                console.log(item)
                                if(item.fullName.charAt(0) === letter) {
                                    return (
                                        <div className={styles.gridItem}>
                                            <a href={`/actors/${transformToUrl(item.fullName)}`}>
                                                <img alt='a' src={item.photo} />
                                            </a>
                                            <a href={`/actors/${transformToUrl(item.fullName)}`}>{item.fullName}</a>
                                        </div>
                            )}})
                            }
                        </div>
                    </div>
                )
            })
        }
    </>
  )
};

export default Actors;
