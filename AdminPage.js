import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminPost from './AdminPost';
import AdminUpdate from './AdminUpdate';
import AdminDelete from './AdminDelete';

import { toast } from 'react-toastify';

function AdminPage() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://localhost:7098/api/OnlyAdmin/alldoctors', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setDoctors(response.data);
      } catch (error) {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          setError("You do not have permission to get doctor details");
          toast.warning('You are not allowed to access Doctor Details');
        }
      }
    };

    fetchDoctors();
  }, []);

  const handleActive = async (doctorId) => {
    try {
      const isAdmin = sessionStorage.getItem('role') === 'Admin';
      if (!isAdmin) {
        return;
      }
      
        const token = sessionStorage.getItem('token');

      await axios.put(
        `https://localhost:7098/api/OnlyAdmin/doctor/${doctorId}/toggleActive`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      const updatedDoctors = doctors.map(doctor => {
        if (doctor.doctorId === doctorId) {
          return { ...doctor, isActive: !doctor.isActive };
        }
        return doctor;
      });
      setDoctors(updatedDoctors);
    } catch (error) {
      console.log(error);
    
      }

      
  };

  return (
    <div className="container">
      <div className="navbar w-100">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="">Get</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/AdminPost">Post</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/AdminUpdate">Update</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="/AdminDelete">Delete</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="/ActivateDoctor">ActivateDoctor</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="/InActivateDoctor">InActivateDoctor</a>
          </li>
        </ul> 
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>DoctorId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone No</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Hospital</th>
            <th>Qualification</th>
           
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.doctorId}>
              <td>{doctor.doctorId}</td>
              <td>{doctor.dFirstName}</td>
              <td>{doctor.dLastName}</td>
              <td>{doctor.dPhoneNo}</td>
              <td>{doctor.dEmail}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.hospital}</td>
              <td>{doctor.qualification}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
