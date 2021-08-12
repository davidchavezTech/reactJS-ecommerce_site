import { Link } from 'react-router-dom'
const NavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <Link className="navbar-brand" to="/store">Store</Link>
            </div>
        </nav>
    )
}

export default NavBar;