import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ClothesPage.css'

function KnivesPage() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/api/item?category=knives', {
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
                            <div className="item-card">
                                <img src={item.images.url} width="230px" height="280px" alt=" " />
                                <div className="info-container">
                                    <b><span>{item.price} USD</span></b>
                                </div>
                                <div className="button-container">
                                    <Link to={`/detailspage/${item.item_id}`}>
                                        <button className="buy-button">Buy</button>
                                    </Link>
                                </div>
                            </div>)
                })}
            </div>
        </div>
    )
}

export default KnivesPage
