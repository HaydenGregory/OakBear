import React, {useState, useEffect} from 'react'

function TentsPages() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/api/item?category=tents', {
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

export default TentsPages
