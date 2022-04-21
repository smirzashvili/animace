import React from 'react';
import styles from "./styles.module.css"
import { IoIosArrowUp } from 'react-icons/io';

const Main = (props) => {

  window.addEventListener('scroll', () => {
    if(window.scrollY > 150) {
      document.getElementById("btn").style.backgroundColor = "#dd3333"
      document.getElementById("btn").style.color = "white"
      document.getElementById("btn").style.cursor = "pointer"
      document.getElementById("btn").title = "Back to top"
    } else {
      document.getElementById("btn").style.backgroundColor = "unset"
      document.getElementById("btn").style.color = "transparent"
      document.getElementById("btn").style.cursor = "unset"
      document.getElementById("btn").title = ""
    }
  })

  const scrollToTop = () => {
    if(document.getElementById("btn").title === "Back to top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }
  const handleHover = () => {
    if(document.getElementById("btn").title === "Back to top") {
      document.getElementById("btn").style.backgroundColor = "#FF5C58"
    }
  }
  const handleUnHover = () => {
    if(document.getElementById("btn").title === "Back to top") {
      document.getElementById("btn").style.backgroundColor = "#dd3333";
    }
  }

  return (
    <div className={styles.layout}>
      {props.children}
      <div 
        onClick={() => scrollToTop()}
        className={styles.scrollButton}
        id="btn"
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => handleUnHover()}
        >
          <IoIosArrowUp />
      </div> 
    </div>
  )
};

export default Main;
