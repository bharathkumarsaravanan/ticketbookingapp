import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TickerForm from "./ticketForm";
import { Button, Typography } from "@mui/material";


function PassengerTable(){

    const [passengers, setPassengers] = useState([]);
    const [limit, setLimit] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    var {user} = useParams();
    const [formShow, setFormShow] = useState(true)

    useEffect(() => {
        if(passengers.length ==limit){
            setFormShow(false)
        }else{
            setFormShow(true)

        }
    },[passengers])

    useEffect(() => {
        axios.get('http://13.235.114.159:9000/home/superagent/rowcount')
        .then(response =>{
            setLimit(response.data.limitSeat)
            setRowCount(response.data.count)
        })
    },[localStorage.getItem('seat')])

    useEffect(() => {
        axios.get('http://13.235.114.159:9000/home/agent/'+user+'/passengers')
        .then(response => setPassengers(response.data.passengers))
    },[])

    function newData(data) {
        setPassengers(prev => [...prev, data])
    }

    function deletePas(delId){
        setPassengers(prev => prev.filter(pas => pas.id !== delId));
        axios.post({url:'http://13.235.114.159:9000/home/agent/passengers/delete',
                    method:'post',
                    data: JSON.stringify([delId]),
                    headers:{'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', }})
        .then(response => console.log(response.data.message));
    }

    return(
        <div className="passengerTable">
            <table>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>seat no</th>
                </tr>
                {passengers.map(passenger => <tr>
                                                <td>{passenger.id}</td>
                                                <td>{passenger.name}</td>
                                                <td>{passenger.age}</td>
                                                <td>{passenger.gender}</td>
                                                <td>{passenger.seat}</td>
                                                <td><Button variant="contained" onClick={() => deletePas(passenger.id)}>Delete</Button></td>
                                            </tr>
                )}
                
            </table>
            <Typography variant="h6">Seat Limit:{limit}</Typography>
            {formShow?<TickerForm newData={newData} />: 
                    <Typography variant="h4">You have reached the limit</Typography>
            }
            <Button variant="contained" 
                onClick={() => window.location.href = "/agent/"+user+"/index/"+rowCount}>Visit Seats</Button>
        </div>


    )
}

export default PassengerTable;