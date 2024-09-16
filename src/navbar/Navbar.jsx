import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Navbar.css"
import { useContext, useState } from "react";
import { empContext } from "../context/empContext";

export default function Navbar() {
    const { employee, setEmployee } = useContext(empContext)
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="main-nav">
            <nav>
                <div className="links">
                    <Link
                        to="/"

                    >
                        Home
                    </Link>
                    <Link
                        to="/admin-page"
                    >
                        Admin
                    </Link>
                    
                </div>
            </nav>
        </div>
    )
}