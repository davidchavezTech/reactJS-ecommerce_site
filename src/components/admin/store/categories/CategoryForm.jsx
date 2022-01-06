import { useState } from "react";
import Form from "../../../../features/form/Form"
import { addCategory } from "./categoriesServerRequests"

const CategoryForm = ({ onNewCategory }) => {
    const [ formErrorMsg, SetFormErrorMsg ] = useState(null);
    const [ loadForm, SetLoadForm ] = useState(true)
    const inputFields = [
        {id: "categoryName", type: "text", name: "Nombre de categoría", mandatory: true},
        // {type: "single-image", imageURL: "images-1630593966043-797422623.jpeg"},
        {id: "categoryImage", type: "single-image", name: "Imagen", mandatory: true},
        {type: "submit", text: "Crear categoría"}
    ]
    
    const handleOnFormSubmit = async (values) => {
        const response = await addCategory(values);
        if(response === "Esa categoría ya existe") return SetFormErrorMsg(response)
        if(response === "error, no files were received") return SetFormErrorMsg(response)
        else {
            onNewCategory()
            SetLoadForm(false)
            SetLoadForm(true)
        }
    }
    return (
        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Agregar categoría</h5>

                {loadForm && <Form fields={inputFields} onFormSubmit={handleOnFormSubmit} passedErrorMsg={formErrorMsg} />}

            </div>
        </div>
    )
}
export default CategoryForm