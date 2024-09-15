import axios from "axios"
import { useEffect, useState } from "react"
import "./Present.css"
import profile from "../assets/profile.png"
import { useNavigate } from "react-router-dom"


export default function Present ({month , date , year})
{
    const navigate = useNavigate()
    const [data , setData] = useState([])
    const [absentMark , setAbsentMark] = useState(true)

    const markAbsent = (empId)=>{
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/attendence/mark-absent" , {date , month , year , empId})
        .then((res)=>{
            setAbsentMark(!absentMark)
        })
        .catch((e)=>{
            alert("something went wrong")
        })
    }

    useEffect(()=>{
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/attendence/present" , {date , month , year})
        .then((res)=>{
            setData(res.data)
        })
        .catch((e)=>{
            alert("something went wrong")
        })
    } , [date , month , year , absentMark])


    return (
        <div className="present-main">
            {
                data.length <= 0 ? <div className="noRecord">
                    <h3>List is Empty</h3>
                </div>
                : <div className="list">
                    {
                        data.map((item , i) =>{
                            return (
                                <div className="emp-box" key={i}>
                                    <div className="img">
                                        <img src={profile} alt="" onClick={()=>{navigate("/employee/"+item.empId)}}/>
                                    </div>
                                    <div className="detail">
                                        <div><span>Employee ID: </span><p>{item.empId}</p></div>
                                        <div><span>Name: </span><p>{item.firstName +" "+ item.lastName}</p></div>
                                       
                                    </div>
                                    <div className="marker">
                                        <button onClick={()=>{markAbsent(item.empId)}}>Mark as Absent</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}