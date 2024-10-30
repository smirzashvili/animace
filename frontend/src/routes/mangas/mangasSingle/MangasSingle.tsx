import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import { RiFacebookFill } from 'react-icons/ri';
import { FaPinterestP, FaTelegramPlane } from "react-icons/fa"
import { AiOutlineWhatsApp } from "react-icons/ai"
import { TiSocialLinkedin } from "react-icons/ti"
import { HiOutlineMail } from "react-icons/hi"
import {
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TelegramShareButton
} from "react-share"
import { useDispatch, useSelector } from 'react-redux';
import { transformToName, transformToUrl } from "../../../utils/pathTransformation";
import { useNavigate, useParams } from 'react-router-dom';
import Rating from "../../../components/rating/Rating";
import * as mangasApi from '../../../api/mangasApi';
import { getManga } from '../../../redux/actions/mangaActions';
import { getReviews } from '../../../redux/actions/reviewActions';
import { getCategories } from '../../../redux/actions/categoryActions';
import { getGenres } from '../../../redux/actions/genreActions';
import NotFound from "../../../components/notFound/NotFound";
import SearchSideBar from "../../../components/searchSideBar/SearchSideBar";
import CreateReview from "../../../components/createReview/CreateReview";
import { formatDate } from "../../../utils/formatDate"

const MangasSingle: React.FC<{darkMode: boolean}> = ({ darkMode }) => {

    const [notFound, setNotFound] = useState(false)
    const [showMore, setShowMore] = useState(false)

    const dispatch = useDispatch()

    let { name } = useParams()

    useEffect(() => {
        const getMangaInfo = async () => {
            const res = await mangasApi.fetchManga(name as string)
            if(res.data) {
                document.title = `${res.data.title} - ANIMACE`
                dispatch(getManga(res.data))
            } else {
                setNotFound(true)
            }
        }
        getMangaInfo()
        dispatch(getReviews(reviews))
        dispatch(getCategories())
        dispatch(getGenres())

      }, [dispatch, name]);

    const {mangaInfo} = useSelector((state: RootState)=>state.MangasReducer)
    const {reviews} = useSelector((state: RootState) =>state.ReviewsReducer)

    const handleShowMore = () => {
        if(showMore === false) setShowMore(true)
        else {
            setShowMore(false)
        }
    }

    if(notFound === true) {
        return <NotFound />
      } else {
  return (
    <div className={styles.parentGrid}>
        <div className={styles.parentGridItem}>
            <Rating rating={mangaInfo.rating} size={undefined}/>
            <div className={styles.headerAreaTitle}>{mangaInfo.title}</div>
            <div className={styles.line}></div>
            <div className={styles.grid}>
                <div className={styles.gridItem}>
                    <img
                    className={styles.stickyImage}
                    alt="a"
                    src={mangaInfo.photo}
                    />
                </div>
                <div className={styles.gridItem}>
                    <div className={styles.genres}>
                    {
                    mangaInfo.genre?.map((item: IGenre, i: number) => {
                        return <a key={i} href={`../../genres/${transformToUrl(item.title)}`}><button>{item.title}</button></a>
                    })
                    }
                    </div>
                    <div className={styles.shareLogos}>
                        <FacebookShareButton
                            url={window.location.href}
                            quote={"bla"}
                        >
                            <RiFacebookFill />
                        </FacebookShareButton>
                        <PinterestShareButton
                              url={window.location.href}
                              media={""}                        >
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
                    <table style={darkMode ? {background: "#3e3e3e"} : {}} className={styles.features}>
                        {mangaInfo.alternativeName && 
                        <tr>
                            <th>Alternative Name</th>
                            <td>{mangaInfo.alternativeName}</td>
                        </tr>
                        }
                        {mangaInfo.author && 
                        <tr>
                            <th>Author</th>
                            <td>{mangaInfo.author}</td>
                        </tr>
                        }
                        {mangaInfo.publisher && 
                        <tr>
                            <th>Publisher</th>
                            <td>{mangaInfo.publisher}</td>
                        </tr>
                        }
                        {mangaInfo.year && 
                        <tr>
                            <th>Year</th>
                            <td>{mangaInfo.year}</td>
                        </tr>
                        }
                        {mangaInfo.status && 
                        <tr>
                            <th>Status</th>
                            <td>{mangaInfo.status}</td>
                        </tr>
                        }
                        {mangaInfo.views && 
                        <tr>
                            <th>Views</th>
                            <td>{mangaInfo.views}</td>
                        </tr>
                        }
                        {mangaInfo.volumes && 
                        <tr>
                            <th>Volumes</th>
                            <td>{mangaInfo.volumes}</td>
                        </tr>
                        }
                        {mangaInfo.releaseDate && 
                        <tr>
                            <th>Release Date</th>
                            <td>{mangaInfo.releaseDate}</td>
                        </tr>
                        }
                        {mangaInfo.finishDate && 
                        <tr>
                            <th>Finish Date</th>
                            <td>{mangaInfo.finishDate}</td>
                        </tr>
                        }
                    </table>
                    <div style={darkMode ? {background: "#3e3e3e"} : {}} className={styles.story}>
                        <div className={styles.storyTitle}>Synopsis</div>
                        <div className={styles.storyText}>
                            {mangaInfo.story}
                        </div>
                    </div>
                    <div style={darkMode ? {background: "#3e3e3e"} : {}} className={styles.ratingEntries}>
                        <div className={styles.ratingEntriesHeader}>Rating Entries</div>
                        <div className={styles.line1}></div>
                        {reviews?.filter((item: IReview) => item.about === mangaInfo.title).length > 0 ?
                        reviews?.filter((item: IReview) => item.about === mangaInfo.title).map((item1: IReview, i: number) => {
                            return (
                                <React.Fragment key={i}>
                                    <div className={styles.ratingAndDateArea}>
                                        <div className={styles.ratingAndDateAreaStars}>
                                            <Rating rating={item1.rating} size="medium" />
                                        </div>
                                        <div className={styles.ratingAndDateAreaDate}>
                                        {formatDate(item1.createdAt)}                                        </div>
                                    </div>
                                    <div className={styles.ratingAndDateAreaReview}>
                                        {showMore ?<>
                                        {item1.text} <span onClick={() => handleShowMore()} className={styles.showMore}>Show less</span>
                                        </>:<>
                                        {`${item1.text.slice(0,300)}...`}<span onClick={() => handleShowMore()} className={styles.showMore}>Show more</span>
                                        </>}
                                    </div>
                                    <div className={styles.ratingEntriesAuthorArea}>
                                        <a href={`../../authors/${transformToUrl(item1.author.fullname)}`}><img alt='a' src={item1.author.avatar} /></a>
                                        <a href={`../../authors/${transformToUrl(item1.author.fullname)}`}><div>{item1.author.fullname}</div></a>
                                    </div>
                                </React.Fragment>
                            )
                        })
                        :
                        <div>There are no reviews yet. Be the first one to write one.</div>
                        }
                    </div>
                    <div style={darkMode ? {background: "#3e3e3e"} : {}} className={styles.ratingEntries}>
                        <div className={styles.ratingEntriesHeader}>Your Rating</div>
                        <div className={styles.line1}></div>
                        <CreateReview darkMode={darkMode}/>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.parentGridItem}>
            <SearchSideBar />
        </div>
    </div>
  );
}
};

export default MangasSingle;
