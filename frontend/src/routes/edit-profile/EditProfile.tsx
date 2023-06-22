import React, {MutableRefObject, useRef, useState} from 'react';
import styles from "./styles.module.css"
import { MdFace } from 'react-icons/md';
import { IoIosImage, IoMdMail } from 'react-icons/io';
import { MdVisibilityOff } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';
import { MdPersonOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../redux/actions/userActions';
import {isEmpty, isEmail, isLength, isUsername, isImageSize, isImageType} from '../../utils/validations'
import * as api from '../../api/usersApi';
import axios from 'axios';

const EditProfile = () => {

    const ref = useRef() as MutableRefObject<HTMLInputElement>;

const dispatch = useDispatch()

const [error, setError] = useState("")
const [success, setSuccess] = useState("")

const [unhidePassword, setUnhidePassword] = useState(false)
const [strength, setStrength] = useState("default")

const {userInfo, token}: {userInfo: IUser, token: string} = useSelector((state: RootState)=>state.UsersReducer)

const [state, setState] = useState({
    name: userInfo.name,
    surname: userInfo.surname,
    username: userInfo.username,
    email: userInfo.email,
    password: "",
    file: {} as {type: string, size: number}
})

const handleShowPass = () => {
    if(unhidePassword) {
        setUnhidePassword(false)
        ref.current.type = "password"       
    } else {
        setUnhidePassword(true)
        ref.current.type = "text"       
    }
}
const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
        const file = e.target.files[0]
        setState({
            ...state,
            file: file
        })
    }
}
const handleChange = (name: string, value: string) => {    
    setState({
        ...state,
        [name]: value
    })

    let capsCount = (ref.current.value.match(/[A-Z]/g) || []).length,
        numberCount = (ref.current.value.match(/[0-9]/g) || []).length,
        Count = ref.current.value.length
    if (Count === 0) {
        setStrength("default")
    }
    if(Count > 0 && Count <=4) {
        setStrength("very weak")
    }  
    if (Count > 4) {
        setStrength("weak")
    }
    if ( (Count > 8 && capsCount > 0 && numberCount === 0) ||
    (Count > 8 && capsCount === 0 && numberCount > 0) ) {
        setStrength("medium")
    }
    if (Count > 10 && capsCount > 0 && numberCount > 0) {
        setStrength("strong")
    }
}
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if(isEmpty(state.email) || isEmpty(state.name) || isEmpty(state.username) || isEmpty(state.surname))
        return setError("Please fill in the fields!") 
            
    if(!isEmail(state.email))
        return setError("Please enter a valid email!")

    if(state.password.length > 0 && isLength(state.password))
        return setError("Password must be at least 8 characters!")

    if(isUsername(state.username))
        return setError("Username shouldn't contain special characters!")
        

    if(isImageType(state.file.type))
        return setError("This type of file is not supported")

    if(isImageSize(state.file.size))
        return setError("File size is too large!")

    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('surname', state.surname);
    formData.append('username', state.username);
    formData.append('email', state.email);
    formData.append('password', state.password);
    formData.append('file', state.file as any);

    try {
        setError("")
        setSuccess("")
        const res = await api.editUser(formData as unknown as IUser, token)
        if(res.data) {
            dispatch(editUser(res.data));
            setSuccess("Successfully changed!")
        }
    } catch (err) {
        axios.isAxiosError(err) && setError(err.response?.data.msg)
    }
}



  return (
    <div className={styles.container}> 
        <div className={styles.firstItem}>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form} encType='multipart/form-data'>
                <div className={styles.header}>Edit Your Profile</div>
                    <div className={styles.relative}>
                        <input
                            value={state.username} 
                            name='username' 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            type="text" 
                        />
                        <MdFace />
                    </div>
                    <div className={styles.relative}>
                        <input
                            value={state.email} 
                            name='email' 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            type="text" 
                        />
                        <IoMdMail />
                    </div>
                    <div className={styles.relative}>
                        <input
                            value={state.password} 
                            name='password' 
                            onInput={(e) => handleChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value)} 
                            id="pass" 
                            ref={ref}
                            type="password"
                            placeholder="Password"
                        />
                        {!unhidePassword ? <MdVisibilityOff onClick={() => handleShowPass()} />
                        : <MdVisibility onClick={() => handleShowPass()} />}
                    </div>
                    <div className={styles.strengthIndicator}>
                        { 
                            strength === "strong" ? <div className={styles.strong}>Strong</div> :
                            strength === "medium" ? <div className={styles.medium}>Medium</div> :
                            strength === "weak" ? <div className={styles.weak}>Weak</div> :
                            strength === "very weak" ? <div className={styles.veryWeak}>Very Weak</div> :
                            <div className={styles.default}>Strength Indicator</div>
                        }
                    </div>
                    <div className={styles.relative}>
                        <input 
                            value={state.name} 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            name='name' 
                            type="text" 
                        />
                        <MdPersonOutline />
                    </div>
                    <div className={styles.relative}>
                        <input 
                            value={state.surname} 
                            onChange={(e) => handleChange(e.target.name, e.target.value)} 
                            name='surname' 
                            type="text" 
                        />
                        <MdPersonOutline />
                    </div>
                    <div>
                        <input
                            onChange={(e) => handleFile(e)} 
                            name='file' 
                            type="file" 
                        />
                    </div>
                <button type='submit'>Update Profile</button>
            </form>
        </div>
        <div className={styles.secondItem}>
            <img alt='a' src="/assets/editProfileBackground.jpg" />
        </div>
    </div>
  )
};

export default EditProfile;
