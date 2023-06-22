import React from 'react';
import styles from "./styles.module.css"

const NotFound = () => {

  document.title = "Page not found - ANIMACE"

  return (
    <div className={styles.relative}>
        <img src="/assets/notFoundBackground.jpg"/>
        <div className={styles.texts}>
            <h1>Oops! Page not found</h1>
            <h5>
                We seem to have messed something up. Sorry about that.
                Have a look at the address to see if you can spot an error.
            </h5>
            <a href='/'><button>Return to home</button></a>
        </div>
    </div>
  )
};

export default NotFound;
