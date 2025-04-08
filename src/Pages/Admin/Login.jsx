import React from "react";
import bannre from '../../assets/about-bg.jpg'
import logo from '../../assets/logo.png'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ({setToken})  =>{
    const Api_url =import.meta.env.VITE_API_URL
    const nav =  useNavigate()

    const [fromData,setFromData]=useState({
        email:'',
        password:'',
    })

    const [message,setmessage]=useState('')

    const handlechange=(e)=>{
      setmessage('')
        const {name,value}=e.target
        setFromData((prevstate)=>({...prevstate,[name]:value}))

    }


    const handleSubmit = async () => {
        console.log(fromData, "THIS IS A FROM DATA");
    
        try {
            const response = await axios.post(`${Api_url}/apiv1/login`, fromData, {
                headers: {
                    withCredentials: true,
                    "Content-Type": "application/json", // Set the correct content type
                },

                            })
                            
                            ;
         

            sessionStorage.setItem('token', response.data.token);
            setToken(response.data.token)
            nav('/admin/dashboard')
        } catch (error) {
            console.error(error, "Error during login");
            setmessage(error.response.data.message)
        }
    };
    
    return (
        <section className="vh-100">
        <div className="container-fluid login-continer">
          <div className="row">
            <div className="col-sm-6 text-black">
      
              <div className="px-5 ms-xl-4">
               <img src={logo} alt="logo" className="img-fluid my-2" />
              </div>
      
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
      
                <form style={{width: '23rem'}}>
      
                  <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing:'1px'}}>Log in</h3>
      
                  <div className="form-outline mb-4">
                    <input type="email" name='email' id="form2Example18" className="form-control form-control-lg"  placeholder="Email address" onChange={handlechange}/>
                    {/* <label className="form-label" for="form2Example18">Email address</label> */}
                  </div>
      
                  <div  className="form-outline mb-4">
                    <input type="password" id="form2Example28" className="form-control form-control-lg" placeholder="Password" name='password' onChange={handlechange} />
                    {/* <label className="form-label" for="form2Example28">Password</label> */}
                  </div>
                  {message && <div className="alert alert-danger" role="alert">{message}</div>}
                  <div className="pt-1 mb-4">
                    <button  className="btn btn-info btn-lg btn-block cus-color" type="button" onClick={handleSubmit}>Login</button>
                  </div>
        
                  <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
          
      
                </form>
      
              </div>
      
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img src={bannre}
                alt="Login image" className="w-100 vh-100" style={{objectFit: 'cover', objectPosition: 'left'}}/>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Login;

