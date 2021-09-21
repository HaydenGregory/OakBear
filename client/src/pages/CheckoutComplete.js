import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoriesBar from '../components/CategoriesBar'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import './DetailPage.css'


function CheckoutComplete() {
    const { checkout_id } = useParams()
    const [item, setItem] = useState('')

    useEffect(() => {
        fetch(`/api/item/checkout/${checkout_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.item)
                setItem(data.item)
            })
    }, [checkout_id])
    if(!item) {
        return <Loading />
    }
    return (
        <div>
            <div>
                <NavBar />
                <CategoriesBar />
                    <div className='Completed'>
                        Thank you for your purchase! You should receive an email receipt shortly. 
                    </div>
                <div className='container'>
                    <div className='image-bio'>
                        <img className='image' src={item.images.url} alt=" " />
                        <div className='info-container'>
                            <div className='seller'>
                                <img className='image-profile' src='../Images/Profile.png' width='40px' alt=" " />
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
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default CheckoutComplete
