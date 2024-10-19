import React, {MutableRefObject, useRef, useState} from 'react';
import styles from "./styles.module.css"
import { AiOutlineSearch } from 'react-icons/ai';
import { RiToggleLine } from 'react-icons/ri';
import { RiToggleFill } from 'react-icons/ri';
import { HiMenu } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { MdFace } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc'
import {useDispatch, useSelector} from "react-redux"
import { logInUser, logOutUser } from '../../redux/actions/userActions';
import {isEmpty, isEmail, isLength, isUsername} from '../../utils/validations'
import * as api from '../../api/usersApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header: React.FC<{
    darkMode: boolean, 
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>, 
    unhideHeaderForm: boolean, 
    setUnhideHeaderForm: React.Dispatch<React.SetStateAction<boolean>>,
    unhideProfileMenu: boolean, 
    setUnhideProfileMenu: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    darkMode, 
    setDarkMode, 
    unhideHeaderForm, 
    setUnhideHeaderForm, 
    unhideProfileMenu, 
    setUnhideProfileMenu
}) => {

    const navigate = useNavigate()

    let ref = useRef<HTMLDivElement[] | HTMLInputElement[]>([]) as MutableRefObject<HTMLDivElement[]| HTMLInputElement[]>;

    const {isLoggedIn, userInfo}: {isLoggedIn: boolean, userInfo: IUser} = useSelector((state: RootState) => state.UsersReducer)
    const [unhideSpinner, setUnhideSpinner] = useState(false)
    const [unhidePassword, setUnhidePassword] = useState(false)

    const [state, setState] = useState({
        usernameOrEmail: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [searchKeyword, setSearchKeyword] = useState("")
    
    const showForm = () => {
        if(unhideHeaderForm) {
            setUnhideHeaderForm(false)
        } else {
            setUnhideHeaderForm(true)
        }
    }
    
    const handleDarkMode = () => {
        setUnhideHeaderForm(false)
        if(darkMode) {
            setDarkMode(false)
            localStorage.setItem("dark", "false")
        } else {
            setDarkMode(true)
            localStorage.setItem("dark", "true")
        }
    }

    const handleUnhideMenu = () => {
        setUnhideHeaderForm(false)
        let elem = ref.current[0]
        if(elem.classList.contains(styles.open)) {
            elem.classList.remove(styles.open)
        } else {
            elem.classList.add(styles.open)
        }
    }
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(darkMode) {
            (e.target as HTMLElement).style.backgroundColor = "black"  
        }
    }
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(darkMode) {
            (e.target as HTMLElement).style.backgroundColor = ""  
        }
    }

    const handleShowPass = () => {
        if(unhidePassword) {
            setUnhidePassword(false);
            (ref.current[1] as HTMLInputElement).type = "password"       
        } else {
            setUnhidePassword(true);
            (ref.current[1] as HTMLInputElement).type = "text"       
        }
    }

    const dispatch = useDispatch();
    
    const handleChange = (name: string, value: string) => {
        setState({
            ...state,
            [name]: value
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(isEmpty(state.usernameOrEmail) || isEmpty(state.password))
            return setError("Please fill in all fields")
        
        try {
            setError("")
            const res = await api.logInUser(state)
            if(res.data) {
                setState({
                    usernameOrEmail: '',
                    password: ''
                })
                dispatch(logInUser(res.data));
                setUnhideHeaderForm(false)
            }
        } catch (err) {
            axios.isAxiosError(err) && setError(err.response?.data.msg)
        }
    }

    const handleUnhideProfileMenu = () => {
        if(unhideProfileMenu) {
            setUnhideProfileMenu(false)
        } else {
            setUnhideProfileMenu(true)
        }
    }
    const handleLogOut = async () => {
        const res = await api.logOutUser()
        if(res.data) {
            dispatch(logOutUser());
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value)
        if(e.target.value.length > 0) {
            setUnhideSpinner(true)
        } else {
            setUnhideSpinner(false)
        }
    }

    const handleSearch = async () => {
        if(searchKeyword.length > 0) {
            setUnhideSpinner(false)
            navigate(`/search?kw=${searchKeyword}`)
        }    
    }

  return ( 
    <>
    <div className={styles.header} style={darkMode ? {backgroundColor: "#232323"} : {}}>
        <nav className={styles.container}>
            <div className={styles.item}>
                <a href='/'>
                    <img height={50} alt='dasdas' src='/assets/logo.svg' />
                </a>
            </div>
            <div className={styles.item}>
                <div className={styles.relative}>
                    <input onKeyPress={(e) => e.key === 'Enter' && handleSearch()} onChange={(e) => handleSearchChange(e)} className={styles.search} type="text" placeholder='Search here...' />
                    {unhideSpinner ? <div className={styles.spinner}></div>: ''}
                </div>
                <button onClick={() => handleSearch()} className={styles.searchButton}>
                    <AiOutlineSearch className={styles.logo}/>
                </button>
            </div>
            <div className={styles.item}>
                {/* <div onClick={() => handleLanguage()} className={styles.languageContainer}>
                    <div>
                        <RiToggleLine/> ▼
                    </div>
                </div> */}

                {!darkMode ? <RiToggleLine onClick={() => handleDarkMode()} className={`${styles.toggleButton} + ${styles.logo}`}/>
                : <RiToggleFill onClick={() => handleDarkMode()} className={`${styles.toggleButton} + ${styles.logo}`}/> }
                
                {isLoggedIn ?
                <>
                    <div onClick={() => handleUnhideProfileMenu()} className={styles.profile}>
                        <img 
                            alt='a'                         
                            src={userInfo?.file}
                        />
                    </div>
                    {unhideProfileMenu && 
                        <div id="profileMenu" style={darkMode ? {"backgroundColor": "#212529", "color": "white"} : {}} className={styles.profileMenu}>
                            <div onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"} : {}} className={styles.profileMenuItem}>{`${userInfo.name} ${userInfo.surname}`}</div>
                            <a onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"} : {}} className={styles.profileMenuItem} href="/edit-profile"><FiUser /> Edit Profile</a>
                            <p style={darkMode ? {"borderColor": "#2c3237"} : {}} className={styles.divider}></p>
                            <div onClick={() => handleLogOut()} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"} : {}} className={styles.profileMenuItem}><FaSignOutAlt/> Log out</div>
                        </div>
                    } 
                </> : 
                !unhideHeaderForm ? <FaUser onClick={() => showForm()} className={styles.userButton} /> :
                <VscChromeClose onClick={() => showForm()}  className={styles.closeButton} /> 
                }
                {unhideHeaderForm ? 
                <div id="headerForm" className={styles.form}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                    {error && <div className={styles.error}>{error}</div>}
                        <div className={styles.formTitle}>Sign in to Your Account</div>
                        <div className={styles.relative}>
                            <input
                                value={state.usernameOrEmail} 
                                onChange={(e) => handleChange(e.target.name, e.target.value)} 
                                name="usernameOrEmail" 
                                type="text" 
                                placeholder='Username or Email' 
                            />
                            <MdFace />
                        </div>
                        <div className={styles.relative}>
                            <input
                                value={state.password} 
                                onChange={(e) => handleChange(e.target.name, e.target.value)}  
                                ref={(el: HTMLInputElement) => (ref.current[1] = el)}
                                name="password"  
                                className={styles.input} 
                                type="password" 
                                placeholder='Password' 
                            />
                            {!unhidePassword ? <MdVisibilityOff onClick={() => handleShowPass()} />
                        : <MdVisibility onClick={() => handleShowPass()} />}
                        </div>
                        <button type='submit'>Log In</button>
                        <div className={styles.linksArea}>
                            <a href='/sign-up'>
                            Register
                            </a>
                            <div>|</div>
                            <a href='/reset-password'>
                            Lost your password?
                            </a>
                        </div>
                    </form>
                </div>
                : ''}
                <HiMenu onClick={() => handleUnhideMenu()} className={styles.menuButton} />
                <div id="mySidenav" ref={(el: HTMLDivElement) => ref.current[0] = el} className={`${styles.sideNav} ${darkMode && `${styles.darkMode}`}`}>
                    <MdClose className={styles.closeLogo} onClick={() => handleUnhideMenu()} />
                    <div className={styles.routesList}>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/articles">All News</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/reviews">Reviews</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/movies">Movies Archive</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/series">Series Archive</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/mangas">Mangas Archive</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/genres">Genres</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/actors">Actors A-Z</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/about">About</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/contact">Contact</a>
                        <a className={styles.routesListItem} onMouseLeave={(e) => handleMouseLeave(e)} onMouseEnter={(e) => handleMouseEnter(e)} style={darkMode ? {"color": "white"}: {}} href="/*">Error 404</a>
                        <img alt='a' src="/assets/sideMenu.jpg" />
                    </div>
                </div> 
            </div>
        </nav>
    <div className={styles.line}></div>
    </div>
    </>
  )
}

export default Header;
