import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LoginAdmin from './LoginAdmin'; 
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


const RegisterAdmin=()=>{
  const errmsg={
    color:'red'
  }

    const[name,setname]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[phone,setphone]=useState('');
    const[gender,setgender]=useState('');
    const[reason,setreason]=useState('');
    const[specialization,setspecialization]=useState('');
    const[experience,setexperience]=useState('');
    const[hospital,sethospital]=useState('');
    const[qualification,setqualification]=useState('');
    const[role,setrole]=useState('');

    const [error, setError] = useState(null);


    const navigate=useNavigate();

    const IsValidate = () => {
      let isProceed = true;
      let errorMessage = 'Please enter a value in ';
    
      if (!name) {
        isProceed = false;
        errorMessage += 'name, ';
      }
      if (!email) {
        isProceed = false;
        errorMessage += 'email, ';
      }
      if (!password) {
        isProceed = false;
        errorMessage += 'password, ';
      }
      if (!phone) {
        isProceed = false;
        errorMessage += 'phone, ';
      }else if (!/^\d{10}$/.test(phone)) {
        isProceed = false;
        errorMessage += 'valid 10-digit phone number, ';
      }
      if (!gender) {
        isProceed = false;
        errorMessage += 'gender, ';
      }
    
      if (role === 'Doctor') {
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
      } else if (role === 'Patient') {
        if (!reason) {
          isProceed = false;
          errorMessage += 'reason, ';
        }
      } else {
        isProceed = false;
        errorMessage += 'role';
      }
    
      if (!isProceed) {
        toast.warning(errorMessage);
      }
    
      return isProceed;
    };
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(IsValidate())
        {
            const data = new FormData(e.currentTarget);
        const url = 'https://localhost:7098/api/Admin/Register';
        const data_token = {
            AdminId: 0,
            Name: data.get('name'),
            Email: data.get('email'),
            Password: data.get('password'),
            PhoneNo: data.get('phone'),
            Gender: data.get('gender'),
            role: data.get('role'),
            Reason: data.get('reason'),
            Specialization: data.get('specialization'),
            Experience: data.get('experience'),
            Hospital: data.get('hospital'),
            Qualification: data.get('qualification'),
     
    };
    try {
        const response = await axios.post(url, data_token);
        toast.success('Registered Successfully');
        navigate('/LoginAdmin');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError('User already exists');
        } else {
          setError('An error occurred. Please try again later.');
        }
      }
        }
        };
    return(
        <div>
        <br></br>
        <br></br>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Name: <span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input 
                      value={name} name="name"
                      onChange={(e) => setname(e.target.value)}
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
                      onChange={(e) => setpassword(e.target
                        .value)}
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
                      value={phone} name="phone"
                      onChange={(e) => setphone(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Gender: <span className="errmsg" style={errmsg}>*</span>
                    </label>
                    <input
                      type="radio"
                      checked={gender === 'male'}
                      onChange={(e) => setgender(e.target.value)}
                      name="gender"
                      value="male"
                      className="app-check"
                    />
                    <label>Male</label>
                    <input
                      type="radio"
                      checked={gender === 'female'}
                      onChange={(e) => setgender(e.target.value)}
                      name="gender"
                      value="female"
                      className="app-check"
                    />
                    <label>Female</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Role:</label>
                    <select
                      value={role} name="role"
                      onChange={(e) => setrole(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select a role</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Patient">Patient</option>
                    </select>
                  </div>
                </div>
                {role === 'Doctor' && (
                <>
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
                </>
                )}
                {role === 'Patient' && (
                <>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>
                            Reason:<span className="errmsg" style={errmsg}>*</span>
                            </label>
                            <textarea
                            value={reason} name="reason"
                            onChange={(e) => setreason(e.target.value)}
                            className="form-control"
                            />
                        </div>
                    </div>
                </>
            )}
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
             
              
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}
export default RegisterAdmin;