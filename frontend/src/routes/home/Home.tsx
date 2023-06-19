import React, {useEffect} from 'react';
import "./Home.css"
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { transformToUrl } from '../../utils/pathTransformation';
import { getCategories } from '../../redux/actions/categoryActions';
import { getArticles } from '../../redux/actions/articleActions';
import { getReviews } from '../../redux/actions/reviewActions';
import { getMovies } from '../../redux/actions/movieActions';
import { getSeries } from '../../redux/actions/serieActions';
import { getMangas } from '../../redux/actions/mangaActions';
import { getGenres } from '../../redux/actions/genreActions';
import * as articlesApi from '../../api/articlesApi'
import * as moviesApi from '../../api/moviesApi';
import * as seriesApi from '../../api/seriesApi';
import * as mangasApi from '../../api/mangasApi';
import * as reviewsApi from '../../api/reviewsApi';
import Rating from '../../components/rating/Rating';
import { formatDate } from '../../utils/formatDate';

const Home: React.FC<{darkMode: boolean}> = ({darkMode}) => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    const getData = async () => {
      const res = await articlesApi.fetchArticles();
      console.log(res.data)
      if(res.data) dispatch(getArticles(res.data.articles))
      const res1 = await moviesApi.fetchMovies();
      if(res1.data) dispatch(getMovies(res1.data.movies))
      const res2 = await seriesApi.fetchSeries();
      if(res2.data) dispatch(getSeries(res2.data.series))
      const res3 = await mangasApi.fetchMangas();
      if(res3.data) dispatch(getMangas(res3.data.mangas))
      const res4 = await reviewsApi.fetchReviews();
      if(res4.data) dispatch(getReviews(res4.data.reviews))
      dispatch(getCategories())
      dispatch(getGenres())
    }
    getData()

    // dispatch(getReviews())
  }, [dispatch]);
  
  const {categories} = useSelector((state: RootState) => state.CategoriesReducer)
  const {articles} = useSelector((state: RootState) => state.ArticlesReducer)
  const {genres} = useSelector((state: RootState) => state.GenresReducer)
  const {movies} = useSelector((state: RootState) => state.MoviesReducer)
  const {series} = useSelector((state: RootState) => state.SeriesReducer)
  const {mangas} = useSelector((state: RootState) => state.MangasReducer)
  const {reviews} = useSelector((state: RootState) => state.ReviewsReducer)

  return (
    <>
      <div className='header'>
        <div className='headerText'>Just For You</div>
      </div>
        <div className="sliderAndContent">
          <CarouselProvider
              className='carousell'
              naturalSlideWidth={100}
              naturalSlideHeight={60}
              totalSlides={4}
              playDirection='forward'
              visibleSlides={2}
              infinite={true}
              >
              <div className='buttons'>
                <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
              </div>
              <div>
                  <Slider>
                    <Slide className="slide" index={0}>
                      <div className='innerSlide'>
                      <Image className="image" src={"https://res.cloudinary.com/dxkxeimv4/image/upload/v1645262705/animace/banners/slider-banner-1-768x496_debott.jpg"} hasMasterSpinner={false} />
                      </div>
                    </Slide>
                    <Slide className="slide" index={1}>
                      <div className='innerSlide'>
                      <Image className="image" src={"https://res.cloudinary.com/dc2dymvfh/image/upload/v1678552140/YourName-poster-movie-1170x756_kk7mo0.jpg"} hasMasterSpinner={false} />
                      </div>
                    </Slide>
                    <Slide className="slide" index={2}>
                      <div className='innerSlide'>
                      <Image className="image" src={"https://res.cloudinary.com/dc2dymvfh/image/upload/v1678552250/20210925-103539-01_ncrt.1280-1170x720_s8una5.jpg"} hasMasterSpinner={false} />
                      </div>
                    </Slide>
                    <Slide className="slide" index={3}>
                      <div className='innerSlide'>
                      <Image className="image" src={"https://res.cloudinary.com/dxkxeimv4/image/upload/v1645262736/animace/banners/slider-banner-2-768x496_hq3jdd.jpg"} hasMasterSpinner={false} />
                      </div>
                    </Slide>
                  </Slider>
              </div>
          </CarouselProvider>
        </div>
      <div className='grid'>
        <div className='gridItem'>
          <div className='header'>
            <div className='headerText'>Latest articles</div>
          </div>
        <div className="sliderAndContent1">
          <CarouselProvider
              className='carousell1'
              naturalSlideWidth={100}
              naturalSlideHeight={105}
              totalSlides={5}
              playDirection='forward'
              visibleSlides={3}
              infinite={true}
              >
              <div className='buttons'>
                <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
              </div>
              <div className="container">
                  <Slider>
                    {articles.sort((a: { createdAt: number; },b: { createdAt: number; }) => b.createdAt - a.createdAt).slice(0, 5).map((item: IArticle) => {
                      return (
                        <Slide className="slide" index={0}>
                          <a href={`/articles/${item.pathname}`} className='innerSlide1'>
                            <Image className="image1" src={item.photo} hasMasterSpinner={false} />
                            <p>{item.title}</p>
                          </a>
                        </Slide>
                      )
                    })}
                  </Slider>
              </div>
          </CarouselProvider>
        </div>
        </div>
        <div className='gridItem'>
          <div className='headerText'>Popular reads</div>
          <div className='reads'>
            {articles.sort((a: { comments: string },b: { comments: string }) => b.comments.length - a.comments.length).slice(0, 9).map((item: IArticle) => {
              return (
                <div style={darkMode ? {backgroundColor: "#3e3e3e"} : {}} className='readsItem'>
                  <a href={`/articles/${item.pathname}`}>
                    <img alt='a' src={item.photo} />
                  </a>
                  <div className='readsTextArea'>
                      <div className='readsTextAreaHeader'>
                        <a href={`/articles/${item.pathname}`}>
                          {item.title}
                        </a>
                      </div>
                    <div className='readsTextAreaComments'><FaRegCommentDots/> {`${item.comments.length} comments`}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='gridItem'>
          <div className='headerText'>Featured Reviews</div>
          <div className="sliderAndContent1">
          <CarouselProvider
              className='carousell2'
              naturalSlideWidth={100}
              naturalSlideHeight={33}
              totalSlides={4}
              playDirection='forward'
              visibleSlides={1}
              infinite={true}
              >
              <div className='buttons'>
                <a 
                  className='seeAll'
                  href="./reviews"
                >
                  See all
                </a>
                <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
              </div>
              <div className="container">
                  <Slider>
                    {reviews?.sort((a: { createdAt: number; },b: { createdAt: number; }) => b.createdAt - a.createdAt).slice(5, 9).map((item: IReview, index: number) => {
                        return (
                          <Slide className="slide" index={index}>
                            <div style={darkMode ? {"backgroundColor": "#323232"} : {}} className='innerSlide2'>
                              <div className='relative'>
                              <a href={`/reviews/${item.pathname}`}>
                                <Image className="image2" src={item.photo} hasMasterSpinner={false} />
                              </a>
                                <div className='reviewScore'>{item.score}</div>
                              </div>
                            <div className='reviewsTextArea'>
                              <div className='reviewsDate'>{formatDate(item.createdAt)}</div>
                              <a href={`/reviews/${item.pathname}`}>
                                <div className='reviewsText'>{item.title}</div>
                              </a>
                              <div>{item.subtitle}</div>
                              <div className='reviewsAuthor'>
                                <div className="reviewsAuthorPhoto">
                                  <a href={`/authors/${transformToUrl(item.author.fullname)}`}>
                                    <img alt='a' src={item.author.avatar}/>
                                  </a>
                                </div>
                                <a href={`/authors/${transformToUrl(item.author.fullname)}`}>
                                  <div className='reviewsAuthorName'>{item.author.fullname}</div>
                                </a>
                              </div>
                            </div>
                            </div>
                          </Slide> 
                        )
                      })}
                  </Slider>
              </div>
          </CarouselProvider>
          </div>
        </div>
        <div className='gridItem'>
        <div className='headerText'>Featured Posts</div>
          <div className="sliderAndContent1">
          <CarouselProvider
              className='carousell2'
              naturalSlideWidth={100}
              naturalSlideHeight={33}
              totalSlides={4}
              playDirection='forward'
              visibleSlides={1}
              infinite={true}
              >
              <div className='buttons'>
                <a 
                  className='seeAll'
                  href="./articles"
                >
                  See all
                </a>
                <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
              </div>
              <div className="container">
                  <Slider>
                    {articles?.sort((a: { createdAt: number; },b: { createdAt: number; }) => b.createdAt - a.createdAt).slice(5, 9).map((item: IReview, index: number) => {
                        return (
                          <Slide className="slide" index={index}>
                            <div style={darkMode ? {"backgroundColor": "#323232"} : {}} className='innerSlide2'>
                              <div className='relative'>
                              <a href={`/articles/${item.pathname}`}>
                                <Image className="image2" src={item.photo} hasMasterSpinner={false} />
                              </a>
                              </div>
                            <div className='reviewsTextArea'>
                              <div className='reviewsDate'>{formatDate(item.createdAt)}</div>
                              <a href={`/articles/${item.pathname}`}>
                                <div className='reviewsText'>{item.title}</div>
                              </a>
                              <div>{item.subtitle}</div>
                              <div className='reviewsAuthor'>
                                <div className="reviewsAuthorPhoto">
                                  <a href={`/authors/${transformToUrl(item.author.fullname)}`}>
                                    <img alt='a' src={item.author.avatar}/>
                                  </a>
                                </div>
                                <a href={`/authors/${transformToUrl(item.author.fullname)}`}>
                                  <div className='reviewsAuthorName'>{item.author.fullname}</div>
                                </a>
                              </div>
                            </div>
                            </div>
                          </Slide> 
                        )
                      })}
                  </Slider>
              </div>
          </CarouselProvider>
          </div>
        </div>
        <div className='gridItem'>
          <div className='header'>
            <div className='headerText'>Featured Categories</div>
          </div>
          <div className="sliderAndContent1">
            <CarouselProvider
                className='carousell3'
                naturalSlideWidth={95}
                naturalSlideHeight={95}
                totalSlides={categories.slice(1, 7).length}
                playDirection='forward'
                visibleSlides={4}
                infinite={true}
                >
                <div className='buttons'>
                  <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                  <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
                </div>
                <div className="container">
                    <Slider>
                      {
                        categories.slice(1, 7).map((item: ICategory) => {
                          return (
                            <Slide className="slide" index={0}>
                              <a href={`/categories/${transformToUrl(item.title)}`} className='innerSlide3'>
                                <Image className="image3" src={item.photo} hasMasterSpinner={false}/>
                                <p>{item.title}</p>
                              </a>
                            </Slide> 
                          )
                        })
                      }
                    </Slider>
                </div>
            </CarouselProvider>
          </div>
        </div>
          <div className='gridItem'>
            <div className='moviesFlex'>
              <div  className='moviesInnerFlex'>
                <div className='moviesheaderText'>Netflix</div>
                  {
                    series?.slice(9, 12).map((item: ISerie) => {
                      return (
                        <div className='moviesInnerFlexItem'>
                          <div style={darkMode ? {"backgroundColor": "#323232"} : {}} className='moviesItem'>
                            <a href={`./${item.type}/${item.pathname}`}>
                              <img alt='a' src={item.photo} />
                            </a>
                            <div className='moviesTextArea'>
                              <Rating rating={item.rating}/>
                              <div className='moviesTextAreaHeader'>
                                <a href={`./${item.type}/${item.pathname}`}>
                                  {item.title}
                                </a>
                              </div>
                              <div className='moviesTextAreaYear'>{item.year}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              <div className='moviesInnerFlex'>
                <div className='moviesheaderText'>Amazon Prime</div>
                {
                  movies?.slice(9, 12).map((item: IMovie) => {
                    return (
                      <div className='moviesInnerFlexItem'>
                        <div style={darkMode ? {"backgroundColor": "#323232"} : {}} className='moviesItem'>
                          <a href={`./${item.type}/${item.pathname}`}>
                            <img alt='a' src={item.photo} />
                          </a>
                          <div className='moviesTextArea'>
                            <Rating rating={item.rating}/>
                            <div className='moviesTextAreaHeader'>
                              <a href={`./${item.type}/${item.pathname}`}>
                                {item.title}
                              </a>
                            </div>
                            <div className='moviesTextAreaYear'>{item.year}</div>
                          </div>
                        </div>
                      </div>
                      )
                    })
                  }
              </div>
              <div className='moviesInnerFlex'>
                <div className='moviesheaderText'>Crunchyroll</div>
                {
                  mangas?.slice(9, 12).map((item: IManga) => {
                    return (
                      <div className='moviesInnerFlexItem'>
                        <div style={darkMode ? {"backgroundColor": "#323232"} : {}} className='moviesItem'>
                          <a href={`./${item.type}/${item.pathname}`}>
                            <img alt='a' src={item.photo} />
                          </a>
                          <div className='moviesTextArea'>
                            <Rating rating={item.rating}/>
                            <div className='moviesTextAreaHeader'>
                              <a href={`./${item.type}/${item.pathname}`}>
                                {item.title}
                              </a>
                            </div>
                            <div className='moviesTextAreaYear'>{item.year}</div>
                          </div>
                        </div>
                      </div>
                      )
                    })
                  }
              </div>
            </div>
          </div>
          <div className='gridItem'>
            <div className='header'>
              <div className='headerText'>New Movies in Archive</div>
            </div>
            <div className="sliderAndContent1">
              <CarouselProvider
                  className='carousell4'
                  naturalSlideWidth={80}
                  naturalSlideHeight={145}
                  totalSlides={9}
                  playDirection='forward'
                  visibleSlides={6}
                  infinite={true}
                  >
                  <div className='buttons'>
                    <div 
                      style={darkMode ? {"color": "white"} : {}} 
                      className='seeAll'
                    >
                      See all
                    </div>
                    <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                    <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
                  </div>
                  <div className="container">
                      <Slider>
                        {
                          movies?.sort((a: { createdAt: number; },b: { createdAt: number; }) => b.createdAt - a.createdAt).slice(0,9).map((item: IMovie) => {
                            return (
                              <Slide className="slide" index={0}>
                                <div className='innerSlide4'>
                                  <a className="image4" href={`./${item.type}/${item.pathname}`}>
                                    <Image className="image4" src={item.photo} hasMasterSpinner={false}/>
                                  </a>
                                  <div className='image4Text'>
                                    <Rating rating={item.rating}/>
                                    <div className='image4Header'>
                                      <a href={`./${item.type}/${item.pathname}`}>
                                        {item.title}
                                      </a>  
                                    </div>
                                    <div className='image4Year'>{item.year}</div>
                                  </div>
                                </div>
                              </Slide> 
                            )
                          })
                        }
                      </Slider>
                  </div>
              </CarouselProvider>
            </div> 
          </div>
          <div className='gridItem'>
            <div className='header'>
              <div className='headerText'>New Series in Archive</div>
            </div>
            <div className="sliderAndContent1">
              <CarouselProvider
                  className='carousell4'
                  naturalSlideWidth={80}
                  naturalSlideHeight={145}
                  totalSlides={9}
                  playDirection='forward'
                  visibleSlides={6}
                  infinite={true}
                  >
                  <div className='buttons'>
                    <div 
                      style={darkMode ? {"color": "white"} : {}} 
                      className='seeAll'
                    >
                      See all
                    </div>                    <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                    <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
                  </div>
                  <div className="container">
                      <Slider>
                      {
                        series?.sort((a: { createdAt: number; },b: { createdAt: number; }) => b.createdAt - a.createdAt).slice(0,9).map((item: ISerie) => {
                          return (
                            <Slide className="slide" index={0}>
                              <div className='innerSlide4'>
                                <a className="image4" href={`./${item.type}/${item.pathname}`}>
                                  <Image className="image4" src={item.photo} hasMasterSpinner={false}/>
                                </a>
                                <div className='image4Text'>
                                  <Rating rating={item.rating}/>
                                  <div className='image4Header'>
                                    <a href={`./${item.type}/${item.pathname}`}>
                                      {item.title}
                                    </a>  
                                  </div>
                                  <div className='image4Year'>{item.year}</div>
                                </div>
                              </div>
                            </Slide> 
                          )
                        })
                      }
                      </Slider>
                  </div>
              </CarouselProvider>
            </div> 
          </div>
          <div className='gridItem'>
            <div className='header'>
              <div className='headerText'>New Mangas in Archive</div>
            </div>
            <div className="sliderAndContent1">
              <CarouselProvider
                  className='carousell4'
                  naturalSlideWidth={80}
                  naturalSlideHeight={145}
                  totalSlides={9}
                  playDirection='forward'
                  visibleSlides={6}
                  infinite={true}
                  >
                  <div className='buttons'>
                    <div 
                      style={darkMode ? {"color": "white"} : {}} 
                      className='seeAll'
                    >
                      See all
                    </div>
                    <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                    <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
                  </div>
                  <div className="container">
                      <Slider>
                      {
                        mangas?.sort((a: { createdAt: number; }, b: { createdAt: number; }) => b.createdAt - a.createdAt).slice(0,9).map((item: IManga) => {
                          return (
                            <Slide className="slide" index={0}>
                              <div className='innerSlide4'>
                                <a className="image4" href={`./${item.type}/${item.pathname}`}>
                                  <Image className="image4" src={item.photo} hasMasterSpinner={false}/>
                                </a>
                                <div className='image4Text'>
                                  <Rating rating={item.rating}/>
                                  <div className='image4Header'>
                                    <a href={`./${item.type}/${item.pathname}`}>
                                      {item.title}
                                    </a>  
                                  </div>
                                  <div className='image4Year'>{item.year}</div>
                                </div>
                              </div>
                            </Slide> 
                          )
                        })
                      }
                      </Slider>
                  </div>
              </CarouselProvider>
            </div>
          </div>
          <div className='gridItem'>
            <div className='moviesFlex'>
              {
                genres?.slice(11,14)?.map((item: IGenre) => {
                  return (
                    <>
                      <div className='moviesInnerFlex'>
                        <div className='moviesheaderText'>{item.title}</div>
                        {
                        mangas?.map((man: IManga) => man.genre?.map((gen: IGenre) => {
                          if(gen.title === item.title) {
                            return (
                              <div className='moviesInnerFlexItem'>
                                <div style={darkMode ? {"backgroundColor": "#323232"} : {}} className='moviesItem'>
                                  <a href={`./${man.type}/${man.pathname}`}>
                                    <img alt='a' src={man.photo} />
                                  </a>
                                  <div className='moviesTextArea1'>
                                  <div className='moviesTextAreaHeader'>
                                    <a href={`./${man.type}/${man.pathname}`}>
                                      {man.title}
                                    </a>
                                  </div>
                                    <div className='moviesTextAreaChapter'>No chapters available</div>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                        })
                        )
                        }
                      </div>
                    </>
                  )
                })
              }
            </div> 
          </div>  
      </div>
  </>
  )
};

export default Home;
