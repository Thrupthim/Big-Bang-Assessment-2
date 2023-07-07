import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AdminDelete() {
  const [error, setError] = useState(null);

  const handleDelete = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
       const token=sessionStorage.getItem('token');
        console.log(token);
    const delete_id = data.get("doctorId");
    const url = `https://localhost:7098/api/OnlyAdmin/${delete_id}`;

    try {
      console.log("Inside try block");
     
       const response = await axios.delete(url,{
            headers: {
              'Authorization': `Bearer ${token}`,
            }
            });
      if (response.status === 200) {
        console.log("Inside try block");
        toast.success('Doctor deleted successfully');
      }
    } catch (error) {
      // Handle any errors
      if (error.response && error.response.status === 400) {
        console.log("Doctor does not exist");
        toast.error('Doctor does not exist');
      }
    }

  }

  return (
    <div className="container">
      <br></br><br></br>
      <div className="card">
        
        <form className="container" style={{alignItems:'center'}} onSubmit={handleDelete}>
        <div className="card-body">
          <table>
            <tr>
              <td>Doctor Id:</td>
              <td><input  id="doctorId" name="doctorId" /></td>
            </tr>
          </table>
        
        </div>
        <div className="card-footer">
        <button type="submit" className="btn btn-danger" >
          Delete Doctor
        </button>
        </div>
        </form>
      {error && <p>{error}</p>}
    </div>
    </div>
    
    
  );
}

export default AdminDelete;
