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

    public TypeColor Color { get; set; } = TypeColor.Default();
}
