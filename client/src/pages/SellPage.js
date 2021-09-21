import React, { useState } from 'react'
import BackpacksForm from '../components/BackpacksForm'
import ClothesForm from '../components/ClothesForm'
import GearForm from '../components/GearForm'
import KnivesForm from '../components/KnivesForm'
import ShoesForm from '../components/ShoesForm'
import TentsForm from '../components/TentsForm'
import './SellPage.css'
import NavBar from '../components/NavBar.js'
import Footer from '../components/Footer'


function SellPage() {
    const [sellForm, setSellForm] = useState('')
    const forms = [
        {name: 'Clothes', form: <ClothesForm />},
        {name: 'Tents', form: <TentsForm />},
        {name: 'Backpacks', form: <BackpacksForm />},
        {name: 'Shoes', form: <ShoesForm />},
        {name: 'Gear', form: <GearForm />},
        {name: 'Knives', form: <KnivesForm />}
    ]

    return (
        <div>
            <NavBar />
            <h1 className='question-1'>What are you trying to sell?</h1>
            <div className='sellform-button'>
                {forms.map((button) => (
                    <button type='button' id='toggle-butt' className={`toggle-button ${sellForm.name === button.name ? 'active' : ''}`} onClick={() => setSellForm(button)}>{button.name}</button>
                ))}
            </div>
            <div className='sellform-container'>
                {sellForm.form}
            </div>
            <Footer />
        </div>
    )

}

export default SellPage
