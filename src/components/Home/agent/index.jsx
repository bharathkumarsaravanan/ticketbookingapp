import React from "react";
import Header from "../header";
import { Outlet } from "react-router-dom";

function AgentIndex(){

    return(
        <div className="superAgentIndex">
            <Header />
            <Outlet />
        </div>
    )
}

export default AgentIndex;