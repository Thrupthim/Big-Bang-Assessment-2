using BigBangAssessmentAngular.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.Claims;

namespace BigBangAssessmentAngular.Models
{

    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DPDbContext _context;

        public AdminController(DPDbContext context)
        {
            _context = context;
        }
        
        [HttpPost("Register")]
        public async Task<IActionResult> Register( Admin model)
        {
            
            
            var existingUser = await _context.Admin.FirstOrDefaultAsync(a => a.Email == model.Email);
            if (existingUser != null)
            {
                return BadRequest("User with the same email already exists");
            }

            
            var admin = new Admin
            {
                Name = model.Name,
                Email=model.Email,
                Password = model.Password,
                PhoneNo=model.PhoneNo,
                Gender = model.Gender,
                Reason = model.Reason,
                Specialization = model.Specialization,
                Experience = model.Experience,
                Hospital = model.Hospital,
                Qualification=model.Qualification,
                Role = model.Role
            };

            _context.Admin.Add(admin);
            await _context.SaveChangesAsync();
            if (model.Role == "Doctor")
            {
                var doctor = new Doctor
                {
                    DFirstName = model.Name,
                    DLastName=model.Name,
                    DPhoneNo=model.PhoneNo,
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

            
        

    }
}
