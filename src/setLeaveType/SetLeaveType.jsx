import { Navigate, useLocation, useNavigate } from "react-router-dom"
import "./LeaveType.css"
import { useEffect, useState } from "react"
import axios from "axios"
export default function SetLeaveType({ date, month, year, employeeId, setAbsentMark, leaveRef , absentMark}) {
    // const location = useLocation()
    // const {date , month , year , employeeId } = location.state || {}
    const navigate = useNavigate()
    const [leaveType, setType] = useState("")

    const markLeave2 = () => {
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/attendence/mark-leave", { date, month, year, empId: employeeId, leaveType })
            .then((res) => {
                leaveRef.current.style.display = "none"

                if(absentMark != null)
                {

                    setAbsentMark(!absentMark)
                }
               
            })
            .catch((e) => {
                alert("something went wrong: " + e)
                leaveRef.current.style.display = "none"
            })
    }

   
    return (
        <div className="main-leave-type">
            <div className="input-value">
                <p>Enter Leave Type</p>
                <input type="text" value={leaveType} onChange={(e) => setType(e.target.value)} />
                <div className="btn-leave">
                    <button onClick={() => {
                        if(leaveRef.current)
                        {
                            leaveRef.current.style.display = "none"
                        }
                    }}>Back</button>
                    <button onClick={markLeave2}>Submit</button>
                </div>
            </div>
        </div>
    )
}