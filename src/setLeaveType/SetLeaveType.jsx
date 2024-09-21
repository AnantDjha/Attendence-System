import { Navigate, useLocation, useNavigate } from "react-router-dom"
import "./LeaveType.css"
import { useEffect, useState } from "react"
import axios from "axios"
export default function SetLeaveType({ date, month, year, employeeId, setAbsentMark, leaveRef }) {
    // const location = useLocation()
    // const {date , month , year , employeeId } = location.state || {}
    const navigate = useNavigate()
    const [leaveType, setType] = useState("")

    const markLeave = () => {
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/attendence/mark-leave", { date, month, year, empId: employeeId, leaveType })
            .then((res) => {
                leaveRef.current.style.display = "none"
                setAbsentMark(false)

            })
            .catch((e) => {
                alert("something went wrong"+e)
                leaveRef.current.style.display = "none"

            })
    }

    useEffect(()=>{
       
        console.log(date) 
        console.log(month) 
        console.log(year) 
        console.log(employeeId) 
        console.log(leaveRef?.current) 

    },[])
    return (
        <div className="main-leave-type">
            <div className="input-value">
                <p>Enter Leave Type</p>
                <input type="text" value={leaveType} onChange={(e) => setType(e.target.value)} />
                <div className="btn-leave">
                    <button onClick={() => navigate(-1)}>Back</button>
                    <button onClick={markLeave}>Submit</button>
                </div>
            </div>
        </div>
    )
}