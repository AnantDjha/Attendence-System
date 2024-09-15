
import axios from "axios"
import { useEffect, useState } from "react"
import "../present/Present.css"
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

    const markLeave = (empId)=>{
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/attendence/mark-leave" , {date , month , year , empId})
        .then((res)=>{
            setAbsentMark(!absentMark)
        })
        .catch((e)=>{
            alert("something went wrong")
        })
    }

    useEffect(()=>{
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/attendence/absent" , {date , month , year})
        .then((res)=>{
            setData(res.data)
        })
        .catch((e)=>{
            alert("something went wrong")
        })
    } , [date , month , year, absentMark])


    return (
        <div className="present-main">
            {
                data.length <= 0 ? <div className="noRecord">
                    <h3>List is Empty</h3>
                </div>
                : <div className="list">
                    <h5 className="absemt-emp-h3">Absent Employee</h5>
                    {
                        data.filter(a => a.absent.find(b => b.date == date && b.year == year && b.month == month)?.leave == false).length == 0 ?
                        <div className="no-emp">
                            No Absent Employee
                        </div>
                        
                        :data.filter(a => a.absent.find(b => b.date == date && b.year == year && b.month == month)?.leave == false)
                        .map((item , i) =>{
                            return (
                                <div className="emp-box bg-red" key={i}>
                                    <div className="img">
                                        <img src={profile} alt="" onClick={()=>{navigate("/employee/"+item.empId)}}/>
                                    </div>
                                    <div className="detail">
                                        <div><span>Employee ID: </span><p>{item.empId}</p></div>
                                        <div><span>Name: </span><p>{item.firstName +" "+ item.lastName}</p></div>
                                       
                                    </div>
                                    <div className="marker">
                                        <button style={{backgroundColor:"green"}} onClick={()=> markLeave(item.empId)}>Mark Leave</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <h5 className="absemt-emp-h3">On leave</h5>
                    {
                        data.filter(a => a.absent.find(b => b.date == date && b.year == year && b.month == month)?.leave == true).length == 0 ?
                        <div className="no-emp">
                            No one on Leave
                        </div>
                        
                        :data.filter(a => a.absent.find(b => b.date == date && b.year == year && b.month == month)?.leave == true)
                        .map((item , i) =>{
                            return (
                                <div className="emp-box bg-green" key={i}>
                                    <div className="img">
                                        <img src={profile} alt="" onClick={()=>{navigate("/employee/"+item.empId)}}/>
                                    </div>
                                    <div className="detail">
                                        <div><span>Employee ID: </span><p>{item.empId}</p></div>
                                        <div><span>Name: </span><p>{item.firstName +" "+ item.lastName}</p></div>
                                       
                                    </div>
                                    <div className="marker">
                                        <button onClick={()=> markAbsent(item.empId)}>Mark as Absent</button>
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