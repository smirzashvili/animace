import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css"
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {useNavigate, useSearchParams} from "react-router-dom"

const Pages = ({path, pageNumber, setPageNumber, numberOfPages}) => {
    const navigate = useNavigate()

    const handleClick = (page) => {
        setPageNumber(page)
        navigate(`/${path}page=${page + 1}`)
      }
    const goToBack = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
        navigate(`/${path}page=${Math.max(0, pageNumber - 1) + 1}`)
    }

    const goToForward = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
        navigate(`/${path}page=${Math.min(numberOfPages - 1, pageNumber + 1) + 1}`)
    }

  return (
    <div className={styles.pages}>
        {pageNumber !== 0 && <button onClick={() => goToBack()}><IoIosArrowBack/></button>}
        {[...Array(numberOfPages)].map((i, page) => {
        return (
            <button style={pageNumber === page ? {"color": "#ababab"} : {}} className={styles.pageButtons} key={page} onClick={() => handleClick(page)}>
            <p>{page + 1}</p>
            </button>
        )
        })} 
        {pageNumber !== numberOfPages - 1 && <button onClick={() => goToForward()}><IoIosArrowForward/></button>}
    </div>
  )
}

export default Pages