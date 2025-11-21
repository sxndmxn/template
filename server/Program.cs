using Microsoft.AspNetCore.Diagnostics;

// Create the web application builder with default configuration
var builder = WebApplication.CreateBuilder(args);

// Configure services for dependency injection

// Add support for API controllers with routing and model binding
builder.Services.AddControllers();

// Configure Problem Details (RFC 7807) for standardized error responses
// This provides consistent error formats across the API
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = ctx =>
    {
        // Include trace ID in all error responses for debugging and log correlation
        ctx.ProblemDetails.Extensions["traceId"] = ctx.HttpContext.TraceIdentifier;
    };
});

// Add OpenAPI/Swagger support for API documentation and client generation
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline (middleware)

// Global exception handler - catches all unhandled exceptions
// This ensures no raw exceptions are exposed to clients
app.UseExceptionHandler("/error");

// Error endpoint that converts exceptions to Problem Details responses
app.Map("/error", (HttpContext http, IHostEnvironment env) =>
{
    var ex = http.Features.Get<IExceptionHandlerFeature>()?.Error;
    return Results.Problem(
        title: "An unexpected error occurred.",
        // Only expose exception details in development for security
        detail: env.IsDevelopment() ? ex?.ToString() : null,
        statusCode: StatusCodes.Status500InternalServerError);
});

// Enable OpenAPI endpoint only in development (not in production)
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Redirect HTTP requests to HTTPS for security
app.UseHttpsRedirection();

// Enable authorization middleware (ready for when you add authentication)
app.UseAuthorization();

// Map controller routes to HTTP endpoints
app.MapControllers();

// Start the application and listen for requests
app.Run();
