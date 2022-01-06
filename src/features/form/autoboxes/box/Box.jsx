import { useState } from "react";

const Box = ({id, value, onSetInputValues, inputFieldName}) => {

    const [inputFieldValue, SetInputFieldValue] = useState(value);
    return <>
        
        <input onChange={e => {
            onSetInputValues(id, e.target.value)
            SetInputFieldValue(e.target.value)
            }} className="form-control" type="text" placeholder={inputFieldName} value={inputFieldValue} />
    </>}
export default Box;