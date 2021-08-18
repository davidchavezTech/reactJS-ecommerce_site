const UserComponent = ({names, userName, title, number, id, onDelete} ) => {
    return (
        <>
            <div id={id} className="card" style={{width:"300px", margin:30, display: "inline-block"}}>
                <h5 className="card-header">{names}</h5>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{number}</p>
                    <p className="card-text">{userName}</p>
                    <button onClick={(e) => onDelete(e.target.closest('.card').id)} className="btn btn-danger">Eliminar</button>
                </div>
            </div>
        </>
    )
}

export default UserComponent