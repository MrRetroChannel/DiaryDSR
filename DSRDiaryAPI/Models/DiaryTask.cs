using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DiaryDSR.Models;

public partial class DiaryTask
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public DateTime Starttime { get; set; }

    public DateTime Endtime { get; set; }

    public string? Comment { get; set; }

    public int Typeid { get; set; }

    public TaskRepeat Repeat { get; set; }
}
