using DiaryDSR.Models;
using DSRDiaryAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace DiaryDSR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppPostgreContext _context;

        private readonly DbSet<DiaryTask> _tasks;

        private readonly DbSet<TaskType> _tasktypes;

        private readonly DbSet<CompletedTask> _completedtasks;

        private struct JSONResponse
        {
            public int id { get; set; }
            public string message { get; set; }
        }

        public TasksController(AppPostgreContext ctx)
        {
            _context = ctx;
            _tasks = ctx.DiaryTask;
            _tasktypes = ctx.TaskTypes;
            _completedtasks = ctx.CompletedTasks;
        }

        [HttpGet]
        public async Task<ActionResult<List<DiaryTask>>> Get()
        {
            return Ok(await _tasks.ToListAsync());
        }

        [HttpGet("Completed")]
        public async Task<ActionResult<List<CompletedTask>>> GetCompleted()
        {
            return Ok(await _completedtasks.ToListAsync()); 
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(DiaryTask task)
        {
            TaskType? type = await _tasktypes.FindAsync(task.Typeid);

            if (type == null)
                return BadRequest(-1);

            await _tasks.AddAsync(task);
            await _context.SaveChangesAsync();
            return Ok(task.Id);
        }

        [HttpPost("setComplete")]
        public async Task<ActionResult<bool>> SetComplete(CompletedTask task)
        {
            if (_completedtasks.Where(ctask => ctask.Taskid == task.Taskid && ctask.Day.Year == task.Day.Year && ctask.Day.DayOfYear == task.Day.DayOfYear).Count() > 0)
                return BadRequest(false);
            await _completedtasks.AddAsync(task);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Put(DiaryTask task)
        {
            DiaryTask? found = _tasks.Find(task.Id);

            if (found == null)
                return BadRequest(false);

            var types = found.GetType().GetProperties();

            foreach (var i in types)
                i.SetValue(found, i.GetValue(task));

            /*found.Taskname = task.Taskname;
            found.Starttime = task.Starttime;
            found.Endtime = task.Endtime;
            found.Taskcomment = task.Taskcomment;
            found.TypeId = task.TypeId;
            found.Status = task.Status;
            found.Repeat = task.Repeat;*/

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            DiaryTask? found = await _tasks.FindAsync(id);

            if (found == null)
                return BadRequest(false);

            _completedtasks.RemoveRange(_completedtasks.Where(task => task.Taskid == id));
            _tasks.Remove(found);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}
