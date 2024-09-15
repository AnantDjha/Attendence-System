import { Profiler, useContext, useEffect, useState } from "react"
import { adminContext } from "../context/adminContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import profile from "../assets/profile.png"
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./Employee.css"
import { monthDays } from "../monthDays";

export default function Employee() {

    const param = useParams()
    const [month , setMonth] = useState("sep")
    const { admin, setAdmin } = useContext(adminContext);
    const [empDetail, setEmpDetail] = useState({
        firstName: "Anant",
        lastName: "Jha",
        email: "aan@gmail.com",
        empId: "9028828688"
    })
    const [Attendence, setAttendence] = useState({
        present: [1, 2, 3, 4, 5, 6, 7, 8],
        absent: [{ leave: true }, { leave: false }, { leave: false }, { leave: true }, { leave: true }, { leave: true }, { leave: false },]
    })

    const [leave , setLeave] = useState(0)

    const handleLogout = () => {
        axios.defaults.withCredentials = true
        axios.get("http://localhost:5000/admin/logout")
            .then((res) => {
                setAdmin({ valid: false })
                navigate("/login")
            })
    }

    //getting deatil of emp
    const getEmpDetail = ()=>{
        axios.post("http://localhost:5000/detail/personal" , {empId : param.id})
        .then((res)=>{
            setEmpDetail(res.data.value)
        })
        .catch((e)=>{
            alert("something went wrong")
        })
    }

    const getAttendenceDetail = ()=>{
        axios.post("http://localhost:5000/detail/attendence" , {empId : param.id , month:monthDays[month].value})
        .then((res)=>{
            setAttendence(res.data.value)
        })
        .catch((e)=>{
            alert("something went wrong")
        })
    }

    useEffect(()=>{
        getEmpDetail()
    },[])
    useEffect(()=>{
        getAttendenceDetail()
    },[month])

    useEffect(()=>{
        setLeave(Attendence.absent.filter(a=> a.leave == true).length)
    },[Attendence])

    return (
        (empDetail && Attendence) &&
        <div className="main-employee">
            <div className="greeting">
                <p>Wellcome, {admin && admin.valid ? admin.value.firstName : ""}</p>
                <Link onClick={handleLogout}>Logout</Link>
            </div>

            <div className="detail-emp">
                <div className="emp-personal-detail">

                    <div className="text">
                        <div><span>Full Name:</span> <p>{empDetail.firstName + " " + empDetail.lastName}</p></div>
                        <div><span>Email Address:</span> <p>{empDetail.email}</p></div>
                        <div><span>Employee ID</span> <p>{empDetail.empId}</p></div>

                    </div>
                    <div className="img-emp">
                        <img src={profile} alt="" />
                    </div>
                </div>
            </div>

            <div className="select-month">
                <p>Attendence Progress</p>
                <div>
                    <span>Month:</span>
                <select value={month} onChange={(e)=> setMonth(e.target.value)}>
                    <option value="jan">Jan</option>
                    <option value="feb">Feb</option>
                    <option value="mar">Mar</option>
                    <option value="apr">Apr</option>
                    <option value="may">May</option>
                    <option value="jun">Jun</option>
                    <option value="jul">Jul</option>
                    <option value="aug">Aug</option>
                    <option value="sep">Sep</option>
                    <option value="oct">Oct</option>
                    <option value="nov">Nov</option>
                    <option value="dec">Dec</option>
                </select>
                </div>
                
            </div>

            <div className="tracker">
                <div className="bar" style={{ width: 150, height: 150 }}>
                    <p>Total Days</p>
                    <CircularProgressbarWithChildren
                        value={100}
                        styles={buildStyles({
                            pathColor: 'yellow',
                            trailColor: '#eee'
                        })}
                    >
                        <div style={{fontSize:"40px",color:"yellow", width:"100%" , textAlign:"center"}}>
                            <strong>{monthDays[month].days}</strong>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>


                <div className="bar" style={{ width: 150, height: 150 }}>
                    <p>Presnt</p>

                    <CircularProgressbarWithChildren
                        value={(Attendence.present.length * 100 /monthDays[month].days )}
                        styles={buildStyles({
                            pathColor: 'green',
                            trailColor: '#eee'
                        })}
                    >
                        <div style={{fontSize:"40px",color:"green", width:"100%" , textAlign:"center"}}>
                            <strong>{Attendence.present.length}</strong>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="bar" style={{ width: 150, height: 150 }}>
                    <p>Absent</p>

                    <CircularProgressbarWithChildren
                        value={(Attendence.absent.length * 100 /monthDays[month].days )}
                        styles={buildStyles({
                            pathColor: 'red',
                            trailColor: '#eee'
                        })}
                    >
                        <div style={{fontSize:"40px",color:"red", width:"100%" , textAlign:"center"}}>
                            <strong>{Attendence.absent.length}</strong>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="bar" style={{ width: 150, height: 150 }}>
                    <p>On Leave</p>

                    <CircularProgressbarWithChildren
                        value={(leave* 100 /monthDays[month].days )}
                        styles={buildStyles({
                            pathColor: 'blue',
                            trailColor: '#eee'
                        })}
                    >
                        <div style={{fontSize:"40px",color:"Blue", width:"100%" , textAlign:"center"}}>
                            <strong>{leave}</strong>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            </div>
        </div>
    )
}