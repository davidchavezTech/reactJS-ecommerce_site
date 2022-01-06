import TextInputField from "./TextInputField";
import SingleImageField from "./SingleImageField";
import AutoBoxes from "./autoboxes/AutoBoxes";
import React from "react";

import { useState, useEffect } from "react"
const Form = ({ fields, onFormSubmit, passedErrorMsg, onDelete }) => {
    const imageInputFieldRef = React.createRef()

    let imageURL;
    let itemID;
    if(fields.find(obj => obj.type === "delete")){
        imageURL = fields.find(obj => obj.type === "single-image").imageURL;
        itemID = fields.find(obj => obj.type === "delete" ? true : false ).id;
    }
    const [inputFieldValues, SetInputFieldValues] = useState({})
    const [errorMsg, SetErrorMsg] = useState(null)

    
    const handleSetInputValues = (id, value) => {
        const _imageFielObj = {};

        if(Object.keys(inputFieldValues).length){//This will prevent the copying we are a bout to do with JSON.parse(...) to convert file to string object, along with...
            for(let key in inputFieldValues){
                if(typeof(inputFieldValues[key])=== "object") {
                    _imageFielObj[key] = inputFieldValues[key]
                }
            }
        }
        const inputFieldValuesCopy = JSON.parse(JSON.stringify(inputFieldValues))
        inputFieldValuesCopy[id] = value
        if(Object.keys(_imageFielObj).length){//<-- this.
            for(let key in _imageFielObj){
                inputFieldValuesCopy[key] = _imageFielObj[key]
            }
        }
        console.log(inputFieldValuesCopy)

        SetInputFieldValues(inputFieldValuesCopy)
    }

    const handleMandatoryFields = () => {

        for(const field of fields) {
            if(field.mandatory && field.type !== "submit"){
                if(!(inputFieldValues[field.id]) || inputFieldValues[field.id].length === 0)
                return SetErrorMsg(`${field.name} no puede estar vacío`)
            }
        }
        onFormSubmit(itemID, inputFieldValues)
    }

    useEffect(() => SetErrorMsg(null), [inputFieldValues]) //Remove empty mandatory field warning messages

    useEffect(() => SetErrorMsg(passedErrorMsg), [passedErrorMsg]) //Display empty mandatory fielnd warning message

    useEffect(()=> {//Fix bug. Programatically set the input fields state one by one. SetState can't wait enough so we have to do it by hand. This avoids the error "'so and so' field can't be empty" when it's actually not empty.
        if(!fields) return //Check if we are editing or just creating
        const _inputFieldValues = {};//replacement for state variable
        for(const field of fields) {
            if(field.mandatory && field.type !== "submit"){//If pass condition, then we need to add it to _inputFieldValues
                _inputFieldValues[field.id] = field.value || field.imageURL
            }
        }
        SetInputFieldValues(_inputFieldValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            {fields.map((inputFieldOptions, index ) =>{
                switch (inputFieldOptions.type) {
                    case "text":
                        return <TextInputField key={index} id={inputFieldOptions.id} inputFieldName={inputFieldOptions.name} onSetInputValues={handleSetInputValues} value={inputFieldOptions.value ? inputFieldOptions.value : ""} /> 
                    case "autoboxes":
                        return <AutoBoxes key={index} id={inputFieldOptions.id} inputFieldName={inputFieldOptions.name} onSetInputValues={handleSetInputValues} value={inputFieldOptions.value ? inputFieldOptions.value : []} /> 
                    case "single-image":
                        return <SingleImageField ref={imageInputFieldRef} key={index} id={inputFieldOptions.id} passedImage={inputFieldOptions.imageURL} onImageLoad={handleSetInputValues} />
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
                        return (
                            <div key={index}>
                                <button onClick={() => onDelete(inputFieldOptions.id, imageURL)}
                                    className="btn btn-danger"
                                    style={{marginTop:10, display: "block"}
                                }>
                                    {inputFieldOptions.text}
                                </button>
                            </div>
                        )
                }
            })}
        </>
    )
}
export default Form