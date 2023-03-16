import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { transformToName, transformToUrl } from "../../utils/pathTransformation";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { getGenres } from '../../redux/actions/genreActions';

const SearchSideBar = () => {

    const [searchKeyword, setSearchKeyword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleSelect = (value: string, type: string) => {
        navigate(`../${type}/${value}`)
    }
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value)
    }
    
    const handleSearch = async (type: string) => {
        if(searchKeyword.length > 0) {
            navigate(`/search?kw=${searchKeyword}&type=${type}`)
        }    
    }

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getGenres())

      }, [dispatch]);

      const {categories} = useSelector((state: RootState)=>state.CategoriesReducer)
    const {genres} = useSelector((state: RootState)=>state.GenresReducer)

  return (
    <>
        <div className={styles.label}>Search Posts</div>
        <input
            onChange={(e) => handleSearchChange(e)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch("posts")}
            className={styles.input}
            type="text"
            placeholder="Search here..."
        />
        <div className={styles.label}>Search Reviews</div>
        <input
            onChange={(e) => handleSearchChange(e)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch("reviews")}
            className={styles.input}
            type="text"
            placeholder="Search here..."
        />
        <div className={styles.label}>Categories</div>
        <select 
            className={styles.input}
            onChange={(e) => handleSelect(e.target.value, "categories")}
        >
            <option style={{"display": "none"}} selected>Select Category</option>
            {categories?.map((item: ICategory) => {
                return (
                <option value={transformToUrl(item.title)}>{item.title}</option>
                )
            })}
        </select>
        <div className={styles.label}>Genres</div>
        <select 
            className={styles.input}
            onChange={(e) => handleSelect(e.target.value, "genres")}
        >
            <option style={{"display": "none"}} selected>Select Genre</option>
            {genres?.map((item: IGenre) => {
                return (
                <option value={transformToUrl(item.title)}>{item.title}</option>
                )
            })}
        </select>
        <img
            className={styles.bottomImage}
            alt="a"
            src="https://res.cloudinary.com/dxkxeimv4/image/upload/v1645273944/animace/banners/animace-banner-3-1024x576_soxd9w.jpg"
        />
    </>
  )
}

export default SearchSideBar