using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = ctx =>
    {
        ctx.ProblemDetails.Extensions["traceId"] = ctx.HttpContext.TraceIdentifier;
    };
});
builder.Services.AddOpenApi();

var app = builder.Build();
app.UseExceptionHandler("/error");

app.Map("/error", (HttpContext http, IHostEnvironment env) =>
{
    var ex = http.Features.Get<IExceptionHandlerFeature>()?.Error;
    return Results.Problem(
        title: "An unexpected error occurred.",
        detail: env.IsDevelopment() ? ex?.ToString() : null,
        statusCode: StatusCodes.Status500InternalServerError);
});

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
