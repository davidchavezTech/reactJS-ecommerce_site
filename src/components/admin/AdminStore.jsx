// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
// import axios from 'axios'
import Modal from './Modal';
import AddItemForm from './store/AddItemForm';
// import Item from './Item';
// import AddItemForm from './AddItemForm';


const AdminStore = ({loggedIn}) => {
    // if(!loggedIn) window.location = "/login"

    // const [fields, setFields] = useState(null)
    const [toggleModal, SetToggleModal] = useState(false);
    const [mUnit, SetMUnit] = useState('');
    const [mType, SetMType] = useState({});
    const [options, SetOptions] = useState([]);
    const setMUnitFunc = (value) => {
        SetMUnit(value)
        SetMType({})
    }
    const handleSetMType = (check1, measurementType1, price1, check2, measurementType2, price2, check3, measurementType3, price3) => {
        let copy = JSON.parse(JSON.stringify(mType))

        function editCopy(checked, measurementType, price){
            if(checked) {
                copy[measurementType] = price
            }else {
                delete copy[measurementType]
            }
        }
        editCopy(check1, measurementType1, price1)
        editCopy(check2, measurementType2, price2)
        editCopy(check3, measurementType3, price3)

        SetMType(copy)
    }
    //Options
    const handleNewOption = (field) => SetOptions([...options, field]);
    const handleDeleteOption = (indexToBeDeleted) => {
        SetOptions(options.filter((option, currentIndex) => currentIndex !== indexToBeDeleted))
    } 
    
    //Modal
    const fireModal = () => SetToggleModal(prev => !prev);

    return (
        <>
            <Modal toggleModal={toggleModal} setToggleModal={SetToggleModal} onNewField={handleNewOption} />
            <h1 style={{margin:10}}>Administrar tienda</h1>
            <AddItemForm onMType={handleSetMType} onFireModal={fireModal} options={options} onDelete={handleDeleteOption} setMUnit={setMUnitFunc} mUnit={mUnit} />
            
        </>
    )
}

export default AdminStore;