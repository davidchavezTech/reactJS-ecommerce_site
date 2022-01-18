import { useState, useEffect } from "react"

const Subcategory = ({name, checkValue,onCheck}) => {
    console.log(name, checkValue)
    const _id = Math.floor(Math.random() * 999);

    return  <div className="form-check">
        <label
            style={{fontSize:12}}
            className="form-check-label"
            htmlFor={_id}
        >
            {name}
        </label>

        <input onChange={e => onCheck(name, !checkValue)}
            className="form-check-input"
            type="checkbox"
            value={name}
            id={_id}
            checked={checkValue}
        />
    </div> 
    
}
export default Subcategory