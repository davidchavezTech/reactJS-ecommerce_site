import { useState, useEffect } from "react";

const TextInputField = ({id, inputFieldName, onSetInputValues, value}) => {
    const [inputFieldValue, SetInputFieldValue] = useState('');
    
    useEffect(()=>{
        if(value) {
            SetInputFieldValue(value)
            onSetInputValues(id, value)
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <h6 className="card-subtitle mb-2" style={{marginTop:15}}>{inputFieldName}</h6>
            <input onChange={e => {
                onSetInputValues(id, e.target.value)
                SetInputFieldValue(e.target.value)
                }} className="form-control" type="text" placeholder="Nombre" value={inputFieldValue} />
        </> 
    )
}
export default TextInputField;