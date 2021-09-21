import React from 'react'
import './CategoriesBar.css'

function CategoriesBar() {
    return (
<div>
            <div>
                <div className='categoriesbar-container'>
                    <div>
                        <ul className='category-area'>
                            <li><a href='/tents' className='category-options'>TENTS</a></li>
                            <li><a href='/backpacks' className='category-options'>BACKBACKS</a></li>
                            <li><a href='/shoes' className='category-options'>SHOES</a></li>
                            <li><a href='/clothes' className='category-options'>CLOTHES</a></li>
                            <li><a href='/gear' className='category-options'>GEAR</a></li>
                            <li><a href='/knives' className='category-options'>KNIVES</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoriesBar
