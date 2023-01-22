import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AgentLogin(){

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

        axios.post('https://node-server-jtym.vercel.app/agent/login',auth)
        .then(response => {
            console.log(response.data)

            if(response.data.login){

                var user = response.data.user
                console.log(user)
                if(user.dob == null){
                    window.location.href = '/agent/'+user.id+'/verify'   
                }else{

                    window.location.href = '/agent/'+user.id+'/index/form'
                }
            }else{
                alert('wrong password')
            }
        })
    }

    return(
        <div className="authentication">
            <Typography variant="h3" color="text.secondary">Agent</Typography>
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
        </div>
    )
}

export default AgentLogin;