import React from 'react';
import styles from "./styles.module.css"

const Contact = () => {
  return (
    <div className={styles.container}>
        <img alt='a' src='/assets/contactBackground.jpg' />
        <div className={styles.title}>Contact</div>
        <div className={styles.line}></div>
        <form className={styles.form}>
            <div className={styles.item}>
                <div>Your Name (required)</div>
                <input type="text" />
            </div>
            <div className={styles.item}>
                <div>Your Email (required)</div>
                <input type="text" />
            </div>
            <div className={styles.item}>
                <div>Subject</div>
                <input type="text" />
            </div>
            <div className={styles.item}>
                <div>Your Message</div>
                <textarea></textarea>
            </div>
            <button type='submit'>Send</button>
        </form>
    </div>
  )
};

export default Contact;
