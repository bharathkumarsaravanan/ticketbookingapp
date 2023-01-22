import React from "react";
import ReactDOM from "react-dom";
import { TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";


function CreateAgent(props){

    const [auth, setAuth] = useState({mail:'', password:''});
    const [link, setLink] = useState('')

    function handleChange(data){
        var {name, value} = data.target;
        
        setAuth(prev => {
            return{
                ...prev,
                [name]:value,
            }
        })
    }

    function getLink(data){
        var {value} = data.target;
        setLink(value);
        console.log(link)
    }

    function handleClick(){
        console.log('auth')
        if(auth.mail !=='' && auth.password !==''){
            // fetch('http://13.235.114.159:9000/home/agent/signup',{method: 'post', data: auth, headers: {'Content-Type': 'application/json'}, mode: 'no-cors'})
            axios.get('http://13.235.114.159:9000/home/agent/signup', auth)
            .then(response =>{
                if(response.data.message !== 'account created successfully'){
                    props.setVisible(false);
                    emailjs.send("service_32t45dp","template_5d59kuf",{                 //emailjs for sending the confimation mail
                        to_email: auth.mail,
                        mail: auth.mail,
                        password: auth.password,
                        link: link
                        },'2ivqwepktUEzNazVV').then((response)=>{
                            alert(response.data.message)
                            setAuth({mail:'', password:''})
                            props.instantAdd(response.data.newData[0])
    
                        },(error) => {
                            alert('Something Wrong with your Mail id')
                        })  
    
                }

                })
               
        }

    }

    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal">
            <div className="popUp">
                <CloseIcon 
                    style={{position:'absolute', top:'3px', right:'3px'}}
                    onClick={() => props.setVisible(false)} />
                <TextField 
                    name="mail"
                    value={auth.mail}
                    onChange={handleChange}
                    label='mail'
                    variant="outlined"
                    type='text' />
                <TextField 
                    name="password"
                    value={auth.password}
                    onChange={handleChange}
                    label='password'
                    variant="outlined"
                    type='password' />
                <TextField 
                    name="link"
                    value={link}
                    onChange={getLink}
                    label='Invite Link'
                    variant="outlined" />

                <Button variant="contained" onClick={handleClick}>Create</Button>
            </div>
        </div>, document.getElementById('portal')
    )
}

export default CreateAgent;