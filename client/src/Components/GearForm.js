import React, { useState } from 'react'
import './ClothesForm.css'
import {useSelector} from 'react-redux'

function GearForm() {
    const [item_id, setItem_Id] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState({
        public_id: "test/prcvnkp0nupz6xn1bw9p",
        url: "https://res.cloudinary.com/oakbear/image/upload/v1631559442/test/prcvnkp0nupz6xn1bw9p.png"
    })
    const [category, setCategory] = useState('gear')
    const [subcategory, setSubcategory] = useState('')
    const [condition, setCondition] = useState('')
    const [size, setSize] = useState('none')
    const [color, setColor] = useState('none')
    const [brand, setBrand] = useState('')
    const [error, setError] = useState('')
    const user = useSelector(state => state.user)



    const handleUpload = (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        console.log(file)
        const formData = new FormData()
        formData.append("images", file)
        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setImages(data)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(category)

        setItem_Id(Math.floor(Math.random() * 100000))


        if (images !== {
            public_id: "",
            url: ""
        }) {
            fetch('/api/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item_id,
                    seller: user.email,
                    title,
                    price,
                    description,
                    content,
                    images,
                    category,
                    subcategory,
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
        } else {
            alert("Upload image")
        }
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
    function handleSubcategoryChange(e) {
        setSubcategory(e.target.value)
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
                <hr class='line' />
                <input class='file-upload' type="file" name="file" id="file_up" onChange={(e) => handleUpload(e)} /><br />
                <label className='sell-label' for='title'>Title</label><br />
                <input className='sell-input regular-input' value={title} onChange={(e) => handleTitleChange(e)} name='title' type='text' id='title'></input><br />
                <label className='sell-label' for='description'>Description</label><br />
                <textarea className='sell-input description-box' placeholder='Tell us about the item you are selling! Start with the headline, then add details including material, condition, size and style. Keep it accurate - do not use repetitive or irrelevant keywords.' value={description} onChange={(e) => handleDescriptionChange(e)} name='description' type='text' id='description'></textarea><br />
                <label className='sell-label' for='category'>Category</label><br />
                <select className='dropdown-selections' value={subcategory} onChange={(e) => handleSubcategoryChange(e)} name='subcategory' id='subcategory'>
                    <option value="" selected disabled hidden>Select...</option>
                    <option value='cooking'>Cooking</option>
                    <option value='water'>Water</option>
                    <option value='firstaid'>First Aid</option>
                    <option value='compass'>Compass</option>
                    <option value='lights'>Lights</option>
                    <option value='other'>Other</option>
                </select><br />
                <label className='sell-label' for='brand'>Brand</label><br />
                <input className='sell-input regular-input' value={brand} onChange={(e) => handleBrandChange(e)} name='brand' type='text' id='brand'></input><br />
                <label className='sell-label' for='condition'>Condition</label><br />
                <select className='dropdown-selections' value={condition} onChange={(e) => handleConditionChange(e)} name='condition' id='condition'>
                    <option value="" selected disabled hidden>Select</option>
                    <option value='likenew'>Like New</option>
                    <option value='moderatelyused'>Moderately Used</option>
                    <option value='used'>Used</option>
                </select><br />
                <hr class='line' />
                <h3 class='enhance-tag'>Enhance Your Listing</h3>
                <p class='para'>Help buyers find your item by tagging it with extra details.</p>
                <label className='sell-label' for='content'>Content</label><br />
                <input className='sell-input regular-input' value={content} onChange={(e) => handleContentChange(e)} name='content' type='text' id='content'></input><br />
                <br />
                <label className='sell-label' for='price'>Price</label><br />
                <input className='sell-input regular-input' value={price} onChange={(e) => handlePriceChange(e)} name='price' type='number' id='price'></input><br />
                <input className='login-submit' type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default GearForm
