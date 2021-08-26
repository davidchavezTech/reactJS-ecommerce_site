// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
// import axios from 'axios'
import Modal from './Modal';
import AddItemForm from './store/AddItemForm';


const AdminStore = () => {
    
    // if(!loggedIn) window.location = "/login"

    // const [fields, setFields] = useState(null)
    const [toggleModal, SetToggleModal] = useState(false);
    

    //New item's properties
    // const [itemName, SetItemName] = useState('');
    // const [itemDescription, SetItemDescription] = useState('');
    // const [mUnitPrice, SetMUnitPrice] = useState({});
    // const [ItemOptions, SetItemOptions] = useState([]);

    
    
    
    
    //Modal
    const fireModal = () => SetToggleModal(prev => !prev);

    return (
        <>
            <Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} />
            <h1 style={{margin:10}}>Administrar tienda</h1>
            <AddItemForm onFireModal={fireModal} />
        </>
    )
}

export default AdminStore;