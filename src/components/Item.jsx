const Item = ({item}) => {
    return (
        <>
            <h4>{item.username}</h4>
            <p>{item.description}</p>
        </>
    )
}

export default Item