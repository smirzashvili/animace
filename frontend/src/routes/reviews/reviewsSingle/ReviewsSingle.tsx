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
import * as api from '../../../api/reviewsApi';
import { getReview } from '../../../redux/actions/reviewActions';
import { transformToUrl } from "../../../utils/pathTransformation"
import NotFound from '../../../components/notFound/NotFound';
import SearchSideBar from '../../../components/searchSideBar/SearchSideBar';
import Comments from '../../../components/comments/Comments';
import { formatDate } from "../../../utils/formatDate"


const ArticlesSingle: React.FC<{darkMode: boolean}> = ({darkMode}) => {

  const [notFound, setNotFound] = useState(false)

  let { name } = useParams()

  const dispatch = useDispatch()

  const {reviews} = useSelector((state: RootState)=>state.ReviewsReducer)
  const {reviewInfo} = useSelector((state: RootState)=>state.ReviewsReducer)

  useEffect(() => {
    const getReviewInfo = async () => {
      const res = await api.fetchReview(name as string)
        if(res.data) {
          document.title = `${res.data.title} - ANIMACE`
          dispatch(getReview(res.data))
        } else {
          setNotFound(true)
        }
    }
    getReviewInfo()
  }, [dispatch, name, reviewInfo]);
  

  if(notFound === true) {
    return <NotFound />
} else {
  return (
      <>
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <div className={styles.header}>{reviewInfo.title}</div>
            <div className={styles.date}><BsCalendarCheck />{formatDate(reviewInfo.createdAt)}</div>
            <img className={styles.headerImg} alt='a' src={reviewInfo.photo} />
            <div className={styles.shareLogos}>
              <FacebookShareButton
                url={window.location.href}
              >
                <RiFacebookFill />
              </FacebookShareButton>
              <PinterestShareButton
                url={window.location.href}
                media={''}
              >
                <FaPinterestP style={{"padding": "5px"}} />
              </PinterestShareButton >
              <WhatsappShareButton
                url={window.location.href}
              >
                <AiOutlineWhatsApp />
              </WhatsappShareButton>
              <LinkedinShareButton
                url={window.location.href}
              >
                <TiSocialLinkedin style={{"padding": "3px"}} />
              </LinkedinShareButton>
              <EmailShareButton
                url={window.location.href}
              >
                <HiOutlineMail />
              </EmailShareButton>
              <TelegramShareButton
                url={window.location.href}
              >
                <FaTelegramPlane style={{"padding": "5px"}} />
              </TelegramShareButton>
            </div>
            <div className={styles.articleHeader}>
              {reviewInfo.subtitle}
            </div>
            <div className={styles.articleAuthorArea}>
              <img alt='a' src={reviewInfo?.author?.photo} />
              <a href={`../authors/${transformToUrl(reviewInfo?.author?.fullname)}`}>{reviewInfo.author?.fullname}</a> 
            </div>
            <div className={styles.line}></div>
            <div className={styles.firstLetter}><div>{reviewInfo.text?.charAt(0)}</div></div>
              {
                reviewInfo.text?.substring(1).split('\n').map((item: string,index: number) => {
                  if(reviewInfo.text?.split('\n')[index] === reviewInfo.text?.split('\n')[index-1]) {
                    return <iframe className={styles.articleVideo} title='title' src={reviewInfo.video} ></iframe>
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
            <div style={darkMode ? {"backgroundColor": "#323232"} : {}} className={styles.editorReviewScore}>
              <div className={reviewInfo.score < 5 ? styles.low : reviewInfo.score < 7 ? styles.medium : styles.high}>{reviewInfo.score}</div>
              <div>Editor Review Score</div>
            </div>
            <div className={styles.inThisPost}>In this post:</div>
            <div className={styles.inThisPostButtons}>
              {
                reviewInfo.category?.map((item: ICategory) => {
                  return (
                    <a href={`../categories/${transformToUrl(item.title)}`}>
                      <button>{item.title}</button>
                    </a>
                  )
                })
              }
              {
                reviewInfo.tag?.map((item: IReview) => {
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
            <Comments darkMode={darkMode} info={reviewInfo} />
            <div className={styles.line}></div>
            <div className={styles.sameGrid}>
              {reviews.filter((item: IReview) => item._id !== reviewInfo._id).slice(0, 8).map((item: IReview) => {
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
