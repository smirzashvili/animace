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
import Rating from '../../components/rating/Rating';

const Home = ({darkMode, darkStyleHome}) => {

  
  const dispatch = useDispatch()
  
  useEffect(() => {
    const getData = async () => {
      const res = await articlesApi.fetchArticles();
      if(res.data) dispatch(getArticles(res.data.articles))
      const res1 = await moviesApi.fetchMovies();
      if(res1.data) dispatch(getMovies(res1.data.movies))
      const res2 = await seriesApi.fetchSeries();
      if(res2.data) dispatch(getSeries(res2.data.series))
      const res3 = await mangasApi.fetchMangas();
      if(res3.data) dispatch(getMangas(res3.data.mangas))
      dispatch(getCategories())
      dispatch(getGenres())
    }
    getData()

    // dispatch(getReviews())
  }, [dispatch]);
  
  const {categories} = useSelector(state=>state.CategoriesReducer)
  const {articles} = useSelector(state=>state.ArticlesReducer)
  const {genres} = useSelector(state=>state.GenresReducer)
  const {movies} = useSelector(state=>state.MoviesReducer)
  const {series} = useSelector(state=>state.SeriesReducer)
  const {mangas} = useSelector(state=>state.MangasReducer)

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
                      <Image className="image" src={"https://res.cloudinary.com/dxkxeimv4/image/upload/v1645262705/animace/banners/slider-banner-1-768x496_debott.jpg"} />
                      </div>
                    </Slide>
                    <Slide className="slide" index={1}>
                      <div className='innerSlide'>
                      <Image className="image" src={"https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/11/YourName-poster-movie-1170x756.jpg"} />
                      </div>
                    </Slide>
                    <Slide className="slide" index={2}>
                      <div className='innerSlide'>
                      <Image className="image" src={"https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/11/YourName-poster-movie-1170x756.jpg"} />
                      </div>
                    </Slide>
                    <Slide className="slide" index={3}>
                      <div className='innerSlide'>
                      <Image className="image" src={"https://res.cloudinary.com/dxkxeimv4/image/upload/v1645262736/animace/banners/slider-banner-2-768x496_hq3jdd.jpg"} />
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
                    {articles.sort((a,b) => b.createdAt - a.createdAt).slice(0, 5).map(item => {
                      return (
                        <Slide className="slide">
                          <a href={`/articles/${item.pathname}`} className='innerSlide1'>
                            <Image className="image1" src={item.photo} />
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
            {articles.sort((a,b) => b.comments.length - a.comments.length).slice(0, 9).map(item => {
              return (
                <div style={darkMode ? darkStyleHome : {}} className='readsItem'>
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
                    <Slide className="slide" index={0}>
                      <div style={darkMode ? darkStyleHome : {}} className='innerSlide2'>
                        <div className='relative'>
                          <Image className="image2" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/09/Cowboy.Bebop_.full_.1107118-500x323.jpg" />
                          <div className='reviewScore'>9</div>
                        </div>
                      <div className='reviewsTextArea'>
                        <div className='reviewsDate'>April 2, 2021</div>
                        <div className='reviewsText'>Cowboy Bebop And Love Have 4 Things In Common</div>
                        <div>Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in.</div>
                        <div className='reviewsAuthor'>
                          <div className="reviewsAuthorPhoto">
                            <img alt='a' src='https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g'/>
                          </div>
                          <div>Richard Burgess</div>
                        </div>
                      </div>
                      </div>
                    </Slide> 
                    <Slide className="slide" index={0}>
                      <div style={darkMode ? darkStyleHome : {}} className='innerSlide2'>
                      <Image className="image2" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/09/Cowboy.Bebop_.full_.1107118-500x323.jpg" />
                      <div className='reviewsTextArea'>
                        <div className='reviewsDate'>April 2, 2021</div>
                        <div className='reviewsText'>Cowboy Bebop And Love Have 4 Things In Common</div>
                        <div>Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in.</div>
                        <div className='reviewsAuthor'>
                          <div className="reviewsAuthorPhoto">
                            <img alt='a' src='https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g'/>
                          </div>
                          <div>Richard Burgess</div>
                        </div>
                      </div>
                      </div>
                    </Slide> 
                    <Slide className="slide" index={0}>
                      <div style={darkMode ? darkStyleHome : {}} className='innerSlide2'>
                      <Image className="image2" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/09/Cowboy.Bebop_.full_.1107118-500x323.jpg" />
                      <div className='reviewsTextArea'>
                        <div className='reviewsDate'>April 2, 2021</div>
                        <div className='reviewsText'>Cowboy Bebop And Love Have 4 Things In Common</div>
                        <div>Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in.</div>
                        <div className='reviewsAuthor'>
                          <div className="reviewsAuthorPhoto">
                            <img alt='a' src='https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g'/>
                          </div>
                          <div>Richard Burgess</div>
                        </div>
                      </div>
                      </div>
                    </Slide> 
                    <Slide className="slide" index={0}>
                      <div style={darkMode ? darkStyleHome : {}} className='innerSlide2'>
                      <Image className="image2" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/09/Cowboy.Bebop_.full_.1107118-500x323.jpg" />
                      <div className='reviewsTextArea'>
                        <div className='reviewsDate'>April 2, 2021</div>
                        <div className='reviewsText'>Cowboy Bebop And Love Have 4 Things In Common</div>
                        <div>Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in.</div>
                        <div className='reviewsAuthor'>
                          <div className="reviewsAuthorPhoto">
                            <img alt='a' src='https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g'/>
                          </div>
                          <div>Richard Burgess</div>
                        </div>
                      </div>
                      </div>
                    </Slide> 
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
                <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
              </div>
              <div className="container">
                  <Slider>
                    <Slide className="slide" index={0}>
                      <div style={darkMode ? darkStyleHome : {}} className='innerSlide2'>
                      <Image className="image2" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/03/FateHF3_Trailer-500x323.jpg" />
                      <div className='reviewsTextArea'>
                        <div className='reviewsDate'>April 2, 2021</div>
                        <div className='reviewsText'>Cowboy Bebop And Love Have 4 Things In Common</div>
                        <div>Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in.</div>
                        <div className='reviewsAuthor'>
                          <div className="reviewsAuthorPhoto">
                            <img alt='a' src='https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g'/>
                          </div>
                          <div>Richard Burgess</div>
                        </div>
                      </div>
                      </div>
                    </Slide> 
                    <Slide className="slide" index={0}>
                      <div style={darkMode ? darkStyleHome : {}} className='innerSlide2'>
                      <Image className="image2" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/03/FateHF3_Trailer-500x323.jpg" />
                      <div className='reviewsTextArea'>
                        <div className='reviewsDate'>April 2, 2021</div>
                        <div className='reviewsText'>Cowboy Bebop And Love Have 4 Things In Common</div>
                        <div>Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in.</div>
                        <div className='reviewsAuthor'>
                          <div className="reviewsAuthorPhoto">
                            <img alt='a' src='https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g'/>
                          </div>
                          <div>Richard Burgess</div>
                        </div>
                      </div>
                      </div>
                    </Slide> 
                    <Slide className="slide" index={0}>
                      <div style={darkMode ? darkStyleHome : {}} className='innerSlide2'>
                      <Image className="image2" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/03/FateHF3_Trailer-500x323.jpg" />
                      <div className='reviewsTextArea'>
                        <div className='reviewsDate'>April 2, 2021</div>
                        <div className='reviewsText'>Cowboy Bebop And Love Have 4 Things In Common</div>
                        <div>Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in.</div>
                        <div className='reviewsAuthor'>
                          <div className="reviewsAuthorPhoto">
                            <img alt='a' src='https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g'/>
                          </div>
                          <div>Richard Burgess</div>
                        </div>
                      </div>
                      </div>
                    </Slide> 
                    <Slide className="slide" index={0}>
                      <div style={darkMode ? darkStyleHome : {}} className='innerSlide2'>
                      <Image className="image2" src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2021/03/FateHF3_Trailer-500x323.jpg" />
                      <div className='reviewsTextArea'>
                        <div className='reviewsDate'>April 2, 2021</div>
                        <div className='reviewsText'>Cowboy Bebop And Love Have 4 Things In Common</div>
                        <div>Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in.</div>
                        <div className='reviewsAuthor'>
                          <div className="reviewsAuthorPhoto">
                            <img alt='a' src='https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g'/>
                          </div>
                          <div>Richard Burgess</div>
                        </div>
                      </div>
                      </div>
                    </Slide> 
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
                        categories.slice(1, 7).map(item => {
                          return (
                            <Slide className="slide">
                              <a href={`/categories/${transformToUrl(item.title)}`} className='innerSlide3'>
                                <Image className="image3" src={item.photo}/>
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
                    series?.slice(9, 12).map(item => {
                      return (
                        <div className='moviesInnerFlexItem'>
                          <div style={darkMode ? darkStyleHome : {}} className='moviesItem'>
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
                  movies?.slice(9, 12).map(item => {
                    return (
                      <div className='moviesInnerFlexItem'>
                        <div style={darkMode ? darkStyleHome : {}} className='moviesItem'>
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
                  mangas?.slice(9, 12).map(item => {
                    return (
                      <div className='moviesInnerFlexItem'>
                        <div style={darkMode ? darkStyleHome : {}} className='moviesItem'>
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
                      onMouseEnter={darkMode ? (e) => e.target.style.color = "grey" : ""} 
                      onMouseLeave={darkMode ? (e) => e.target.style.color = "white" : ""} 
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
                          movies?.sort((a,b) => b.createdAt - a.createdAt).slice(0,9).map(item => {
                            return (
                              <Slide className="slide" index={0}>
                                <div className='innerSlide4'>
                                  <a className="image4" href={`./${item.type}/${item.pathname}`}>
                                    <Image className="image4" src={item.photo}/>
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
                      onMouseEnter={darkMode ? (e) => e.target.style.color = "grey" : ""} 
                      onMouseLeave={darkMode ? (e) => e.target.style.color = "white" : ""} 
                      className='seeAll'
                    >
                      See all
                    </div>                    <ButtonBack className='arrowButton'><IoIosArrowBack/></ButtonBack>
                    <ButtonNext className='arrowButton' style={{"marginLeft": "4px"}}><IoIosArrowForward/></ButtonNext>
                  </div>
                  <div className="container">
                      <Slider>
                      {
                        series?.sort((a,b) => b.createdAt - a.createdAt).slice(0,9).map(item => {
                          return (
                            <Slide className="slide" index={0}>
                              <div className='innerSlide4'>
                                <a className="image4" href={`./${item.type}/${item.pathname}`}>
                                  <Image className="image4" src={item.photo}/>
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
                      onMouseEnter={darkMode ? (e) => e.target.style.color = "grey" : ""} 
                      onMouseLeave={darkMode ? (e) => e.target.style.color = "white" : ""} 
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
                        mangas?.sort((a,b) => b.createdAt - a.createdAt).slice(0,9).map(item => {
                          return (
                            <Slide className="slide" index={0}>
                              <div className='innerSlide4'>
                                <a className="image4" href={`./${item.type}/${item.pathname}`}>
                                  <Image className="image4" src={item.photo}/>
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
                genres?.slice(11,14)?.map(item => {
                  return (
                    <>
                      <div className='moviesInnerFlex'>
                        <div className='moviesheaderText'>{item.title}</div>
                        {
                        mangas?.map(man => man.genre?.map(gen => {
                          if(gen.title === item.title) {
                            return (
                              <div className='moviesInnerFlexItem'>
                                <div style={darkMode ? darkStyleHome : {}} className='moviesItem'>
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
