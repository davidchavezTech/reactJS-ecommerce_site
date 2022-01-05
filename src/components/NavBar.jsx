import { Link } from 'react-router-dom'
import axios from 'axios'
import { serverAdress } from '../globalVariables'
const NavBar = ({isUserLoggedIn}) => {

    const logOut = async () => {
        const response = await axios({
            method: "GET",
            withCredentials: true,
            url: `${serverAdress}/admin/logout`,
        })
        response.data === "OK" ? window.location.pathname = "/" : console.log(response)
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <Link className="navbar-brand" to="/store">Store</Link>
                {isUserLoggedIn && <span style={{cursor:'pointer'}} className="navbar-brand" onClick={logOut}>Cerrar sesión</span>}
            </div>
        </nav>
    )
}

export default NavBar;