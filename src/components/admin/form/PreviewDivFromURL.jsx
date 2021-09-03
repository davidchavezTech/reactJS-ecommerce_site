import { serverAdress } from "../../../globalVariables";
import { singleImageSize } from "../../../globalVariables";
const PreviewDivFromURL = ({ previewFileName, index, remove, removePreview }) => {

    return (
        <div
            style={{
                backgroundImage: `url("${serverAdress}/uploads/${previewFileName}")`,
                backgroundSize: "cover",
                height: singleImageSize,
                width: singleImageSize,
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
export default PreviewDivFromURL;