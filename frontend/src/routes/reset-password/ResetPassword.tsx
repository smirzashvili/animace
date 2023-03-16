import React, {useState} from 'react';
import styles from "./styles.module.css"
import { MdFace } from 'react-icons/md';
import {isEmpty, isEmail, isLength, isUsername, isMatch} from '../../utils/validations'
import { useDispatch } from 'react-redux';
import { resetPasswordUser } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api/usersApi';
import {useParams} from 'react-router-dom'
import axios from 'axios';

const ForgetPassword = () => {

  const navigate = useNavigate()

  const {token} = useParams()

  const dispatch = useDispatch()

  const [state, setState] = useState<IResetPasswordUserApiReq>({
    password: "",
    confirm_password: ""
})
  const [error, setError] = useState("")

  const handleChange = (name: string, value: string) => {
    setState({
        ...state,
        [name]: value
    })
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(isEmpty(state.password) || isEmpty(state.confirm_password))
      return setError("Please fill in all fields!")

    if(!isMatch(state.password, state.confirm_password))
      return setError("Passwords do not match!")

    try {
        setError("")
        const res = await api.resetPasswordUser(state, token as string)
        dispatch(resetPasswordUser(state));
        res.data && navigate("/sign-in")
        console.log(res)
    } catch (err) {
        axios.isAxiosError(err) && setError(err.response?.data.msg)
    }
}

  return (
      <>
        <h1 className={styles.title}>Reset Password</h1>
        <div className={styles.line}></div>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div className={styles.header}>Enter your new password below</div>
                    <div className={styles.relative}>
                        <label htmlFor='password'>New Password </label><span>*</span>
                        <input 
                          id="password"
                          name="password" 
                          value={state.password} 
                          type="password"
                          onChange={(e) => handleChange(e.target.name, e.target.value)} 
                        />
                        <label htmlFor='confirm_password'>Re-enter new Password </label><span>*</span>
                        <input
                          id="confirm_password"
                          name="confirm_password" 
                          value={state.confirm_password} 
                          type="password"
                          onChange={(e) => handleChange(e.target.name, e.target.value)} 
                        />
                    </div>
                <button type='submit'>Save</button>
        </form>
      </>
  )
};

export default ForgetPassword;
