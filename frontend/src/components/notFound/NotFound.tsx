import React from 'react';
import styles from "./styles.module.css"

const NotFound = () => {

  document.title = "Page not found - ANIMACE"

  return (
    <div className={styles.relative}>
        <img src="https://res.cloudinary.com/dxkxeimv4/image/upload/v1645263313/animace/banners/moujib-aghrout-s9ESRUFnKDg-unsplash-1170x756_yp1nyw.jpg"/>
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
