import { useState, useEffect } from "react"
import Check from "./Category";

const CategorySelector = ({name, getListFunction, saveSetChecksFunction}) => {
    const [ categoryOptions, SetCategoryOptions] = useState([]);
    const [ checks, SetChecks ] = useState([]);
    const [ subcats, SetSubcats ] = useState({});

    const createCheck =  (val) => {
        if(checks.some(check => check === val)) return //Prevent selecting same option from generating duplicates
        SetChecks([...checks, val])
    }
    const handleOnCheck = (category, subCat, isChecked) => {
        if(!subCat) return
        console.log(category)
        console.log(subCat)
        console.log(isChecked)
        const subcatCopy = JSON.parse(JSON.stringify(subcats));
        console.log(subcatCopy)
        if(subcatCopy[category]){
            subcatCopy[category][subCat] = isChecked
         }else subcatCopy[category] = {[subCat]: isChecked};
        SetSubcats(subcatCopy)
    }
    saveSetChecksFunction(SetChecks)
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
            <select onChange={e => createCheck(e.target.value)} className="form-control" value={"main"}>
                <option value="main">Seleccionar</option>
                {categoryOptions.map((option, index) => <option key={index} value={option}>{option}</option>)}
            </select>

            {checks.map((val, index) => <Check key={index} name={val} onCheck={handleOnCheck} SetSubcats={SetSubcats} />)}
        </>
    )
}
export default CategorySelector;