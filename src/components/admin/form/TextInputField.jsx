const TextInputField = ({inputFieldName, onSetInputValues}) => {
    return (
        <>
            <h6 className="card-subtitle mb-2" style={{marginTop:15}}>{inputFieldName}</h6>
            <input onChange={e => onSetInputValues(inputFieldName, e.target.value)} className="form-control" type="text" placeholder="Nombre" />
        </> 
    )
}
export default TextInputField;