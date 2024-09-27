import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from "../assets/profile.png"
import { useEffect, useState } from "react";
import axios from "axios"

export default function Message({ messageData, reRenderer, setReRenderer }) {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(-1)
    const [resultMessage , setResultMessage] = useState(null)

    const approveLeave = (empId, dateStr) => {
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:5000/emp-querry/acceptLeaveChange", { empId, dateStr })
            .then((res) => {
                setResultMessage(res.data)
                setTimeout(()=>{
                    
                    setReRenderer(!reRenderer)
                    setResultMessage(null)
                }, 2000)
            })
            .catch((e) => {
                setResultMessage({completed:false , message:"something went wrong"})

            })
    }

    const reject = (empId, dateStr)=>{
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:5000/emp-querry/reject", { empId, dateStr })
            .then((res) => {
                setResultMessage(res.data)
                setTimeout(()=>{
                    
                    setReRenderer(!reRenderer)
                    setResultMessage(null)
                }, 2000)
            })
            .catch((e) => {
                setResultMessage({completed:false , message:"something went wrong"})

            })
    }

    useEffect(() => {
        let arr = messageData.filter(a => a.leaveDate == undefined);
        setData(arr);
    }, [messageData])
    return (
        data.length <= 0 ? <div className="noRecord">
            <h3 style={{ padding: "1rem 0" }}>No Notifications</h3>
        </div>
            :
            <div className="main-message">
                {
                    resultMessage && <p className={resultMessage.completed ? "res-g" :"res-r"}>{resultMessage.message}</p>
                }
                {
                    data.map((item, i) => {
                        return (

                            <div className="message-box-slap" key={i}>
                                {
                                    visible == i &&
                                    <>
                                        {item.heading != "Other" &&
                                            <div className="r-a-btn">
                                                <button onClick={()=> reject(item.empId, item.initalizeOn.split("T")[0])}>Reject</button>
                                                {
                                                    item.heading == "Having trouble with Attendence - Marked Leave" ?
                                                        <button onClick={() => { approveLeave(item.empId, item.initalizeOn.split("T")[0]) }}>Approve</button>
                                                        :
                                                        <button onClick={() => { approveLeave(item.empId, item.initalizeOn.split("T")[0]) }}>Approve2</button>

                                                }
                                            </div>
                                        }
                                        <div className="content">
                                            <span>Message:</span>
                                            <p>{item.content}</p>

                                        </div>
                                    </>

                                }
                                <div className="photo-name-btn">
                                    <div className="photo-name">
                                        <img src={profile} alt="" />
                                        <span >Name: {item.firstName + " " + item.lastName}</span>
                                    </div>
                                    <span style={{ fontSize: "19px", cursor: "pointer", position: "absolute", top: "-1.8rem", right: "0" }} onClick={() => {
                                        console.log(visible);

                                        if (visible == item.empId) {
                                            setVisible(-1)
                                        }
                                        else {
                                            setVisible(i)
                                        }
                                    }}><FontAwesomeIcon icon={faArrowAltCircleDown} /></span>
                                </div>
                                <div className="date-init">
                                    <span>Date: </span><span>{item.initalizeOn.split("T")[0]}</span>
                                </div>
                                <div className="subject">
                                    <span>Subject: </span><span>{item.heading}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    )
}