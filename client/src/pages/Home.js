import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import CategoriesBar from '../components/CategoriesBar'
import MessageDisplay from '../components/MessageDisplay'
import NavBar from '../components/NavBar'
import { useSelector } from 'react-redux'

function Home() {
    const { message, error } = useSelector(state => state.message)
    const [err, setError] = useState('')
    const [msg, setMsg] = useState('')
    useEffect(() => {
        setError(error)
        setMsg(message)
        // dispatch(actionUpdateMessage(null))
    }, [message, error])
    return (
        <div>
            <NavBar />
            {error || msg ? <MessageDisplay errMessage={err} successMessage={msg} /> : ''}
            <CategoriesBar />
            <Carousel />
        </div>
    )
}

export default Home
