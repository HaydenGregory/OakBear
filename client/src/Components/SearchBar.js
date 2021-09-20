import React, {useState } from 'react'
import './SearchBar.scss'
import SearchIcon from '../Images/searchicon.png'


function SearchBar() {
    const [searchInput, setSearchInput] = useState('')

    function handleChange(e) {
        setSearchInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
            fetch(`/api/item?category=${searchInput}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }


    return (
        <div>
            <div>
                <div class="wrapper">
                    <form onSubmit={handleSubmit} class="searchBar">
                        <input onChange={(e) => handleChange(e)} value={searchInput} class='searchInput' type="text" placeholder="Search for Equipment.." name="search"/>
                        <button class='searchButton' type="submit"><img src={SearchIcon} width='20px'alt=" "/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
