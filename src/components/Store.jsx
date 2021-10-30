import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Item from './Item';
// import AddItemForm from './AddItemForm';
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems, selectAllItems } from '../features/items/itemsSlice';

const Store = ({isUserLoggedIn}) => {
    const dispatch = useDispatch()
    const getItems = async () =>{
        const {data} = await axios.get(`http://localhost:5000/items/`)
        setStoreItems(data)
    }
    const items = useSelector(selectAllItems)
    const itemStatus = useSelector(state => state.itemsState.status)
    // const error = useSelector(state => state.itemsState.error)
    const [storeItems, setStoreItems] = useState([]);
    useEffect(() => {
        getItems()
    },[]);
    
    useEffect(() => {
        if (itemStatus === 'idle') {
            dispatch(fetchItems())
        }
    }, [itemStatus, dispatch])

    
    if (itemStatus === 'loading') {
        console.log("loading Items")
    } else if (itemStatus === 'succeeded') {
        // Sort posts in reverse chronological order by datetime string
        console.log("Got items")
        console.log(items)
    } else if (itemStatus === 'failed') {
        console.log("failed getting Items")
    }

    // const handleAddItem = async (e, data) => {
    //     e.preventDefault();
    //     // const { itemName, imgURL, description, price } = data
    //     // const response = await axios.post("http://localhost:5000/items/add", {
    //     //     itemName, imgURL, description, price
    //     // })
    //     getItems()
    // }

    return (
        <>
            <h1>Store</h1>
            {/* <AddItemForm onAddItem={handleAddItem} /> */}
            {storeItems.map(item => <Item key={item._id} item={item} isUserLoggedIn={isUserLoggedIn} />)}
        </>
    )
}

export default Store;