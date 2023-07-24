using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiaryDSR.Models
{
    [Owned]
    public partial class TypeColor
    {
        public int Red { get; set; } = 0;

        public int Green { get; set; } = 0;

        public int Blue { get; set; } = 0;

        public static TypeColor FromHex(int R, int G, int B) =>
            new TypeColor { Red = R, Green = G, Blue = B };

        public static TypeColor Default() =>
            new TypeColor();
    }
}
