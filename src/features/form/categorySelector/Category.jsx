import { useState, useEffect } from "react"

import { getRequest} from "../FormServerRequests"
import { serverAdress } from "../../../globalVariables"

import Subcategory from "./subcategories/Subcategory"
const Check = ({ name, onCheck, SetSubcats }) => {
    const _id = Math.floor(Math.random() * 999)
    const [checked, SetChecked] = useState(true);
    // const [subcategories, SetSubcategories ] = useState([]);
    const [subcategoriesCheckState, SetSubcategoriesCheckState ] = useState([]);

    // const handleCheck = (subcat, value) => data[subcat] = value;
    useEffect(()=>{
        ( async () => {
            const ___subcategories = await getRequest(`${serverAdress}/categories/listSubcategories`, `/${name}`);
            const ___subcategoriesCheckState = [];
            ___subcategories.forEach(subcat => {
                ___subcategoriesCheckState.push({subcatName: subcat, checkState: false})
            });
            SetSubcategoriesCheckState(___subcategoriesCheckState)
            // SetSubcategories(___subcategories);
        }
        )()// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleSubcategoryCheck = (subcatName, checkValue) => {
        console.log(subcatName, checkValue)
        console.log(subcategoriesCheckState)
        // const ___subcategoriesCheckState = subcategoriesCheckState
        // ___subcategoriesCheckState[subcatName] = checkValue
        // console.log(___subcategoriesCheckState)
        // SetSubcategoriesCheckState(___subcategoriesCheckState)
    }
    
    return (<>
            <div className="form-check">
                <input onChange={e => SetChecked(!checked)} className="form-check-input" type="checkbox" value="" id={_id} checked={checked} />
                <label className="form-check-label" htmlFor={_id}>
                    {name}
                </label>
                {/* {subcategories.map((subcategory, index) => <Subcategory key={Date.now()+index} onCheck={saveSubcategoryData} name={subcategory} />)}     */}
                {
                   subcategoriesCheckState
                        .map(({subcatName, checkState}, index) =>
                            <Subcategory key={Date.now()+index}
                                name={subcatName}
                                checkValue={checkState}
                                onCheck={handleSubcategoryCheck}
                            />)
                }    
            </div>
            </>
    )
}

export default Check;