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
                fetch('https://node-server-jtym-7wfe2wpiw-bharathkumarsaravanan.vercel.app/home/superagent/signup',{
                    method: 'POST',
                    body: JSON.stringify(auth),
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    mode: "no-cors"
                }).then(response => response.json())
                .then(data => {
                    alert(data.data.message)
                    setAuth({mail:'', password:'',confirm:''})
                    window.location.href = '/'
                })
                // axios.post('https://node-server-jtym-imfn4zyjw-bharathkumarsaravanan.vercel.app/home/superagent/signup',auth)
                // .then(response =>{
                //     alert(response.data.message)
                //     setAuth({mail:'', password:'',confirm:''})
                //     window.location.href = '/'
                // })
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