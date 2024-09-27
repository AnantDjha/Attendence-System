import { useContext, useEffect, useState } from "react"
import { adminContext } from "../context/adminContext"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

export default function AdminNav()
{
    const [data , setData] = useState([])
    const navigate = useNavigate()
    const {admin , setAdmin} = useContext(adminContext)
    
    const handleLogout = () => {
        axios.defaults.withCredentials = true
        axios.get("http://localhost:5000/admin/logout")
            .then((res) => {
                setAdmin({ valid: false })
                navigate("/login") 
                console.log("logged out");
            })
            .catch((e) => {
                alert("something went wrong" + e)
            })
    }

    useEffect(()=>{
        axios.defaults.withCredentials = true
        axios.get("http://localhost:5000/emp-querry")
        .then((res)=>{
            setData(res.data)
        })
        .catch((e)=>[
            alert("somrthing went wrong")
        ])
    } , [])

    return (
        <div className="greeting">
             <p>Wellcome, {admin && admin.valid ? admin.value.firstName : ""}</p>
                <div>

                    <Link onClick={handleLogout}>Logout</Link>

                    <Link to="notification" ><FontAwesomeIcon icon={faBell}/> <span>{data.length}</span></Link>
                </div>
        </div>
    )
}