using DiaryDSR.Models;
using DSRDiaryAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace DiaryDSR
{
    public class AppPostgreContext : DbContext
    {
        public virtual DbSet<DiaryTask> DiaryTask { get; set; }

        public virtual DbSet<TaskType> TaskTypes { get; set; }

        public virtual DbSet<CompletedTask> CompletedTasks { get; set; }

        public AppPostgreContext(DbContextOptions options) : base(options)
        {
        }



        protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseNpgsql($"Host=localhost;Port=5432;Database=Tasks;Username=postgres;Password=123");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
