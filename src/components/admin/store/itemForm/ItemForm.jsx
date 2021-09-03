import OptionCard from './OptionCard';
import MeasurementUnitComponent from './MeasurementUnitComponent';
import PerUnit from '../unitsComponents/PerUnit';
import PerWeight from '../unitsComponents/PerWeight';
import PerVolume from '../unitsComponents/PerVolume'
import ImagesUpload from './ImagesUpload';

import { useState, useEffect } from 'react'
import { selectNewItem, itemAdded, selectOptions, optionSet } from '../../../../features/items/newItemSlice';
import { postItem, selectAllItems } from '../../../../features/items/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { editItem } from '../../../../features/items/itemSlice';
import { maxImagesNumber } from '../../../../globalVariables';

const ItemForm = ({onFireModal, selectedItem}) => {
    const dispatch = useDispatch();

    const [itemName, SetItemName] = useState('');
    const [itemDescription, SetItemDescription] = useState('');
    const [mUnit, SetMUnit] = useState('');
    const [mType, SetMType] = useState({});
    const [errorMsg, SetErrorMsg] = useState('');
    const [oldListOfImagesURLs, SetOldListOfImagesURLs] = useState(null);
    const options = useSelector(selectOptions)
    // const [editItemOptions, SetEditItemOptions] = useState([]);
    const setMUnitFunc = (value) => {
        SetMUnit(value)
        SetMType({})
    }
    useEffect(() => {
        if(selectedItem && selectedItem.length !== 0){
            if(oldListOfImagesURLs===null) SetOldListOfImagesURLs([...selectedItem.imagesFileNames])
            SetItemName(selectedItem.itemName)
            SetItemDescription(selectedItem.description)
            SetMUnit(selectedItem.mUnit)
            SetMType(selectedItem.priceAndUnits)
            dispatch(optionSet(selectedItem.options))
        }
    }, [selectedItem])
    const handleSetMType = (check1, measurementType1, price1, check2, measurementType2, price2, check3, measurementType3, price3) => {
        
        let copy = JSON.parse(JSON.stringify(mType))

        function editCopy(checked, measurementType, price){ (checked) ? copy[measurementType] = price : delete copy[measurementType];}
        editCopy(check1, measurementType1, price1)
        editCopy(check2, measurementType2, price2)
        editCopy(check3, measurementType3, price3)

        SetMType(copy)
    }
    const [imageFiles, SetImageFiles] = useState([]);

    const createNewItem = () => {
        //Check if any mandatory field is empty, if it is, return error msg
        if(itemName==='') return SetErrorMsg("Llenar el nombre del nuevo artículo")
        if(!selectedItem && imageFiles.length===0) return SetErrorMsg("Escoger al menos una imagen")
        if(imageFiles.length > maxImagesNumber) return SetErrorMsg(`Solo se permiten ${maxImagesNumber} imágenes`)
        if(itemDescription==='') return SetErrorMsg("Llenar la descripción del nuevo artículo")
        if(mUnit==='') return SetErrorMsg("Seleccionar unidad de medida del nuevo artículo")
        if(Object.keys(mType).length===0) return SetErrorMsg("Seleccionar al menos una unidad de medida y precio")
        //Check if they checked a measurement unit type without setting a price, if so, return error msg
        for(const key in mType){
            if(mType[key]==='') return SetErrorMsg("Asegúrese de poner precio a las unidades de medida seleccionadas")
        }
        //This if/else determines if we are editing or posting a new item
        if(!selectedItem) dispatch(postItem({itemName, priceAndUnits: mType, description: itemDescription, mUnit, options, imageFiles}))
        else dispatch(editItem( { _id: selectedItem._id, itemName, priceAndUnits: mType, description: itemDescription, mUnit, options, imageFiles, oldListOfImagesURLs}))
    }

    const newItem = useSelector(selectNewItem)
    return (
        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Agregar artículo</h5>

                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Nombre</h6>
                <input onChange={e => SetItemName(e.target.value)} className="form-control" type="text" placeholder="Nombre" value={itemName} />

                <ImagesUpload passImages={images => SetImageFiles(images)} imagesURLs={selectedItem ? selectedItem.imagesFileNames : null} />
                
                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Descripción</h6>
                <textarea onChange={e => SetItemDescription(e.target.value)} className="form-control" placeholder="Nombre" rows="4" cols="40" value={itemDescription} />
                
                <MeasurementUnitComponent setMUnit={setMUnitFunc} mUnit={mUnit} />

                {(mUnit==="unit") && <PerUnit onMType={handleSetMType} priceAndUnits={selectedItem ? selectedItem.priceAndUnits : undefined} />}
                {(mUnit==="weight") && <PerWeight onMType={handleSetMType} priceAndUnits={selectedItem ? selectedItem.priceAndUnits : undefined} />}
                {(mUnit==="volume") && <PerVolume onMType={handleSetMType} priceAndUnits={selectedItem ? selectedItem.priceAndUnits : undefined} />}

                <h6 className="card-subtitle mb-2" style={{marginTop:25}}>Opciones:</h6>
                {newItem.options.map((option, currentIndex) => <OptionCard key={currentIndex} index={currentIndex} fieldType={option.fieldType} options={option.newOptions} fieldName={option.fieldName} />)}
                {/* If we are editing an object, use this instead  */}
                {/* {editItemOptions.map((option, currentIndex) => <OptionCard key={currentIndex} index={currentIndex} fieldType={option.fieldType} options={option.newOptions} fieldName={option.fieldName} />)} */}

                <p style={{color:"red"}}>{errorMsg}</p>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <button onClick={onFireModal} type="button" className="btn btn-dark" style={{marginTop:10}}>Agregar opción</button>
                    <button onClick={createNewItem} type="button" className="btn btn-success" style={{marginTop:10}}>
                        {selectedItem ? <>Guardar Cambios</> : <>Generar Artículo</>}
                    </button>
                </div>
            </div>
        </div>
    )   
}
export default ItemForm;