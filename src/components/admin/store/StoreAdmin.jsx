// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
// import axios from 'axios'
import Modal from './items/Modal';
import ItemForm from './items/itemForm/ItemForm.jsx';
import Items from './items/Items';
import { fetchItems, selectAllItems } from '../../../features/items/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const StoreAdmin = () => {
    const dispatch = useDispatch();
    
    const items = useSelector(selectAllItems)
    const itemsStatus = useSelector(StoreState => StoreState.itemsState.status)
    // if(!loggedIn) window.location = "/login"

    const [toggleModal, SetToggleModal] = useState(false);
    
    useEffect(() => {
        if (itemsStatus === 'idle') dispatch(fetchItems())
    }, [itemsStatus, dispatch])
    
    
    //Modal
    const fireModal = () => SetToggleModal(prev => !prev);

    return (
        <>
            <Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} />
            <h1 style={{margin:10}}>Administrar tienda</h1>
            <ItemForm onFireModal={fireModal} />
            <Items status={itemsStatus} items={items} />
        </>
    )
}

export default StoreAdmin;