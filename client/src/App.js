// import React, {useEffect , useState} from 'react'
import Navbar from './components/Navbar';
import Form from './components/authentication/Form';
import Matrix from './components/pages/Matrix';


import "./style/style.css"
import './style/App.css';
import Home from './components/pages/Home';
import Login from './components/authentication/Login'
import Map from './components/map'
import Game from './components/game'

import {BrowserRouter as Router ,Route , Routes} from "react-router-dom";
function App() {
  return ( 

    <>
      <Router>
        
        <Navbar/>
        <Routes>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/Products' element={<Matrix/>}/>
         
          <Route path='/sign-up' element={<Form/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/map' element={<Map/>}/>
          <Route path="/game" element={<Game />} />

         
        </Routes>
      </Router>

    </>
    
  );
}


export default App