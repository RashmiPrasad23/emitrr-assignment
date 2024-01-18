import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Register.css"
import { useRef } from "react";
import axios from 'axios'

const Login = (props) => { 
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const emailRef = useRef("")
    const passwordRef = useRef("")
 
    
    const navigate = useNavigate();
        
    const onButtonClick = async() => {

      console.log(emailRef.current.value, passwordRef.current.value)

      let {data} = await axios.post('http://localhost:8000/api/v1/users/login', {
        email:emailRef.current.value,
        password:passwordRef.current.value
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
            <div>Login</div>
        </div>
        <br />
       <form >
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

export default Login