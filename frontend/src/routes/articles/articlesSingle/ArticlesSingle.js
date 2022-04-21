import React, {useEffect, useState} from 'react';
import styles from "./styles.module.css"
import { BsCalendarCheck } from 'react-icons/bs';
import { RiFacebookFill } from 'react-icons/ri';
import { FaPinterestP, FaTelegramPlane } from "react-icons/fa"
import { AiOutlineWhatsApp } from "react-icons/ai"
import { TiSocialLinkedin } from "react-icons/ti"
import { HiOutlineMail } from "react-icons/hi"
import {useDispatch, useSelector} from "react-redux"
import {
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TelegramShareButton
} from "react-share"
import {useParams} from 'react-router-dom'
import * as api from '../../../api/articlesApi.js';
import { getArticle } from '../../../redux/actions/articleActions';
import { transformToUrl, transformToName } from "../../../utils/pathTransformation"
import NotFound from '../../../components/notFound/NotFound';
import SearchSideBar from '../../../components/searchSideBar/SearchSideBar';
import Comments from '../../../components/comments/Comments';
import { formatDate } from "../../../utils/formatDate"

const ArticlesSingle = ({darkMode}) => {

  const [notFound, setNotFound] = useState(false)

  let { name } = useParams()

  const dispatch = useDispatch()

  const {articles} = useSelector(state=>state.ArticlesReducer)
  
  const {articleInfo} = useSelector(state=>state.ArticlesReducer)

  useEffect(() => {
    const getArticleInfo = async () => {
      const res = await api.fetchArticle(name)
      if(res.data) {
        document.title = `${res.data.title} - ANIMACE`
        dispatch(getArticle(res.data))
      } else {
        setNotFound(true)
    } 
    }
    getArticleInfo()
  }, [dispatch, name, articleInfo]);

  // useEffect(() => {
  //   const getArticleInfo = async () => {
  //     const res = await api.fetchArticle(name)
  //     if(res.data) {
  //       document.title = `${transformToName(name)} - ANIMACE`
  //       dispatch(getArticle(res.data))
  //     } else {
  //       setNotFound(true)
  //   } 
  //   }
  //   getArticleInfo()
  // }, [dispatch]);

  
  if(notFound === true) {
    return <NotFound />
  } else {
  return (
      <>
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <div className={styles.header}>{articleInfo.title}</div>
            <div className={styles.date}><BsCalendarCheck />{formatDate(articleInfo.createdAt)}</div>
            <img className={styles.headerImg} alt='a' src={articleInfo.photo} />
            <div className={styles.shareLogos}>
              <FacebookShareButton
                url={window.location.href}
                quote={"bla"}
              >
                <RiFacebookFill />
              </FacebookShareButton>
              <PinterestShareButton
                url={window.location.href}
                quote={"bla"}
              >
                <FaPinterestP style={{"padding": "5px"}} />
              </PinterestShareButton >
              <WhatsappShareButton
                url={window.location.href}
                quote={"bla"}
              >
                <AiOutlineWhatsApp />
              </WhatsappShareButton>
              <LinkedinShareButton
                url={window.location.href}
                quote={"bla"}
              >
                <TiSocialLinkedin style={{"padding": "3px"}} />
              </LinkedinShareButton>
              <EmailShareButton
                url={window.location.href}
                quote={"bla"}
              >
                <HiOutlineMail />
              </EmailShareButton>
              <TelegramShareButton
                url={window.location.href}
                quote={"bla"}
              >
                <FaTelegramPlane style={{"padding": "5px"}} />
              </TelegramShareButton>
            </div>
            <div className={styles.articleHeader}>
              {articleInfo.subtitle}
            </div>
            <div className={styles.articleAuthorArea}>
              <img alt='a' src={articleInfo.author?.photo} />
              <a href={`../authors/${transformToUrl(articleInfo.author?.fullname)}`}>
                {articleInfo.author?.fullname}
              </a> 
            </div>
            <div className={styles.line}></div>

            <div className={styles.firstLetter}><div>{articleInfo.text?.charAt(0)}</div></div>
              {
                articleInfo.text?.substring(1).split('\n').map((item,index) => {
                  if(articleInfo.text?.split('\n')[index] === articleInfo.text?.split('\n')[index-1]) {
                    return <iframe className={styles.articleVideo} title='title' src={articleInfo.video} ></iframe>
                  }
                  if(item === "") {
                    return <br key={index}/>
                  } 
                  else {
                  return(
                    <p key={index} className={styles.articleText}>{item}</p>
                  )
                  }
                })
              }

            <div className={styles.inThisPost}>In this post:</div>
            <div className={styles.inThisPostButtons}>
              {
                articleInfo.category?.map(item => {
                  return (
                    <a href={`../categories/${transformToUrl(item.title)}`}>
                      <button>{item.title}</button>
                    </a>
                  )
                })
              }
              {
                articleInfo.tag?.map(item => {
                  if(item.type) {
                    return (
                      <a href={`../${item.type}/${transformToUrl(item.title)}`}>
                        <button>{item.title}</button>
                      </a>
                    )
                  } else {
                    return (
                      <a href={`../tags/${transformToUrl(item.title)}`}>
                        <button>{item.title}</button>
                      </a>
                    )
                  }
                })
              }
            </div>
            <div className={styles.line}></div>
              <Comments darkMode={darkMode} info={articleInfo}/>
            <div className={styles.line}></div>
            <div className={styles.sameGrid}>
              {articles.filter(item => item._id !== articleInfo._id).slice(0, 8).map(item => {
                return (
                  <div className={styles.sameGridItem}>
                    <a href={`./${item.pathname}`}>
                      <img alt='a' src={item.photo} />
                    </a>
                    <div>{formatDate(item.createdAt)}</div>
                    <a href={`./${item.pathname}`}>{item.title}</a>
                  </div>
                )
              })}               
            </div>
          </div>

          <div className={styles.gridItem}>
            <div className={styles.sticky}>
              <SearchSideBar />
            </div>
          </div>
        </div>
      </>
  )
            }
};

export default ArticlesSingle;
