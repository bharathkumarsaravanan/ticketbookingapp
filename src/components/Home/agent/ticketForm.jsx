import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TickerForm(props){

    const [passenger, setPassenger] = useState({name: '', age:'', gender:'male'});
    var {user} = useParams();

    function handleChange(data){
        var {name, value} = data.target;

        setPassenger(prev => {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    function handleClick(){
        console.log(passenger)
        if(passenger.name !== ''&& passenger.age !== ''){
            axios.post('https://node-server-lilac.vercel.app/home/agent/'+user+'/passengers', passenger)
            .then(response => props.newData(response.data.newData[0]));
            setPassenger({name: '', age:'',gender:passenger.gender});
        }else{
            alert('All the fields should be filled')
        }

    }

    return(
        <div className="passengerForm">  
            <Typography variant="h4">Passenger Details</Typography>
            <TextField value={passenger.name} onChange={handleChange} variant="outlined" name="name" label="name" type='text' />
            <TextField value={passenger.age} onChange={handleChange} variant="outlined" name="age" label="Age" type='number' />
            <select onChange={handleChange} name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <Button variant="contained" onClick={handleClick}>Add</Button>
        </div>
    )
}

export default TickerForm;