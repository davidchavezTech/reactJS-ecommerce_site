import { Link } from 'react-router-dom'

const AdminNavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Inicio</Link>
                <Link className="navbar-brand" to="/createUser">Crear Usuarios</Link>
                <Link className="navbar-brand" to="/store">Tienda</Link>
                <Link className="navbar-brand" to="/store">Cerrar sesión</Link>
            </div>
        </nav>
    )
}

export default AdminNavBar