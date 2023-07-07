import PatientPage from './PatientPage';
import { useEffect, useState } from 'react';

function FetchPatient()
{
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
        try {
            const decodedToken = JSON.parse(sessionStorage.getItem('decoded_token'));
            const url_id = decodedToken['Email'];

            const response = await fetch(`https://localhost:7098/api/Patients/doctor/${url_id}`);
            if (!response.ok) {
                throw new Error('Request failed with status: ' + response.status);
            }

            const data = await response.json();
            console.log(data);
            setPatients(data);
            console.log(patients);
        } catch (error) {
            if (error.message === 'Request failed with status: 400') {
                setError("You do not  have any patients right now.");
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    }
        
            fetchPatients();
        }, []);

  if (error === 'You do not  have any patients right now.') {
    return <p>{error}</p>;
  }

    return(
        <div>
            {patients.map((patients)=>(
                <PatientPage key={patients.patientId} patient={patients}/>
            ))}
        </div>
    )
};
export default FetchPatient;