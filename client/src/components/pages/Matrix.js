import React from 'react'

// function Matrix() {
//   return (
//     <div>Matrix</div>
//   )
// }

// export default Matrix


export default class Matrix extends React.Component{
static field = { 
    columsAmount : 10, 
    rowsAmount : 10,
}

    render() {
        return (
             <div className='Game'>
                 HelloWorld
             </div>
        );
    }
}