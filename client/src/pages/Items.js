import React, {useState, useEffect} from 'react'
import ItemSingle from "../components/ItemSingle.js"

function ItemDetails() {
    const [items, setItems] = useState('')

    const fetchItems = (data) => {
        fetch('/api/item')
            .then(res => res.json())
            .then(data => {
                setItems(data.items)
            })
    }

    useEffect(() => {
        fetchItems()
    }, [])
    const itemsArr = Object.values(items)
    return (
        <div>
            {itemsArr.map((item) => {
                return <ItemSingle key={item._id} item={item} />
            })}
        </div>
    )
}

export default ItemDetails
