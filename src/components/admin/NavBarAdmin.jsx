import { Link } from 'react-router-dom'
import axios from 'axios'
import { serverAdress } from '../../globalVariables'
const NavBarAdmin = () => {
    const logOut = async () => {
        await axios({
            method: "GET",
            withCredentials: true,
            url: `${serverAdress}/admin/logout`,
        });
        window.location.pathname = "/"
    }
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Inicio</Link>
                <Link className="navbar-brand" to="/admin">Usuarios</Link>
                <Link className="navbar-brand" to="/admin/store">Tienda</Link>
                <Link className="navbar-brand" to="/admin/categories/">Categorías</Link>
                <span style={{cursor:'pointer'}} className="navbar-brand" onClick={logOut}>Cerrar sesión</span>
            </div>
        </nav>
    )
}

export default NavBarAdmin