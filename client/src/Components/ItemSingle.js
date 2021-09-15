import React from 'react'

function ItemSingle({item}) {
    return (
        <div className="item-card">
            <img src={item.images.url} alt=""/> 
            <div className="item_box">
                <h2 title={item.title}></h2>
                <span>{item.price}</span>
                <span>{item.description}</span>
            </div>
        </div>
    )
}

export default ItemSingle
