# Full-Stack Template: .NET API + Next.js Client

A minimal, barebones template for building modern web applications with a .NET Core API backend and Next.js 16 frontend. This repository demonstrates clean architecture patterns and best practices without unnecessary complexity.

## 🏗️ Architecture Overview

This template follows a clean separation between client and server:

- **`/server`** - ASP.NET Core 10.0 Web API
  - RESTful API with OpenAPI/Swagger documentation
  - Built-in error handling with Problem Details (RFC 7807)
  - CRUD operations example with in-memory storage
  - File-scoped namespaces and modern C# patterns

- **`/client`** - Next.js 16 Application (App Router)
  - Server Components for optimal performance
  - Type-safe API client generated from OpenAPI spec
  - Minimal Tailwind CSS styling
  - No UI component library dependencies

## 🚀 Quick Start

### Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- Git

### Running the API

```bash
# Navigate to the server directory
cd server

# Restore dependencies
dotnet restore

# Run the API with hot reload
dotnet watch run
```

The API will start at `https://localhost:7294` (or `http://localhost:5294`). OpenAPI documentation is available at `/openapi/v1.json` in development mode.

### Running the Client

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The client will start at `http://localhost:3000`.

### Building for Production

**API:**
```bash
cd server
dotnet publish -c Release -o ./publish
```

**Client:**
```bash
cd client
npm run build
npm run start
```

## 📚 What You'll Learn

This template demonstrates:

### Backend Patterns

1. **RESTful API Design**
   - Resource-based routing (`/WeatherForecast`, `/WeatherForecast/{id}`)
   - HTTP verbs mapping (GET, POST, PUT, DELETE)
   - Proper status codes (200, 201, 204, 400, 404, 409, 500)

2. **Error Handling**
   - Global exception handler with Problem Details format
   - Consistent error responses
   - Development vs. Production error details

3. **OpenAPI Integration**
   - Automatic API documentation generation
   - Client code generation support
   - Type-safe contracts between frontend and backend

4. **In-Memory Data Store**
   - Thread-safe operations with `ConcurrentDictionary`
   - Atomic operations with `Interlocked`
   - CRUD implementation patterns

### Frontend Patterns

1. **Type Safety**
   - Generated TypeScript types from OpenAPI spec
   - Compile-time API contract validation
   - End-to-end type safety

2. **API Client**
   - Centralized configuration with `openapi-fetch`
   - Request/response middleware
   - Error handling patterns
   - Environment-based URLs

3. **Modern React**
   - Server Components for data fetching
   - Client Components for interactivity
   - Composition patterns
   - Minimal styling with Tailwind CSS

4. **UI/UX**
   - Simple, clean design
   - Responsive layout
   - Loading and error states

## 🔧 Configuration

### API Configuration

Configure the API through `appsettings.json` and `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Client Configuration

Create a `.env.local` file in the `client` directory:

```env
# API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5294
```

## 📖 Key Files to Understand

### Server

- **`Program.cs`** - Application entry point, service configuration, middleware pipeline
- **`Controllers/WeatherForecastController.cs`** - Complete CRUD controller example
- **`WeatherForecast.cs`** - Data model with computed properties

### Client

- **`lib/api/apiClient.ts`** - API client configuration and middleware
- **`lib/api/v1.ts`** - Auto-generated TypeScript types from OpenAPI
- **`services/weatherForecastService.ts`** - Service layer for API calls
- **`app/page.tsx`** - Example of Server Component data fetching

## 🛠️ Development Commands

### Server

```bash
# Build the project
dotnet build

# Run tests (when added)
dotnet test

# Watch for changes and hot reload
dotnet watch run

# Create a release build
dotnet publish -c Release
```

### Client

```bash
# Development server
npm run dev

# Type checking
npm run test:ts

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm run start
```

## 🔄 Generating API Types

When you update the API, regenerate TypeScript types:

1. Start the API server in development mode
2. In the client directory, run:

```bash
npx openapi-typescript http://localhost:5294/openapi/v1.json -o lib/api/v1.ts
```

Consider adding this as a script in `package.json` for convenience.

## 🎨 Customizing for Your Project

To adapt this template for your needs:

1. **Replace the Weather Example**
   - Create new models in `server/`
   - Add new controllers in `server/Controllers/`
   - Update services in `client/services/`
   - Regenerate API types

2. **Update Configuration**
   - Modify `appsettings.json` for API settings
   - Update `next.config.ts` for Next.js configuration
   - Set environment variables in `.env.local`

3. **Add Authentication**
   - Install identity packages in the API
   - Add authentication middleware
   - Implement token handling in the client

4. **Add Database**
   - Install Entity Framework Core
   - Create DbContext and migrations
   - Replace in-memory storage with database

5. **Enhance UI**
   - Add UI component libraries like Radix UI or shadcn/ui
   - Customize Tailwind configuration
   - Add your brand colors and fonts

## 📦 Technology Stack

### Backend
- ASP.NET Core 10.0
- OpenAPI/Swagger (Scalar)
- Problem Details (RFC 7807)

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- openapi-fetch for type-safe API calls

### Development Tools
- npm for package management
- ESLint for code linting
- TypeScript compiler for type checking

## 🤝 Contributing

This is a template repository. Feel free to fork it and adapt it to your needs. If you have suggestions for improving the template itself, please open an issue or pull request.

## 📄 License

This template is provided as-is for you to use and modify as needed for your projects.

## 🎓 Learning Resources

- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Ready to build something amazing?** Start by exploring the code, running the examples, and then make it your own!
