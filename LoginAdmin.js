import {useState} from 'react';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import 'react-toastify/dist/ReactToastify.css';
import PatientPage from './PatientPage';
import FetchPatient from './FetchPatient';

const LoginAdmin=()=>{
    const errmsg={
        color:'red'
      }
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');

    function NavigateToPageBasedOnRole(token,navigate) {
  
        console.log("Inside navigate function");
        const decodedToken = jwtDecode(token);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('decoded_token', JSON.stringify(decodedToken));
        console.log(decodedToken);
       
        if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Doctor') {
            navigate('/FetchPatient');
        }
        if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Patient') {
            navigate('/DoctorPage');
        }
        if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Admin') {
            navigate('/AdminPage');
        }
         
          
        };
  

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = 'Please enter a value in ';
        if(email==null || email==''){
            isProceed=false;
            errorMessage+='email, ';
        }
        if(password==null || password==''){
            isProceed=false;
            errorMessage+='password, ';
        }
        if (!isProceed) {
            toast.warning(errorMessage);
          }
      
          return isProceed;
    }
    let [error_message,setError]=useState('');
    const navigate=useNavigate();


    const proceedLogin=async (e)=>
    {
        e.preventDefault();
        IsValidate()
        {
            const data = new FormData(e.currentTarget);
            console.log({
            email: data.get('email'),
            password: data.get('password'),
            });
            const url = 'https://localhost:7098/api/Token';
    
            const data_token = {
                AdminId: 0,
                Name: 'string',
               
                Email: data.get('email'),
                PhoneNo:'string',
                Gender:'string',
                Password: data.get('password'),
                role: 'string'
            };
            try {
                console.log("Inside try block");
                const response = await axios.post(url,data_token);
                const token = response.data.token;
                toast.success('Login Successfull');
                
                NavigateToPageBasedOnRole(token,navigate);
              } catch (error) {
                
                if (error.response && error.response.status === 400) {
                    
                    toast.error('Invalid credentials. Please try again.'); 
                  } else {
                    
                    console.log(error);
                    toast.error('An error occurred. Please try again later.');
                  }
              }
        }
    }
    return(
        <div className="offset-lg-3 col-lg-6" >
            <form className="container" onSubmit={proceedLogin} >
                <div className="card" style={{margintop:'30px'}}>
                    <div className="card-header">
                        <h1>Login</h1>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <label>Email:<span className="errmsg" style={errmsg}>*</span></label>
                                <input className="form-control" id='email' name='email' value={email} onChange={e=>setemail(e.target.value)}></input>
                            </div><br></br><br></br>
                            <div className="col-lg-12">
                                <label>Password:<span className="errmsg" style={errmsg}>*</span></label>
                                <input type="password" id='password' name='password' value={password} className="form-control" onChange={e=>setpassword(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary" >Login</button>
                      
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginAdmin;