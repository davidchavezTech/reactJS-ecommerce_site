// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
// import axios from 'axios'
import Modal from './Modal';
import AddItemForm from './store/AddItemForm';
import Items from './store/Items';
import { fetchItems, selectAllItems } from '../../features/items/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const AdminStore = () => {
    const dispatch = useDispatch();
    
    const items = useSelector(selectAllItems)
    const itemsStatus = useSelector(StoreState => StoreState.newItemState.status)
    // if(!loggedIn) window.location = "/login"

    const [toggleModal, SetToggleModal] = useState(false);
    
    useEffect(() => {
        if (itemsStatus === 'idle') {
            dispatch(fetchItems())
        }
    }, [itemsStatus, dispatch])
    
    
    //Modal
    const fireModal = () => SetToggleModal(prev => !prev);

    return (
        <>
            <Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} />
            <h1 style={{margin:10}}>Administrar tienda</h1>
            <AddItemForm onFireModal={fireModal} />
            {(items.length > 0) ? <Items status={itemsStatus} items={items} /> : <h2 style={{marginLeft:10, marginTop:20}}>No hay artículos para mostrar</h2>}
        </>
    )
}

export default AdminStore;