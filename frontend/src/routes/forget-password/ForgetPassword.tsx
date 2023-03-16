import React, {useState} from 'react';
import styles from "./styles.module.css"
import { MdFace } from 'react-icons/md';
import {isEmpty, isEmail, isLength, isUsername} from '../../utils/validations'
import { useDispatch } from 'react-redux';
import {forgetPasswordUser } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api/usersApi';
import axios from 'axios';

const ForgetPassword = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [state, setState] = useState<IForgetPasswordUserApiReq>({
    usernameOrEmail: "",
})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")


  const handleChange = (name: string, value: string) => {
    setState({
        ...state,
        [name]: value
    })
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(isEmpty(state.usernameOrEmail))
      return setError("Please fill in a field")

    try {
        setError("")
        setSuccess("")
        const res = await api.forgetPasswordUser(state)
        dispatch(forgetPasswordUser(state));
        setSuccess(res.data.msg)
    } catch (err) {
        axios.isAxiosError(err) && setError(err.response?.data.msg)
    }
}

  return (
      <>
        <h1 className={styles.title}>Reset Password</h1>
        <div className={styles.line}></div>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div className={styles.header}>Reset Your Password</div>
                    <div className={styles.relative}>
                        <input 
                          value={state.usernameOrEmail} 
                          type="text"
                          name='usernameOrEmail' 
                          placeholder='Username or Email' 
                          onChange={(e) => handleChange(e.target.name, e.target.value)} 
                        />
                        <MdFace />
                    </div>
                <button type='submit'>Reset Password</button>
        </form>
        <a className={styles.link} href='/sign-in'>
            Return to Login
        </a>
      </>
  )
};

export default ForgetPassword;
