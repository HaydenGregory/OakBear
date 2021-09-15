import React, { useState } from 'react'

function SellPage() {
    const [item_id, setItem_Id] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState({
        public_id: "test/prcvnkp0nupz6xn1bw9p",
        url: "https://res.cloudinary.com/oakbear/image/upload/v1631559442/test/prcvnkp0nupz6xn1bw9p.png"
    })
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [brand, setBrand] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(category)

        setItem_Id(Math.floor(Math.random() * 100000))        

        fetch('/api/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_id,
                title,
                price,
                description,
                content,
                images,
                category,
                condition,
                size,
                color,
                brand
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(error)
                } else {
                    console.log("WORKING", data)
                }
            })
    }

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }
    function handlePriceChange(e) {
        setPrice(e.target.value)
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }
    function handleContentChange(e) {
        setContent(e.target.value)
    }
    function handleCategoryChange(e) {
        setCategory(e.target.value)
    }
    function handleConditionChange(e) {
        setCondition(e.target.value)
    }
    function handleSizeChange(e) {
        setSize(e.target.value)
    }
    function handleColorChange(e) {
        setColor(e.target.value)
    }
    function handleBrandChange(e) {
        setBrand(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} action='/user/item' method='POST'>
                <label className='sell-label' for='title'>Title</label><br />
                <input className='sell-input' value={title} onChange={(e) => handleTitleChange(e)} name='title' type='text' id='title'></input><br />
                <label className='sell-label' for='price'>Price</label><br />
                <input className='sell-input' value={price} onChange={(e) => handlePriceChange(e)} name='price' type='number' id='price'></input><br />
                <label className='sell-label' for='description'>Description</label><br />
                <input className='sell-input' value={description} onChange={(e) => handleDescriptionChange(e)} name='description' type='text' id='description'></input><br />
                <label className='sell-label' for='content'>Content</label><br />
                <input className='sell-input' value={content} onChange={(e) => handleContentChange(e)} name='content' type='text' id='content'></input><br />
                <label className='sell-label' for='category'>Category</label><br />
                <select className='dropdown-selections' value={category} onChange={(e) => handleCategoryChange(e)} name='category' id='category'>
                    <option value='tents'>Tents</option>
                    <option value='backpacks'>Backpacks</option>
                    <option value='Shoes'>Shoes</option>
                    <option value='Clothes'>Clothes</option>
                    <option value='Gear'>Gear</option>
                    <option value='Knives'>Knives</option>
                </select>
                <label className='sell-label' for='condition'>Condition</label><br />
                <select className='dropdown-selections' value={condition} onChange={(e) => handleConditionChange(e)} name='condition' id='condition'>
                    <option value='likenew'>Like New</option>
                    <option value='moderatelyused'>Moderately Used</option>
                    <option value='used'>Used</option>
                </select>
                <label className='sell-label' for='size'>Size</label><br />
                <input className='sell-input' value={size} onChange={(e) => handleSizeChange(e)} name='size' type='text' id='size'></input><br />
                <label className='sell-label' for='color'>Color</label><br />
                <input className='sell-input' value={color} onChange={(e) => handleColorChange(e)} name='color' type='text' id='color'></input><br />
                <label className='sell-label' for='brand'>Brand</label><br />
                <input className='sell-input' value={brand} onChange={(e) => handleBrandChange(e)} name='brand' type='text' id='brand'></input><br />
                <input className='login-submit' type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default SellPage
