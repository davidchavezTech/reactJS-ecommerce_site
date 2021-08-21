const OptionCard = ({index, fieldType, options, fieldName, onDelete}) => {
    let fieldTypeES
    switch (fieldType) {
        case "text":
            fieldTypeES = "Campo de texto"
            break;
        case "dropdown":
            fieldTypeES = "Lista despegable"
            break;
        default:
            fieldTypeES = "Radio"
            break;
    }
    return (
        <div className="card" style={{width: "22rem", marginTop:15, padding:10}}>
            <button onClick={() => onDelete(index)} type="button" className="btn-close" aria-label="Close" style={{position:"absolute", right:10}} />
            <h6 className="card-subtitle mb-2" style={{marginTop:5}}>Tipo de campo: 
                <span className="badge bg-success">{fieldTypeES}</span>
            </h6>
            <h6 className="card-subtitle mb-2" style={{marginTop:5}}>Nombre de campo: <span className="badge bg-danger">{fieldName}</span></h6>
            {
                (fieldType!=="text") && (
                    <>
                        <ul className="list-group">
                            {options.map((option, index) => <li key={index}className="list-group-item">{option}</li>)}
                        </ul>
                    </>
                )
                
            }
            
        </div>
    )
}
export default OptionCard;