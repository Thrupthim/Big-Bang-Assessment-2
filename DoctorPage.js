import FetchAllDoctors from "./FetchAllDoctors";
import NewPatient from "./NewPatient";
import FetchConsultedDoctors from "./FetchConsultedDoctors";
import ConsultedDoctors from "./ConsultedDoctors";
import FetchNotConsultedDoctors from "./FetchNotConsultedDoctors";
import NotConsultedDoctors from "./NotConsultedDoctors";

function DoctorPage(){
    return(<div>
        <FetchAllDoctors />
        <FetchConsultedDoctors />
        <FetchNotConsultedDoctors />
    </div>)
}

export default DoctorPage;