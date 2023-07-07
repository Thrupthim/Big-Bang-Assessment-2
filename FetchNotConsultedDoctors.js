import {useState,useEffect} from 'react';
import NotConsultedDoctors from './NotConsultedDoctors';
function FetchNotConsultedDoctors()
{
    const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [patientadderror, setPatientAddError] = useState('');
  const handleConsultClick = async (doctorId) => {
    try {
      const decodedToken = JSON.parse(sessionStorage.getItem('decoded_token'));
      const url_id = decodedToken['Email'];
      console.log(url_id);
        console.log("Inside try block");
        console.log(doctorId);
      const response = await fetch(`https://localhost:7098/api/Patients/${url_id}/${doctorId}`, {method: 'POST',
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

        const response = await fetch(`https://localhost:7098/api/PatientLogin/patient/notconsulteddoctors/${url_id}`);
        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
        }

        const data = await response.json();
        console.log(data);
        setDoctors(data);
        console.log(doctors);
      } catch (error) {
        if (error.message === 'Request failed with status: 400') {
          setError("You are a new patient/You have consulted all doctors.");
        } else {
          setError('An error occurred. Please try again later.');
        }
      }
    };

    fetchDoctors();
  }, []);

  if (error === 'You are a new patient/You have consulted all doctors.') {
    return <p>{error}</p>;
  }
    return (
        <div className="container">
            <h1>Not Consulted Doctor Details</h1>
            {doctors.map((doctors) => (
        <NotConsultedDoctors key={doctors.doctorId} parse_doctor={doctors}  onConsultClick={handleConsultClick}/>
      ))}
        </div>
    )
}
export default FetchNotConsultedDoctors;