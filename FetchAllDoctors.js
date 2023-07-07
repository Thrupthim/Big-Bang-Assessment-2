import {useState,useEffect} from 'react';
import NewPatient from './NewPatient';
import { TiTick } from 'react-icons/ti';
import { AiFillCloseCircle } from 'react-icons/ai';

function FetchAllDoctors(){
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');
    const [patientadderror, setPatientAddError] = useState('');

    const handleConsultClicktwo = async (doctorId) => {
        try {
          const decodedToken = JSON.parse(sessionStorage.getItem('decoded_token'));
          const url_id = decodedToken['AdminId'];
          console.log(url_id);
            console.log("Inside try block");
            console.log(doctorId);
          const response = await fetch(`https://localhost:7098/api/Patients/${url_id}/${doctorId}`,{
            method: 'POST',
          });
          if (!response.ok) {
            throw new Error('Request failed with status: ' + response.status);
          }
    
          const data = await response.json();
          console.log(data);
        } catch (error) {
          if (error.message === 'Request failed with status: 400') {
            setPatientAddError('Error while adding patient');
            console.log(patientadderror);
          }
        }
      };
      useEffect(() => {
        const fetchDoctors = async () => {
          try {
            const decodedToken = JSON.parse(sessionStorage.getItem('decoded_token'));
            const url_id = decodedToken['Email'];
    
            const response = await fetch(`https://localhost:7098/api/PatientLogin/patient/newpatient/${url_id}`);
            if (!response.ok) {
              throw new Error('Request failed with status: ' + response.status);
            }
            const data = await response.json();
            console.log(data);
            setDoctors(data);
            console.log(doctors);
          } catch (error) {
            if (error.message === 'Request failed with status: 400') {
              setError('You are already registered as a patient.');
            } else {
              setError('An error occurred. Please try again later.');
            }
          }
        };
    
        fetchDoctors();
      }, []);
      if (error === 'You are already registered as a patient.') {
        return <p>{error}</p>;
      }
    return(
        <div className="container">
            <h1>All Doctor Details</h1>
            {doctors.map((doctor)=>(
                <NewPatient key={doctor.doctorId} parse_doctor={doctor} onConsultClick={handleConsultClicktwo}/>
            ))}
        </div>
    )
}
export default FetchAllDoctors;