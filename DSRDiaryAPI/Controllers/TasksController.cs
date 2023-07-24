using DiaryDSR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DiaryDSR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppPostgreContext _context;

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
        public async Task<ActionResult<bool>> Post(DiaryTask task)
        {
            return Ok(await _context.DiaryTask.AddAsync(task));
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
            else
            {
                _context.DiaryTask.Remove(found);
                return Ok(true);
            }
        }
    }
}
