import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  CardContent,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import Card from "@mui/material/Card";

 
function AdminUpdate(){
  const [error, setError] = useState(null);
  const handleUpdate = async (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token=sessionStorage.getItem('token');
    const updateid = data.get("doctorId");
    

    const url = `https://localhost:7098/api/OnlyAdmin/doctor/${updateid}`;
    const data_token = {
      doctorId:data.get('doctorId'),
      dFirstName: data.get("dFirstName"),
      dLastName: data.get("dLastName"),
      dEmail: data.get("dEmail"),
      dPhoneNo: data.get("dPhoneNo"),
      qualification: data.get("qualification"),
      specialization: data.get("specialization"),
      experience: data.get("experience"),
      hospital: data.get("hospital"),
    };
    try {
      console.log("Inside try block");
      console.log(data_token);
      const response = await axios.put(url, data_token,{
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        toast.success('Updated Successfully');
      }
    } catch (error) {
      // Handle any errorserror()
      if (error.response && error.response.status >= 400) {
        console.log("Doctor does not exist");
        setError("Doctor does not exist");
        toast.error('error in updating');
    }
  };
}
   
    return(
      <div>
      
      {error && <Alert severity="error">{error}</Alert>}
    <div className="container">
        <br></br>
        <br></br>
        <br></br>
      <form className="container" onSubmit={handleUpdate}>
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Update Doctor Details</h1>
            </div>
            <div className="card-body">
              <div className="row">
              <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Doctor ID: <span className="errmsg">*</span>
                    </label>
                    <input 
                      id="doctorId" name="doctorId"
                      
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      FirstName: <span className="errmsg">*</span>
                    </label>
                    <input 
                      id="dFirstName" name="dFirstName"
                      
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      LastName: <span className="errmsg">*</span>
                    </label>
                    <input 
                      id="dLastName" name="dLastName"
                      
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email: <span className="errmsg">*</span>
                    </label>
                    <input
                      id="dEmail" name="dEmail"
                      
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone No: <span className="errmsg">*</span>
                    </label>
                    <input
                      id="dPhoneNo" name="dPhoneNo"
                      
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Specialization:</label>
                    <br />
                    <select
                      id="specialization" name="specialization"
                      
                      className="form-control"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Pathology">Pathology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Uerology">Uerology</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Cardiology">Cardiology</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Experience:<span className="errmsg">*</span>
                    </label>
                    <input type="text" 
                      id="experience" name="experience"
                      
                      className="form-control"
                    />
                  </div>
                </div>    
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Hospital:<span className="errmsg">*</span>
                    </label>
                    <input type="text" 
                      id="hospital" name="hospital"
                      
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Qualification:<span className="errmsg">*</span>
                    </label>
                    <input type="text" 
                      id="qualification" name="qualification"
                      
                      className="form-control"
                    />
                  </div>
                </div>
                
                  
                </div>
              
              <div className="card-footer">
              <button type="submit" className="btn btn-primary text-center" >
                    Update
                  </button>
              </div>
            </div>
            </div>
            </form>
            </div>
    </div>
    
      )
    }
    


export default AdminUpdate;