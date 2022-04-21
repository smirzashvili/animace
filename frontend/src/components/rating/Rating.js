import React from 'react'
import styles from "./styles.module.css"
import { RiStarLine, RiStarFill, RiStarHalfLine } from 'react-icons/ri';

const Rating = ({rating, size}) => {

  return (
    <div className={size === "medium" ? styles.medium : styles.small}>
        {
            [...Array(5)].map((item, index) => {
                if(rating < index + 1) {
                  if(rating - index === 0.5) {
                    return <RiStarHalfLine/>
                  } else {
                    return (
                      <RiStarLine/>
                    )
                  }
                } 
                else {
                  return (
                    <RiStarFill/>
                  )
                }
            })
        }
    </div>
  )
}

export default Rating