
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import Home from './home/Home'
import AdminLogin from './adminlogin/AdminLogin'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { adminContext } from './context/adminContext'
import Admin from './admin/Admin'
import Employee from './employee/Employee'
import EmpLogin from './empLogin/EmpLogin'
import { empContext } from './context/empContext'
import AttendenceMark from './attendenceMark/AttendenceMark'
import SetLeaveType from './setLeaveType/SetLeaveType'

function App() {

  const {admin , setAdmin} = useContext(adminContext)
  const {employee , setEmployee} = useContext(empContext)


  const getAdmin = ()=>{
    axios.defaults.withCredentials = true
    axios.get("http://localhost:5000/admin")
    .then((res)=>{
      setAdmin(res.data)
    })
  }
  const getEmployee = ()=>{
    axios.defaults.withCredentials = true
    axios.get("http://localhost:5000/emp-login")
    .then((res)=>{
      setEmployee(res.data)
    })
  }

  useEffect(()=>{
    getAdmin()
    getEmployee()
    
  } , [])
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><EmpLogin/><Navbar/></>
    },
    {
      path:"/home",
      element:<><Home/><Navbar/></>
    },
    {
      path:"/login",
      element:<><AdminLogin/><Navbar/></>
    },
    {
      path:"/admin-page",
      element:<><Admin/></>
    },
    {
      path:"/employee/:id",
      element:<><Employee/></>
    },
    {
      path:"/attendence-mark/:id",
      element:<><AttendenceMark/><Navbar/></>
    },
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
