import React, {useState, useEffect} from 'react';
import styles from "./styles.module.css"
import { FaPlay } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FaAlignJustify } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { transformToName, transformToUrl } from '../../../utils/pathTransformation';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as seriesApi from '../../../api/seriesApi';
import * as reviewsApi from '../../../api/reviewsApi';
import * as filtersApi from '../../../api/filtersApi';
import { getSerie } from '../../../redux/actions/serieActions';
import { getReviews } from '../../../redux/actions/reviewActions';
import Rating from '../../../components/rating/Rating';
import NotFound from '../../../components/notFound/NotFound';
import CreateReview from '../../../components/createReview/CreateReview';
import { formatDate } from '../../../utils/formatDate';

const MoviesAndSeriesSingle = ({darkMode, darkStyleHome}) => {

    const [notFound, setNotFound] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [relatedMedia, setRelatedMedia] = useState([])

    const [modal, setModal] = useState({
        textModal: false,
        videoModal: false
    })  

    const handleTextModal = () => {
        if(modal.textModal) {
            setModal({textModal: false})
        } else {
            setModal({textModal: true})
        }
    }
    const handleHideTextModal = (e) => {
        if(modal.textModal && e.target.id === "myTextModal") {
            setModal({textModal: false})
        }
    }
    const handleVideoModal = () => {
        if(modal.videoModal) {
            setModal({videoModal: false})
        } else {
            setModal({videoModal: true})
        }
    }
    const handleHideVideoModal = (e) => {
        if(modal && e.target.id === "myVideoModal") {
            setModal({videoModal: false})
        }
    }

    const dispatch = useDispatch()

    let { name } = useParams()
    
    
    useEffect(() => {
      const getSerieInfo = async () => {
        const res = await seriesApi.fetchSerie(name)
        if(res.data) {
            document.title = `${res.data.title} - ANIMACE`
            dispatch(getSerie(res.data))
        } else {
            setNotFound(true)
        }
      }
      const getRelated = async () => {
        const data = {name:transformToName(name)}
        const res = await filtersApi.filterRelatedPosts(data)
        if(res.data) {
          setRelatedPosts(res.data)
        }
        const resp = await filtersApi.filterRelatedMedia(data)
        if(resp.data) {
          setRelatedMedia(resp.data)
        }
      }
        getSerieInfo()
        getRelated()
        const getReviewsData = async () => {
            const res = await reviewsApi.fetchReviews()
            if(res.data) {
                dispatch(getReviews(res.data.reviews))
            }
        }
        getReviewsData()

    }, [dispatch, name]);
    
    const {serieInfo} = useSelector(state=>state.SeriesReducer)
    const {reviews} = useSelector(state=>state.ReviewsReducer)

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
    <>
    {console.log(serieInfo)}
        <img className={styles.upperImage} alt='a' src={serieInfo.subphoto} />
        <div className={styles.layout}>
            <Rating rating={serieInfo.rating} />
            <div className={styles.headerArea}>
                <div>
                    <div className={styles.headerAreaTitle}>{serieInfo.title}</div>
                    <div className={styles.headerAreaText}>{serieInfo.subtitle}</div>
                </div>
                <div className={`${styles.ratingArea} ${serieInfo.score < 5 ? styles.low : serieInfo.score < 7 ? styles.medium : styles.high}`}>
                    <div className={styles.ratingAreaRating} >{serieInfo.score}</div>
                    <div className={styles.ratingAreaChoice}>Editors Choice</div>
                </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.grid}>
                <div className={styles.gridItem}>
                    <img className={styles.stickyImage} alt='a' src={serieInfo.photo} />
                </div>
                <div className={styles.gridItem}>
                    <div className={styles.genres}>
                        <div className={styles.genresId}>{serieInfo.mpaa}</div>
                        {serieInfo.genre?.map(item => {
                            return <a href={`../../genres/${transformToUrl(item.title)}`}><button>{item.title}</button></a>
                        })}
                    </div>
                    <table style={darkMode ? darkStyleHome : {}} className={styles.features}>
                        <tr>
                            <th>Year</th>
                            <td>{serieInfo.year}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{serieInfo.status}</td>
                        </tr>
                        <tr>
                            <th>Episodes</th>
                            <td>{serieInfo.episodes}</td>
                        </tr>
                        <tr>
                            <th>Duration</th>
                            <td>{serieInfo.duration}</td>
                        </tr>
                        <tr>
                            <th>Studio</th>
                            <td>{serieInfo.studio}</td>
                        </tr>
                        <tr>
                            <th>Release Format</th>
                            <td>{serieInfo.releaseFormat}</td>
                        </tr>
                        <tr>
                            <th>Broadcast</th>
                            <td>{serieInfo.broadcast}</td>
                        </tr>
                        <tr>
                            <th>Aired Init</th>
                            <td>{serieInfo.airedInit}</td>
                        </tr>
                        <tr>
                            <th>Aired Finish</th>
                            <td>{serieInfo.airedFinish}</td>
                        </tr>
                    </table>
                    <div style={darkMode ? darkStyleHome : {}} className={styles.story}>
                        <div className={styles.storyTitle}>Synopsis</div>
                        <div className={styles.storyText}>
                            {serieInfo.story}
                        </div>
                        <button onClick={() => handleTextModal()}><FaAlignJustify/> Full Story</button>
                        {/* modal */}
                        <div onClick={(e) => handleHideTextModal(e)} id="myTextModal" className={`${styles.modal} ${modal.textModal ? styles.showTextModal : ""}`}>
                            <div style={darkMode ? {"backgroundColor": "#191919"} : {}} className={styles.modalContent}>
                                <div className={styles.modalHeaderArea}>
                                    <div className={styles.modalTitle}>Evangelion: 3.0+1.0 Thrice Upon a Time</div>
                                    <MdClose onClick={()=>handleTextModal()} className={styles.modalCloseBtn} />
                                </div>
                                <img className={styles.modalPhoto} src={serieInfo.subphoto} alt='a' />
                                {
                                serieInfo.fullStory?.split('\n').map(item => {
                                    if(item === "") {
                                        return <br/>
                                      } 
                                      else {
                                        return <p className={styles.modalText}>{item}</p>
                                      }
                                })
                                }
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div style={darkMode ? darkStyleHome : {}} className={styles.staffAndCast}>
                        <div className={styles.innerStaffAndCast}>
                            <div className={styles.staffAndCastHeader}>Staff</div>
                            <div className={styles.line1}></div>
                            {
                                serieInfo.staff?.map(item => {
                                    return (
                                        <div className={styles.singleStaffAndCast}>
                                            <a href={`../../staff/${transformToUrl(item.staff?.fullName)}`}>
                                                <img alt='a' src={item.staff?.photo}/>
                                            </a>
                                            <div className={styles.InnerSingleStaffAndCast}>
                                                <a href={`../../staff/${transformToUrl(item.staff?.fullName)}`}>
                                                    <div>{item.staff?.fullName}</div>
                                                </a>
                                                {item.role.split('&').map(item => {
                                                    return <div className={styles.role}>{item}</div>
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        <div className={styles.innerStaffAndCast}>
                            <div className={styles.staffAndCastHeader}>Cast</div>
                            <div className={styles.line1}></div>
                            {
                                serieInfo.actors?.map(item => {
                                    console.log(item)
                                    return (
                                        <div className={styles.singleStaffAndCast}>
                                            <a href={`../../actors/${transformToUrl(item.actor?.fullName)}`}>
                                                <img alt='a' src={item.actor?.photo}/>
                                            </a>
                                            <div className={styles.InnerSingleStaffAndCast}>
                                                <a href={`../../actors/${transformToUrl(item.actor?.fullName)}`}>
                                                    <div>{item.actor?.fullName}</div>
                                                </a>
                                                {item.role?.split('&').map(item => {
                                                    return <div className={styles.role}>{item}</div>
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            }   
                        </div>
                    </div>
                    <div style={darkMode ? darkStyleHome : {}} className={styles.relatedMedia}>
                        <div className={styles.relatedMediaHeader}>Related Media</div>
                        <div className={styles.line1}></div>
                        <div className={styles.relatedMediaItems}>
                            {
                                relatedMedia.map(item => {
                                    return (
                                        <div style={darkMode ? darkStyleHome : {}} className={styles.relatedMediaItem}>
                                            <a href={`../../${item.type}/${item.pathname}`}>
                                                <img alt='a' src={item.photo}/>
                                            </a>
                                            <div className={styles.relatedMediaItemTextArea}>
                                                <a href={`../../${item.type}/${item.pathname}`}>
                                                    <div>{item.title}</div>
                                                </a>
                                                <div>{item.type.charAt(0).toUpperCase() + item.type.slice(1).slice(0, -1)}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div style={darkMode ? darkStyleHome : {}} className={styles.relatedMediaItem}>
                                <img alt='a' src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2022/01/Evangelion-250x375.jpg"/>
                                <div className={styles.relatedMediaItemTextArea}>
                                    <div>Evangelion</div>
                                    <div>Manga</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={darkMode ? darkStyleHome : {}} className={styles.ratingEntries}>
                        <div className={styles.relatedMediaHeader}>Rating Entries</div>
                        <div className={styles.line1}></div>
                        {reviews?.filter(item => item.about === serieInfo.title).length > 0 ?
                        reviews?.filter(item => item.about === serieInfo.title).map(item1 => {
                            return (
                                <>
                                    <div className={styles.ratingAndDateArea}>
                                        <Rating rating={item1.rating} size="medium" />
                                        <div className={styles.ratingAndDateAreaDate}>
                                            {formatDate(item1.createdAt)}
                                        </div>
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
                                </>
                            )
                        })
                        :
                        <div>There are no reviews yet. Be the first one to write one.</div>
                        }
                    </div>
                </div>
                <div className={styles.gridItem}>
                    <div className={styles.relatedPostsHeader}>
                        <div>Related Posts</div>
                        <div>
                            <IoIosArrowBack />
                            <IoIosArrowForward />
                        </div>
                    </div>
                    {
                        relatedPosts.map(item => {
                            return (
                                <>
                                    <a href={`../../articles/${item.pathname}`}>
                                        <img className={styles.relatedPostsImg} alt='a' src={item?.photo} />
                                    </a>
                                    <a href={`../../articles/${item.pathname}`}>
                                        <div className={styles.relatedPostsTitle}>{item?.title}</div>
                                    </a>
                                    <div className={styles.relatedPostsAuthorArea}>
                                        <a href={`../../authors/${transformToUrl(item.author.fullname)}`}>
                                            <img alt='a' src={item?.author?.avatar} />
                                        </a>
                                        <a href={`../../authors/${transformToUrl(item.author.fullname)}`}>
                                            <div>{item?.author?.fullname}</div>
                                        </a>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className={styles.trailerArea}>
                        <img alt='a' src={serieInfo.trailerPhoto} />
                        <button onClick={()=> handleVideoModal()}><FaPlay/> <p>Watch Trailer</p></button>
                        <div onClick={(e) => handleHideVideoModal(e)} id="myVideoModal" className={`${styles.modal1} ${modal.videoModal ? styles.showVideoModal : ""}`}>
                            <div style={darkMode ? {"backgroundColor": "#191919"} : {}} className={styles.modalContent1}>
                                <iframe className={styles.modalVideo} title='title' src={serieInfo.trailer} ></iframe>
                            </div>
                        </div>
                    </div>
                    <CreateReview darkMode={darkMode} darkStyleHome={darkStyleHome}/>
                </div>
            </div>
        </div>
    </>
  )
}
};

export default MoviesAndSeriesSingle;
