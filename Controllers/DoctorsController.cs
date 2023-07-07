using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BigBangAssessmentAngular.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using System.Security.Claims;

namespace BigBangAssessmentAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly DPDbContext _context;

        public DoctorsController(DPDbContext context)
        {
            _context = context;
        }

        
        
        [HttpGet("patient/{patientId}")]
        public IActionResult GetDoctorsForPatient(int patientId)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var patient = _context.Patients.FirstOrDefault(p => p.PatientId == patientId);
            if (patient == null)
            {
                var doctors_all = _context.Doctors.ToList();
                return Ok(doctors_all);
            }

            var doctors = _context.Doctors
               .Join(_context.Patients,
                   d => d.DoctorId,
                   p => p.DoctorId,
                   (d, p) => new { Doctor = d, PatientId = p.PatientId })
               .Where(x => x.PatientId == patientId)
               .Select(x => x.Doctor)
               .ToList();

            if (doctors.Count == 0)
                return BadRequest("Invalid patient ID.");

            return Ok(doctors);
        }
        
        [HttpGet("doctorsnotbypatient/{patientId}")]
        public IActionResult GetDoctorsNotByPatientId(int patientId)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctors = _context.Doctors
                .Where(d => !_context.Patients.Any(p => p.DoctorId == d.DoctorId && p.PatientId == patientId))
                .ToList();

            if (doctors.Count == 0)
                return BadRequest("Invalid patient ID.");

            return Ok(doctors);
        }
        
        [HttpPost("doctors")]
        public async Task<IActionResult> AddDoctor( Doctor doctor)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            try
            {
                
                _context.Doctors.Add(doctor);
                await _context.SaveChangesAsync();

               
                return Ok(doctor);
            }
            catch (Exception ex)
            {
               
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding the doctor.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("doctor/{doctorId}")]
        public async Task<IActionResult> DeleteDoctor(int doctorId)
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

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return Ok();
        }


    }
}

