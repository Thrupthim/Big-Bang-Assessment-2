import axios from 'axios' ;
import {useState} from 'react';
import { toast } from 'react-toastify';
function InActivateDoctor()
{
    const [error, setError] = useState(null);
    const handleInActive = async (event) => {
    
   
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const inactivate_id = data.get("doctorId");
      const url = `https://localhost:7098/api/OnlyAdmin/doctor/${inactivate_id}/setInactive`;
  
      try {
        const token=sessionStorage.getItem('token');
        console.log("Inside try block");
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Inside  200 ");
          toast.success("Doctor deactivated successfully");
         
        }
      }catch (error) {
      
        if (error.response && error.response.status === 404) {
          toast.error("Doctor does not exist!");
        }
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          toast.error("You do not have permission to deactivate doctor .");
        }
      }
    };


    return (
        <div className="container">
      <br></br><br></br>
      <div className="card">
        
        <form className="container" style={{alignItems:'center'}} onSubmit={handleInActive}>
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
          InActive Doctor
        </button>
        </div>
        </form>
      {error && <p>{error}</p>}
    </div>
    </div>
    )
}
export default InActivateDoctor;