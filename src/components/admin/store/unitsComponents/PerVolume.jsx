import { useState, useEffect } from 'react';

const PerWeight = ({onMType, priceAndUnits}) => {

    const unitOfMeasurement1ES = "Mililitro"
    const unitOfMeasurement2ES = "Litro"
    const unitOfMeasurement3ES = "Hectolitro"

    const unitOfMeasurement1 = "millilitre"
    const unitOfMeasurement2 = "litre"
    const unitOfMeasurement3 = "hectolitre"

    const [aCheck, SetACheck] = useState(false)
    const [aPrice, SetAPrice] = useState("")
    const [bCheck, SetBCheck] = useState(false)
    const [bPrice, SetBPrice] = useState("")
    const [cCheck, SetCCheck] = useState(false)
    const [cPrice, SetCPrice] = useState("")

    useEffect(() => {
        onMType( aCheck, unitOfMeasurement1, aPrice, bCheck, unitOfMeasurement2, bPrice, cCheck, unitOfMeasurement3, cPrice )
    }, [aCheck, aPrice, bCheck, bPrice, cCheck, cPrice])

    //Load up units selected if we are editing an Item
    useEffect(() => {
        if(priceAndUnits){
            for(const key in priceAndUnits){
                switch (key) {
                    case unitOfMeasurement1:
                        SetACheck(true)
                        SetAPrice(priceAndUnits[key])
                        break;
                    case unitOfMeasurement2:
                        SetBCheck(true)
                        SetBPrice(priceAndUnits[key])
                        break;
                    case unitOfMeasurement3:
                        SetCCheck(true)
                        SetCPrice(priceAndUnits[key])
                        break;
                    default:
                        break;
                }
            }
        }
    }, [])


    return (
        <>
            <div className="container px-3" style={{marginTop:25}}>
                <div className="row gx-9">
                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => SetACheck(e.target.checked)} type="checkbox" className="form-check-input" checked={aCheck} /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    {unitOfMeasurement1ES}
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetAPrice(e.target.value)} value={aPrice} type="input" className="form-text-input" style={{width:"5rem"}}   placeholder="0.00" />
                            </label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => SetBCheck(e.target.checked)} type="checkbox" className="form-check-input" checked={bCheck} /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    {unitOfMeasurement2ES}
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetBPrice(e.target.value)} value={bPrice} type="input" className="form-text-input" style={{width:"5rem"}} placeholder="0.00" />
                            </label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => SetCCheck(e.target.checked)} type="checkbox" className="form-check-input" checked={cCheck} /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    {unitOfMeasurement3ES}
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetCPrice(e.target.value)} value={cPrice} type="input" className="form-text-input" style={{width:"5rem"}} placeholder="0.00" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PerWeight;