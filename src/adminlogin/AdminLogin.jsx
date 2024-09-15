import { useForm } from "react-hook-form"
import "./login.css"
import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { adminContext } from "../context/adminContext"

export default function AdminLogin() {

    const {admin , setAdmin} = useContext(adminContext)
    const [result , setResult] =useState(null)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting, }
    } = useForm()


    const onSubmit = (data) => {
        
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/admin/login" , data)
        .then((res)=>{
            setResult(res.data)
            reset()
            if(res.data.got)
            {
                setAdmin({valid:true, value:res.data.data})
                navigate("/admin-page")
            }
        
            
        })
        .catch((e)=>{
            alert("something went wrong" + e)
        })
    }
    return (
        <div className="main-login">
            {
                result && <div className={result.got ? "msg-g msg" : "msg-r msg"}>{result.message}</div>
            }
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="field">
                    <p>Admin Id</p>
                    <input type="text"  {...register("id", {
                        required: { value: true, message: "Id is required" }
                    })} />
                    {
                        errors.id && <span>{errors.id.message}</span>
                    }
                </div>
                <div className="field">
                    <p>Password</p>
                    <input type="password" {...register("password", {
                        required: { value: true, message: "password is required" }
                    })} />
                    {
                        errors.password && <span>{errors.password.message}</span>
                    }
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}