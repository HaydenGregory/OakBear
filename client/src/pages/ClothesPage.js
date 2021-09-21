import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
            <div className="container-cards">
                {items.map(item => {
                    if (!item.active) {
                        return ""
                    }
                    else
                        return (
                            <div key={item.item_id} className="item-card">
                                <img src={item.images.url} width="230px" height="320px" alt=" " />
                                <div className="info-container">
                                    <hr class='lines' />
                                    <b><span>US ${item.price}</span></b>
                                </div>
                                <div className="button-container">
                                    <Link to={`/detailspage/${item.item_id}`}>
                                        <button className="buy-button">Buy</button>
                                    </Link>
                                </div>
                            </div>)
                })}
        </div>
        </div >
    )
}


export default ClothesPage
