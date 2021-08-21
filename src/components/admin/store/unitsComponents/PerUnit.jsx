import {useState, useEffect} from 'react';

const PerUnit = ({onMType}) => {
    const [unitCheck, setUnitCheck] = useState(false)
    const [unitPrice, SetUnitPrice] = useState("")
    const [dozenCheck, SetDozenCheck] = useState(false)
    const [dozenPrice, SetDozenPrice] = useState("")
    const [thousandCheck, SetThousandCheck] = useState(false)
    const [thousandPrice, SetThousandPrice] = useState("")

    
    useEffect(() => {
        onMType(unitCheck, "unit", unitPrice, dozenCheck, "dozen", dozenPrice, thousandCheck, "thousand", thousandPrice)  
    }, [unitCheck, unitPrice, dozenCheck, dozenPrice, thousandCheck, thousandPrice])
    return (
        <>
            <div className="container px-3" style={{marginTop:25}}>
                <div className="row gx-9">
                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => setUnitCheck(e.target.checked) } type="checkbox" className="form-check-input"  /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    Unidad
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetUnitPrice(e.target.value)} value={unitPrice} type="input" className="form-text-input" style={{width:"5rem"}}   placeholder="0.00" />
                            </label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => SetDozenCheck(e.target.checked)} type="checkbox" className="form-check-input" /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    Docena
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetDozenPrice(e.target.value)} value={dozenPrice} type="input" className="form-text-input" style={{width:"5rem"}} placeholder="0.00" />
                            </label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => SetThousandCheck(e.target.checked)} type="checkbox" className="form-check-input" /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    Millar
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetThousandPrice(e.target.value)} value={thousandPrice}type="input" className="form-text-input" style={{width:"5rem"}} placeholder="0.00" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PerUnit;