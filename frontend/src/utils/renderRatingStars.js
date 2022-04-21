import { RiStarLine } from 'react-icons/ri';
import { RiStarFill } from 'react-icons/ri';

export const renderRatingStars = (rating) => {
    [...Array(5)].map((item, index) => {
        if(rating <= index) return <RiStarLine/>
        else return <RiStarFill/>
    })
}
