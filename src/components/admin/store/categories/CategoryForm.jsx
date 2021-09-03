import Form from "../../form/Form"

const CategoryForm = () => {
    const inputFields = [
        {id: "categoryName", type: "text", name: "Nombre de categoría"},
        // {type: "single-image", imageURL: "images-1630593966043-797422623.jpeg"},
        {id: "categoryImage", type: "single-image"},
        {type: "submit", text: "Crear categoría"}
    ]
    
    const handleOnFormSubmit = (values) => {
        console.log(values)
    }
    return (
        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Agregar categoría</h5>

                <Form fields={inputFields} onFormSubmit={handleOnFormSubmit} />

            </div>
        </div>
    )
}
export default CategoryForm