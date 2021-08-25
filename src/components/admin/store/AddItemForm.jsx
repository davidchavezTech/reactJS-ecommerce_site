import OptionCard from './OptionCard';
import MeasurementUnitComponent from './MeasurementUnitComponent';
import PerUnit from './unitsComponents/PerUnit';
import PerWeight from './unitsComponents/PerWeight';
import PerVolume from './unitsComponents/PerVolume'
import { useState, useEffect } from 'react'
import { selectNewItem } from '../../../features/items/newItemSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddItemForm = ({onMType, onFireModal, onDelete}) => {
    
    const [mUnit, SetMUnit] = useState('');
    const [mType, SetMType] = useState({});

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
        console.log(copy)
    }
    const newItem = useSelector(selectNewItem)
    useEffect(()=> {
        console.log(newItem)
    }, [newItem])
    
    return (
        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Agregar artículo</h5>

                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Nombre</h6>
                <input className="form-control" type="text" placeholder="Nombre" />

                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Descripción</h6>
                <textarea className="form-control" placeholder="Nombre" rows="4" cols="40" />
                
                <MeasurementUnitComponent setMUnit={setMUnitFunc} mUnit={mUnit} />
                {(mUnit==="unit") && <PerUnit onMType={handleSetMType}/>}
                {(mUnit==="weight") && <PerWeight onMType={handleSetMType}/>}
                {(mUnit==="volume") && <PerVolume onMType={handleSetMType}/>}

                <h6 className="card-subtitle mb-2" style={{marginTop:25}}>Opciones:</h6>
                {newItem.options.map((option, currentIndex) => <OptionCard key={currentIndex} index={currentIndex} onDelete={onDelete} fieldType={option.fieldType} options={option.newOptions} fieldName={option.fieldName} />)}

                <button onClick={onFireModal} type="button" className="btn btn-dark" style={{marginTop:10}}>Agregar opción</button>
            </div>
        </div>
    )   
}
export default AddItemForm;