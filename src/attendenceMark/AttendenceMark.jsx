import { useContext, useEffect,useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import profile from "../assets/profile.png"
import axios from "axios"
import "./AttendenceMark.css"
import { useForm } from "react-hook-form"
import { empContext } from "../context/empContext"


export default function AttendenceMark()
{
    const navigate = useNavigate()
    const [attendence , setAttendence] = useState(null)
    const {employee , setEmployee} = useContext(empContext)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting, }
    } = useForm()

    const handleLogout = ()=>{
        axios.defaults.withCredentials = true
        axios.get("http://localhost:5000/emp-login/logout")
        .then((res)=>{
            setEmployee({valid:false})
            navigate("/")
        })
    }
    const [empDetail, setEmpDetail] = useState({
        firstName: "Anant",
        lastName: "Jha",
        email: "aan@gmail.com",
        empId: "9028828688"
    })
    const param = useParams()

    const getEmpDetail = ()=>{
        axios.post("http://localhost:5000/detail/personal" , {empId : param.id})
        .then((res)=>{
            setEmpDetail(res.data.value)
        })
        .catch((e)=>{
            alert("something went wrong")
        })
    }

    const onSubmit = (data)=>{
        axios.post("http://localhost:5000/employee/mark-attendence" , {empId:employee.value.empId})
        .then((res)=>{
           setAttendence(res.data)
           setTimeout(()=>{
            setAttendence(null)
           }, 3000)
        })
        .catch((e)=>{
            alert("somrthing went wrong")
        })    }

    useEffect(()=>{
        if(employee && !employee.valid)
        {
            navigate("/")
            return
        }
        getEmpDetail()
    },[employee])

    

    return (
        empDetail  && 
        <div className="main-mark">
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

           
            <form onSubmit={handleSubmit(onSubmit)} className="form-emp">
                <div className="text-area">
                    <p>Give description about todays work</p>
                    <textarea {...register("description", {
                        required:{value:true , message:"field is required"}
                    })}></textarea>
                    {
                        errors.description && <span>{errors.description.message}</span>
                    }
                </div>
                <div className="buttons">

                <button type="submit" >Mark Attendence</button>
                <span onClick={handleLogout}>logout</span>
                </div>
            </form>
            {
                attendence && <div className={attendence.got ? "attend-g" :"attend-r"}>{attendence.message}</div>
            }

           
            
        </div>
    )
}