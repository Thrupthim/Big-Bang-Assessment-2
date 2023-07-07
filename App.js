import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import LoginAdmin from './LoginAdmin';
import RegisterAdmin from './RegisterAdmin';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import AdminPage from './AdminPage';
import PatientPage from './PatientPage';
import FetchPatient from './FetchPatient';
import AdminPost from './AdminPost';
import AdminDelete from './AdminDelete';
import AdminGet from './AdminGet';
import AdminUpdate from './AdminUpdate';
import ConsultedDoctors from './ConsultedDoctors';
import FetchAllDoctors from './FetchAllDoctors';
import FetchConsultedDoctors from './FetchConsultedDoctors';
import FetchNotConsultedDoctors from './FetchNotConsultedDoctors';
import NewPatient from './NewPatient';
import NotConsultedDoctors from './NotConsultedDoctors';
import DoctorPage from './DoctorPage';
import ActivateDoctor from './ActivateDoctor';
import InActivateDoctor from './InActivateDoctor';

function App() {
  
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/LoginAdmin' element={<LoginAdmin/>}></Route>
        <Route path='/RegisterAdmin' element={<RegisterAdmin/>}></Route>
        <Route path='/AdminPage' element={<AdminPage/>}></Route>
        <Route path='/FetchPatient' element={<FetchPatient/>}></Route>
        <Route path='/AdminPost' element={<AdminPost/>}></Route>
        <Route path='/AdminDelete' element={<AdminDelete/>}></Route>
        <Route path='/AdminGet' element={<AdminGet/>}></Route>
        <Route path='/AdminUpdate' element={<AdminUpdate/>}></Route>
        <Route path='/ConsultedDoctors' element={<ConsultedDoctors/>}></Route>
        <Route path='/FetchAllDoctors' element={<FetchAllDoctors/>}></Route>
        <Route path='/FetchConsultedDoctors' element={<FetchConsultedDoctors/>}></Route>
        <Route path='/FetchNotConsultedDoctors' element={<FetchNotConsultedDoctors/>}></Route>
        <Route path='/NewPatient' element={<NewPatient/>}></Route>
        <Route path='/NotConsultedDoctors' element={<NotConsultedDoctors/>}></Route>
        <Route path='/DoctorPage' element={<DoctorPage/>}></Route>
        <Route path='/ActivateDoctor' element={<ActivateDoctor/>}></Route>
        <Route path='/InActivateDoctor' element={<InActivateDoctor/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
