import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { selectNewItem, selectOptions, optionSet, optionRemoveOne } from '../../../../../features/items/newItemSlice';
import { postItem } from '../../../../../features/items/itemsSlice';
import { editItem } from '../../../../../features/items/itemSlice';
import { maxImagesNumber } from '../../../../../globalVariables';

const ItemFormLogic = (selectedItem) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [itemName, SetItemName] = useState('');
    const [itemDescription, SetItemDescription] = useState('');
    const [mUnit, SetMUnit] = useState('');
    const [mType, SetMType] = useState({});
    const [imageFiles, SetImageFiles] = useState([]);
    const [errorMsg, SetErrorMsg] = useState('');
    const [oldListOfImagesURLs, SetOldListOfImagesURLs] = useState(null);
    const options = useSelector(selectOptions)
    // const [editItemOptions, SetEditItemOptions] = useState([]);
    const setMUnitFunc = (value) => {
        SetMUnit(value)
        SetMType({})
    }
    useEffect(() => {//Load form with data for editing
        if(selectedItem && selectedItem.length !== 0){
            if(oldListOfImagesURLs===null) SetOldListOfImagesURLs([...selectedItem.imagesFileNames])
            SetItemName(selectedItem.itemName)
            SetItemDescription(selectedItem.description)
            SetMUnit(selectedItem.mUnit)
            SetMType(selectedItem.priceAndUnits)
            dispatch(optionSet(selectedItem.options))
        }
    }, [selectedItem]) // eslint-disable-line react-hooks/exhaustive-deps

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
        if(!selectedItem) {
            dispatch(postItem({itemName, priceAndUnits: mType, description: itemDescription, mUnit, options, imageFiles}))
            clearForm()
        }
        else {
            dispatch(editItem( { _id: selectedItem._id, itemName, priceAndUnits: mType, description: itemDescription, mUnit, options, imageFiles, oldListOfImagesURLs}))
            history.push("/admin/store")
        }
    }

    const handleOptionDelete = index => dispatch(optionRemoveOne(index));
    let _setChecks
    let _setImages
    const saveSetChecksFunction = setChecksFunc => _setChecks = setChecksFunc;
    const saveSetImages = setImagesFunc => _setImages = setImagesFunc;

    const clearForm = () => {
        SetItemName("")
        SetItemDescription("")
        SetMUnit("")
        SetMType("")
        SetErrorMsg("")
        SetOldListOfImagesURLs("")
        SetMUnit("")
        SetMType("")
        SetImageFiles([])
        dispatch(optionSet([]))
        _setChecks([])
        _setImages([])
    }
    const newItem = useSelector(selectNewItem)

    return { handleSetMType, createNewItem, SetItemName, SetImageFiles, SetItemDescription, setMUnitFunc, saveSetChecksFunction, saveSetImages, handleOptionDelete, itemName, itemDescription, mUnit, newItem, errorMsg, selectedItem }
}

export default ItemFormLogic