import { useState } from 'react'

const AddItemForm = ({onAddItem}) => {

    const [itemName, setItemName] = useState('')
    const imgURL = 'test.jpg'
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    return (
        // <form onSubmit={e => post(e)}>
        <form>
            <div className="card" style={{width:'25rem',margin:"20px 30px"}}>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Nombre del Producto:</label>
                        <input type="text" className="form-control" placeholder="Producto" value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Descripción:</label>
                        <input type="text" className="form-control" placeholder="Descripción" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Precio:</label>
                        <input type="text" className="form-control" placeholder="0.00" value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-dark" onClick={()=> onAddItem(
                            { itemName, imgURL, description, price }
                        )
                    }>Agregar Producto</button>
                </div>
            </div>
        </form>
    )
}

export default AddItemForm