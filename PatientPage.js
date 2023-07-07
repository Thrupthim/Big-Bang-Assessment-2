import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FetchPatient from './FetchPatient';

const PatientPage=({patient})=>
{
    console.log(patient)
    const bull = (
        <span style={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
          
        </span>
      );
    
    return(
        <div>
        <br></br>
        <Card variant="outlined" className="bg-primary-subtle">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Your Patient Details
                </Typography>
                <Typography variant="h5" component="div">
                {patient.pFirstName} {bull} {patient.pLastName}
                </Typography>
               
                <Typography variant="body2">
                Contact Number: {patient.pPhoneNo}
                <br />
                Email: {patient.email}
                </Typography>
                <Typography variant="body2">
                Reason: {patient.reason}
                </Typography>
            </CardContent>
        </Card>
        </div>

    )
}
export default PatientPage;
