using Microsoft.EntityFrameworkCore;

namespace BigBangAssessmentAngular.Models
{
    public class DPDbContext:DbContext
    {
        public DPDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Patient> Patients { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Admin> Admin { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>()
                .HasOne(b => b.Doctors)
                .WithMany(a => a.Patients)
                .HasForeignKey(p => p.DoctorId);
        }
    }
}
