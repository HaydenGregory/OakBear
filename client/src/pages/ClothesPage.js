import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './ClothesPage.css'

function ClothesPage() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/api/item?category=clothes', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.items)
                setItems(data.items)
            })
    }, [])
    
    return (
        <div>
            {items.map(item => {
                return( 
                <div className="item-card">
                    <img src={item.images.url} width="230px" height="280px"alt=" "/>
                    <div className="info-container">
                        <h4>{item.title}</h4>
                        <span>Price: {item.price} USD</span>
                    </div>
                    <Link to={`/detailspage/${item.item_id}`}>
                        <button>Buy</button>
                    </Link>
                </div>)
            })}
        </div>
    )
}


export default ClothesPage
