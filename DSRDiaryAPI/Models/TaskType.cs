using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiaryDSR.Models;

public partial class TaskType
{
    [Key]
    public int Typeid { get; set; }

    public string Typename { get; set; } = null!;

    public string Color { get; set; } = "#000000";
}
