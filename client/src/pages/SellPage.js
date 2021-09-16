import React, { useState } from 'react'
import BackpacksForm from '../components/BackpacksForm'
import ClothesForm from '../components/ClothesForm'
import TentsForm from '../components/TentsForm'


function SellPage() {
    const [sellForm, setSellForm] = useState('')
    return (
        <div>
            <h1>Whate are you trying to sell?</h1>
            <div className='sellform-button'>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<ClothesForm/>)}>Clothes</button>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<TentsForm />)}>Tents</button>
                <button type='button' class='toggle-button' onClick={() => setSellForm(<BackpacksForm/>)}>Backpacks</button>

            </div>
            <div className='sellform-container'>
                {sellForm}
            </div>
        </div>
    )

}

export default SellPage
