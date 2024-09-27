import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { empContext } from "../context/empContext"

export default function EmployeeQuerry() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        formState: { errors, isSubmitting }
    } = useForm()

    const [forLeave, setForLeave] = useState(false)
    const [response, setResponse] = useState(null);
    const [selectValue, setSelectValue] = useState("")
    const date = new Date().getDate()
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear()
    const leaveDateRef = useRef(null)
    const navigate = useNavigate()
    const param = useParams()
    const { employee } = useContext(empContext);

    const onSubmit = (data) => {

        if (forLeave) {
            let a = new Date(data.leave)
            let b = new Date(year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date))

            if (a < b) {
                setError("leave", {
                    type: "manual",
                    message: "Cant be smaller than current date"
                })
                return
            }
        }

        let obj = data
        obj.empId = param.id

        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/emp-querry/add", obj)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((e) => {
                setResponse({ completed: false, message: "Please try again later" })
            })

        reset()
    }

    useEffect(() => {
        if (!employee) {
            navigate("/")
            navigate(-1)
        }
        if (employee && (!employee.valid || employee.value.empId != param.id)) {
            navigate("/");
            return;
        }
    }, [])

    useEffect(() => {
        if (selectValue == "Apply for Leave") {
            if (leaveDateRef.current)
                leaveDateRef.current.style.display = "block"

            setForLeave(true)
        }
        else {
            if (leaveDateRef.current)
                leaveDateRef.current.style.display = "none"

            setForLeave(false)
        }
    }, [selectValue])

    useEffect(() => {
        if (response) {
            const timer = setTimeout(() => {
                setResponse(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [response]);


    return (
        <div className="main-querry main-home">
            {
                response && <div className={response.completed ? "msg-g" : "msg-r"}>{response.message}</div>
            }
            <div className="attendence-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="emp-id">
                        <p>Enter Subject</p>
                        <select  {...register("subject", {
                            required: { value: true, message: "This feild is required" }
                        })}
                            onChange={(e) => {
                                setSelectValue(e.target.value)
                            }}
                        >

                            <option value="Having trouble with Attendence - Marked Leave">
                                Having trouble with Attendence - Marked Leave
                            </option>
                            <option value="Having trouble with Attendence - Marked Absent">
                                Having trouble with Attendence - Marked Absent
                            </option>
                            <option value="Apply for Leave">
                                Apply for Leave
                            </option>
                            <option value="Other">
                                Other
                            </option>
                        </select>
                        {
                            errors.subject && <span>{errors.subject.message}</span>
                        }
                    </div>

                    <div className="date">
                        <span>Current Date:</span>
                        <span>{"" + (date < 10 ? "0" + date : date) + "-" + (month < 10 ? "0" + month : month) + "-" + year}</span>
                    </div>


                    <div className="emp-id">
                        <p>Describe your Problem</p>
                        <textarea {...register("describe", {
                            required: {
                                value: true, message: "Field is required"
                            }
                        })}>

                        </textarea>
                        {
                            errors.describe && <span>{errors.describe.message}</span>
                        }
                    </div>

                    <div className="date" ref={leaveDateRef}>
                        <div>
                            <span>Leave Date:</span>
                            <input type="date" {...register("leave", {
                                required: { value: forLeave, message: "field is required" }
                            })} />
                            {
                                errors.leave && <p style={{ color: "red", fontSize: "14px" }}>{errors.leave.message}</p>
                            }
                        </div>

                        <div className="emp-id">
                            <p>Leave type</p>
                            <input type="text" {...register("leaveType" , {
                                required:{value:forLeave , message: "field is required"}
                            })}/>
                             {
                                errors.leaveType && <p style={{ color: "red", fontSize: "14px" }}>{errors.leaveType.message}</p>
                            }
                        </div>
                    </div>
                    <div className="buttons">
                        <span onClick={() => { navigate(-1) }}>
                            Back
                        </span>
                        <button type="submit">
                            Send
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}