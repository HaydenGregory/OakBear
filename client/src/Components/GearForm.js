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
    const [subcategory, setSubcategory] = useState('')
    const [condition, setCondition] = useState('')
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
                    category: "gear",
                    subcategory,
                    condition,
                    size: "none",
                    color: "none",
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
                        fetch("/stripe/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ item: data.item })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.url) {
                                    window.location = data.url;
                                } else {
                                    console.log(data);
                                }
                            });
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
            <select className='dropdown-selections' value={subcategory} onChange={(e) => handleSubcategoryChange(e)} name='subcategory' id='subcategory'>
                <option value="" selected disabled hidden>Select...</option>
                <option value='compass'>Compass</option>
                <option value='climbing'>Climbing</option>
                <option value='firstaid'>First Aid</option>
                <option value='flashlight'>Flash Light</option>
                <option value='kitchen'>Kitchen</option>
                <option value='water'>Water</option>
                <option value='other'>Other</option>
            </select>
            <label className='sell-label' for='condition'>Condition</label><br />
            <select className='dropdown-selections' value={condition} onChange={(e) => handleConditionChange(e)} name='condition' id='condition'>
                <option value="" selected disabled hidden>Select</option>
                <option value='likenew'>Like New</option>
                <option value='moderatelyused'>Moderately Used</option>
                <option value='used'>Used</option>
            </select>
            <label className='sell-label' for='brand'>Brand</label><br />
            <input className='sell-input' value={brand} onChange={(e) => handleBrandChange(e)} name='brand' type='text' id='brand'></input><br />
            <input type="file" name="file" id="file_up" onChange={(e) => handleUpload(e)} />
            <input className='login-submit' type="submit" value="Submit"></input>
        </form>
        </div>
    )
}

export default GearForm
