import React from "react";
import { Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Header(){
    const [userData, setUserData] = useState({mail: '', profile: ''});
    const [profileView, setProfileView] = useState(false);
    var {user} = useParams();

    useEffect(() => {
        axios.get('https://node-server-lilac.vercel.app/home/user/'+user)
        .then(response => {
            console.log(response.data.agent[0])
            var agent = response.data.agent[0]
            setUserData({mail:agent.mail , profile: agent.profile})
            if(agent.profile !== null){
                setProfileView(true);
            }
        });
    },[])

    return(
        <header>
            <Typography variant="h4">JourneyBegins</Typography>
            <div>
                {profileView&&<img 
                    src={"https://node-server-lilac.vercel.app/profile/"+userData.profile} 
                    style={{borderRadius:'50%'}}
                    alt="profile" 
                    width="40" 
                    height="40" />}
                <Typography variant="h6">{userData.mail}</Typography>
                <Button variant="contained"
                    onClick={() => window.location.href = profileView?'/agent/login':'/'}
                >Logout</Button>
            </div>
        </header>
    )
}

export default Header;