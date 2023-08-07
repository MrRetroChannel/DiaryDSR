using DiaryDSR;
using DiaryDSR.Models;
using DSRDiaryAPI.Models;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace DSRDiaryAPI
{
    public class TaskExpirer : BackgroundService
    {
        IServiceProvider _provider;

        public List<CompletedTask> ExpiredTasks { get; set; }

        public TaskExpirer(IServiceProvider serviceProvider)
        {
            _provider = serviceProvider;
            ExpiredTasks = new List<CompletedTask>();
        }

        public async Task GetExpired(AppPostgreContext context)
        {
            var tasks = await context.DiaryTask.ToListAsync();
            ExpiredTasks.Clear();

            var today = tasks.Where(task =>
            {
                int diff = DateTime.UtcNow.DayOfYear - task.Starttime.DayOfYear;
                var repeat = task.Repeat;

                switch (repeat)
                {
                    case TaskRepeat.NONE:
                        if (diff == 0)
                            return true;
                        break;
                    case TaskRepeat.DAILY:
                        if (diff % 1 == 0)
                            return true;
                        break;
                    case TaskRepeat.WEEKLY:
                        if (diff % 7 == 0)
                            return true;
                        break;
                    case TaskRepeat.MONTHLY:
                        if (diff % 30 == 0)
                            return true;
                        break;
                    case TaskRepeat.YEARLY:
                        if (diff % 365 == 0)
                            return true;
                        break;
                }
                return false;
            });

            var expired = today.Where(task => task.Endtime < DateTime.UtcNow);

            foreach (var task in expired)
            {
                bool isDone = context.CompletedTasks.Where(ctask => ctask.Taskid == task.Id && ctask.Day.Year == DateTime.UtcNow.Year && ctask.Day.DayOfYear == DateTime.UtcNow.DayOfYear).Count() != 0;
                if (!isDone)
                {
                    var add = new Models.CompletedTask { Status = DiaryDSR.Models.TaskStatus.FAILED, Taskid = task.Id, Day = DateTime.UtcNow };
                    await context.CompletedTasks.AddAsync(add);
                    ExpiredTasks.Add(add);
                }
            }
            await context.SaveChangesAsync();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using (var scope = _provider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppPostgreContext>();

                var tasks = await context.DiaryTask.ToListAsync();

                var count = async (DateTime end, DiaryTask task, int days) => {
                    for (; end < DateTime.UtcNow; end = end.AddDays(days))
                        if (context.CompletedTasks.Where(ctask => ctask.Taskid == task.Id && ctask.Day.Year == end.Year && ctask.Day.DayOfYear == end.DayOfYear).Count() == 0)
                            await context.CompletedTasks.AddAsync(new Models.CompletedTask { Taskid = task.Id, Day = end, Status = DiaryDSR.Models.TaskStatus.FAILED });
                };

                foreach (var task in tasks)
                {
                    var end = task.Endtime;
                    switch (task.Repeat)
                    {
                        case TaskRepeat.NONE:
                            if (task.Endtime < DateTime.UtcNow && context.CompletedTasks.Where(ctask => ctask.Taskid == task.Id).Count() == 0)
                                await context.CompletedTasks.AddAsync(new Models.CompletedTask { Taskid = task.Id, Day = task.Endtime, Status = DiaryDSR.Models.TaskStatus.FAILED });
                            break;
                        case TaskRepeat.DAILY:
                            await count(end, task, 1);
                            break;
                        case TaskRepeat.WEEKLY:
                            await count(end, task, 7);
                            break;
                        case TaskRepeat.MONTHLY:
                            await count(end, task, 30);
                            break;
                        case TaskRepeat.YEARLY:
                            await count(end, task, 365);
                            break;
                    }
                }
                await context.SaveChangesAsync();

                while (!stoppingToken.IsCancellationRequested)
                {
                    await GetExpired(context);
                    await Task.Delay(TimeSpan.FromSeconds(5));
                }
            }
        }
    }
}
