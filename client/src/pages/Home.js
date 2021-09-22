import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import CategoriesBar from '../components/CategoriesBar'
import MessageDisplay from '../components/MessageDisplay'
import NavBar from '../components/NavBar'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import './Home.css'
import CheckStripeAccount from '../components/CheckStripeAccount'

function Home() {
    const { message, error } = useSelector(state => state.message)
    const [err, setError] = useState('')
    const [msg, setMsg] = useState('')
    useEffect(() => {
        setError(error)
        setMsg(message)
    }, [message, error])
    return (
        <div>
            <NavBar />
            {error || msg ? <MessageDisplay errMessage={err} successMessage={msg} /> : ''}
            <div>
                {msg === 'Please finish creating your stripe account to make for sale items active'? <a className="finishstripe-button" href={`stripe/refresh`}><button>Click here</button></a>: ''}
            </div>
            <CategoriesBar />
            <CheckStripeAccount />
            <div className='slogan-container'>
                <div className='slogan'>Camping Repurposed</div>
            </div>
            <Carousel />
            <div className='tent-about'>
                <div className='what-is-container'>
                    <div className='what-is'>
                        <h1 className='h1-1'>What is Oak Bear?</h1>
                        <p className='p-1'> Oak Bear is the camping marketplace where everyone can get a chance to explore without letting a dollar sign get in their way. Allowing a global community to buy and sell will prevent waste and create more diversity in hiking, camping and other outdoor activities. </p>
                    </div>
                </div>
                    <div>
                        <img className='tent-image' src='/Images/Tent.jpg' width='500px' alt=" "/>
                    </div>
            </div>
            <div>
            <div className='nature-par'>
                <div className='nature-container'>
                <div>
                        <img className='nature-image' src='/Images/hiker.jpg' width='500px' alt= " "/>
                </div>
                    <div className='natural'>
                        <h1 className='h1-2'>Getting back to nature</h1>
                        <p className='p-2'> Shop the biggest brands that we all know and love. Discover independent brands making themselves more known along with the creators behind them. Whatever you're looking for, find the item and seller here on Oak Bear </p>
                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
