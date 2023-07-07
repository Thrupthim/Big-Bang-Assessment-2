import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LoginAdmin from './LoginAdmin'; 
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react';



function AdminPost(){

  const errmsg={
    color:'red'
  }
    const[firstname,setfirstname]=useState('');
const[lastname,setlastname]=useState('');
const[email,setemail]=useState('');
const[password,setpassword]=useState('');
const[phone,setphone]=useState('');

const[specialization,setspecialization]=useState('');
const[experience,setexperience]=useState('');
const[hospital,sethospital]=useState('');
const[qualification,setqualification]=useState('');

const [newData, setNewData] = useState('');
const [error, setError] = useState(null);


const IsValidate = () => {
    let isProceed = true;
    let errorMessage = 'Please enter a value in ';

    if (!firstname) {
      isProceed = false;
      errorMessage += 'firstname, ';
    }
    if (!lastname) {
      isProceed = false;
      errorMessage += 'lastname, ';
    }
    if (!email) {
      isProceed = false;
      errorMessage += 'email, ';
    }
    if (!phone) {
      isProceed = false;
      errorMessage += 'phone, ';
    }else if (!/^\d{10}$/.test(phone)) {
      isProceed = false;
      errorMessage += 'valid 10-digit phone number, ';
    }
   
    
    if (!specialization) {
        isProceed = false;
        errorMessage += 'specialization, ';
      }
      if (!experience) {
        isProceed = false;
        errorMessage += 'experience, ';
      }
      if (!hospital) {
        isProceed = false;
        errorMessage += 'hospital, ';
      }
      if (!qualification) {
        isProceed = false;
        errorMessage += 'qualification, ';
      }
    
    if (!isProceed) {
      toast.warning(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit=async (e)=>{
    
        e.preventDefault();
        if (IsValidate()) {
          const data = new FormData(e.currentTarget);
        const token=sessionStorage.getItem('token');
        console.log(token);
        const url = "https://localhost:7098/api/OnlyAdmin";
        const data_token = {
          adminId: 0,
          name: data.get("firstname"),
          lastname:data.get("lastname"),
          email: data.get("email"),
          password: data.get("password"),
          phoneNo: data.get("Phonenumber"),
          gender: null,
          reason: null,
          qualification: data.get("qualification"),
          specialization: data.get("specialization"),
          experience: data.get("experience"),
          hospital: data.get("hospital"),
          role: "Doctor",
        };
        try {
          console.log("Inside try block");
          console.log(data_token);
           const response = await axios.post(url, data_token,{
            headers: {
              'Authorization': `Bearer ${token}`,
            }
            });
          if (response.status === 200) {
            setError("Doctor added successfully");
            toast.success('Doctor Added Successfully');
          }
        } catch (error) {
         
          if (error.response && error.response.status === 400) {
            setError("Doctor already exists");
          }
          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            setError("You do not have permission to view the doctor details");
          }
        }
      };


        }
      
     
    return(
        <div>
        <br></br>
        <br></br>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>Add Doctors</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      FirstName: <span className="errmsg" style={errmsg} >*</span>
                    </label>
                    <input 
                      value={firstname} name="firstname"
                      onChange={(e) => setfirstname(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      LastName: <span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input 
                      value={lastname} name="lastname"
                      onChange={(e) => setlastname(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email: <span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input
                      value={email} name="email"
                      onChange={(e) => setemail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password: <span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input type="password"
                      value={password} name="password"
                      onChange={(e) => setpassword(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
               
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone No: <span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input
                      value={phone} name="Phonenumber"
                      onChange={(e) => setphone(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Specialization:</label>
                    <br />
                    <select
                      value={specialization} name="specialization"
                      onChange={(e) => setspecialization(e.target.value)}
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
                      Experience:<span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input type="text" 
                      value={experience} name="experience"
                      onChange={(e) => setexperience(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>    
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Hospital:<span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input type="text" 
                      value={hospital} name="hospital"
                      onChange={(e) => sethospital(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Qualification:<span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input type="text" 
                      value={qualification} name="qualification"
                      onChange={(e) => setqualification(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Add Doctor
              </button>
             
              
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}

export default AdminPost;