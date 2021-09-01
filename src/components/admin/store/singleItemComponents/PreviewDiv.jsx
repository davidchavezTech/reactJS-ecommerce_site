import { serverAdress } from "../../../../globalVariables";
import { useDispatch, useSelector } from "react-redux";
import { itemRemoved } from "../../../../features/items/itemSlice";
const PreviewDiv = ({ previewFileName, index, remove }) => {
    const dispatch = useDispatch();
    const removePreview = () =>{
        dispatch(itemRemoved(index))
    }
    return (
        <div
            style={{
                backgroundImage: `url("${serverAdress}/uploads/${previewFileName}")`,
                backgroundSize: "cover",
                height:150,
                width:150,
                display:"inline-block",
                textAlign: "right",
                marginRight:8,
                padding: 4
            }}
        >
            {remove && <button onClick={removePreview} type="button" className="btn btn-outline-danger btn-sm" aria-label="Close">X</button>}
        </div>
    )
}
export default PreviewDiv;