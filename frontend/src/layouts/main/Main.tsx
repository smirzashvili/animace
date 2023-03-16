import React, {MutableRefObject, useRef} from 'react';
import styles from "./styles.module.css"
import { IoIosArrowUp } from 'react-icons/io';

const Main = (props: { children: React.ReactChild | React.ReactFragment}) => {

  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  window.addEventListener('scroll', () => {
    if(window.scrollY > 150) {
      ref.current.style.backgroundColor = "#dd3333"
      ref.current.style.color = "white"
      ref.current.style.cursor = "pointer"
      ref.current.title = "Back to top"
    } else {
      ref.current.style.backgroundColor = "unset"
      ref.current.style.color = "transparent"
      ref.current.style.cursor = "unset"
      ref.current.title = ""
    }
  })

  const scrollToTop = () => {
    if(ref.current.title === "Back to top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }
  const handleHover = () => {
    if(ref.current.title === "Back to top") {
      ref.current.style.backgroundColor = "#FF5C58"
    }
  }
  const handleUnHover = () => {
    if(ref.current.title === "Back to top") {
      ref.current.style.backgroundColor = "#dd3333";
    }
  }

  return (
    <div className={styles.layout}>
      {props.children}
      <div 
        onClick={() => scrollToTop()}
        className={styles.scrollButton}
        id="btn"
        ref={ref}
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => handleUnHover()}
        >
          <IoIosArrowUp />
      </div> 
    </div>
  )
};

export default Main;
