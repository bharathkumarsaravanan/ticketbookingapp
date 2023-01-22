import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Cell from "./cell";
import axios from "axios";
import { useParams } from "react-router-dom";

function Seats(props){

    const [ar, setAr] = useState([]);
    const [upd, setupd] = useState(true);
    const [cube , setCube] = useState([]);                  //its for array structure 
    const [passengers, setPassengers] = useState([]);
    const [males, setMales] = useState([]);
    const [females, setFemales] = useState([]);
    const [oldWomens, setOldWomens] = useState([]);
    const [oldMens, setOldMens] = useState([]);
    const [oldGuys, setOldGuys] = useState([])

    const [selected, setSelected] = useState([]);
    var {user, rowcount} = useParams();
    const [fetUpd, setFetUpd] = useState(true);
    var rCount = parseInt(rowcount)



    useEffect(() => {

        setCube([])
        for(var i = 0; i<rCount; i++){
            setCube(prev => {
                return [...prev, [0 , 0, 0, 0, 0, 0]]
            })
        }
        setAr(() =>{
            return cube.map((val, index) => {
                var c = index * 6
                return val.map((b, ind) => c+ind)
            })
        })

},[upd])

    useEffect(() => {
        setInterval(function(){
            setupd(JSON.parse(localStorage.getItem('seat')));
        },1000)

        axios.get('http://13.235.114.159:9000/home/agent/'+user+'/passengers')
        .then(response => {
            setPassengers(response.data.passengers);
            setMales(response.data.passengers.filter(data => data.gender !== 'female'&&data.age < 60))
            setFemales(response.data.passengers.filter(data => data.gender !== 'male'&&data.age < 60))
            setOldMens(response.data.passengers.filter(data => data.gender !== 'female'&&data.age > 60))
            setOldWomens(response.data.passengers.filter(data => data.gender !== 'male'&&data.age > 60))
            setOldGuys(response.data.passengers.filter(data => data.age > 60))
        })

    },[fetUpd])



    function clickSeat(rowPos, colPos, seatNumber){
        console.log(rowPos, colPos, seatNumber);
        
    }

 
    
    function showSeats(){
        setupd(prev => !prev)
        console.log(females)
        oldGuys.map((peps, index)=> {
            if(index < rCount){
                let tempValue = index * 6;
                axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+peps.id,{seat:tempValue})
                .then(response => setPassengers(response.data.return))
                setSelected(prev => [...prev, tempValue])
            }
            else {
                if(index < rCount + rCount){
                    let tempValue = ((index - rCount) * 6) + 5;
                    axios.post('hhttp://13.235.114.159:9000/home/agent/'+user+'/booking/'+peps.id,{seat:tempValue})
                    .then(response => setPassengers(response.data.return))
                    setSelected(prev => [...prev, tempValue])
                }
                else{
                    if(index < rCount + rCount + rCount){
                        let tempValue = ((index - (rCount+rCount)) * 6 ) + 1
                        axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+peps.id,{seat:tempValue})
                        .then(response => setPassengers(response.data.return))
                        setSelected(prev => [...prev, tempValue])
                    }
                    else{
                        if(index < (rCount + rCount + rCount + rCount)){
                            let tempValue = ((index - (rCount+rCount+rCount)) * 6) + 4
                            axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+peps.id,{seat:tempValue})
                            .then(response => setPassengers(response.data.return))
                            setSelected(prev => [...prev, tempValue])
                        }
                        else{
                            axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+peps.id,{seat:'waiting'})
                            .then(response => setPassengers(response.data.return))
                        }
                    }
                }
            }
        })


        females.map((female, index) => {
            if(index < rCount){
                let tempValue = (index * 6) +2;
                axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+female.id,{seat:tempValue})
                .then(response => setPassengers(response.data.return))
                setSelected(prev => [...prev, tempValue])
            }
            else{
                if(index < rCount+rCount){
                    axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+female.id,{seat:"waiting.."})
                    .then(response => setPassengers(response.data.return))
                }else{
                    let tempValue = (index * 6) + 3;
                    axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+female.id,{seat:tempValue})
                    .then(response => setPassengers(response.data.return))
                    setSelected(prev => [...prev, tempValue])
                }

            }


        })

        males.map((male, index) => {
            if(index < rCount){
                let tempValue = (index * 6) + 3;
                axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+male.id,{seat:tempValue})
                .then(response => setPassengers(response.data.return))
                setSelected(prev => [...prev, tempValue])
            }else{
                axios.post('http://13.235.114.159:9000/home/agent/'+user+'/booking/'+male.id,{seat:'waiting...'})
                .then(response => setPassengers(response.data.return)) 
            }
        })
    }

    

    return(
        <div className="seatsContainer">
                <table>
                    {ar.map((row, rowIndex) => {
                        return <tr>
                                    {row.map((col, colIndex) => <Cell 
                                                                    returnIndex={clickSeat} 
                                                                    rowIndex={rowIndex} 
                                                                    colIndex={colIndex} 
                                                                    btnValue={col}
                                                                    highlight={selected}
                                                                    /> )}
                                </tr>
                    })}
                </table>
            <Button variant="contained" onClick={showSeats}>Available</Button>
            <Button 
                style={{marginTop:'2rem'}}
                variant="contained" 
                onClick={() => window.location.href="/agent/"+user+"/index/form"}>Go to Form</Button>
        </div>

    )
}

export default Seats;