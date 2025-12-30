# Contributing & Customization Guide

This guide helps you customize this template for your specific project needs. Whether you're building a new application or contributing improvements to the template itself, this document will help you get started.

## 🎯 Using This Template for Your Project

### Step 1: Fork or Clone

```bash
# Clone the repository
git clone https://github.com/yourusername/template.git my-new-project
cd my-new-project

# Remove the original git history (optional)
rm -rf .git
git init
git add .
git commit -m "Initial commit from template"
```

### Step 2: Customize Project Identity

1. **Update package.json**
   ```json
   {
     "name": "your-project-name",
     "version": "1.0.0",
     "description": "Your project description"
   }
   ```

2. **Update Server.csproj**
   ```xml
   <PropertyGroup>
     <RootNamespace>YourProjectName</RootNamespace>
   </PropertyGroup>
   ```

3. **Update README.md**
   - Replace title and description
   - Update screenshots and examples
   - Add your specific setup instructions

### Step 3: Replace Example Domain Model

The template uses "WeatherForecast" as an example. Replace it with your domain:

#### Backend Changes

1. **Create Your Model**
   ```bash
   cd server
   # Delete or rename WeatherForecast.cs
   # Create YourModel.cs
   ```

   Example:
   ```csharp
   namespace Server;
   
   /// <summary>
   /// Your domain model description
   /// </summary>
   public class Product
   {
       public int Id { get; set; }
       public string Name { get; set; } = string.Empty;
       public decimal Price { get; set; }
       public DateTime CreatedAt { get; set; }
   }
   ```

2. **Create Your Controller**
   ```bash
   cd Controllers
   # Delete or rename WeatherForecastController.cs
   # Create ProductController.cs
   ```

   Use the WeatherForecastController as a template - it demonstrates all CRUD operations.

3. **Test Your API**
   ```bash
   dotnet run
   # Visit https://localhost:7294/openapi/v1.json to see your API spec
   ```

#### Frontend Changes

1. **Regenerate API Types**
   ```bash
   cd client
   bun run generate:api
   ```

2. **Create Your Service**
   ```bash
   cd services
   # Create productService.ts based on weatherForecastService.ts pattern
   ```

3. **Update Pages**
   - Modify `app/page.tsx` to use your new service
   - Create new pages in `app/` directory

### Step 4: Add Authentication (Optional)

#### Backend

1. **Install Packages**
   ```bash
   cd server
   dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
   ```

2. **Configure in Program.cs**
   ```csharp
   builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
       .AddJwtBearer(options => {
           // Configure JWT options
       });
   
   // Later in the pipeline
   app.UseAuthentication();
   app.UseAuthorization();
   ```

3. **Protect Controllers**
   ```csharp
   [Authorize]
   public class ProductController : ControllerBase
   {
       // Your endpoints
   }
   ```

#### Frontend

1. **Update API Client Middleware**
   ```typescript
   // In lib/api/apiClient.ts
   const middleware: Middleware = {
     async onRequest({ request }) {
       const token = getAuthToken(); // Implement this
       if (token) {
         request.headers.set('Authorization', `Bearer ${token}`);
       }
       return request;
     },
     // ... rest of middleware
   };
   ```

2. **Add Auth Context**
   - Create auth provider in `app/providers/`
   - Wrap your app in `layout.tsx`

### Step 5: Add Database Integration

1. **Install Entity Framework Core**
   ```bash
   cd server
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Design
   ```

2. **Create DbContext**
   ```csharp
   public class ApplicationDbContext : DbContext
   {
       public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options) { }
       
       public DbSet<Product> Products { get; set; }
   }
   ```

3. **Register in Program.cs**
   ```csharp
   builder.Services.AddDbContext<ApplicationDbContext>(options =>
       options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
   ```

4. **Replace In-Memory Store**
   - Inject `ApplicationDbContext` into controllers
   - Replace `ConcurrentDictionary` operations with EF Core queries

5. **Create and Run Migrations**
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

## 🔧 Common Customizations

### Adding New UI Components

This template uses a Radix UI component pattern similar to shadcn/ui:

```bash
# Components are in client/components/ui/
# Add new components following the existing patterns
```

### Customizing Styles

1. **Tailwind Colors**
   - Edit CSS variables in `app/globals.css`
   - Tailwind v4 uses CSS-first configuration

2. **Fonts**
   - Add fonts to `public/fonts/`
   - Import in `app/layout.tsx`

### Adding API Versioning

```csharp
// In Program.cs
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
});

// In Controllers
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ProductController : ControllerBase
{
    // ...
}
```

### Setting Up CORS

```csharp
// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClient", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Later in pipeline
app.UseCors("AllowClient");
```

## 🐛 Common Issues

### Issue: API Types Not Updating

**Solution:**
1. Make sure API server is running
2. Run `bun run generate:api` in client directory
3. Restart your Next.js dev server

### Issue: CORS Errors

**Solution:**
Add CORS configuration to the API (see "Setting Up CORS" above)

### Issue: Port Conflicts

**Solution:**
- API: Edit `Properties/launchSettings.json`
- Client: Run `bun dev -- -p 3001` (or edit `package.json`)

## 🧪 Testing Strategy

### Backend Tests

1. **Create Test Project**
   ```bash
   dotnet new xunit -n Server.Tests
   cd Server.Tests
   dotnet add reference ../Server/Server.csproj
   ```

2. **Add Integration Tests**
   - Use `WebApplicationFactory<Program>` for integration tests
   - Test controllers with in-memory database

### Frontend Tests

1. **Install Vitest**
   ```bash
   bun add -d vitest @testing-library/react @testing-library/jest-dom
   ```

2. **Add Test Script**
   ```json
   {
     "scripts": {
       "test": "vitest"
     }
   }
   ```

## 🤝 Contributing to the Template

If you want to improve the template itself:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-improvement
   ```
3. **Make your changes**
   - Keep changes generic and reusable
   - Update documentation
   - Ensure all builds pass
4. **Submit a pull request**
   - Describe your changes clearly
   - Explain the benefit to template users

### Guidelines for Template Contributions

- Keep the example domain simple (WeatherForecast is good)
- Document all patterns clearly
- Ensure code builds and runs without errors
- Follow existing code style
- Update both API and client if making cross-cutting changes
- Test in both development and production builds

## 📚 Additional Resources

- [ASP.NET Core Best Practices](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/best-practices)
- [Next.js Production Checklist](https://nextjs.org/docs/app/building-your-application/deploying/production-checklist)
- [REST API Design Best Practices](https://restfulapi.net/)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

## 💡 Tips

- Start small - get the basic CRUD working before adding complex features
- Use the example code as a reference - it demonstrates best practices
- Keep the separation between API and client clean
- Commit frequently as you customize
- Document your specific domain logic
- Consider adding an ADR (Architecture Decision Records) directory

---

**Questions or Issues?** Open an issue in the repository or check existing issues for solutions.
