import { useState } from "react"
const Check = ({ name, passedOnCheck }) => {
    const [checked, SetChecked] = useState(true)
    const passCheck = () => {
        SetChecked(!checked)
        // passedOnCheck(!checked)
    }
    return (
        <div className="form-check">
            <input onChange={e => passCheck()} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={checked} />
            <label className="form-check-label" htmlFor="flexCheckChecked">
                {name}
            </label>
        </div>
    )
}

export default Check;