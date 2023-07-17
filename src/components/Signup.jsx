import React from 'react'
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {BsFillPersonFill} from "react-icons/bs";
import axios from 'axios';





const Signup = () => {

    const navigate = useNavigate()


    const [user,setUser] = useState({name:"",email:"",password:""})

    const [nameError,setNameError] = useState("")
    const [emailError,setEmailError] = useState("")
    const [passwordError,setPasswordError] = useState("")






    const onClickClear = () => {
        setUser({name:"",email:"",password:""})
        setNameError("")
            setEmailError("")
            setPasswordError("")

    }


    const handleChange = (event) => {
        
        setUser({...user,[event.target.name]:event.target.value})
    }

    const onHandleClick = () => {
        
        let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/)


        if(user.name.length>4 && regexEmail.test(user.email) && regexPassword.test(user.password)) {

            setNameError("")
            setEmailError("")
            setPasswordError("")

            axios.post("https://performance-dashboard-backend.onrender.com/createUser",user).then(data=> {
                console.log(data)

                if(data) {

                    alert("Sign up Successful")
                    setTimeout(()=> {

                        navigate('/')
                    },1000)
                }
            }).catch(err=> {
                console.log(err)
            })



            
        }

        else if(user.name.length<4 || regexEmail.test(user.email) == false || regexPassword.test(user.password) == false) {
            console.log("error updated")

            if(user.name.length<4) {
                setNameError("Name Should Atleast Contain 4 Characters")
                console.log(nameError)

            }

            else {
                setNameError("")

            }

            if(regexEmail.test(user.email) == false) {
                setEmailError("Invalid Email")
                console.log(emailError)
            }

            else {
                setEmailError("")
            }
            

            if(regexPassword.test(user.password) == false) {
                setPasswordError("Password Should Contain minimum 8 characters , 1 uppercase , 1 lowercase , 1 special character ")

            }
            else {
                setPasswordError("")

            }
        }

        
          

            
             

    }
    




  return (
    <div style={{backgroundColor:"#8AAAE5",height:window.innerHeight,display:"flex",alignItems:"center"}}>
    <div style={{width:"500px",margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"white",height:"500px",borderRadius:"10px"}}>
        

        <div style={{width:"400px",marginTop:"20px"}}>

        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"20px"}}>
    
    <BsFillPersonFill style={{fontSize:"25px"}}/>
    
    Sign up
    </div>
  
  
  <input type="text" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="addon-wrapping" name = "name" value = {user.name} onChange = {handleChange}/>

  <div style={{color:'red'}}>{nameError}
  </div>
</div>
<div style={{width:"400px",marginTop:"20px"}}>
  
  <input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping"name = "email" value = {user.email} onChange = {handleChange}/>
  <div style={{color:'red'}}>{emailError}
  </div>
</div>
<div style={{width:"400px",marginTop:"20px"}}>

    <div style={{display:'flex'}}>
  
  <input type= "password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping" name = "password"  onChange = {handleChange} value = {user.password}/>

  </div>
  <div style={{color:'red'}}>{passwordError}
  </div>
</div>

<div style={{textAlign:"center",width:"400px", marginTop:"20px"}}>
<button type="button" class="btn btn-primary" onClick = {onHandleClick}>Sign Up</button>

</div>

<div style={{textAlign:"center",width:"400px", marginTop:"20px"}}>
<button type="button" class="btn btn-primary" onClick = {onClickClear}>Clear</button>

</div>
    </div>
    </div>
  )
}

export default Signup