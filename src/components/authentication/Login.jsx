import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Login(){

    const [auth, setAuth] = useState({mail:'', password:''});

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
        
        axios.post('https://node-server-jtym-fs3clxpiw-bharathkumarsaravanan.vercel.app/home',auth)
        .then(response => {
            console.log(response.data)
            if(response.data.login){
                window.location.href = '/superagent/'+response.data.id+'/index'
            }else{
                alert('wrong password')
            }
        })
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
            <Button variant='contained' onClick={handleClick}>Login</Button>
            <Link to='/signup'>Sign up</Link>
        </div>
    )
}

export default Login;