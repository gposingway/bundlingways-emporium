using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "docs")),
    EnableDefaultFiles = true
});

app.Run();
