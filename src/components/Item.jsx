const Item = ({item, isUserLoggedIn}) => {
    return (
        <>
            <div className="card" style={{width: "14rem", display:"inline-block", margin:"10px"}}>
                {isUserLoggedIn && <button type="button" className="btn-close" aria-label="Close" style={{position:'absolute', right:"10px", top:"11px"}}></button>}
                <img src={item.imgURL} className="card-img-top" alt=""></img>
                <div className="card-body">
                    <h5 className="card-title">{item.itemName}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">{item.price}</p>
                    <button  className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </>
    )
}

export default Item;