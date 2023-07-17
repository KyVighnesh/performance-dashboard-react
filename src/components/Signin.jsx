import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {BsFillPersonFill} from "react-icons/bs";
import axios from 'axios';
import LogHead from "../LogHead.json"
import Lottie from "lottie-react"

const Signin = () => {

    const navigate = useNavigate()


    const [user,setUser] = useState({email:"",password:""})

    const [emailError,setEmailError] = useState("")
    const [passwordError,setPasswordError] = useState("")
 


    const onClickClear = () => {
        setUser({email:"",password:""})
            setEmailError("")
            setPasswordError("")

    }





    const handleChange = (event) => {
        setUser({...user,[event.target.name]:event.target.value})


        
    }

    const onHandleClick = () => {
        
        let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/)



        if(regexEmail.test(user.email) && regexPassword.test(user.password)) {

            setEmailError("")
            setPasswordError("")

            axios.post("https://performance-dashboard-backend.onrender.com/login",user).then(res=> {
                console.log(res.data)

                if(res.data.token) {
                    navigate("/Dashboard")
                }
            }).catch(err=> {
                console.log(err)

                if(err) {
                    alert("user not found")

                    setUser({email:"",password:""})
                }
            })
           
            
        }

        else if(regexEmail.test(user.email) == false || regexPassword.test(user.password) == false) {
            console.log("error updated")

          

            if(regexEmail.test(user.email) == false) {
                setEmailError("Invalid Email")
                console.log(emailError)
            }
            

            if(regexPassword.test(user.password) == false) {
                setPasswordError("Password Should Contain minimum 8 characters , 1 uppercase , 1 lowercase , 1 special character ")

            }
        }

    }

  return (
    <div style={{backgroundColor:"#8AAAE5",height:window.innerHeight,display:"flex",alignItems:"center"}}>
    <div style={{width:"500px",margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"white",height:"500px",borderRadius:"10px"}}>
    <div style={{width:"400px",textAlign:"center"}}>
    </div>
<div style={{width:"400px",marginTop:"20px"}}>
<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"20px"}}>
    
{/* <BsFillPersonFill style={{fontSize:"25px"}}/> */}

<Lottie style = {{height:"40px",marginRight:"5px"}}animationData={LogHead} />

Log in
</div>

<input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping"name = "email" value = {user.email} onChange = {handleChange}/>
<div style={{color:'red'}}>
{emailError}
</div>
</div>
<div style={{width:"400px",marginTop:"20px"}}>

<div style={{display:'flex'}}>

<input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping" name = "password" value = {user.password} onChange = {handleChange}/>

</div>

<div style={{color:'red'}}>
{passwordError}
</div>
</div>

<div style={{textAlign:"center",width:"400px", marginTop:"20px"}}>
<button type="button" class="btn btn-primary" onClick={onHandleClick}>Log in</button>
</div>

<div style={{textAlign:"center",width:"400px", marginTop:"20px"}}>
<button type="button" class="btn btn-primary" onClick = {onClickClear}>Clear</button>

</div>

<span style={{marginTop:"30px"}}><a style = {{color:"black",textDecoration:"none"}}href='/signup'>Click Here To Create An Account </a></span>


</div>

</div>
  )
}

export default Signin