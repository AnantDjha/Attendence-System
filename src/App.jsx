
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import Home from './home/Home'
import AdminLogin from './adminlogin/AdminLogin'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { adminContext } from './context/adminContext'
import Admin from './admin/Admin'
import Employee from './employee/Employee'

function App() {

  const {admin , setAdmin} = useContext(adminContext)

  const getAdmin = ()=>{
    axios.defaults.withCredentials = true
    axios.get("http://localhost:5000/admin")
    .then((res)=>{
      setAdmin(res.data)
    })
  }

  useEffect(()=>{
    getAdmin()
    console.log(admin);
    
  } , [])
  const router = createBrowserRouter([
    {
      path:"/",
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
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
