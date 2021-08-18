import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Item from './Item';
import AddItemForm from './AddItemForm';

const Store = ({isUserLoggedIn}) => {
    console.log(isUserLoggedIn)
    const getItems = async () =>{
        const {data} = await axios.get('http://localhost:5000/items/')
        setStoreItems(data)
        // fetch('http://localhost:5000/exercises').then((res) =>res.json()).then((data) => {
            //     console.log(data)
            // })
        }
        
    const [storeItems, setStoreItems] = useState([]);
    useEffect(() => {
        getItems()
    },[]);

    const handleAddItem = async (e, data) => {
        e.preventDefault();
        const { itemName, imgURL, description, price } = data
        const response = await axios.post("http://localhost:5000/items/add", {
            itemName, imgURL, description, price
        })
        getItems()
    }

    return (
        <>
            <h1>Store</h1>
            <AddItemForm onAddItem={handleAddItem} />
            {storeItems.map(item => <Item key={item._id} item={item} isUserLoggedIn={isUserLoggedIn} />)}
        </>
    )
}

export default Store;