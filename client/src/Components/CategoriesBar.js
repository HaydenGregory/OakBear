import React from 'react'
import './CategoriesBar.css'

function CategoriesBar() {
    return (
<div>
            <div>
                <div class='categoriesbar-container'>
                    <div>
                        <ul class='category-area'>
                            <li><a href='/tents' class='category-options'>TENTS</a></li>
                            <li><a href='/backpacks' class='category-options'>BACKBACKS</a></li>
                            <li><a href='/shoes' class='category-options'>SHOES</a></li>
                            <li><a href='/clothes' class='category-options'>CLOTHES</a></li>
                            <li><a href='/gear' class='category-options'>GEAR</a></li>
                            <li><a href='/knives' class='category-options'>KNIVES</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoriesBar
