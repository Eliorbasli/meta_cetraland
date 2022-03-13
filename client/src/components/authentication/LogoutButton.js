import React, {useState} from 'react'
//import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {

    //const {logout} = useAuth0();
    //const {logout} = true
    const cleanStorage = (e) => {
        localStorage.removeItem('token');
      }

  return (
    <button className='btn'
    onClick={() =>
    cleanStorage({
        returnTo: window.location.href = '/',
        //returnTo: window.location.origin,
        
    })
    }
    >
    Logout

    </button>
    
    );
    };

export default LogoutButton;
