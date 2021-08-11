import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Item from './Item';
const Store = () => {
    const getItems = async () =>{
        const {data} = await axios.get('http://localhost:5000/exercises')
        console.log(data)
        setStoreItems(data)
        // fetch('http://localhost:5000/exercises').then((res) =>res.json()).then((data) => {
            //     console.log(data)
            // })
        }
        
    const [storeItems, setStoreItems] = useState([]);
    useEffect(() => {
        getItems()
    },[]);
    // useEffect(() => {
    //     setStoreItems(storeItems)
    // });
    return (
        <>
            <h1>Store</h1>
            {storeItems.map(item => <Item key={item._id} item={item} />)}
            <Link to="/">Home</Link>
        </>
    )
}

export default Store;