import OptionCard from './OptionCard';
import MeasurementUnitComponent from './MeasurementUnitComponent';
import PerUnit from './unitsComponents/PerUnit';
import PerWeight from './unitsComponents/PerWeight';
import PerVolume from './unitsComponents/PerVolume'
import {useState} from 'react'

const AddItemForm = ({onMType, onFireModal, options, onDelete, setMUnit, mUnit}) => {
    
    
    
    return (
        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Agregar artículo</h5>

                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Nombre</h6>
                <input className="form-control" type="text" placeholder="Nombre" />

                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Descripción</h6>
                <textarea className="form-control" placeholder="Nombre" rows="4" cols="40" />
                
                <MeasurementUnitComponent setMUnit={setMUnit} mUnit={mUnit} />
                {(mUnit==="unit") && <PerUnit onMType={onMType}/>}
                {(mUnit==="weight") && <PerWeight onMType={onMType}/>}
                {(mUnit==="volume") && <PerVolume onMType={onMType}/>}

                <h6 className="card-subtitle mb-2" style={{marginTop:25}}>Opciones:</h6>
                {options.map((option, currentIndex) => <OptionCard key={currentIndex} index={currentIndex} onDelete={onDelete} fieldType={option.fieldType} options={option.newOptions} fieldName={option.fieldName} />)}

                <button onClick={onFireModal} type="button" className="btn btn-dark" style={{marginTop:10}}>Agregar opción</button>
            </div>
        </div>
    )   
}
export default AddItemForm;