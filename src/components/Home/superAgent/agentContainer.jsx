import React from "react";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateAgent from "./createagent";

function AgentContainer(){

    const [agents, setAgents] = useState([]);
    const [createPop, setCreatePop] = useState(false);

    useEffect(() => {
        axios.get('http://3.109.107.153:9000/home/agents')
        .then(response => setAgents(response.data.agents))
    },[])

    function instantAdd(newData){
        setAgents(prev => [...prev, newData])
    }

    function deleteFunc(id){
        console.log(id)
        // fetch('http://3.109.107.153:9000/home/agents/'+id+'/delete', {method: 'post', headers: {'Content-Type': 'application/json'}, mode: 'no-cors'})
        // .then(response => response.json())
        axios.post('http://3.109.107.153:9000/home/agents/'+id+'/delete')
        .then(response => {
            alert(response.data.message);
            setAgents(prev => {
                return prev.filter(items => {
                    return items.id !== id
                })
            })
        })
    }

    return(
        <div className="agentsList">
            <CreateAgent visible={createPop} setVisible={setCreatePop} instantAdd={instantAdd} />
            <Button variant="contained" 
                style={{position:'absolute', top:'18vh', right:'25vw'}}
                onClick={() => setCreatePop(true)}>Create Agent</Button>
            <table>
                <tr>
                    <th>agent id</th>
                    <th>agent mail</th>
                    <th>action</th>
                </tr>
                {agents.map(agent => {
                    return <tr>
                                <td>{agent.id}</td>
                                <td>{agent.mail}</td>
                                <td><Button variant="contained" onClick={() => deleteFunc(agent.id)}>Delete</Button></td>
                            </tr>
                })}
            </table>
        </div>
    )
}

export default AgentContainer;