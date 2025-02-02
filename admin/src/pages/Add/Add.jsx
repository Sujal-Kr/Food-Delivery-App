import React, { useState } from 'react';
import { assets } from '../../assets/admin_assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { server } from '../../constants/config';

const Add = () => {
    const url = server
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad",
        price: "",
    });
    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData({ ...data, [key]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('price', data.price);
            if (image) {
                formData.append('image', image);
            }

            const res = await axios.post(`${url}/api/food/add`, formData);
            console.log(res.data);
            if (res.data.success) {
                setData({
                    name: "",
                    description: "",
                    category: "Salad",
                    price: "",
                });
                setImage(null);
                toast.success("Food added successfully");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error(`Error: ${err.response ? err.response.data.message : err.message}`);
        }
    };

    return (
        <div className='text-sm p-20 w-full max-w-lg'>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-3'>
                    <p className='text-slate-400'>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload area" />
                    </label>
                    <input className='' onChange={(e) => setImage(e.target.files[0])} type='file' id="image" hidden required />
                </div>
                <div className="product-name flex flex-col gap-3">
                    <p>Product Name</p>
                    <input onChange={handleChange} value={data.name} className='w-full p-2 border rounded shadow outline-none' type="text" name='name' placeholder='Type here' />
                </div>
                <div className='flex flex-col gap-3'>
                    <p>Description</p>
                    <textarea onChange={handleChange} value={data.description} className='w-full p-2 border rounded shadow outline-none' spellCheck="false" name="description" rows="6" placeholder='Write your content here....'></textarea>
                </div>
                <div className='flex flex-col gap-3'>
                    <p>Product Category</p>
                    <select onChange={handleChange} value={data.category} name="category" className='w-full p-2 border rounded shadow outline-none'>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className='flex flex-col gap-3'>
                    <p>Price</p>
                    <input onChange={handleChange} value={data.price} className='w-full p-2 border rounded shadow outline-none' type="number" name="price" placeholder='$10' />
                </div>
                <button type="submit" className='cursor-pointer px-8 py-2 text-xs rounded shadow text-white bg-black'>Add Product</button>
            </form>
        </div>
    );
};

export default Add;
