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
            axios.post('http://3.109.107.153:9000/home/agent/signup', auth)
            .then(response =>{
                console.log(response.data.message)
                if(response.data.message !== 'account created successfully'){
                    emailjs.send("service_32t45dp","template_5d59kuf",{                 //emailjs for sending the confimation mail
                        to_email: auth.mail,
                        mail: auth.mail,
                        password: auth.password,
                        link: link
                        },'2ivqwepktUEzNazVV').then((response)=>{
                            alert(response.data.message)
                            props.setVisible(false);
                            setAuth({mail:'', password:''})
                            props.instantAdd(response.data.newData[0])
                            props.setVisible(false)
    
                        },(error) => {
                            alert('Something Wrong with your Mail id')
                        })  
    
                }
                else{
                    alert(response.data.message)
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