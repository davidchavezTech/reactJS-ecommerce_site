import Box from "./box/Box"

import { useState, useEffect } from "react"

const AutoBoxes = ({value, id, onSetInputValues, inputFieldName}) => {

    const [boxes, SetBoxes] = useState([...value, ""]);

    const handleOnSetInputValues = (id, values) => {
        const boxesCopy = JSON.parse(JSON.stringify(boxes))
        boxesCopy[id] = values;
        SetBoxes(boxesCopy)
    }

    useEffect(()=>{
        if(boxes[boxes.length-1] !== "") SetBoxes([...boxes, ""])//add new text input field if last text input field is not empty
        onSetInputValues(id, boxes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boxes])
    return <>
        {boxes.map((value, index) => <Box key={index} id={index} value={value} inputFieldName={inputFieldName} onSetInputValues={handleOnSetInputValues} />)}
    </>
}
export default AutoBoxes