import { Link } from 'react-router-dom'
import axios from 'axios'
const AdminNavBar = () => {
    const logOut = async () => {
        await axios.post("http://localhost:5000/users/logOut")
        window.location.pathname = "/"
    }
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Inicio</Link>
                <Link className="navbar-brand" to="/createUser">Crear Usuarios</Link>
                <Link className="navbar-brand" to="/store">Tienda</Link>
                <span style={{cursor:'pointer'}} className="navbar-brand" onClick={logOut}>Cerrar sesión</span>
            </div>
        </nav>
    )
}

export default AdminNavBar