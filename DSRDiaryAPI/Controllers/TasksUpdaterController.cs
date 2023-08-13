using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Newtonsoft.Json;

namespace DSRDiaryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksUpdaterController : ControllerBase
    {
        TaskExpirer _expirer;

        public TasksUpdaterController(TaskExpirer expirer)
        {
            _expirer = expirer;
        }

        [HttpGet]
        public async Task<IActionResult> GetTaskUpdate()
        {
            var service = _expirer;
                Response.Headers.Add("Content-Type", "text/event-stream");

            while (true)
            {
                var updates = service.ExpiredTasks;
                if (updates.Count != 0)
                {
                    var data = Encoding.UTF8.GetBytes($"data: {JsonConvert.SerializeObject(updates)}\r\r");
                    await Response.Body.WriteAsync(data, 0, data.Length);
                    await Response.Body.FlushAsync();
                }

                await Task.Delay(TimeSpan.FromSeconds(2));
            }

        }
    }
}
