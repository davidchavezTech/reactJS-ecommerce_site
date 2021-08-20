import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import Modal from './Modal';
// import Item from './Item';
// import AddItemForm from './AddItemForm';
const Button = styled.button`
	display:block;
    min-width: 100px;
    padding: 16px 32px;
    border-radius: 4px;
    border: none;
    background:#141414;
    color:#fff;
    font-size:24px;
    cursor: pointer;
	margin-right:auto;
	margin-left:auto;
	margin-top:28px;
`

const AdminStore = ({loggedIn}) => {
    if(!loggedIn) window.location = "/login"

    const [fields, setFields] = useState(null)
    const handleNewField = (field) => {
        console.log(field)
    }
    // const getItems = async () =>{
    //     const {data} = await axios.get('http://localhost:5000/items/')
    //     setStoreItems(data)
    //     // fetch('http://localhost:5000/exercises').then((res) =>res.json()).then((data) => {
    //         //     console.log(data)
    //         // })
    //     }
        
    // const [storeItems, setStoreItems] = useState([]);
    // useEffect(() => {
    //     getItems()
    // },[]);

    // const handleAddItem = async (e, data) => {
    //     e.preventDefault();
    //     const { itemName, imgURL, description, price } = data
    //     const response = await axios.post("http://localhost:5000/items/add", {
    //         itemName, imgURL, description, price
    //     })
    //     getItems()
    // }
    const [toggleModal, SetToggleModal] = useState(false);
    const fireModal = () => SetToggleModal(prev => !prev);
    return (
        <>
            <Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} onNewField={handleNewField} />
            <h1 style={{margin:10}}>Administrar tienda</h1>

            <div className="card" style={{width: "30rem", margin:10}}>
                <div className="card-body">
                    <h5 className="card-title">Agregar artículo</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Nombre</h6>
                    <input className="form-control" type="text" placeholder="Nombre" />
                    <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:5}}>Precio</h6>
                    <input className="form-control" type="text" placeholder="0.00" />
                    <div className="card" style={{width: "22rem", marginTop:15, padding:10}}>
                        <button type="button" className="btn-close" aria-label="Close" style={{position:"absolute", right:10}} />
                        <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:5}}>Opcion:</h6>
                        <h6 className="card-subtitle mb-2" style={{marginTop:5}}>Tipo de campo: <span className="badge bg-success">Lista despegable</span></h6>
                        <h6 className="card-subtitle mb-2" style={{marginTop:5}}>Nombre de campo: <span className="badge bg-danger">Color</span></h6>
                        <ul className="list-group">
                            <li className="list-group-item">Blanco</li>
                            <li className="list-group-item">Rojo</li>
                            <li className="list-group-item">Negro</li>
                        </ul>
                    </div>
                    <button type="button" className="btn btn-dark" style={{marginTop:10}}>Agregar opción</button>
                </div>
            </div>
            <Button onClick={fireModal}>I'm a model</Button>
            {/* <AddItemForm onAddItem={handleAddItem} />
            {storeItems.map(item => <Item key={item._id} item={item} isUserLoggedIn={isUserLoggedIn} />)} */}
        </>
    )
}

export default AdminStore;