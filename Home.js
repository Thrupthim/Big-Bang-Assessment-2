import {useEffect} from 'react';
import {useState,Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginAdmin from './LoginAdmin';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { FaPhoneAlt } from 'react-icons/fa';
import Hospital from './download.jpeg';


const Home=()=>{
    const styles = {
        footer: {
          padding: '0px 0',
          marginTop: '0px',
          
        },
}
    const usenavigate=useNavigate();
    useEffect(()=>{

    })
    const register=()=>{
        usenavigate('/RegisterAdmin');
        
}
    return(
        <div className="container">
            <header>
            <div className="conatiner navbar bg-primary p-2 ">
                <h1>Hospital Management System</h1>
                <button className="btn btn-light" onClick={register}>Register</button>
            </div>
            </header>
            
            <br></br>
            <body>
            <div className="login-admin-container"
        style={{
          backgroundImage: `url('https://avacaremedical.com/blog/wp-content/uploads/2019/06/Stethoscope.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height:'600px',display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
            <LoginAdmin/>
            </div>
            </body>
            <footer style={styles.footer} className="bg bg-primary">
            <div style={styles.container} className="bg-primary p-4">
                <p style={{float:'left',paddingleft:'2px'}}>Get connected with us on Social Networks</p>
                <span style={{float:'right',paddingright:'2px'}}>
                    <FaFacebook size={32} style={{padding:'2px'}}/>
                    <FaTwitter size={32} style={{padding:'2px'}}/>
                    <FaInstagram size={32} style={{padding:'2px'}}/>
                    <IoLogoLinkedin size={32} style={{padding:'2px'}}/>
                    <IoLogoYoutube size={32} style={{padding:'2px'}}/>
                </span>
            </div>
            <div className="bg-primary">
                <table className="table table-primary">
                    <thead>
                        <tr>
                            <th style={{ borderBottom: 'none' }}>COMPANY NAME</th>
                            <th style={{ borderBottom: 'none' }}>SERVICES</th>
                            
                            <th style={{ borderBottom: 'none' }}>CONTACT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ borderBottom: 'none' }}>The ABC Hospital is a state-of-the-art medical<br></br> facility dedicated to providing exceptional healthcare services to the community.  </td>
                            <td style={{ borderBottom: 'none' }}>Emergency Care</td>
                            <td style={{ borderBottom: 'none' }}><span><FaHome size={25} /></span><span>New York, NY 10012, US</span></td>
                        </tr>
                        <tr>
                            <td style={{ borderBottom: 'none' }}>With a team of highly skilled doctors, nurses, and staff, <br></br>we are committed to delivering compassionate and personalized care to our patients.</td>
                            <td style={{ borderBottom: 'none' }}>Impatient Care</td>
                            <td style={{ borderBottom: 'none' }}><span><AiOutlineMail size={25} />info@example.com</span></td>
                        </tr>
                        <tr>
                            <td style={{ borderBottom: 'none' }}>Our hospital offers a wide range of specialties<br></br> and advanced medical technologies to diagnose and treat various health conditions.</td>
                            <td style={{ borderBottom: 'none' }}>Surgical Services</td>
                            <td style={{ borderBottom: 'none' }}><span><FaPhoneAlt size={25} />+01 234 56 789</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </footer>
        </div>
    );

}
export default Home;