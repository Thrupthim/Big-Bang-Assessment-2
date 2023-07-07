using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BigBangAssessmentAngular.Models;

namespace BigBangAssessmentAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly DPDbContext _context;

        public PatientsController(DPDbContext context)
        {
            _context = context;
        }

       
        [HttpGet("doctor/{email}")]
        public IActionResult GetPatientsByDoctorEmail(string email)
        {
            
            var doctor = _context.Doctors.FirstOrDefault(d => d.DEmail == email);

            if (doctor == null)
            {
                return BadRequest("No doctor found for the specified email.");
            }

            var doctorId = doctor.DoctorId;

            var patients = _context.Patients
                .Where(p => p.DoctorId == doctorId)
                .ToList();

            if (!patients.Any())
            {
                return BadRequest("No patients found for the specified doctor ID.");
            }

            return Ok(patients);
        }
        [HttpPost("{patientEmail}/{doctorId}")]
        public IActionResult AddPatient(string patientEmail, int doctorId)
        {
            try
            {
                var user = _context.Admin.FirstOrDefault(u => u.Email == patientEmail);
                if (user == null)
                {
                    return BadRequest("Invalid User");
                }

                var doctor = _context.Doctors.FirstOrDefault(d => d.DoctorId == doctorId);
                if (doctor == null)
                {
                    return BadRequest("Invalid Doctor");
                }

                var patient = new Patient
                {
                    
                    PFirstName = user.Name,
                    PLastName = user.Name,
                    PPhoneNo = user.PhoneNo,
                    Email = user.Email,
                    DoctorId = doctorId,
                    Reason = user.Reason
                };

                _context.Patients.Add(patient);
                _context.SaveChanges();

                return Ok(patient);
            }
            catch
            {
                return BadRequest("An error occurred while adding the patient.");
            }
        }


    }
}
