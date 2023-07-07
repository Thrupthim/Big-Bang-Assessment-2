using System.ComponentModel.DataAnnotations;

namespace BigBangAssessmentAngular.Models
{
    public class Patient
    {
        [Key]
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public string? PFirstName { get; set; }
        public string? PLastName { get; set; }
        public string? PPhoneNo { get; set; }
        public string? Email { get; set; }
        public string? Reason { get; set; }
        public Doctor? Doctors { get; set; }
    }
}
