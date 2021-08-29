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
                    const files = e.target.files;
                    for(let i=0; files.length > i; i++){
                        if(files[i].type.substr(0,5) !== "image") return SetPreviewsErrorMessage("Solo se permiten imágenes")
                    }
                    files ? SetImages(files) : SetImages(null);
                }}
                style={{display:"none"}}
                type="file"
                ref={fileInputRef}
                multiple />

                {previews.map((imgFile, index) => <ImagePreview key={index} imgFile={imgFile}/>)}

                <br />
                <button onClick={e=>{
                    e.preventDefault();
                    // const formData = new FormData()
                    // // formData.append("images", [images]);
                    // for(let i =0; i < images.length; i++) {
                    //     formData.append("images", images[i]);
                    // }
                    // const response = await fetch("http://localhost:5000/images/upload", {
                    //     method: 'post',
                    //     body: formData
                    // })
                    // console.log(response)
                    passedImages(images)
                }}>Submit</button>
            </form>

        </>
    )
}

export default ImagesUpload