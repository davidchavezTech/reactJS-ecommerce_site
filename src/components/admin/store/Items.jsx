import Item from "./Item"
const Items = ({ status, items}) => {
    return (
        <>
            {(status === "loading") &&
                <div style={{display:"flex", justifyContent:"center",alignItems:"center", height: 150}}> 
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {(status === "Error") && <p style={{color:"red"}}>Error</p>}
            {(status === "succeeded" && (items.length !== undefined || items.length !== 0 )) && items.map((item, index) => <Item key={index} item={item} />)}
        </>
    )
}

export default Items