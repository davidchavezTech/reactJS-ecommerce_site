const MeasurementUnitComponent = ({setMUnit, mUnit}) => {

    return (
        <>
            <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Unidad de medida</h6>
            <select onChange={(e) => setMUnit(e.target.value)} value={mUnit} className="form-control">
                <option value="">Seleccionar</option>
                <option value="unit">Unidad</option>
                <option value="weight">Peso</option>
                <option value="volume">Volumen</option>
            </select>
        </>
    )
}
export default MeasurementUnitComponent;