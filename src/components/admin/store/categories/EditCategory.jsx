import Form from "../../../../features/form/Form";
import { getCategory } from "./categoriesServerRequests";
import { useState, useEffect } from "react";
const EditCategory = ({ match }) => {
    const { categoryId } = match.params
    const [category, SetCategory] = useState([]);
    
    useEffect(async () => {
        const response = await getCategory(categoryId)
        SetCategory(response)
    }, [])
    
    return (
        <>
            {/* <Form selectedItem={selectedItem} /> */}
        </>
        
    )
}
export default EditCategory;