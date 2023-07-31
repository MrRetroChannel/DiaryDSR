global using Microsoft.EntityFrameworkCore;
using DiaryDSR;

class MainProgram
{
    public static void Main(String[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(cors => cors.AddPolicy("AllowOrigin", 
            options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()) 
        );

        builder.Services.AddDbContext<AppPostgreContext>( options =>
                options.UseNpgsql("Host=localhost;Port=5432;Database=Tasks;Username=postgres;Password=123")
        );

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.UseRouting();

        app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

        app.Run();
    }
}