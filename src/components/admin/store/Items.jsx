import Item from "./Item"
const Items = ({ status, items}) => {
    return (
        <>
            {(status === "loading") &&
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>}
            {(status === "Error") && <p style={{color:"red"}}>Error</p>}
            {(status === "succeeded" && (items.length !== undefined || items.length !== 0 )) && items.map((item, index) => <Item key={index} item={item} />)}
        </>
    )
}

export default Items