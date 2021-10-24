import { serverAdress } from "../globalVariables"

const Item = ({item, isUserLoggedIn}) => {
    console.log("logging:")
    console.log(item)
    return (
        <div className="card" style={{width: "25rem", margin:10, color:"black", flexDirection: "row", display:"inline-flex"}}>
            <div style={{
                display:"inline-flex",
                height:160, width:160,
                backgroundColor:"gray",
                alignItems:"center",
                justifyContent:"center",
                color: "white",
                backgroundImage: `url("${serverAdress}/uploads/${item.imagesFileNames[0]}")`,
                backgroundSize: "cover",
            }}></div>
            <div className="card-body" style={{display:"inline-block"}}>
                <h5 className="card-title">{item.itemName}</h5>
                <p className="card-text" style={{width:"12rem", height:"44px"}}>{item.description}</p>
                <a href={`editItem/${item._id}`} className="btn btn-success" style={{marginLeft:"auto"}}>Agregar al carrito</a>
            </div>
        </div>
    )
}

export default Item;