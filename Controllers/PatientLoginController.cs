using BigBangAssessmentAngular.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BigBang_Assessment__Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientLoginController : ControllerBase
    {
        private readonly DPDbContext _context;

        public PatientLoginController(DPDbContext context)
        {
            _context = context;
        }
        [HttpGet("patient/newpatient/{patientEmail}")]
        public IActionResult GetDoctorsForNewPatient(string patientEmail)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.Email == patientEmail);
            if (patient == null)
            {
                var doctors_all = _context.Doctors.ToList();
                return Ok(doctors_all);
            }
            else
            {
                return BadRequest("Not a new patient");
            }
        }
        
        [HttpGet("patient/consulteddoctors/{patientEmail}")]
        public IActionResult GetConsultedDoctors(string patientEmail)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.Email == patientEmail);
            if (patient == null)
            {
                return BadRequest("New patient");
            }
            else
            {
                var doctors = _context.Doctors
                    .Join(_context.Patients,
                        d => d.DoctorId,
                        p => p.DoctorId,
                        (d, p) => new { Doctor = d, patientEmail = p.Email })
                    .Where(x => x.patientEmail == patient.Email)
                    .Select(x => x.Doctor)
                    .ToList();

                return Ok(doctors);
            }
        }

        [HttpGet("patient/notconsulteddoctors/{patientEmail}")]
        public IActionResult GetNotConsultedDoctors(string patientEmail)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.Email == patientEmail);
            if (patient == null)
            {
                return BadRequest("New patient");
            }
            else
            {
                var doctors = _context.Doctors
                .Where(d => !_context.Patients.Any(p => p.DoctorId == d.DoctorId && p.Email == patientEmail))
                .ToList();
                if (doctors.Count == 0)
                {
                    return BadRequest("Patient has consulted  all doctors");
                }
                else
                {
                    return Ok(doctors);
                }
            }
        }
    }
}
