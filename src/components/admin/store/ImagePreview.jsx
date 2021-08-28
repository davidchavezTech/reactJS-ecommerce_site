import { useState } from "react";

const ImagePreview = ({imgFile}) => {
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
                marginRight:8
            }}
        ></div>
    )   
}
export default ImagePreview;