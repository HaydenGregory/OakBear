import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import './DetailPage.css'
import FavoritesButton from '../components/Favorites-Button'
import Footer from '../components/Footer'
import Checkout from '../components/Checkout'
import CategoriesBar from '../components/CategoriesBar'
import Loading from '../components/Loading'




function DetailsPage() {
    const [item, setItem] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch(`/api/item/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("hello")
                console.log(data.item)
                setItem(data.item)
            })
        console.log(item)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    if (!item) {
        return <Loading />
    }
    return (
        <div>
            <NavBar />
            <CategoriesBar />
            <div className='container'>
                <div className='image-bio'>
                    <img className='image' src={item.images.url} alt=" " />
                    <div className='info-container'>
                        <div className='seller'>
                            <img className='image-profile' src={item.sellerImage.url} width='40px' alt=" " />
                            <div className='seller-email'>{item.seller}</div>
                        </div>
                        <div className='title'>
                            {item.title}
                        </div>
                        <div className='description'>
                            {item.description}
                        </div>
                        <div className='pricing'>
                            <div className='price-label'>Price </div>
                            ${item.price}
                        </div>
                        <hr className='lines' />
                        <div className='size'>
                            <div className='size-label'>Size </div>
                            {item.size}
                        </div>
                        <hr className='lines' />
                        <div className='condition'>
                            <div className='condition-label'>Condition</div>
                            {item.condition}
                        </div>
                        <hr className='lines' />
                        <div className='favorites-button'>
                            <FavoritesButton itemInfo={item} />
                            <Checkout itemID={item.item_id} />
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailsPage
