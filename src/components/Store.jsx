import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Item from './Item';
import AddItemForm from './AddItemForm';

const Store = () => {
    const getItems = async () =>{
        const {data} = await axios.get('http://localhost:5000/items/')
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

    const handleAddItem = async (data) => {
        const { itemName, imgURL, description, price } = data
        const response = await axios.post("http://localhost:5000/items/add", {
            itemName, imgURL, description, price
        })
        console.log(response.data)
        getItems()
    }
    // useEffect(() => {
    //     setStoreItems(storeItems)
    // });
    return (
        <>
            <h1>Store</h1>
            <AddItemForm onAddItem={handleAddItem} />
            {storeItems.map(item => <Item key={item._id} item={item} />)}
        </>
    )
}

export default Store;