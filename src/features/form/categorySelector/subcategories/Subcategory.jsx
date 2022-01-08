import { useState, useEffect } from "react"

const Subcategory = ({name, onCheck}) => {
    const _id = Math.floor(Math.random() * 999);
    const [checkToggle, SetCheckToggle] = useState(false);
    useEffect(()=> {
        onCheck(name, checkToggle);// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkToggle])
    return  <div className="form-check">
        <label
            style={{fontSize:12}}
            className="form-check-label"
            htmlFor={_id}
        >
            {name}
        </label>

        <input onChange={e => SetCheckToggle(!checkToggle)}
            className="form-check-input"
            type="checkbox"
            value={name}
            id={_id}
            checked={checkToggle}
        />
    </div> 
    
}
export default Subcategory