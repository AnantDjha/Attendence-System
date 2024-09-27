import { useEffect, useState } from "react"
import { montIndex } from "../monthDays"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function AttendenceTable() {

    const [data, setData] = useState(null)
    const [dataArr, setDataArr] = useState([])
    const [month, setMonth] = useState(new Date().getMonth())
    const [year , setYear] = useState(new Date().getFullYear())
    const param = useParams()

    const handleDecreaseDate = ()=>{

        if(month == 0)
        {
            setMonth(11);
            setYear(year-1);
            return;
        }
        setMonth(month -1);
    }
    const handleIncreaseDate = ()=>{

        if(month == 11)
        {
            setMonth(0);
            setYear(year+1);
            return;
        }
        setMonth(month +1);
    }

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:5000/detail/attendence", { empId: parseInt(param.id), month: month + 1 })
            .then((res) => {
                setData(res.data.value)
            })
            .catch((e) => {
                alert("something went wrong")
            })
    }, [month])

    useEffect(() => {
        if (data) {
            setDataArr([...data.present, ...data.absent])

        }
    }, [data])

    return (


        <div className="main-table">
            {!data ? <p>Loading...</p>
                : <>
                    <div className="increaserAndDecreaser-emp increaserAndDecreaser">
                        <button
                        onClick={handleDecreaseDate}
                        >
                            {"<"}
                        </button>
                        <span >{montIndex[month].toUpperCase()+ "-"+ year}</span>
                        <button
                        onClick={handleIncreaseDate}
                        >
                            {">"}
                        </button>

                    </div>

                    <div className="table-data">
                        <table border={1} >
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Mark</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataArr.sort((a, b) => a.date - b.date).map((item ,i ) =>{
                                        return (
                                            <tr key={i} className={ item.leave == undefined ? "bg-green1" :  (!item.leave ? "bg-red1" :("bg-blue1"))}>
                                                <td>{item.year +"-"+ montIndex[month] + "-" + (item.date< 10 ? "0"+item.date : item.date)}</td>
                                                <td>{item.leave == undefined ? "Present" : (!item.leave ? "Absent" : (item.holiday?"Holiday":"Leave"))}</td>
                                                <td>{item.leave == undefined ? "-" : (!item.leave ? "-" :(item.leaveType))}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    
                </div>
        </>
            }
        </div >
    )
}