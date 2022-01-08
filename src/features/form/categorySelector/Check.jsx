import { useState, useEffect } from "react"

import { getRequest} from "../FormServerRequests"
import { serverAdress } from "../../../globalVariables"

import Subcategory from "./subcategories/Subcategory"
const Check = ({ name, onCheck, SetSubcats }) => {
    const _id = Math.floor(Math.random() * 999)
    const [checked, SetChecked] = useState(true);
    const [subcategories, SetSubcategories ] = useState([]);

    const data = {}
 
    // const handleCheck = (subcat, value) => data[subcat] = value;
    useEffect(()=>{
        ( async () => {
            const ___subcategories = await getRequest(`${serverAdress}/categories/listSubcategories`, `/${name}`);
            SetSubcategories(___subcategories);
        }
        )()// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const saveSubcategoryData = (subCategory, isChecked) =>{
        onCheck(name, subCategory, isChecked)
    }

    // useEffect(()=> onCheck(name, checked, data),[checked, data])
    return (<>
            <div className="form-check">
                <input onChange={e => SetChecked(!checked)} className="form-check-input" type="checkbox" value="" id={_id} checked={checked} />
                <label className="form-check-label" htmlFor={_id}>
                    {name}
                </label>
                {subcategories.map((subcategory, index) => <Subcategory key={Date.now()+index} onCheck={saveSubcategoryData} name={subcategory} />)}    
            </div>
            </>
    )
}

export default Check;