import React, {useState } from 'react'
import './ClothesForm.css';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

function BackpacksForm() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState({
        public_id: "test/prcvnkp0nupz6xn1bw9p",
        url: "https://res.cloudinary.com/oakbear/image/upload/v1632153426/test/lzq2pyldms3fegeitits.png"
    })
    const [subcategory, setSubcategory] = useState('')
    const [condition, setCondition] = useState('')
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [brand, setBrand] = useState('')
    const [error, setError] = useState('')
    const user = useSelector(state => state.user.user)
    const history = useHistory();

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


        const item_id = Math.floor(Math.random() * 100000)

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
                    title,
                    price,
                    description,
                    content,
                    images,
                    category: "backpack",
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
                        if(!user.account.charges_enabled) {
                            window.location = `/stripe/refresh?id=${data.item.id}`
                        }
                        else if (!user.account) {
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
                        } else { history.push(`/detailspage/${item_id}`) }
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
        <hr className='line'/>
                     <div>
                    <input className='file-upload' type="file" multiple name="file" id="file_up" onChange={(e) => handleUpload(e)} /><br />
                    <img className='img-up' src={images.url}/>
                </div><br />
            <label className='sell-label' for='title'>Title</label><br />
            <input className='sell-input regular-input' value={title} onChange={(e) => handleTitleChange(e)} name='title' type='text' id='title'></input><br />
            <label className='sell-label' for='description'>Description</label><br />
            <textarea className='sell-input description-box' placeholder='Tell us about the item you are selling! Start with the headline, then add details including material, condition, size and style. Keep it accurate - do not use repetitive or irrelevant keywords.' value={description} onChange={(e) => handleDescriptionChange(e)} name='description' type='text' id='description'></textarea><br />
            <label className='sell-label' for='category'>Category</label><br />
            <select className='dropdown-selections' value={subcategory} onChange={(e) => handleSubcategoryChange(e)} name='category' id='category'>
                <option value="" selected disabled>Select...</option>
                <option value='frameless'>Frameless</option>
                <option value='internal frame'>Internal Frame</option>
                <option value='external frame'>External Frame</option>
                <option value='hydration pack'>Hydration Backpack</option>
                <option value='other'>Other</option>
            </select><br />
            <label className='sell-label' for='brand'>Brand</label><br />
            <input className='sell-input regular-input' value={brand} onChange={(e) => handleBrandChange(e)} name='brand' type='text' id='brand'></input><br />
            <label className='sell-label' for='condition'>Condition</label><br />
            <select  className='dropdown-selections' value={condition} onChange={(e) => handleConditionChange(e)} name='condition' id='condition'>
                <option value="" selected disabled hidden>Select</option>
                <option value='like new'>Like New</option>
                <option value='moderately used'>Moderately Used</option>
                <option value='used'>Used</option>
            </select><br /> 
            <hr className='line'/>
            <h3 className='enhance-tag'>Enhance Your Listing</h3>
            <p className='para'>Help buyers find your item by tagging it with extra details.</p>
            <label className='sell-label' for='content'>Content</label><br />
            <input  className='sell-input regular-input' value={content} onChange={(e) => handleContentChange(e)} name='content' type='text' id='content'></input><br />
            <label className='sell-label' for='color'>Color</label><br />
            <select className='dropdown-selections' value={color} onChange={(e) => handleColorChange(e)} name='color' id='color'>
                <option value="" selected disabled hidden>Select</option>
                <option value='white'>White</option>
                <option value='black'>Black</option>
                <option value='grey'>Grey</option>
                <option value='offwhite'>Offwhite</option>
                <option value='tan'>Tan</option>
                <option value='brown'>Brown</option>
                <option value='red'>Red</option>
                <option value='blue'>Blue</option>
                <option value='yellow'>Yellow</option>
                <option value='green'>Green</option>
                <option value='purple'>Purple</option>
                <option value='orange'>Orange</option>
                <option value='pink'>Pink</option>
                <option value='camo'>Camo</option>
            </select><br />
            <label className='sell-label' for='size'>Size</label><br />
            <select className='dropdown-selections' value={size} onChange={(e) => handleSizeChange(e)} name='size' id='size'>
                <option value="" selected disabled hidden>Select</option>
                <option value='10 L'>0-10 L</option>
                <option value='30 L'>10-30 L</option>
                <option value='50 L'>30-50 L</option>
                <option value='50+ L'>50+ L</option>
            </select><br />
            <label className='sell-label' for='price'>Price</label><br />
            <input className='sell-input regular-input' value={price} onChange={(e) => handlePriceChange(e)} name='price' type='number' id='price'></input><br />
            <input className='login-submit' type="submit" value="Submit"></input>
        </form>
        </div>
    )
}

export default BackpacksForm
