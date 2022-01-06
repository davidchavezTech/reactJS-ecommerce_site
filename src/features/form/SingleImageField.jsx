import { useState, useEffect } from "react"

import PreviewDivFromFile from "./PreviewDivFromFile"
import PreviewDivFromURL from "./PreviewDivFromURL"

import React from "react";

const SingleImageField = React.forwardRef(({ id, passedImage, onImageLoad }, ref) => {
    const [previewsErrorMessage, SetPreviewsErrorMessage] = useState(null)
    const [previewDiv, SetPreviewDiv] = useState(null)
    const [image, SetImage] = useState(passedImage)

    // const fileInputRef = useRef();

    const loadImage = (imageFile) => {
        SetImage(imageFile)
    }
    useEffect(() => {
        
        if(image){
            switch (typeof image) {
                case "object":
                    SetPreviewDiv(
                        <PreviewDivFromFile
                            key={id}
                            imgFile={image}
                        />)
                    break;
                case "string":
                    SetPreviewDiv(
                        <PreviewDivFromURL
                            key={id}
                            previewFileName={image}
                        />)
                    onImageLoad(id, image)
                    break;
                default:
                    break;
            }
        }
    }, [image]) // eslint-disable-line react-hooks/exhaustive-deps
    
    // useEffect(() => {
    //     console.log(onImageLoad)
    // }, [])
    return (
        <>
            {previewsErrorMessage}
            {previewDiv}
            <br />
            <button
                style={{marginBottom:14}}
                className="btn btn-primary"
                onClick={e =>{
                    e.preventDefault();
                    ref.current.click();
            }}>
                Escoger imagen
            </button>
            {/* {hidden input} */}
            <input
                ref={ref}
                name="image"
                accept="image/*"
                onChange={e => {
                    const inputFieldFile = e.target.files[0];
                    if(inputFieldFile && inputFieldFile.type.substr(0,5) !== "image") return SetPreviewsErrorMessage("Solo se permiten imágenes")
                    if(inputFieldFile) loadImage(inputFieldFile);
                    onImageLoad(id, inputFieldFile)
                }}
                style={{display:"none"}}
                type="file"
            />
        </>
    )
})
export default SingleImageField