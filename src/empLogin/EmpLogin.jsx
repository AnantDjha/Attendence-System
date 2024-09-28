import { useForm } from "react-hook-form"
import "./EmpLogin.css"
import { useContext, useState } from "react"
import axios from 'axios'
import { empContext } from "../context/empContext"
import { useNavigate } from "react-router-dom"


export default function EmpLogin() {

    const navigate = useNavigate()
    const {employee , setEmployee} = useContext(empContext)
    const [email , setEmail] = useState("")
    const [otpObj , setOtpObj] = useState(null)
    const [actual , setActual] = useState("")
    

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting, }
    } = useForm()

    const onSubmit = (data)=>{
       if(actual != data.otp)
       {
        setOtpObj({got:false , message:"Incorrect OTP"})
        return;
       }

       axios.defaults.withCredentials = true
       axios.post("http://localhost:5000/emp-login/login" , data)
       .then((res)=>{
        if(res.data.got)
        {
            setEmployee(res.data.data)
            navigate("/attendence-mark/"+res.data.data.value.empId)
        }
            setOtpObj(res.data)
       })
    }

    const getOpt = ()=>{
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/otp" , {email:email})
        .then((res)=>{
            if(res.data.got)
            {
                console.log(res.data.value);
                
                setActual(res.data.value)
            }
            setOtpObj(res.data)
            console.log(res.data.message)
        })
        .catch((e)=>{
            console.log(e);
            setOtpObj({got:false , message:"Please Try again later"})
        })
    }

    return (

        <div className="main-emp-login">
            {
                otpObj && <div className={otpObj.got ? "msg-g" : "msg-r"}>{otpObj.message}</div>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="emp-id">
                    <p>Enter Your Email</p>
                    <input type="email" {...register("email", {
                        required: { value: true, message: "This is required" }
                    })} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    {
                        errors.email && <span>{errors.email.message}</span>
                    }
                </div>
               
                <div className="emp-id otp">
                    <div className="inp">
                    <p>Enter OTP</p>
                    <input type="text" {...register("otp", {
                        required: { value: true, message: "This is required" }
                    })} />
                    {
                        errors.otp && <span>{errors.otp.message}</span>
                    }
                    </div>
                    <div className="get">
                        <span onClick={()=>{getOpt()}}>Get</span>
                    </div>
                </div>

                <button  type="submit">Verify</button>

            </form>
        </div>
    )

}