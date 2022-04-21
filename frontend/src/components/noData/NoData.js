import React from 'react'
import styles from "./styles.module.css"
import { IoIosArrowBack } from 'react-icons/io';

const NoData = () => {
  return (
    <>
        <div className={styles.noData}>No data founded for this Search</div>
        <a className={styles.noDataLink} href='/'>
            <button className={styles.noDataButton}>
                <IoIosArrowBack/>Return to home
            </button>
        </a>
    </>
  )
}

export default NoData