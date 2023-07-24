global using Microsoft.EntityFrameworkCore;
using DiaryDSR;

class MainProgram
{
    public static void Main(String[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();

        builder.Services.AddDbContext<AppPostgreContext>( options =>
                options.UseNpgsql("Host=localhost;Port=5432;Database=Tasks;Username=postgres;Password=123")
        );

        var app = builder.Build();

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.UseRouting();

        app.Run();
    }
}