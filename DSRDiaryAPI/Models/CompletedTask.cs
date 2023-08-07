using DiaryDSR.Models;
using System.ComponentModel.DataAnnotations;

namespace DSRDiaryAPI.Models
{
    public class CompletedTask
    {
        [Key]
        public int Id { get; set; }
        public int Taskid { get; set; }

        public DateTime Day { get; set; }

        public DiaryDSR.Models.TaskStatus Status { get; set; }
    }
}
