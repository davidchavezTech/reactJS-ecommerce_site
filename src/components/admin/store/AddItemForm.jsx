import OptionCard from './OptionCard';
import MeasurementUnitComponent from './MeasurementUnitComponent';
import PerUnit from './unitsComponents/PerUnit';
import PerWeight from './unitsComponents/PerWeight';
import PerVolume from './unitsComponents/PerVolume'
import ImagesUpload from './ImagesUpload';

import { useState, useEffect } from 'react'
import { selectNewItem, itemAdded, selectOptions } from '../../../features/items/newItemSlice';
import { postItem, selectAllItems } from '../../../features/items/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddItemForm = ({onFireModal}) => {
    const dispatch = useDispatch();

    const [itemName, SetItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [mUnit, SetMUnit] = useState('');
    const [mType, SetMType] = useState({});
    const [errorMsg, SetErrorMsg] = useState('');
    const options = useSelector(selectOptions)
    const setMUnitFunc = (value) => {
        SetMUnit(value)
        SetMType({})
    }
    const handleSetMType = (check1, measurementType1, price1, check2, measurementType2, price2, check3, measurementType3, price3) => {
        
        let copy = JSON.parse(JSON.stringify(mType))

        function editCopy(checked, measurementType, price){ (checked) ? copy[measurementType] = price : delete copy[measurementType];}
        editCopy(check1, measurementType1, price1)
        editCopy(check2, measurementType2, price2)
        editCopy(check3, measurementType3, price3)

        SetMType(copy)
    }
    
    const createNewItem = () => {
        //Check if any mandatory field is empty, if it is, return error msg
        if(itemName==='') return SetErrorMsg("Llenar el nombre del nuevo artículo")
        if(itemDescription==='') return SetErrorMsg("Llenar la descripción del nuevo artículo")
        if(mUnit==='') return SetErrorMsg("Seleccionar unidad de medida del nuevo artículo")
        if(Object.keys(mType).length===0) return SetErrorMsg("Seleccionar al menos una unidad de medida y precio")
        //Check if they checked a measurement unit type without setting a price, if so, return error msg
        for(const key in mType){
            if(mType[key]==='') return SetErrorMsg("Asegúrese de poner precio a las unidades de medida seleccionadas")
        }
        // dispatch(itemAdded({itemName, itemDescription, mType}))
        dispatch(postItem({itemName, priceAndUnits: mType, description: itemDescription, options}))
    }

    const newItem = useSelector(selectNewItem)

    return (
        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Agregar artículo</h5>

                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Nombre</h6>
                <input onChange={e => SetItemName(e.target.value)} className="form-control" type="text" placeholder="Nombre" />

                <ImagesUpload />
                
                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Descripción</h6>
                <textarea onChange={e => setItemDescription(e.target.value)} className="form-control" placeholder="Nombre" rows="4" cols="40" />
                
                <MeasurementUnitComponent setMUnit={setMUnitFunc} mUnit={mUnit} />

                {(mUnit==="unit") && <PerUnit onMType={handleSetMType}/>}
                {(mUnit==="weight") && <PerWeight onMType={handleSetMType}/>}
                {(mUnit==="volume") && <PerVolume onMType={handleSetMType}/>}

                <h6 className="card-subtitle mb-2" style={{marginTop:25}}>Opciones:</h6>
                {newItem.options.map((option, currentIndex) => <OptionCard key={currentIndex} index={currentIndex} fieldType={option.fieldType} options={option.newOptions} fieldName={option.fieldName} />)}

                <p style={{color:"red"}}>{errorMsg}</p>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <button onClick={onFireModal} type="button" className="btn btn-dark" style={{marginTop:10}}>Agregar opción</button>
                    <button onClick={createNewItem} type="button" className="btn btn-success" style={{marginTop:10}}>Generar Artículo</button>
                </div>
            </div>
        </div>
    )   
}
export default AddItemForm;