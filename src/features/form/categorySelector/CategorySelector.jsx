import { useState, useEffect } from "react"
import Check from "./Check";
const CategorySelector = ({name, getListFunction, saveSetChecksFunction}) => {
    const [ categoryOptions, SetCategoryOptions] = useState([]);
    const [ checks, SetChecks ] = useState([]);

    const createCheck = (val) => {
        if(checks.some(check => check === val)) return //Prevent selecting same option from generating duplicates
        SetChecks([...checks, val])
    }
    saveSetChecksFunction(SetChecks)
    useEffect(()=> {
        (async ()=> {
            const response = await getListFunction()
            console.log(response)
            const optionsArr = []
            for(const properties of response) optionsArr.push(properties.categoryName)
            console.log(optionsArr)
            SetCategoryOptions([...categoryOptions, ...optionsArr])
            console.log([...categoryOptions, ...optionsArr])
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>{name}</h6>
            <select onChange={e => createCheck(e.target.value)} className="form-control" value={"main"}>
                <option value="main">Seleccionar</option>
                {categoryOptions.map((option, index) => <option key={index} value={option}>{option}</option>)}
            </select>

            {checks.map((val, index) => <Check key={index} name={val} />)}
        </>
    )
}
export default CategorySelector;