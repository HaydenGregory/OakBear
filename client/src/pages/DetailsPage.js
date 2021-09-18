import React, { useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import NavBar from '../components/NavBar'
import './DetailPage.css'
import FavoritesButton from '../components/Favorites-Button'
import Footer from '../components/Footer'

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
            <NavBar />
            <div class='container'>
                <div class='image-bio'>
                    <img class='image' src={item.images.url}/>
                        <div class='info-container'>
                            <div class='seller'>
                                <img class='image-profile' src='../Images/Profile.png' width='40px' />
                                <div class='seller-email'>{item.seller}</div>
                        </div>
                            <div class='title'>
                                {item.title}
                            </div>
                            <div class='description'>
                                {item.description}
                            </div>
                            <div class='pricing'>
                                <div class='price-label'>Price</div>
                                ${item.price}
                            </div>
                            <hr class='lines'/>
                            <div class='size'>
                                <div class='size-label'>Size</div>
                                {item.size}
                            </div>
                            <hr class='lines'/>
                            <div class='condition'>
                                <div class='condition-label'>Condition</div>
                                {item.condition}
                            </div>
                            <hr class='lines'/>
                            <div class='favorites-button'>
                                <FavoritesButton />
                            </div>
                    </div>
                </div>
            </div>
                    <Footer />
        </div>
    )
}

export default DetailsPage
