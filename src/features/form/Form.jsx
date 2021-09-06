import TextInputField from "./TextInputField";
import SingleImageField from "./SingleImageField";

import { useState, useEffect } from "react"
const Form = ({ fields, onFormSubmit, passedErrorMsg }) => {
    const [inputFieldValues, SetInputFieldValues] = useState({})
    const [errorMsg, SetErrorMsg] = useState(null)

    const handleSetInputValues = (id, value) => {
        const inputFieldValuesCopy = JSON.parse(JSON.stringify(inputFieldValues))
        inputFieldValuesCopy[id] = value
        SetInputFieldValues(inputFieldValuesCopy)
    }

    const handleMandatoryFields = () => {
        for(const field of fields) {
            if(field.mandatory && field.type !== "submit"){
                if(!(inputFieldValues[field.id]) || inputFieldValues[field.id].length === 0)
                return SetErrorMsg(`${field.name} no puede estar vacío`)
            }
        }
        onFormSubmit(inputFieldValues)
    }

    useEffect(() => {
        SetErrorMsg(null)
        console.log(inputFieldValues)
    }, [inputFieldValues])

    useEffect(() => {
        SetErrorMsg(passedErrorMsg)
    }, [passedErrorMsg])
    return (
        <>
            {fields.map((inputFieldOptions, index ) =>{
                switch (inputFieldOptions.type) {
                    case "text":
                        return <TextInputField key={index} id={inputFieldOptions.id} inputFieldName={inputFieldOptions.name} onSetInputValues={handleSetInputValues} /> 
                    case "single-image":
                        return <SingleImageField key={index} id={inputFieldOptions.id} passedImage={inputFieldOptions.imageURL} onImageLoad={handleSetInputValues} />
                    case "submit":
                        return (
                            <div key={index}>
                                <p style={{color:"red"}}>{errorMsg}</p>
                                <button onClick={handleMandatoryFields}
                                    className="btn btn-success"
                                    style={{marginTop:10, display: "block"}
                                }>
                                    {inputFieldOptions.text}
                                </button>
                            </div>
                        )
                    default:
                        break;
                }
            })}
        </>
    )
}
export default Form