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

        public TaskTypeController(AppPostgreContext ctx)
        {
            _context = ctx;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskType>>> Get()
        {
            return await _context.TaskTypes.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(TaskType type)
        {
            await _context.TaskTypes.AddAsync(type);
            await _context.SaveChangesAsync();
            return Ok(type.Typeid);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Put(TaskType type)
        {
            TaskType? found = _context.TaskTypes.Find(type.Typeid);

            if (found == null)
                return BadRequest(false);

            found.Typename = type.Typename;
            found.Color = type.Color;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            TaskType? type = await _context.TaskTypes.FindAsync(id);

            if (type == null)
                return BadRequest(false);

            _context.TaskTypes.Remove(type);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}
