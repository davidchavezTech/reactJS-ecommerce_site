import Form from "../../form/Form"

const CategoryForm = () => {
    const inputFields = [
        {type: "text", name: "Nombre de categoría"},
        // {type: "single-image", imageURL: "images-1630593966043-797422623.jpeg"},
        {type: "single-image"},
        {type: "submit", text: "Crear categoría"}
    ]
    
    return (
        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Agregar categoría</h5>

                <Form fields={inputFields} />

            </div>
        </div>
    )
}
export default CategoryForm