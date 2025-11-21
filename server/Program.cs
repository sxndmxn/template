using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
    {
        context.ProblemDetails.Extensions["traceId"] = context.HttpContext.TraceIdentifier;
    };
});
builder.Services.AddOpenApi();

var webApp = builder.Build();
webApp.UseExceptionHandler("/error");

webApp.Map("/error", (HttpContext httpContext, IHostEnvironment env) =>
{
    var exception = httpContext.Features.Get<IExceptionHandlerFeature>()?.Error;
    return Results.Problem(
        title: "An unexpected error occurred.",
        detail: env.IsDevelopment() ? exception?.ToString() : null,
        statusCode: StatusCodes.Status500InternalServerError);
});

if (webApp.Environment.IsDevelopment())
{
    webApp.MapOpenApi();
}

webApp.UseHttpsRedirection();
webApp.UseAuthorization();
webApp.MapControllers();
webApp.Run();
