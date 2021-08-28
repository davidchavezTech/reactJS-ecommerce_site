import { useRef, useState, useEffect } from "react"
import ImagePreview from "./ImagePreview";
const ImagesUpload = () => {
    const [images, SetImages] = useState();
    const [previews, SetPreviews] = useState([]);
    const fileInputRef = useRef();
    const previewsArray = []

    useEffect(() => {
        if( images ) {
            for(let i = 0; images.length > i; i++){
                previewsArray.push(images[i]);
            }
            SetPreviews(previewsArray)
        }else SetPreviews([]);
    }, [images])
    return (
        <>
            <br />
            
            <button
            style={{marginBottom:14}}
            className="btn btn-primary"
            onClick={e =>{
                e.preventDefault();
                fileInputRef.current.click();
            }}>Escoger imágenes</button>

            <br />

            <input
            accept="image/*"
            onChange={e => {
                const files = e.target.files;
                for(let i=0; files.length > i; i++){
                    if(files[i].type.substr(0,5) !== "image") return console.log("error, wrong type of image")
                }
                files ? SetImages(files) : SetImages(null);
            }}
            style={{display:"none"}}
            type="file"
            ref={fileInputRef}
            multiple />
            {previews.map(imgFile => <ImagePreview imgFile={imgFile}/>)}
        </>
    )
}

export default ImagesUpload