import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import "../assets/css/Register.css"
import { useRef } from "react";
import axios from 'axios'

const Signup = (props) => { 
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [fullnameError, setFullNameError] = useState("")
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const fullnameRef=useRef("")
    const usernameRef=useRef("")
 
    
    const navigate = useNavigate();
        
    const onButtonClick = async() => {

      console.log(emailRef.current.value, passwordRef.current.value,usernameRef.current.value,fullnameRef.current.value)

      let {data} = await axios.post('http://localhost:8000/api/v1/users/register', {
        fullName:fullnameRef.current.value,
        username:usernameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value,

      })

      if(data.success){ 
        navigate('/')

      }else{
       console.log(data.message)
      }
 

      // Authentication calls will be made here...       

  }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Signup</div>
        </div>
        <br />
       <form >
       <div className={"inputContainer"}>
            <input
            ref={fullnameRef}
            type="text"
                // value={email}
                placeholder="Enter your fullname here"
                // onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{fullnameError}</label>
        </div>
        <br/>
       <div className={"inputContainer"}>
            <input
            ref={usernameRef}
            type="text"
                // value={email}
                placeholder="Enter your username here"
                // onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{usernameError}</label>
        </div>
        <br/>
       <div className={"inputContainer"}>
            <input
            ref={emailRef}
            type="email"
                // value={email}
                placeholder="Enter your email here"
                // onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
            type="text"
                ref={passwordRef}
                // value={password}
                placeholder="Enter your password here"
                // onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
        <button onClick={onButtonClick} type="button">Login</button>
        </div>
       </form>

    </div>
}

export default Signup