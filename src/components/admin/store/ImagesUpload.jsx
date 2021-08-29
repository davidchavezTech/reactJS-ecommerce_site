import { useRef, useState, useEffect } from "react"
import ImagePreview from "./ImagePreview";
const ImagesUpload = ({passedImages}) => {
    const [images, SetImages] = useState();
    const [previews, SetPreviews] = useState([]);
    const [previewsErrorMessage, SetPreviewsErrorMessage] = useState('');
    const fileInputRef = useRef();
    const previewsArray = []

    useEffect(() => {
        if( images ) {
            if(images.length > 8) return SetPreviewsErrorMessage("Solo se permiten 8 imágenes")
            for(let i = 0; images.length > i; i++){
                SetPreviewsErrorMessage('')
                previewsArray.push(images[i]);
            }
            SetPreviews(previewsArray)
            passedImages(images)
        }else SetPreviews([]);
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
                <p style={{color:"red"}}>{previewsErrorMessage}</p>
                <input
                name="images"
                accept="image/*"
                onChange={e => {
                    const inputFieldFiles = e.target.files;
                    for(let i=0; inputFieldFiles.length > i; i++){
                        if(inputFieldFiles[i].type.substr(0,5) !== "image") return SetPreviewsErrorMessage("Solo se permiten imágenes")
                    }
                    inputFieldFiles ? SetImages(inputFieldFiles) : SetImages(null);
                }}
                style={{display:"none"}}
                type="file"
                ref={fileInputRef}
                multiple />

                {previews.map((imgFile, index) => <ImagePreview key={index} imgFile={imgFile}/>)}

                <br />

            </form>

        </>
    )
}

export default ImagesUpload