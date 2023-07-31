using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DiaryDSR.Models;

public partial class DiaryTask
{
    [Key]
    public int Taskid { get; set; }

    public string Taskname { get; set; }

    public DateTime Starttime { get; set; }

    public DateTime Endtime { get; set; }

    public string? Taskcomment { get; set; }

    public int TypeId { get; set; }

    //public TaskType Type { get; set; }

    public TypeStatus Status { get; set; } = TypeStatus.INPROGRESS;

    public TypeRepeat Repeat { get; set; }
}
