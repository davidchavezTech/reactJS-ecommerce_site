import { useState } from "react";

const PreviewDivFromFile = ({index, imgFile, remove, removePreview}) => {
    const [previewUrl, SetPreviewURL] = useState();

    const reader = new FileReader();
    reader.onloadend = () => {
        SetPreviewURL(reader.result);
    };
    reader.readAsDataURL(imgFile);
    return (
        <div
            style={{
                backgroundImage: `url("${previewUrl}")`,
                backgroundSize: "cover",
                height:150,
                width:150,
                display:"inline-block",
                textAlign: "right",
                margin:8,
                padding: 4
            }}
        >
            {remove && <button onClick={() => removePreview(index)} type="button" className="btn btn-outline-danger btn-sm" aria-label="Close">X</button>}
        </div>
    )   
}
export default PreviewDivFromFile;