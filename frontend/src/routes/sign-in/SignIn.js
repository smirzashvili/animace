import React, {useState} from 'react';
import styles from "./styles.module.css"
import { MdFace } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';
import {useDispatch, useSelector} from "react-redux"
import { logInUser } from '../../redux/actions/userActions';
import {isEmpty, isEmail, isLength, isUsername} from '../../utils/validations'
import * as api from '../../api/usersApi.js';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const {isLoggedIn} = useSelector(state => state.UsersReducer)

    const navigate = useNavigate();

    const [unhidePassword, setUnhidePassword] = useState(false)

    const [state, setState] = useState({
        usernameOrEmail: "",
        password: ""
    })
    const [error, setError] = useState("")


    const handleShowPass = () => {
        if(unhidePassword) {
            setUnhidePassword(false)
            document.getElementById("pass").type = "password"       
        } else {
            setUnhidePassword(true)
            document.getElementById("pass").type = "text"       
        }
    }

    const dispatch = useDispatch();

    const handleChange = (name, value) => {
        setState({
            ...state,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(isEmpty(state.usernameOrEmail) || isEmpty(state.password))
            return setError("Please fill in all fields")
        
        try {
            setError("")
            const res = await api.logInUser(state)
            if(res.data) {
                localStorage.setItem('logged', 'true')
                dispatch(logInUser(res.data));
                navigate("/")
            }
        } catch (err) {
            setError(err.response.data.msg)
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.firstItem}>
            {isLoggedIn ? <div>You are already logged in.</div> : <>
            {error && <div className={styles.error}>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div className={styles.header}>Sign in to Your Account</div>
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
                            name="password"
                            id="pass" 
                            type="password" 
                            placeholder='Password' 
                        />
                        {!unhidePassword ? <MdVisibilityOff onClick={() => handleShowPass()} />
                        : <MdVisibility onClick={() => handleShowPass()} />}
                    </div>
                <button type='submit'>Log In</button>
            </form>
            <div className={styles.linksArea}>
              <a href='/sign-up'>
              Register
              </a>
              <div>|</div>
              <a href='/reset-password'>
              Lost your password?
              </a>
            </div>
            </>}       
        </div>
        <div className={styles.secondItem}>
            <img src="https://res.cloudinary.com/dxkxeimv4/image/upload/v1645263626/animace/banners/dex-ezekiel-IxDPZ-AHfoI-unsplash-1024x683_lg2nrc.jpg" />
        </div>
    </div>
  )
};

export default SignIn;
