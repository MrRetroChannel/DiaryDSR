using DiaryDSR.Models;
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

        private struct JSONResponse
        {
            public int id { get; set; }
            public string message { get; set; }
        }

        public TasksController(AppPostgreContext ctx)
        {
            _context = ctx;
        }

        [HttpGet]
        public async Task<ActionResult<List<DiaryTask>>> Get()
        {
            return Ok(await _context.DiaryTask.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([ValidateNever] DiaryTask task)
        {
            TaskType? type = await _context.TaskTypes.FindAsync(task.TypeId);

            if (type == null)
                return BadRequest(-1);

            await _context.DiaryTask.AddAsync(task);
            await _context.SaveChangesAsync();
            return Ok(task.Taskid);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Put(DiaryTask task)
        {

            return Ok(true);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            DiaryTask? found = await _context.DiaryTask.FindAsync(id);

            if (found == null)
                return BadRequest(false);

            _context.DiaryTask.Remove(found);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}
