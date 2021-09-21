

import React, {useState } from 'react'
import { useHistory } from 'react-router-dom';

import './SearchBar.scss'
import SearchIcon from '../Images/searchicon.png'


function SearchBar() {
    const [searchInput, setSearchInput] = useState('')
    const history = useHistory()

    function handleChange(e) {
        setSearchInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        history.push(`/${searchInput.toLowerCase()}`)
            fetch(`/api/item?category=${searchInput}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }


    return (
        <div>
            <div>
                <div className="wrapper">
                    <form onSubmit={handleSubmit} className="searchBar">
                        <input onChange={(e) => handleChange(e)} value={searchInput} className='searchInput' type="text" placeholder="Search for Equipment.." name="search"/>
                        <button className='searchButton' type="submit"><img src={SearchIcon} width='20px'alt=" "/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
