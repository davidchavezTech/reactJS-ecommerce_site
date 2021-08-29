import React from "react"
const Option = React.forwardRef(({index, option, storeOptionValue, onDelete, lastElementInArrayBoolean}, ref) => {

    return (
        <div key={index}>
            <input ref={lastElementInArrayBoolean && ref} onChange={(e) => storeOptionValue(e, index)} type="text" value={option} className="form-control" style={{width: "80%", display:"inline-block"}} />
            <button onClick={() => onDelete(index)} className="btn btn-danger" style={{marginLeft:10}}>X</button>
        </div>
    )
})
export default Option