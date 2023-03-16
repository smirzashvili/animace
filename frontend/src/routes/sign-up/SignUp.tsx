import React, { useState, useRef, MutableRefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css"
import { MdFace } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { MdVisibilityOff } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';
import { MdPersonOutline } from 'react-icons/md';
import {useDispatch, useSelector} from "react-redux"
import { addUser } from '../../redux/actions/userActions';
import * as api from '../../api/usersApi';
// import {showErrMsg, showSuccessMsg} from '../../utils/displayMessage'
import {isEmpty, isEmail, isLength, isUsername} from '../../utils/validations'
import axios from 'axios';

const SignUp = () => {

    const navigate = useNavigate();

    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    const [unhidePassword, setUnhidePassword] = useState(false)
    const [state, setState] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState("")

    const {isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

    const handleShowPass = () => {
        if(unhidePassword) {
            setUnhidePassword(false)
            ref.current.type = "password"       
        } else {
            setUnhidePassword(true)
            ref.current.type = "text"       
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
        if(isEmpty(state.email) || isEmpty(state.password) || isEmpty(state.name) || isEmpty(state.username) || isEmpty(state.surname))
            return setError("Please fill in all fields!")
            
        if(!isEmail(state.email))
            return setError("Please enter a valid email!")

        if(isLength(state.password))
            return setError("Password must be at least 8 characters!")

        if(isUsername(state.username))
            return setError("Username shouldn't contain special characters!")

        try {
            setError("")
            const res = await api.createUser(state)
            if(res.data) {
                dispatch(addUser(res.data));
                navigate("/")
            }
        } catch (err) {
            axios.isAxiosError(err) && setError(err.response?.data.msg)
        }
    }


  return (
    <div className={styles.container}> 
        <div className={styles.firstItem}>
            {isLoggedIn ? <div>You are already registered.</div> : <>
            {error && <div className={styles.error}>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div className={styles.header}>Create an Account</div>
                    <div className={styles.relative}>
                        <input 
                            value={state.username} 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            name="username" 
                            type="text" 
                            placeholder='Username' 
                        />
                        <MdFace />
                    </div>
                    <div className={styles.relative}>
                        <input 
                            value={state.email} 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            name="email" 
                            type="text" 
                            placeholder='Email Address' 
                        />
                        <IoMdMail />
                    </div>
                    <div className={styles.relative}>
                        <input 
                            value={state.password} 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            name="password" 
                            id="pass"
                            ref={ref} 
                            type="password" 
                            placeholder='Password' 
                        />
                        {!unhidePassword ? <MdVisibilityOff onClick={() => handleShowPass()} />
                        : <MdVisibility onClick={() => handleShowPass()} />}
                    </div>
                    <div className={styles.relative}>
                        <input 
                            value={state.name} 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            name="name" 
                            type="text" 
                            placeholder='First Name' 
                        />
                        <MdPersonOutline />
                    </div>
                    <div className={styles.relative}>
                        <input 
                            value={state.surname} 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            name="surname" 
                            type="text" 
                            placeholder='Last Name' 
                        />
                        <MdPersonOutline />
                    </div>
                <button type='submit'>Register</button>
            </form>
            <a href='/sign-in'>
            Have an account? Login
            </a>
            </>}
        </div>
        <div className={styles.secondItem}>
            <img alt='a' src="https://res.cloudinary.com/dxkxeimv4/image/upload/v1645263564/animace/banners/matt-popovich-0FZrPECK5cg-unsplash-1024x650_cdewg7.jpg" />
        </div>
    </div>
  )
};

export default SignUp;
