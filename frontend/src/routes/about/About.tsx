import React from 'react';
import styles from "./styles.module.css"

const About = () => {
  return (
    <>
    <h1 className={styles.title}>About</h1>
    <div className={styles.line}></div>
    <div className={styles.text}>
        Here should be a long story
    </div>
  </>
  )
};

export default About;
