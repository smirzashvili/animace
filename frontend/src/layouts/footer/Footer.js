import React from 'react';
import styles from "./styles.module.css"
import { RiFacebookFill } from 'react-icons/ri';
import { SiTwitter } from 'react-icons/si';
import { RiInstagramFill } from 'react-icons/ri';
import { AiFillYoutube } from 'react-icons/ai';
import { IoLogoVimeo } from 'react-icons/io';

const Footer = ({darkMode}) => {
  return (
    <>
    <div className={styles.line}></div>
    <div className={styles.footer} style={darkMode ? {"backgroundColor": "#191919"} : {}}>
        <nav className={styles.container}>
            <div className={styles.item}>
                <div className={styles.header}>Our Work is</div>
                <p>Designed, crafted and built with React, Node, Express and Mongo.</p>
            </div>
            <div className={styles.item}>
                <div className={styles.header}>
                    <a href='/contact'>Contact</a>
                </div>
                <p>Piazza Indipendenza 19 – Trélex Switzerland</p>
                <p><a href="tel: 02231398462">022 313 98462</a></p>
                <p><a href="mailto: animace.provider@gmail.com ">animace.provider@gmail.com</a></p>
            </div>
            <div className={styles.item}>
                <div className={styles.header}>Find Us</div>
                <div className={styles.logos}>
                    <a href='/'>
                    <RiFacebookFill />
                    </a>
                    <a href='/'>
                    <SiTwitter />
                    </a>
                    <a href='/'>
                    <RiInstagramFill />
                    </a>
                    <a href='/'>
                    <AiFillYoutube />
                    </a>
                    <a href='/'>
                    <IoLogoVimeo />
                    </a>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.header}>
                    <a href="/about">About</a>
                </div>
                <p>© 2022 ANIMACE . All Rights Reserved.</p>
                <p>Designed with ❤️ and 🧠</p>
            </div>
        </nav>
    </div>
    </>
  )
};

export default Footer;
