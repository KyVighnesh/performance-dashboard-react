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
} from "recharts";

import Anim from "../Anim.json"
import Lottie from "lottie-react"

import axios from "axios";
import { useState,useEffect } from "react";


const Dashboard = () => {

    const[data,setData] = useState()

    const[toggle,setToggle] = useState(false)

    const[bgColor,setbgColor] = useState()

    const [move,setFloat] = useState ()


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
        <div style={{backgroundColor:bgColor}}>
          
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">Dashboard</span>
  </div>
</nav>

<div style={{display:'flex'}}>
          <div className="App" style={{marginTop:"30px"}}>

            <BarChart
              width={1200}
              height={600}
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
          </div>

          <div style={{height:"38px", width:"120px", borderRadius:"20px",backgroundColor:"silver",marginLeft:"100px",cursor:"pointer"}} onClick = {onClickToggle}>
            <button style={{height:"35px",width:"35px",borderRadius:"20px",marginLeft:move,transition:"linear 0.5s"}}>

            </button>
          </div>
          <div style={{height:"40px",marginTop:"30px",width:"120px"}}>
          <Lottie style = {{height:"80px",position:"relative",right:80}}animationData={Anim} />
          <span style={{position:"relative",right:80,fontWeight:10}}>Dark Mode</span>
          </div>
          </div>    
        </div>
      );
}

export default Dashboard