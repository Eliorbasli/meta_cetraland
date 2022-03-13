import React from 'react';

import './../style/Button.css';
import {Link} from 'react-router-dom';

const STYLES= ['btn--primary' , ' btn--outline']

export const Button = ({
    children ,
    type,
    onClick  
}) => {const checkButtonStyle = STYLES[0];

    return(
        <Link to='/login' className = 'btn-mobile'>
            <button className={`btn ${checkButtonStyle} `}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>
            
        </Link>
    )

};