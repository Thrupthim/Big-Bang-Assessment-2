using System.ComponentModel.DataAnnotations;

namespace BigBangAssessmentAngular.Models
{
    public class Admin
    {
        [Key]
        public int AdminId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? PhoneNo { get; set; }
        public string? Gender { get; set; }
        public string? Reason { get; set; }
        public string? Specialization { get; set; }
        public string? Experience { get; set; }
        public string? Hospital { get; set; }
        public string? Qualification { get; set; }

        public string? Role { get; set; }
    }
}
