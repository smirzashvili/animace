import React, {useState, useEffect} from 'react';
import styles from "./styles.module.css"
import { RiStarLine } from 'react-icons/ri';
import { RiStarFill } from 'react-icons/ri';
import {isEmpty, isEmail} from '../../utils/validations'
import { useForm } from 'react-hook-form';

const CreateReview: React.FC<{darkMode: boolean}> = ({darkMode}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        
    }
    // const [checkbox, setCheckbox] = useState("")
    const [starError, setStarError] = useState("")
    const [fillStar, setFillStar] = useState<{[x: number]: {filled: boolean}}>({
        1: {filled: false},
        2: {filled: false},
        3: {filled: false},
        4: {filled: false},
        5: {filled: false}
    })
    // const [state, setState] = useState({
    //     title: "",
    //     review: "",
    //     name: "",
    //     email: "",
    // })

    // const handleChange = (name, value) => {
    //     setState({
    //         ...state,
    //         [name]: value,
    //     })
    // }

    const handleClick = () => {
        if(!fillStar[1].filled) setStarError("This field is required")
    }

    const handleFillStar = (e: React.MouseEvent<SVGElement, MouseEvent>, index: number) => {
        const updatedStar: any = {}
        for(let i = Object.keys(fillStar).length; i>=1; i--) {
            if(index >= i) {
                updatedStar[i] = {filled: true};
            } else {
                updatedStar[i] = {filled: false};
            }
            setFillStar({
                ...fillStar,
                ...updatedStar
            })
            setStarError("")
        }
    } 
  return (
    <div>
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className={!window.location.pathname.startsWith("/mangas") ? styles.review : '' }
            style={darkMode ? {background: "#3e3e3e"} : {}}>
            <label htmlFor="stars">Your overall rating</label>
            <div 
                id="stars" 
                className={styles.stars}
                style={starError !== "" ? {"color": "#e02424"} : {"color": "#FDC83E"}}
                // onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
                {fillStar[1]?.filled 
                    ? 
                    <RiStarFill onClick={(e) => handleFillStar(e, 1)}/> 
                    : 
                    <RiStarLine onClick={(e) => handleFillStar(e, 1)}/> 
                }
                {fillStar[2]?.filled 
                    ? 
                    <RiStarFill onClick={(e) => handleFillStar(e, 2)}/> 
                    : 
                    <RiStarLine onClick={(e) => handleFillStar(e, 2)}/> 
                }
                {fillStar[3]?.filled 
                    ? <RiStarFill onClick={(e) => handleFillStar(e, 3)}/> 
                    : 
                    <RiStarLine onClick={(e) => handleFillStar(e, 3)}/> 
                }
                {fillStar[4]?.filled 
                    ? 
                    <RiStarFill onClick={(e) => handleFillStar(e, 4)}/> 
                    : 
                    <RiStarLine onClick={(e) => handleFillStar(e, 4)}/> 
                }
                {fillStar[5]?.filled 
                    ? 
                    <RiStarFill onClick={(e) => handleFillStar(e, 5)}/> 
                    : 
                    <RiStarLine onClick={(e) => handleFillStar(e, 5)}/> 
                }
            </div>
            {starError !== "" && <div className={styles.error}>{starError}</div>}
            <label htmlFor="title">Title of your review</label>
            <input 
                type="text" 
                id="title"
                placeholder='Summarize your review'
                style={errors.title ? {"borderColor": "#e02424"} : {}}
                // onChange={(e) => handleChange(e.target.name, e.target.value)}
                {...register("title", {required: true})}
            />
            {errors.title && <div className={styles.error}>This field is required</div>}

            <label htmlFor="review">Your review</label>
            <textarea 
                id="review"
                placeholder='Tell people your review'
                style={errors.review ? {"borderColor": "#e02424"} : {}}
                // onChange={(e) => handleChange(e.target.name, e.target.value)}
                {...register("review", {required: true})}
            ></textarea>
            {errors.review && <div className={styles.error}>This field is required</div>}

            <label htmlFor="name">Your name</label>
            <input 
                type="text" 
                id="name"
                placeholder='Tell us your name'
                style={errors.name ? {"borderColor": "#e02424"} : {}}
                // onChange={(e) => handleChange(e.target.name, e.target.value)}
                {...register("name", {required: true})}
            />
            {errors.name && <div className={styles.error}>This field is required</div>}

            <label htmlFor="email">Your email</label>
            <input 
                type="text" 
                id="email"
                placeholder='Tell us your email'
                style={errors.email ? {"borderColor": "#e02424"} : {}}
                // onChange={(e) => handleChange(e.target.name, e.target.value)}
                {...register("email", {required: true, validate: isEmail},)}
            />
            {errors.email?.type === "required" && <div className={styles.error}>This field is required</div>}
            {errors.email?.type === "validate" && <div className={styles.error}>This field requires a valid e-mail address.</div>}
            <div className={styles.flex}>
                <div style={{"height": "25px"}}>   
                    <input 
                        type="checkbox" 
                        id="checkbox"
                        // onClick={() => setCheckbox(checkbox ? false : true)}
                        {...register("checkbox", {required: true})}
                    />
                </div>
                <div>
                    <label htmlFor="checkbox">This review is based on my own experience and is my genuine opinion.</label> 
                </div>
            </div>
            {errors.checkbox && <div className={styles.error}>This field is required</div>}
            <button className={styles.createComm} onClick={() => handleClick()} type='submit'>Submit your review</button>
        </form>
    </div>
  )
}

export default CreateReview