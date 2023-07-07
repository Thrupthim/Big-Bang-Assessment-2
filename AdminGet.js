import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminPost from './AdminPost';
import AdminDelete from './AdminDelete';
import AdminUpdate from './AdminUpdate';
import AdminPage from './AdminPage';
import Home from './Home';
import './AdminGet.css';
import {useNavigate} from 'react-router-dom';


function AdminGet()
{
    const navigate=useNavigate('');
const handleGet=(e)=>
{
    e.preventDefault();
    navigate('/AdminPage');
}
const handlePost=(e)=>
{
    e.preventDefault();
    navigate('/AdminPost');
}
const handleUpdate=(e)=>
{
    e.preventDefault();
    navigate('/AdminUpdate');
}

const handleDelete=(e)=>
{
    e.preventDefault();
    navigate('/AdminDelete');
}
    
    return(
        <div className="container">
            <br></br>
            <br></br>
            <br></br>
            <div class="row-lg-13 ">
                <div class="col-md-6">
                    <button className="btn btn-secondary" onClick={handleGet}>Get</button>
                </div>
                <div class="col-md-6">
                    <button className="btn btn-dark " onClick={handlePost}>Post</button>
                </div>
            </div>
            <div class="row-lg-12 ">
                <div class="col-md-6">
                    <button className="btn btn-secondary " onClick={handleUpdate}>Update</button>
                </div>
                <div class="col-md-6">
                    <button className="btn btn-dark p-1" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
        
        


    //     <div className="container">
            
    //         <div className="navbar bg-info">
    //     <ul className="nav">
    //       <li className="nav-item">
    //         <Link className="nav-link "  href="">Get</Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" href="/AdminPost">Post</Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" href="/AdminUpdate">Update</Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link " href="/AdminDelete">Delete</Link>
    //       </li>
    //     </ul> 
    //   </div>
    //   <Routes>
    //     <Route exact path="/" component={<Home/>} />
    //     <Route path="/AdminPost" component={<AdminPost/>} />
    //     <Route path="/AdminUpdate" component={<AdminUpdate/>} />
    //     <Route path="/AdminDelete" component={<AdminDelete/>} />
    //     <Route path="/AdminGet" element={<AdminGet />} />
    //   </Routes>
            
            
    //   <div>

    //   </div>
    //     </div>
        
    )
}
export default AdminGet;