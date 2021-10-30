import { useState, useEffect } from "react"
import Check from "./Check";
const CategorySelector = ({name, getListFunction}) => {
    const [ categoryOptions, SetCategoryOptions] = useState([""]);
    const [ checks, SetChecks ] = useState([]);
    const createCheck = (val) => {
        SetChecks([...checks, val])
    }
    useEffect(()=> {
        (async ()=> {
            const response = await getListFunction()
            const optionsArr = []
            for(const properties of response) optionsArr.push(properties.categoryName)
            SetCategoryOptions([...categoryOptions, ...optionsArr])
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>{name}</h6>
            <select onChange={e => createCheck(e.target.value)} className="form-control">
                {categoryOptions.map((option, index) => <option key={index} value={option}>{option}</option>)}
            </select>

            {checks.map((val, index) => <Check key={index} name={val} />)}
        </>
    )
}
export default CategorySelector;