import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer
} from "recharts";

import Anim from "../Anim.json"
import Lottie from "lottie-react"

import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {

    const[data,setData] = useState()

    const[toggle,setToggle] = useState(false)

    const[bgColor,setbgColor] = useState()

    const [move,setFloat] = useState ()


    const navigate = useNavigate()



    const logOut = () => {
        navigate("/")
    }


    const onClickToggle = () => {
        setToggle(!toggle)

        console.log(toggle)

        if(toggle == false) {
            setbgColor("black")
            setFloat("85px")
        }
        else {
            setbgColor("white")
            setFloat("-1px")

        }
    }
    useEffect(()=> {
        axios.get("https://performance-dashboard-backend.onrender.com/getData").then(res=> {
            console.log(res.data.data)

            setData(res.data.data)
        })
    },[])
    
      return (
        <div style={{backgroundColor:bgColor,height:"94vh"}}>
          
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">Dashboard</span>
    <button type="button" class="btn btn-primary" onClick={logOut}>Log out</button>

  </div>
</nav>

<div style={{display:'flex',width:"100%",height:"100%",boxSizing:"border-box",marginTop:"20px"}}>
          <div className="App" style={{marginTop:"30px",width:"90%",height:"60vh"}}>

          <ResponsiveContainer>

            <BarChart
              
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="month"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="performance" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{marginLeft:"20px",width:"20%",display:"flex",flexDirection:"column",alignItems:"center"}}>

          <div style={{height:"38px", width:"8vw", borderRadius:"20px",backgroundColor:"silver",cursor:"pointer"}} onClick = {onClickToggle}>
            <button style={{height:"100%",width:"40%",borderRadius:"20px",marginLeft:move,transition:"linear 0.5s"}}>

            </button>
          </div>
          <div style={{height:"40px",width:"20%"}}>
          <Lottie style = {{height:"80px"}}animationData={Anim} />
          <span style={{position:"relative",fontWeight:10}}>Dark Mode</span>
          </div>
          </div>    
          </div>
        </div>
      );
}

export default Dashboard
