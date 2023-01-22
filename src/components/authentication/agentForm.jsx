import React from "react";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AgentForm(){

    var {user} = useParams();
    const [auth, setAuth] = useState({dob:'', address:'', phone:''});
    const [profile, setProfile] = useState()

    function handleChange(data){
        var {name, value} = data.target;
        setAuth(prev => {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    function getFile(data){
        setProfile(data.target.files[0])
    }

    function handleClick(){
        console.log(auth)
        const formData = new FormData();
        formData.append('profile',profile)

        if(auth.dob !== ''&& auth.address !== ''&& auth.phone !== ''){
            axios.post('http://13.235.114.159:9000/agent/'+user+'/form', auth)
            .then(response => {
                var url = 'http://13.235.114.159:9000/agent/'+user+'/form/profile';
                axios({url: url, method: 'POST', 
                    data: formData, 
                    headers: {'Content-Type': 'multipart/form-data'}})
                .then(response => window.location.href = "/agent/"+user+"/index/form")

                
            });
        }else{
            alert('You should fill all the fields');
        }

        
    }

    return(
        <div className="authentication">
            <TextField
                name="dob"
                value={auth.dob}
                onChange={handleChange}        
                label="Date of Birth"
                variant="outlined"  
                type="date"
                />
            <TextField
                name="address"
                value={auth.address}
                onChange={handleChange}        
                label="Address"
                variant="outlined"  />
            <TextField
                name="phone"
                value={auth.phone}
                onChange={handleChange}        
                label="Phone"
                variant="outlined"  
                type="number"
                />
            <input type="file" name="profile" onChange={getFile} />
            <Button variant="contained" onClick={handleClick}>Enter</Button>
        </div>
    )
}

export default AgentForm;