import { useForm } from "react-hook-form"
import "./Home.css"
import { useState } from "react"
import axios from "axios"
export default function Home() {

    const [empId , setEmpId] = useState("")
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [department , setDepartment] = useState("IT")
    const [fetchMessage , setFetchMessage] = useState(null)
    const [attendence , setAttendence] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting, }
    } = useForm()

    const handleFectch = ()=>{
        axios.defaults.withCredentials = true

        axios.post("http://localhost:5000/employee/fetch-details" , 
            { empId , firstName , lastName },
        )
        .then((res)=>{
            if(res.data.got)
            {
                setEmpId(res.data.empId)
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
            
            }
            setFetchMessage(res.data)
        })
    }

    const onSubmit = (data) => {
        setFetchMessage(null)
        axios.defaults.withCredentials = true;

        axios.post("http://localhost:5000/employee/mark-attendence" , {empId , password : data.password})
        .then((res)=>{
           setAttendence(res.data)
           setTimeout(()=>{
            setAttendence(null)
           }, 3000)
        })
        .catch((e)=>{
            alert("somrthing went wrong")
        })
    }


    return (
        <div className="main-home">
            {
                fetchMessage && <div className={fetchMessage.got ? "msg-g" :"msg-r"}>{fetchMessage.message}</div>
            }
            <div className="attendence-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="emp-id">
                        <p>Enter Your Employee ID</p>
                        <input type="text" {...register("empId", {
                            required: { value: true, message: "This is required" }
                        })} value={empId} onChange={(e) => setEmpId(e.target.value)}/>
                        {
                            errors.empId && <span>{errors.empId.message}</span>
                        }
                    </div>

                    <p className="or">
                        OR
                    </p>

                    <div className="name">
                        <div className="first">
                            <p>First Name</p>
                            <input type="text" {...register("firstName", {})} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            {
                                errors.firstName && <span>{errors.firstName.message}</span>
                            }
                        </div>
                        <div className="last">
                            <p>Last Name</p>
                            <input type="text" {...register("lastName", {
                            })} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            {
                                errors.lastName && <span>{errors.lastName.message}</span>
                            }
                        </div>
                    </div>

                    <div className="emp-id">
                        <p>Select Branch</p>
                        <select {...register("department" ,{
                            required:true
                        })} onChange={(e)=>setDepartment(e.target.value)}>
                            <option value="IT">IT</option>
                            <option value="Management">Management</option>
                            <option value="Back office">Back Office</option>
                            <option value="Other">Other</option>
                        </select>
                       
                    </div>

                    <div className="emp-id">
                        <p>Password</p>
                        <input type="password" {...register("password", {
                            required: { value: true, message: "This is required" }
                        })} />
                        {
                            errors.password && <span>{errors.password.message}</span>
                        }
                    </div>

                    <div className="buttons">
                        <button type="submit">
                            Mark attendence
                        </button>
                        <span onClick={handleFectch}>
                            fetch Details
                        </span>
                    </div>

                </form>
                
            </div>
            {
                attendence && <div className={attendence.got ? "attend-g" :"attend-r"}>{attendence.message}</div>
            }
        </div>
    )
}