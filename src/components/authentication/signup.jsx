import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SignUp(){

    const [auth, setAuth] = useState({mail:'', password:'',confirm:''});

    function handleChange(data){
        var {name, value} = data.target;

        setAuth(prev => {
            return{
                ...prev,
                [name] : value,
            }
        })
    }

    function handleClick(){
        console.log(auth);
        
        if(auth.mail !== ''&& auth.password !== ''){
            if(auth.password==auth.confirm){
                axios.post('/home/superagent/signup',auth)
                .then(response =>{
                    alert(response.data.message)
                    setAuth({mail:'', password:'',confirm:''})
                    window.location.href = '/'
                })
            }else{
                alert('check the confirm password')
            }
        }


    }

    return(
        <div className="authentication">
            <Typography variant="h3" color="text.secondary">Super Agent</Typography>
            <TextField 
                name="mail"
                value={auth.mail}
                onChange={handleChange}
                variant='outlined'
                label="Email"
                type='text'
            />
            <TextField 
                name="password"
                value={auth.password}
                onChange={handleChange}
                variant='outlined'
                label="Password"
                type='password'
            />
            <TextField 
                name="confirm"
                value={auth.confirm}
                onChange={handleChange}
                variant='outlined'
                label="Password"
                type='password'
            />
            <Button variant='contained' onClick={handleClick}>Login</Button>
            <Link to='/'>back to login</Link>
        </div>
    )
}

export default SignUp;