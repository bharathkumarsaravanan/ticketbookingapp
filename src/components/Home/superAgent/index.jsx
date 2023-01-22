import React from "react";
import { Typography, Button, TextField } from "@mui/material";
import AgentContainer from "./agentContainer";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header";

function Index(){
    
    const [row, setRow] = useState({count:0});
    const [limit, setlimit] = useState({limitseat:0})

    useEffect(() =>{
        localStorage.setItem('seat',true)
    },[])

    function rowChange(data){
        var {value, name} = data.target;
        setRow({count: value});
    }
    function limitChange(data){
        var {value, name} = data.target;
        setlimit({limitseat: value})
    }

    function rowEnter(){
        axios.post('https://node-server-jtym.vercel.app/home/superagent/rowcount',row)
        .then(response => console.log(response.data))

        localStorage.setItem('seat',!JSON.parse(localStorage.getItem('seat')))
    }

    function limitEnter(){
        axios.post('https://node-server-jtym.vercel.app/home/superagent/rowcount',limit)
        .then(response => console.log(response.data))
        localStorage.setItem('seat',!JSON.parse(localStorage.getItem('seat')))  
    }

    return(
        <div className="superAgentIndex">
            <Header />
            <AgentContainer />
            <div style={{marginTop:'10vh'}}>
                <TextField name="rows" variant="outlined" value={row.rows} onChange={rowChange} label="Rows" />
                <Button variant="contained" onClick={rowEnter}>Enter</Button>
            </div>
            <div style={{marginTop:'10vh'}}>
                <TextField name="limit" variant="outlined" value={row.limit} onChange={limitChange} label="Limit" />
                <Button variant="contained" onClick={limitEnter}>Enter</Button>
            </div>
        </div>
    )
}

export default Index;