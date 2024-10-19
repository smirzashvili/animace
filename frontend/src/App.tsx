import React from 'react';
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import {Header, Main, Footer} from "./layouts"
import {
  SignUp, 
  SignIn, 
  ResetPassword, 
  ForgetPassword,
  EditProfile, 
  Contact, 
  About, 
  Home,
  MoviesSingle,
  MangasSingle,
  Actors,
  ActorsSingle,
  CategoriesSingle,
  Articles,
  ArticlesSingle,
  AuthorsSingle,
  TagsSingle,
  Reviews,
  ReviewsSingle,
  Movies,
  Series,
  Mangas,
  Genres,
  GenresSingle,
  SearchResult,
  SeriesSingle,
  StaffSingle,
} from "./routes"
import NotFound from './components/notFound/NotFound';
import { useEffect, useState } from 'react';
import { getUser } from './redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import * as api from './api/usersApi';
import {titleGenerator} from "./utils/titleGenerator"

function App() {
  const {isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

  const dispatch = useDispatch()

  const [darkMode, setDarkMode] = useState(false)
  const [unhideHeaderForm, setUnhideHeaderForm] = useState(false)
  const [unhideProfileMenu, setUnhideProfileMenu] = useState(false)


  useEffect(() => {
    titleGenerator(window.location.pathname)
    
    if(localStorage.getItem("dark") === "true"){
      setDarkMode(true)
    } else if (localStorage.getItem("dark") === "false") {
      setDarkMode(false)
    }
    
    const getUserInfo = async () => {
      const res = await api.getToken()
      if(res.data.rf_token) {
        const resp = await api.fetchUser(res.data.rf_token)
        if(resp.data) {
          const data = {
            userInfo: resp.data.user,
            token: resp.data.token,
          }
          return dispatch(getUser(data))
        }
      }
    }
    getUserInfo()

  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      const scale = window.innerWidth > 1920
        ? Math.max(1, Math.min(window.innerWidth / 1920, window.innerHeight / 1080))
        : 1;
      const doc = document.documentElement;
      doc.style.setProperty('--app-scale', `${scale}`);
    };

    // Set initial scale on mount
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleHideElements = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(unhideHeaderForm) {
      let array: Array<HTMLElement> = []
      let elems: HTMLCollectionOf<Element> = document.getElementById("headerForm")!.getElementsByTagName('*')
      if(array.slice.call(elems).find(item => e.target === item) === undefined) {
        setUnhideHeaderForm(false)
      }
    }
    if(unhideProfileMenu) {
      let array: Array<HTMLElement> = []
      let elems: HTMLCollectionOf<Element> = document.getElementById("profileMenu")!.getElementsByTagName('*')
      if(array.slice.call(elems).find(item => e.target === item) === undefined) {
        setUnhideProfileMenu(false)
      }
    }
  }
  
  // popular reads (filtered articles by comments length)
  // latest articles (filtered articles by date)

  return (
    <div onClick={(e) => handleHideElements(e)} style={darkMode ? {backgroundColor: "#232323"} : {}} className={`App ${darkMode ? "darkStyles" : ""}`}>
      <Header unhideHeaderForm={unhideHeaderForm} setUnhideHeaderForm={setUnhideHeaderForm} darkMode={darkMode} setDarkMode={setDarkMode} unhideProfileMenu={unhideProfileMenu} setUnhideProfileMenu={setUnhideProfileMenu} />
      <Main>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/reset-password" element={isLoggedIn ? <Home darkMode={darkMode} /> : <ForgetPassword />}/>
          <Route path="/reset-password/:token" element={isLoggedIn ? <Home darkMode={darkMode} /> : <ResetPassword />}/>
          <Route path="/edit-profile" element={isLoggedIn ? <EditProfile /> : <Home darkMode={darkMode} />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/movies" element={<Movies />}/>
          <Route path="/series" element={<Series />}/>
          <Route path="/mangas" element={<Mangas />}/>
          <Route path="/movies/:name" element={<MoviesSingle darkMode={darkMode} />}/>
          <Route path="/series/:name" element={<SeriesSingle darkMode={darkMode} />}/>
          <Route path="/mangas/:name" element={<MangasSingle darkMode={darkMode} />}/>
          <Route path="/actors" element={<Actors />}/>
          <Route path="/actors/:name" element={<ActorsSingle darkMode={darkMode} />}/>
          <Route path="/staff/:name" element={<StaffSingle darkMode={darkMode} />}/>
          <Route path="/categories/:name" element={<CategoriesSingle />}/>
          <Route path="/tags/:name" element={<TagsSingle />}/>
          <Route path="/articles" element={<Articles />}/>
          <Route path="/articles/:name" element={<ArticlesSingle darkMode={darkMode} />}/>
          <Route path="/reviews" element={<Reviews />}/>
          <Route path="/reviews/:name" element={<ReviewsSingle darkMode={darkMode} />}/>
          <Route path="/authors/:name" element={<AuthorsSingle darkMode={darkMode} />}/>
          <Route path="/genres" element={<Genres />}/>
          <Route path="/genres/:name" element={<GenresSingle />}/>
          <Route path="/search" element={<SearchResult />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
