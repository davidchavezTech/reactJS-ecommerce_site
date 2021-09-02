import { useRef, useState, useEffect } from "react"
import PreviewDivFromFile from "./PreviewDivFromFile";
import PreviewDivFromURL from "./singleItemComponents/PreviewDivFromURL";
import { maxImagesNumber } from "../../../globalVariables";
const ImagesUpload = ({passImages, imagesURLs}) => {

    const [images, SetImages] = useState([]);
    const [previewsErrorMessage, SetPreviewsErrorMessage] = useState('');

    const fileInputRef = useRef();

    const proccessImages = (inputFieldFiles) => {
        const imagesArray = Array.from(inputFieldFiles)
        SetImages([...images, ...imagesArray])
    }

    useEffect(() => {
        if(imagesURLs) SetImages(imagesURLs)
    }, [imagesURLs])

    // useEffect(() => {
    //     console.log(images)
    // }, [images])

    const handleRemovePreview = index => {
        const imagesCopy = [...images]
        imagesCopy.splice(index,1)
        SetImages(imagesCopy)
    }
    useEffect(() => {
        if( images ) {
            if(images.length > maxImagesNumber) return SetPreviewsErrorMessage(`Solo se permiten ${maxImagesNumber} imágenes`)
            
            SetPreviewsErrorMessage('')
            passImages(images)
        };
    }, [images])
    return (
        <>
            <br />
            <form>
                
                <button
                style={{marginBottom:14}}
                className="btn btn-primary"
                onClick={e =>{
                    e.preventDefault();
                    fileInputRef.current.click();
                }}>Escoger imágenes</button>

                <br />
                <input
                name="images"
                accept="image/*"
                onChange={e => {
                    const inputFieldFiles = e.target.files;
                    for(let i=0; inputFieldFiles.length > i; i++){
                        if(inputFieldFiles[i].type.substr(0,5) !== "image") return SetPreviewsErrorMessage("Solo se permiten imágenes")
                    }
                    if(inputFieldFiles) proccessImages(inputFieldFiles);
                }}
                style={{display:"none"}}
                type="file"
                ref={fileInputRef}
                multiple />

                {images.map((imgFile, index) => {
                    if(typeof imgFile === "object") return (
                        <PreviewDivFromFile
                            key={index}
                            index={index}
                            imgFile={imgFile}
                            remove={(images.length > 1) ? true : false }
                            removePreview={handleRemovePreview}
                        />)
                    else if(typeof imgFile === "string") return (
                        <PreviewDivFromURL
                            key={index}
                            index={index}
                            previewFileName={imgFile}
                            remove={(images.length > 1) ? true : false }
                            removePreview={handleRemovePreview}
                        />)
                })}

                <br />
                {previewsErrorMessage ? <p style={{color:"white", backgroundColor:"red", padding: 4}}>{previewsErrorMessage}</p> : null }
            </form>

        </>
    )
}

export default ImagesUpload