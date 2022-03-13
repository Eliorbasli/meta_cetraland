import React, {useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../../style/Dashboard.css";

const Dashboard = () => {
    const [name, setName] = useState('')
    const [money, setMoney] = useState(0)
    const history = useNavigate()

   useEffect(() => {
      const token = localStorage.getItem('token')
      const money = localStorage.getItem('money')
      console.log("token:")
          console.log(token)
          console.log(money)
      if(token){
          const user = token
          console.log("details user:")
          console.log(user)
          console.log(money)
          setName(user)
          setMoney(money)
          if(!user){
              localStorage.removeItem('token')
              history.replace('/login')
            }
      }
   } , []);

    

  return (
    <>
    <div className='DashBoard'>

    <h1>Hello {name || 'Guest'}</h1>
    <h1>{money}</h1>


    <div className='Road'>Road</div>
    <div className='Park'>Park</div>
    <div className='Land'>Empty Land</div>
    <div className='Sale'>Land for Sale</div>
 
    
    </div>
    </>
  )
}

export default Dashboard