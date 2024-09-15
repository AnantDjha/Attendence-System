import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminContext } from "../context/adminContext";
import "./Admin.css"
import Present from "../present/Present";
import Absent from "../absent/Absent"
import axios from "axios";


export default function Admin()
{
    const {admin , setAdmin} = useContext(adminContext)
    const [logoutRes , setLogoutRes] = useState(true)
    const [sorter , setSorter] = useState("")
    const navigate = useNavigate()
    const [present , setPresent] = useState(true)
    const [month , setMonth] = useState(new Date().getMonth()+1)
    const [date , setDate] = useState(new Date().getDate())
    const [year , setYear] = useState(new Date().getFullYear())

    const setPresentDate = (e)=>{
        // console.log(e.target.value);  
        const [y , m , d] = e.target.value.split("-")
        setYear(parseInt(y))
        setMonth(parseInt(m))
        setDate(parseInt(d))
    }

    const handleLogout = ()=>{
        axios.defaults.withCredentials = true
        axios.get("http://localhost:5000/admin/logout")
        .then((res)=>{
            setAdmin({valid:false})
            navigate("/login")
        })
    }

    useEffect(()=>{
      
        if(!admin)
        {
            navigate("/")
            navigate("/admin-page")
        }
        else if(!admin.valid)
        {
            navigate("/login")
        }
        
    },[])

    useEffect(()=>{
        console.log(sorter);
        
    },[sorter])
    return (
        <div className="main-admin">
            <div className="greeting">
                <p>Wellcome, {admin && admin.valid ? admin.value.firstName :""}</p>
                <Link onClick={handleLogout}>Logout</Link>
            </div>

            <h3>Attendence List</h3>
            <div className="attendenceList">
                <div className="buttonAndSort">
                    <div className="btn">
                        <button style={{backgroundColor:present ? "gray" : "green"}} onClick={()=>{
                            setPresent(!present)
                        }}>Present</button>
                        <button style={{backgroundColor:!present ? "gray" : "green"}} onClick={()=>{
                            setPresent(!present)
                        }}>Absent</button>
                    </div>
                    <div className="sorter">
                        <span>Date:</span>
                        <input type="date" onChange={setPresentDate}/>
                    </div>
                </div>
                <div>
                    {
                        present ? <Present month = {month} date = {date} year = {year}/>
                        :<Absent  month = {month} date = {date} year = {year}/>
                    }
                </div>
            </div>
        </div>
    )
}