import axios from 'axios' ;
import {useState} from 'react';
import { toast } from 'react-toastify';
function ActivateDoctor()
{
  const [error, setError] = useState(null);
  const handleActive = async (event,open,handleClose) => {
    
   
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const activate_id = data.get("doctorId");
    const url = `https://localhost:7098/api/OnlyAdmin/doctor/${activate_id}/setActive`;

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
        toast.success("Doctor activated successfully");
      }
    } catch (error) {
      // Handle any errors
      if (error.response && error.response.status === 404) {
        toast.error("Doctor does not exist!");
      }
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        toast.error("You do not have permission to activate doctor .");
      }
    }
  };
    const [open, setOpen] = useState(false);


    return(
        <div className="container">
      <br></br><br></br>
      <div className="card">
        
        <form className="container" style={{alignItems:'center'}} onSubmit={handleActive}>
        <div className="card-body">
          <table>
            <tr>
              <td>Doctor Id:</td>
              <td><input  id="doctorId" name="doctorId" /></td>
            </tr>
          </table>
        
        </div>
        <div className="card-footer">
        <button type="submit" className="btn btn-success" >
          Active Doctor
        </button>
        </div>
        </form>
      {error && <p>{error}</p>}
    </div>
    </div>
    )
}
export default ActivateDoctor;