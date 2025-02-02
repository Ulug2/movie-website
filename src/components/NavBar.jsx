import { Link } from 'react-router-dom';
import '../css/Navbar.css'

function NavBar(){
    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="navbar-brand">Movie Website</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home Page</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    )
}

export default NavBar;