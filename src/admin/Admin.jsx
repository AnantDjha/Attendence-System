import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminContext } from "../context/adminContext";
import "./Admin.css"
import Present from "../present/Present";
import Absent from "../absent/Absent"
import axios from "axios";
import { monthDays, montIndex } from "../monthDays";


export default function Admin() {
    const { admin, setAdmin } = useContext(adminContext)
    const [logoutRes, setLogoutRes] = useState(true)
    const [sorter, setSorter] = useState("")
    const navigate = useNavigate()
    const [present, setPresent] = useState(true)
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [date, setDate] = useState(new Date().getDate())
    const [year, setYear] = useState(new Date().getFullYear())
    const [fullDate, setFullDate] = useState("")

    const setPresentDate = (e) => {
        // console.log(e.target.value);  
        const [y, m, d] = e.target.value.split("-")
        setYear(parseInt(y))
        setMonth(parseInt(m))
        setDate(parseInt(d))
    }

    const handleLogout = () => {
        axios.defaults.withCredentials = true
        axios.get("http://localhost:5000/admin/logout")
            .then((res) => {
                setAdmin({ valid: false })
                navigate("/login")
            })
    }

    const handleDecreaseDate = () => {
        let mm = month;
        let yy = year;
        let dd = date;
        if (date == 1 && month == 1) {
           dd = 31
            
            mm = 12
        yy = year -1
        }
        else if (date == 1) {
            let temp = monthDays[montIndex[month - 2]].days;

            dd = temp
            mm = month-1
        }
        else {
            dd = date-1;
        }
        
        setDate(dd)
        setMonth(mm)
        setYear(yy)
       
    }

    const handleIncreaseDate = ()=>{
        let mm = month;
        let yy = year;
        let dd = date;
        let temp = monthDays[montIndex[month - 2]].days;

        if (date == temp && month == 12) {
            dd = 1
            mm = 1
            yy = year+1;
        yy = year -1
        }
        else if (date == temp) {
            dd = 1
            mm = month+1
        }
        else {
            dd = date+1;
        }
        
        setDate(dd)
        setMonth(mm)
        setYear(yy)
    }

    useEffect(() => {

        if (!admin) {
            navigate("/")
            navigate("/admin-page")
            if (!admin.valid) {
                navigate("/login")
            }
        }

        let mm = month < 10 ? "0"+month : ""+month
        let dd = date < 10 ? "0"+date : ""+date
        
        setFullDate(year+"-"+mm+"-"+dd)
    }, [date , month , year])

    useEffect(() => {
        console.log(sorter);

    }, [sorter])
    return (
        <div className="main-admin">
            <div className="greeting">
                <p>Wellcome, {admin && admin.valid ? admin.value.firstName : ""}</p>
                <Link onClick={handleLogout}>Logout</Link>
            </div>

            <h3>Attendence List</h3>
            <div className="attendenceList">
                <div className="buttonAndSort">
                    <div className="btn">
                        <button style={{ backgroundColor: present ? "gray" : "green" }} onClick={() => {
                            setPresent(!present)
                        }} disabled={present}>Present</button>
                        <button style={{ backgroundColor: !present ? "gray" : "green" }} onClick={() => {
                            setPresent(!present)
                        }} disabled={!present}>Absent</button>
                    </div>
                    <div className="sorter">
                        <span>Date:</span>
                        <input type="date" value={fullDate} onChange={setPresentDate} />
                    </div>
                    <div className="increaserAndDecreaser">
                        <button
                            onClick={handleDecreaseDate}
                        >
                            {"<"}
                        </button>
                        <button
                            onClick={handleIncreaseDate}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
                <div>
                    {
                        present ? <Present month={month} date={date} year={year} />
                            : <Absent month={month} date={date} year={year} />
                    }
                </div>
            </div>
        </div>
    )
}