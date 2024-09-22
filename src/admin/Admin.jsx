import { useContext, useEffect, useState ,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminContext } from "../context/adminContext";
import "./Admin.css"
import Present from "../present/Present";
import Absent from "../absent/Absent"
import axios from "axios";
import { monthDays, montIndex } from "../monthDays";
import SetLeaveType from "../setLeaveType/SetLeaveType";


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
    const [data , setData] = useState([])
    const leaveRef = useRef(null)
    const [absentMark, setAbsentMark] = useState(true)


    const markLeave1 = () => {
        leaveRef.current.style.display = "block"
    }

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
                console.log("logged out");
                
            })
            .catch((e)=>{
                alert("something went wrong")
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

        }
        if (admin && !admin.valid) {
            navigate("/login")
        }

        let mm = month < 10 ? "0"+month : ""+month
        let dd = date < 10 ? "0"+date : ""+date
        
        setFullDate(year+"-"+mm+"-"+dd)
    }, [date , month , year , admin])

    useEffect(() => {
        axios.defaults.withCredentials = true
        axios.post("http://localhost:5000/attendence/absent", { date, month, year })
            .then((res) => {
                setData(res.data)
            })
            .catch((e) => {
                alert("something went wrong")
            })
    }, [date, month, year,absentMark])

    useEffect(() => {
        if (leaveRef) {
            leaveRef.current.style.display = "none"
        }
    }, [])

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
                   
                </div>

                <div className="mark-as-holiday buttonAndSort">
                    
                    <div className="increaserAndDecreaser">
                        <button
                            onClick={handleDecreaseDate}
                            >
                            {"<"}
                        </button>
                        
                    </div>
                            <button onClick={markLeave1}>{data.filter(a => a.absent.find(b => b.date == date && b.year == year && b.month == month)?.holiday)?.length >0
                                ? "Unmark Holiday" : "Mark Holiday"}</button>
                    <div className="increaserAndDecreaser">
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
                            : <Absent month={month} date={date} year={year} data = {data.length > 0 && data} setAbsentMark={setAbsentMark} absentMark={absentMark}/>
                    }
                </div>
            </div>
            <div ref={leaveRef}>
            
            <SetLeaveType leaveRef={leaveRef} date={date} month={month} year={year} employeeId={null} setAbsentMark={setAbsentMark} absentMark={absentMark}/>
         </div>
        </div>
    )
}