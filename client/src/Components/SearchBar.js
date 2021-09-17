import React from 'react'
import './SearchBar.scss'
import SearchIcon from '../Images/searchicon.png'

function SearchBar() {
    return (
        <div>
            <div>
                <div class="wrapper">
                    <div class="searchBar">
                        <input class='searchInput' type="text" placeholder="Search for Equipment.." name="search"/>
                        <button class='searchButton' type="submit"><img src={SearchIcon} width='20px'/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
