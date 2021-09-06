import { serverAdress } from "../../../../globalVariables";
const CategoryContainer = ({category}) => {
    return(
        <div className="card" style={{width: "25rem", margin:10, color:"black", flexDirection: "row", display:"inline-flex"}}>
            <div style={{
                display:"inline-flex",
                height:160, width:160,
                backgroundColor:"gray",
                alignItems:"center",
                justifyContent:"center",
                color: "white",
                backgroundImage: `url("${serverAdress}/uploads/${category.imageFileName}")`,
                backgroundSize: "cover",
            }}></div>
            <div className="card-body" style={{display:"inline-block"}}>
                <h5 className="card-title">{category.categoryName}</h5>
                <a href={`editItem/${category._id}`} className="btn btn-warning" style={{marginLeft:125}}>Editar</a>
            </div>
        </div>
    )
}
export default CategoryContainer;