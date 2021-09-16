import React, { useState } from 'react'
import BackpacksForm from '../components/BackpacksForm'
import ClothesForm from '../components/ClothesForm'
import GearForm from '../components/GearForm'
import KnivesForm from '../components/KnivesForm'
import ShoesForm from '../components/ShoesForm'
import TentsForm from '../components/TentsForm'
import './SellPage.css'
import NavBar from '../components/NavBar.js'


function SellPage() {
    const [sellForm, setSellForm] = useState('')
    return (
        <div>
            <NavBar />
            <h1 class='question-1'>What are you trying to sell?</h1>
            <div className='sellform-button'>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<ClothesForm/>)}>Clothes</button>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<TentsForm />)}>Tents</button>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<BackpacksForm/>)}>Backpacks</button>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<ShoesForm />)}>Shoes</button>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<GearForm />)}>Gear</button>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<KnivesForm />)}>Knives</button>

            </div>
            <div className='sellform-container'>
                {sellForm}
            </div>
        </div>
    )

}

export default SellPage
