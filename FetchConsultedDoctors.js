import {useState,useEffect} from 'react';
import ConsultedDoctors from './ConsultedDoctors';

function FetchConsultedDoctors(){

    const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const decodedToken = JSON.parse(sessionStorage.getItem('decoded_token'));
        const url_id = decodedToken['Email'];

        const response = await fetch(`https://localhost:7098/api/PatientLogin/patient/consulteddoctors/${url_id}`);
        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
        }

        const data = await response.json();
        console.log(data);
        setDoctors(data);
        console.log(doctors);
      } catch (error) {
        if (error.message === 'Request failed with status: 400') {
          setError("You are a new patient. You have not consulted any doctors yet.");
        } else {
          setError('An error occurred. Please try again later.');
        }
      }
    };

    fetchDoctors();
  }, []);

  if (error === 'You are new patient. You have not consulted any doctors yet.') {
    return <p>{error}</p>;
  }

    return (
        <div className="container">
            <h1>Consulted Doctors Details</h1>
            {doctors.map((doctors)=>(
                <ConsultedDoctors key={doctors.doctor_Id} parse_doctor={doctors}/>
            ))}
        </div>
    )
}
export default FetchConsultedDoctors;