import React, { useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function DetailsPage() {
    const [item, setItem] = useState(null)
    const {id} = useParams()
    useEffect(() => {
        fetch(`/api/item/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.item)
            setItem(data.item)
        })
    }, [id])
    if(!item) {
        return 'Loading'
    }
    return (
        <div>
            <p>{item.title}</p>
        </div>
    )
}

export default DetailsPage
