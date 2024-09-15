import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Navbar.css"

export default function Navbar()
{

    const location = useLocation()
    return (
        <div className="main-nav">
            <nav>
                <div className="links">
                    <Link to="/" className={!location.pathname.endsWith("/login")?"rendered" : ""}>Home</Link>
                    <Link to = "/admin-page" className={location.pathname.endsWith("/admin")?"rendered" : ""}>Admin</Link>
                </div>
            </nav>
        </div>
    )
}