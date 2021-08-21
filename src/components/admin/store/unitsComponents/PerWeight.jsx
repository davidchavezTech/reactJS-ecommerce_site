import { useState, useEffect } from 'react';

const PerWeight = ({onMType}) => {
    const [gramCheck, SetGramCheck] = useState(false)
    const [gramPrice, SetGramPrice] = useState("")
    const [kiloCheck, SetKiloCheck] = useState(false)
    const [kiloPrice, SetKiloPrice] = useState("")
    const [tonCheck, SetTonCheck] = useState(false)
    const [tonPrice, SetTonPrice] = useState("")

    useEffect(() => {
        onMType( gramCheck, "gram", gramPrice, kiloCheck, "kilo", kiloPrice, tonCheck, "ton", tonPrice )
    }, [gramCheck, gramPrice, kiloCheck, kiloPrice, tonCheck, tonPrice])
    return (
        <>
            <div className="container px-3" style={{marginTop:25}}>
                <div className="row gx-9">
                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => SetGramCheck(e.target.checked)} type="checkbox" className="form-check-input"  /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    100 gramos
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetGramPrice(e.target.value)} value={gramPrice} type="input" className="form-text-input" style={{width:"5rem"}}   placeholder="0.00" />
                            </label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => SetKiloCheck(e.target.checked)} type="checkbox" className="form-check-input" /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    Kilos
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetKiloPrice(e.target.value)} value={kiloPrice} type="input" className="form-text-input" style={{width:"5rem"}} placeholder="0.00" />
                            </label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="p-3 border bg-light" style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-around"}}>
                            <span>
                                <input onChange={(e) => SetTonCheck(e.target.checked)} type="checkbox" className="form-check-input" /> 
                                <label className="form-check-label" style={{paddingLeft:5}}>
                                    Toneladas
                                </label>
                            </span>
                            <label className="form-check-label text-muted" style={{paddingLeft:5}}>
                                <span style={{fontSize:12}}>Precio</span> <br />
                                <input onChange={(e)=> SetTonPrice(e.target.value)} value={tonPrice}type="input" className="form-text-input" style={{width:"5rem"}} placeholder="0.00" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PerWeight;