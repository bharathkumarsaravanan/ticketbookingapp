import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/authentication/Login';
import SignUp from './components/authentication/signup';
import Index from './components/Home/superAgent/index';
import AgentLogin from './components/authentication/agentLogin';
import AgentIndex from './components/Home/agent';
import Seats from './components/Home/superAgent/seats';
import PassengerTable from './components/Home/agent/passengersTable';
import AgentForm from './components/authentication/agentForm';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App(){
    return(
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/agent/login' element={<AgentLogin/>} />
            <Route path='/superagent/:user/index' element={<Index/>} />
            <Route path='/agent/:user/verify' element={<AgentForm />} />
            <Route path='/agent/:user/index' element={<AgentIndex/>} >
              <Route path=':rowcount' element={<Seats />} />
              <Route path='form' element={<PassengerTable />} />
            </Route>
        </Routes>
      </BrowserRouter>
    )
}

root.render(
    <App />
)


