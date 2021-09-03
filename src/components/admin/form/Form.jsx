import TextInputField from "./TextInputField";
import SingleImageField from "./SingleImageField";

import { useState, useEffect } from "react"
const Form = ({fields}) => {
    const [inputFieldValues, SetInputFieldValues] = useState({})
    const [errorMsg, SetErrorMsg] = useState(null)
    const handleSetInputValues = (key, value) => {
        const inputFieldValuesCopy = JSON.parse(JSON.stringify(inputFieldValues))
        inputFieldValuesCopy[key] = value
        SetInputFieldValues(inputFieldValuesCopy)
    }
    useEffect(() => {
        console.log(inputFieldValues)
    }, [inputFieldValues])
    return (
        <>
            {fields.map((inputFieldOptions, index ) =>{
                switch (inputFieldOptions.type) {
                    case "text":
                        return <TextInputField key={index} inputFieldName={inputFieldOptions.name} onSetInputValues={handleSetInputValues} /> 
                    case "single-image":
                        return <SingleImageField passedImage={inputFieldOptions.imageURL} />
                    case "submit":
                        return (
                            <>
                                <p style={{color:"red"}}>{errorMsg}</p>
                                <button className="btn btn-success" style={{marginTop:10, display: "block"}}>
                                    {inputFieldOptions.text}
                                </button>
                            </>
                        )
                    default:
                        break;
                }
            })}
        </>
    )
}
export default Form