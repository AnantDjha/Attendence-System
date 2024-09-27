import { useContext, useEffect, useState } from "react"
import { adminContext } from "../context/adminContext"
import { Link } from "react-router-dom"
import AdminNav from "../admin/AdminNav"
import "./Notification.css"
import axios from "axios"
import Message from "./Messages"
import LeaveApplication from "./LeaveApplication"

export default function Notification()
{
    const {admin} = useContext(adminContext)
    const [messageData , setMessageData] = useState([])
    const [switcher , setSwitcher] = useState(true);
    const [reRenderer , setReRenderer] = useState(true)

    useEffect(()=>{
        axios.defaults.withCredentials = true
        axios.get("http://localhost:5000/emp-querry")
        .then((res)=>{
            setMessageData(res.data)
        })
        .catch((e)=>[
            alert("somrthing went wrong")
        ])
    } , [reRenderer])

    return (
        <div className="main-noti">
            <AdminNav/>
            <h3>Notifications</h3>

            <div className="switch-btns">
                <button disabled={switcher}  onClick={()=>setSwitcher(!switcher)}>Messages</button>
                <button disabled={!switcher} onClick={()=>setSwitcher(!switcher)}>Leave Applications</button>
            </div>
            <div className="message-box">
                {
                    switcher ? 
                    <Message messageData={messageData} reRenderer = {reRenderer} setReRenderer = {setReRenderer}/>

                    :<LeaveApplication messageData={messageData} reRenderer = {reRenderer} setReRenderer = {setReRenderer}/>
                }
            </div>
        </div>
    )
}