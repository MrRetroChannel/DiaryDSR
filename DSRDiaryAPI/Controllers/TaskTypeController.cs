using DiaryDSR;
using DiaryDSR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DSRDiaryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskTypeController : ControllerBase
    {
        private readonly AppPostgreContext _context;

        private readonly DbSet<TaskType> _tasktypes;

        public TaskTypeController(AppPostgreContext ctx)
        {
            _context = ctx;
            _tasktypes = ctx.TaskTypes;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskType>>> Get()
        {
            return await _tasktypes.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(TaskType type)
        {
            await _tasktypes.AddAsync(type);
            await _context.SaveChangesAsync();
            return Ok(type.Id);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Put(TaskType type)
        {
            TaskType? found = _tasktypes.Find(type.Id);

            if (found == null)
                return BadRequest(false);

            found.Name = type.Name;
            found.Color = type.Color;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            TaskType? type = await _tasktypes.FindAsync(id);

            if (type == null)
                return BadRequest(false);

            _tasktypes.Remove(type);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}
