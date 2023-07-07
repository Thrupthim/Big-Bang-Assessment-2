using BigBangAssessmentAngular.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.Claims;

namespace BigBangAssessmentAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnlyAdminController : ControllerBase
    {
        private readonly DPDbContext _context;
        public OnlyAdminController(DPDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("alldoctors")]
        public IActionResult GetAllDoctors()
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            // Check if the user has the "Admin" role
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctors = _context.Doctors.ToList();
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public IActionResult GetDoctorById(int id)
        {
            var doctor = _context.Doctors.FirstOrDefault(d => d.DoctorId == id);

            if (doctor == null)
            {
                return BadRequest();
            }

            return Ok(doctor);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromBody] Admin model)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            
            var existingUser = await _context.Admin.FirstOrDefaultAsync(a => a.Email == model.Email);
            if (existingUser != null)
            {
                return BadRequest("User with the same email already exists");
            }

            
            var admin = new Admin
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password,
                PhoneNo = model.PhoneNo,
                Gender = model.Gender,
                Reason = model.Reason,
                Specialization = model.Specialization,
                Experience = model.Experience,
                Hospital = model.Hospital,
                Qualification = model.Qualification,
                Role = model.Role,
                
            };

            _context.Admin.Add(admin);
            await _context.SaveChangesAsync();
            if (model.Role == "Doctor")
            {
                var doctor = new Doctor
                {
                    DFirstName = model.Name,
                    DLastName = model.Name,
                    DPhoneNo = model.PhoneNo,
                    DEmail = model.Email,
                    Qualification = model.Qualification,
                    Specialization = model.Specialization,
                    Experience = model.Experience,
                    Hospital = model.Hospital,
                };

                _context.Doctors.Add(doctor);
                await _context.SaveChangesAsync();
            }

            return Ok("Registration successful");
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{doctorId}")]
        public async Task<IActionResult> DeleteDoctor(int doctorId)
        {

            var claimsidentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleclaim = claimsidentity.FindFirst(ClaimTypes.Role);

            
            if (roleclaim == null || roleclaim.Value != "Admin")
            {
                return Unauthorized("only users with the 'admin' role can delete users");
            }
            var doctor = _context.Doctors.FirstOrDefault(d => d.DoctorId == doctorId);
            if (doctor == null)
            {
                
                return BadRequest();
            }

            
            var patientIds = _context.Patients
                .Where(p => p.DoctorId == doctorId)
                .Select(p => p.PatientId)
                .ToList();

           
            _context.Doctors.Remove(doctor);

           
            foreach (var patientId in patientIds)
            {
                var patient = new Patient { PatientId = patientId };
                _context.Patients.Attach(patient);
                _context.Patients.Remove(patient);
            }

            
            await _context.SaveChangesAsync();
            
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("doctor/{doctorId}")]
        public async Task<IActionResult> UpdateDoctor(int doctorId, Doctor updatedDoctor)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctor = _context.Doctors.FirstOrDefault(d => d.DoctorId == doctorId);

            if (doctor == null)
            {
                
                return BadRequest("Doctor does not exist");
            }
            var test_email = doctor.DEmail;
           
            if (updatedDoctor.DFirstName != null && updatedDoctor.DFirstName != "")
                doctor.DFirstName = updatedDoctor.DFirstName;

            if (updatedDoctor.DLastName != null && updatedDoctor.DLastName != "")
                doctor.DLastName = updatedDoctor.DLastName;

            if (updatedDoctor.DPhoneNo != null && updatedDoctor.DPhoneNo != "")
                doctor.DPhoneNo = updatedDoctor.DPhoneNo;

            if (updatedDoctor.DEmail != null && updatedDoctor.DEmail != "")
                doctor.DEmail = updatedDoctor.DEmail;

            if (updatedDoctor.Specialization != null && updatedDoctor.Specialization != "")
                doctor.Specialization = updatedDoctor.Specialization;

            if (updatedDoctor.Experience != null && updatedDoctor.Experience != "")
                doctor.Experience = updatedDoctor.Experience;

            if (updatedDoctor.Hospital != null && updatedDoctor.Hospital != "")
                doctor.Hospital = updatedDoctor.Hospital;

            if (updatedDoctor.Qualification != null && updatedDoctor.Qualification != "")
                doctor.Qualification = updatedDoctor.Qualification;
            doctor = _context.Doctors.FirstOrDefault(d => d.DoctorId == doctorId);

            if (doctor == null)
            {
               
                return BadRequest("Doctor does not exist");
            }
            test_email = doctor.DEmail;
           
            if (updatedDoctor.DFirstName != null && updatedDoctor.DFirstName != "")
                doctor.DFirstName = updatedDoctor.DFirstName;

            if (updatedDoctor.DLastName != null && updatedDoctor.DLastName != "")
                doctor.DLastName = updatedDoctor.DLastName;

            if (updatedDoctor.DPhoneNo != null && updatedDoctor.DPhoneNo != "")
                doctor.DPhoneNo = updatedDoctor.DPhoneNo;

            if (updatedDoctor.DEmail != null && updatedDoctor.DEmail != "")
                doctor.DEmail = updatedDoctor.DEmail;

            if (updatedDoctor.Specialization != null && updatedDoctor.Specialization != "")
                doctor.Specialization = updatedDoctor.Specialization;

            if (updatedDoctor.Experience != null && updatedDoctor.Experience != "")
                doctor.Experience = updatedDoctor.Experience;

            if (updatedDoctor.Hospital != null && updatedDoctor.Hospital != "")
                doctor.Hospital = updatedDoctor.Hospital;

            if (updatedDoctor.Qualification != null && updatedDoctor.Qualification != "")
                doctor.Qualification = updatedDoctor.Qualification;
            
            await _context.SaveChangesAsync();
            return Ok();
        }
       

        
        [Authorize(Roles = "Admin")]
        [HttpPut("doctor/{doctorId}/toggleActive")]
        public async Task<IActionResult> ToggleDoctorActive(int doctorId)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            // Check if the user has the "Admin" role
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can toggle doctor's active status");
            }

            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            doctor.IsActive = !doctor.IsActive;
            await _context.SaveChangesAsync();

            return Ok(doctor.IsActive);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("doctor/{doctorId}/setActive")]
        public async Task<IActionResult> SetDoctorActive(int doctorId)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            // Check if the user has the "Admin" role
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            doctor.IsActive = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("doctor/{doctorId}/setInactive")]
        
        public async Task<IActionResult> SetDoctorInactive(int doctorId)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            // Check if the user has the "Admin" role
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            doctor.IsActive = false;
            await _context.SaveChangesAsync();

            return Ok();
        }

    }



}
    
