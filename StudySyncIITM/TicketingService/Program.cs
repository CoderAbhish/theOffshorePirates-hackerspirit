using TicketingService.Data;
using TicketingService.Services;
using TicketingService.Settings;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection(nameof(MongoDbSettings)));
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<ITicketService, TicketService>();

var app = builder.Build();

app.Run();
