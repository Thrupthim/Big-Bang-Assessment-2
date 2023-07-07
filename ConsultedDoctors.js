import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FetchAllDoctors from './FetchAllDoctors';
import { Check, Block } from '@mui/icons-material';

function ConsultedDoctors({parse_doctor})
{
    console.log(parse_doctor);
  const bull = (
    <span style={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
      •
    </span>
  );
  const dotColor = parse_doctor.isActive ? 'green' : 'red';
    return(
        <div className="container">
      <div className="card bg-secondary-subtle">
        <table className="table p-5">
          <tbody>
            <tr>
              <td>Name:</td>
              <td colSpan="2">{parse_doctor.dFirstName} {parse_doctor.dLastName}</td>
              <td rowSpan="7" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {parse_doctor.isActive ? (
                  <Check style={{ color: 'green' }} />
                ) : (
                  <Block style={{ color: 'red' }} />
                )}
              </td>
            </tr>
            <tr>
              <td>Phone No:</td>
              <td colSpan="2">{parse_doctor.dPhoneNo}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td colSpan="2">{parse_doctor.dEmail}</td>
              </tr>
            <tr>
              <td>Specialization:</td>
              <td colSpan="2">{parse_doctor.specialization}</td>
            </tr>
            <tr>
              <td>Experience:</td>
              <td colSpan="2">{parse_doctor.experience}</td>
            </tr>
            <tr>
              <td>Hospital:</td>
              <td colSpan="2">{parse_doctor.hospital}</td>
            </tr>
            <tr>
              <td>Qualification:</td>
              <td colSpan="2">{parse_doctor.qualification}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
      <br></br>
    </div>
    )
}
export default ConsultedDoctors;