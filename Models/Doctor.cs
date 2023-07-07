using System.ComponentModel.DataAnnotations;

namespace BigBangAssessmentAngular.Models
{
    public class Doctor
    {
        [Key]
        public int DoctorId { get; set; }
        public string? DFirstName { get; set; }
        public string? DLastName { get; set; }
        public string? DPhoneNo { get; set; }
        public string? DEmail { get; set; }
        public string? Specialization { get; set; }
        public string? Experience { get; set; }
        public string? Hospital { get; set; }
        public string? Qualification { get; set; }
        public bool IsActive { get; set; } = false;
        public ICollection<Patient>? Patients { get; set; }

    }
}
