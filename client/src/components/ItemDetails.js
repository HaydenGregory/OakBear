import React, {useState, useEffect} from 'react'

function ItemDetails() {
    const [items, setItems] = useState('')

    const fetchItems = (data) => {
        fetch('/api/item')
            .then(res => res.json())
            .then(data => {
                setItems(data.items)
                console.log(data.items)
            })
    }

    useEffect(() => {
        fetchItems()
    }, [])
    const itemsArr = Object.values(items)
    return (
        <div>
            {itemsArr.map((item) => {
                console.log(item)
                return (
                    <div key={item.item_id}>
                        {item.title}
                        <img src={item.images.url}/>
                    </div>
                )
            })}
        </div>
    )
}

export default ItemDetails
