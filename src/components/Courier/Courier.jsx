import React, {  useEffect, useState } from 'react'
import './Courier.css'
const Courier = () => {
     const  [data, setData] = useState({
        weight:"",
        pincode:"",
        type:""
    })
   const [userData, setUserData] = useState([])
  
    
     const handleChange = (e)=>{
        
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleClick = (e)=>{
        e.preventDefault()
       
    }
    
    const postData = ()=>{
        fetch("http://localhost:5555/users",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((response)=>response.json()).then((res)=>{
        setUserData(res)
        
      })
    }

    const fetchData = ()=>{
        fetch("http://localhost:5555/users").then((response)=>response.json()).then((res)=>{
        setUserData(res)
        
      })
    }

   let find =  userData.find((value)=>{
        return (value.pincode === data.pincode ) && (value.weight == data.weight ) && (value.type == data.type) 
    })
    console.log("find", find)
    const handleCourierCharge = ()=>{
        
        console.log("userData", userData)
    }

    useEffect(()=>{
        postData()
        fetchData()
        handleCourierCharge()
    },[data])
    
  return (
    <div>
      <h1>CoinTab</h1>
      <div className='container'>
      <form action="http://localhost:5555/users" method='post' onSubmit={(e)=>{
           handleClick(e)
          
      }}>
          <input type="text"  name='weight' value={data.weight} placeholder='Product weight' onChange={(e)=>handleChange(e)}/>
          <input type="text" name='pincode' min={6} max={6} value={data.pincode}  placeholder='Pincode' onChange={(e)=>handleChange(e)}/>
          <select name="type" id="option" value={data.type} onChange={(e)=>handleChange(e)}>
              <option value="--" defaultValue="--">Type</option>
              <option value="Forward">Forward</option>
              <option value="Forward & RTO">Forward & RTO</option>
          </select>
          <input type="submit" value="Submit"/>
      </form>
      </div>

      <div className='courier-charges'>
            <h1>Courier charges</h1>
           
      </div>
    </div>
  )
}

export default Courier
