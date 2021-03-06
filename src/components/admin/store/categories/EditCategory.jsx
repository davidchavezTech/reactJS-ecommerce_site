import Form from "../../../../features/form/Form";
import { getCategory } from "./categoriesServerRequests";
import { useState, useEffect } from "react";
import { deleteCategory, editCategory } from "./categoriesServerRequests";
import { Redirect } from "react-router";
const EditCategory = ({ match }) => {
    const { categoryId } = match.params
    const [category, SetCategory] = useState(null);
    const [ formErrorMsg ] = useState(null);
    const [ activateRedirect, SetActivateRedirect ] = useState(false);
    const handleOnFormSubmit = async (id, values) => {
        editCategory(id, values)
        SetActivateRedirect(true)
    }
    const handleDelete = async (id, imageURL) => {
        await deleteCategory({id, imageURL})
        SetActivateRedirect(true)
    }
    useEffect(() => {
        (async ()=>{
            const response = await getCategory(categoryId)
            let subcategories;
            const inputFields = [
                {id: "categoryName", type: "text", name: "Nombre de categoría", value: response.categoryName, mandatory: true},
                {id: "categoryImage", type: "single-image", name: "Imagen", imageURL: response.imageFileURL, mandatory: true},
                {type: "submit", text: "Guardar cambios"},
                {id: response._id, type: "delete", text: "Eliminar"}
            ]
            response.subcategories ? subcategories = response.subcategories : subcategories = [""]
            
            subcategories = {
                    id: `subcategories`,
                    type: "autoboxes",
                    name: "Nombre de subcategoría",
                    value: subcategories,
                    mandatory: false
            }
            inputFields.push(subcategories)
            SetCategory(inputFields)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Editar categoría</h5>
                {category && <Form fields={category} onFormSubmit={handleOnFormSubmit} passedErrorMsg={formErrorMsg} onDelete={handleDelete} />}
            </div>
        </div>
        {activateRedirect && <Redirect to={"/admin/categories"} />}
        </>
        
    )
}
export default EditCategory;