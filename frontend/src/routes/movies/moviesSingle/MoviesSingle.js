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
import * as moviesApi from '../../../api/moviesApi';
import * as filtersApi from '../../../api/filtersApi';
import * as reviewsApi from '../../../api/reviewsApi';
import { getMovie } from '../../../redux/actions/movieActions';
import { getReviews } from '../../../redux/actions/reviewActions';
import Rating from '../../../components/rating/Rating';
import NotFound from '../../../components/notFound/NotFound';
import CreateReview from '../../../components/createReview/CreateReview';
import { formatDate } from '../../../utils/formatDate';

const MoviesSingle = ({darkMode, darkStyleHome}) => {

    const [notFound, setNotFound] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [relatedMedia, setRelatedMedia] = useState([])
    const [title, setTitle] = useState("")

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
        const getMovieInfo = async () => {
            const res = await moviesApi.fetchMovie(name)
            if(res.data) {
                document.title = `${res.data.title} - ANIMACE`
                dispatch(getMovie(res.data))
                setTitle(res.data.title)
            } else {
                setNotFound(true)
            }
        }
        getMovieInfo()
        const getRelated = async () => {
            const data = {name: title}
            const res = await filtersApi.filterRelatedPosts(data)
            if(res.data) {
                setRelatedPosts(res.data)
            }
            const resp = await filtersApi.filterRelatedMedia(data)
            if(resp.data) {
                setRelatedMedia(resp.data)
            }
        }
        getRelated()
        const getReviewsData = async () => {
            const res = await reviewsApi.fetchReviews()
            if(res.data) {
                dispatch(getReviews(res.data.reviews))
            }
        }
        getReviewsData()

    }, [dispatch, title, name]);
    
    const {movieInfo} = useSelector(state=>state.MoviesReducer)
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
        <img className={styles.upperImage} alt='a' src={movieInfo.subphoto} />
        <div className={styles.layout}>
            <Rating rating={movieInfo.rating} />
            <div className={styles.headerArea}>
                <div>
                    <div className={styles.headerAreaTitle}>{movieInfo.title}</div>
                    <div className={styles.headerAreaText}>{movieInfo.subtitle}</div>
                </div>
                <div className={`${styles.ratingArea} ${movieInfo.score < 5 ? styles.low : movieInfo.score < 7 ? styles.medium : styles.high}`}>
                    <div className={styles.ratingAreaRating} >{movieInfo.score}</div>
                    <div className={styles.ratingAreaChoice}>Editors Choice</div>
                </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.grid}>
                <div className={styles.gridItem}>
                    <img className={styles.stickyImage} alt='a' src={movieInfo.photo} />
                </div>
                <div className={styles.gridItem}>
                    <div className={styles.genres}>
                    <div className={styles.genresId}>{movieInfo.mpaa}</div>
                        {movieInfo.genre?.map(item => {
                            return <a href={`../../genres/${transformToUrl(item.title)}`}><button>{item.title}</button></a>
                        })}
                    </div>
                    <table style={darkMode ? darkStyleHome : {}} className={styles.features}>
                        <tr>
                            <th>Year</th>
                            <td>{movieInfo.year}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{movieInfo.status}</td>
                        </tr>
                        <tr>
                            <th>Duration</th>
                            <td>{movieInfo.duration}</td>
                        </tr>
                        <tr>
                            <th>Studio</th>
                            <td>{movieInfo.studio}</td>
                        </tr>
                        <tr>
                            <th>Theatrical Release</th>
                            <td>{movieInfo.theatricalRelease}</td>
                        </tr>
                        <tr>
                            <th>Streaming Release</th>
                            <td>{movieInfo.streamingRelease}</td>
                        </tr>
                    </table>
                    <div style={darkMode ? darkStyleHome : {}} className={styles.story}>
                        <div className={styles.storyTitle}>Synopsis</div>
                        <div className={styles.storyText}>
                            {movieInfo.story}
                        </div>
                        <button onClick={() => handleTextModal()}><FaAlignJustify/> Full Story</button>
                        {/* modal */}
                        <div onClick={(e) => handleHideTextModal(e)} id="myTextModal" className={`${styles.modal} ${modal.textModal ? styles.showTextModal : ""}`}>
                            <div style={darkMode ? {"backgroundColor": "#191919"} : {}} className={styles.modalContent}>
                                <div className={styles.modalHeaderArea}>
                                    <div className={styles.modalTitle}>{movieInfo.title}</div>
                                    <MdClose onClick={()=>handleTextModal()} className={styles.modalCloseBtn} />
                                </div>
                                <img className={styles.modalPhoto} alt='a' src={movieInfo.subphoto} />
                                {
                                movieInfo.fullStory?.split('\n').map(item => {
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
                                movieInfo.staff?.map(item => {
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
                                movieInfo.actors?.map(item => {
                                    return (
                                        <div className={styles.singleStaffAndCast}>
                                            <a href={`../../actors/${transformToUrl(item.actor?.fullName)}`}>
                                                <img alt='a' src={item.actor?.photo}/>
                                            </a>
                                            <div className={styles.InnerSingleStaffAndCast}>
                                                <a href={`../../actors/${transformToUrl(item.actor?.fullName)}`}>
                                                    <div>{item.actor?.fullName}</div>
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
                        {reviews?.filter(item => item.about === movieInfo.title).length > 0 ?
                        reviews?.filter(item => item.about === movieInfo.title).map(item1 => {
                            return (
                                <>
                                    <div className={styles.ratingAndDateArea}>
                                        <div className={styles.ratingAndDateAreaStars}>
                                            <Rating rating={item1.rating} size="medium" />
                                        </div>
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
                                    <div className={styles.relatedPostsTitle}>
                                        <a href={`../../articles/${item.pathname}`}>
                                            {item?.title}
                                        </a>
                                    </div>
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
                        <img alt='a' src={movieInfo.trailerPhoto} />
                        <button onClick={()=> handleVideoModal()}><FaPlay/> Watch Trailer</button>
                        <div onClick={(e) => handleHideVideoModal(e)} id="myVideoModal" className={`${styles.modal1} ${modal.videoModal ? styles.showVideoModal : ""}`}>
                            <div style={darkMode ? {"backgroundColor": "#191919"} : {}} className={styles.modalContent1}>
                                <iframe className={styles.modalVideo} title='title' src={movieInfo.trailer} ></iframe>
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

export default MoviesSingle;
