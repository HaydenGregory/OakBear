import React, {useEffect, useState} from 'react'

function ShoesPage() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/api/item?category=shoes', {
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
                return( <div>
                    <img src={item.images.url} />
                </div>)
            })}
        </div>
    )
}

export default ShoesPage
