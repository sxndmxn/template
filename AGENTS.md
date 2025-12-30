# Repository Guidelines

## Project Structure & Module Organization
- The repo hosts two apps: `server/Server.Api/` ASP.NET Core service with controllers in `server/Server.Api/Controllers/`, shared models like `WeatherForecast.cs`, and configuration via `server/Server.Api/appsettings*.json`. 
- Build artifacts stay ignored under `server/Server.Api/bin/` and `server/Server.Api/obj/`.
- The Next.js 16 client lives in `client/`; routes sit in `client/app/`, UI modules in `client/components/`, hooks in `client/hooks/`, and shared utils or DTOs in `client/lib/` and `client/types/`.
- Place static assets in `client/public/`.
- Add .NET tests under `server/Server.Tests/` and frontend suites in `client/tests/`.

## Build, Test, and Development Commands
- Restore and run the API: `dotnet restore server` then `dotnet watch run --project server/Server.Api/Server.csproj`.
- Produce a release build with `dotnet publish server/Server.Api -c Release`.
- Manage client dependencies via `bun install --prefix client`.
- Start Next.js locally using `bun run dev`.
- build with `bun run build`.
- lint through `bun run lint`.

## Coding Style & Naming Conventions
- Use file-scoped namespaces and 4-space indentation across C#. 
- Name controllers `PascalCaseController` and locals `camelCase`.
- TypeScript adheres to the Next.js ESLint defaults: prefer function components, named exports, and Tailwind helpers defined in `client/lib/`.
- Components should be `PascalCase.tsx`; hooks follow `useCamelCase.ts`.
- Run formatters or lint fixes before committing.

## Testing Guidelines
- Add .NET unit or integration tests in `server/Server.Tests/` and execute `dotnet test server`. 
- Frontend tests should leverage Vitest or Playwright via `bun test --prefix client`. Use the built in jest like API for bun.
- Name test files after their targets (e.g., `WeatherForecastControllerTests.cs`, `ForecastList.test.tsx`).
- Prioritize coverage for new logic, critical flows, and API contracts when endpoints evolve.

## Commit & Pull Request Guidelines
- Follow Conventional Commits such as `feat: add auth flow` or `fix: handle empty forecasts`. 
- Pull requests must summarize changes, list affected endpoints or routes, link related issues, and attach screenshots or API samples for UI or contract updates.
- Confirm lint and test commands pass locally and flag migrations or configuration changes.

## Environment & Configuration Tips
- Store development overrides in `server/Server.Api/appsettings.Development.json` and `client/.env.local`. 
- Coordinate API base URLs through `client/services/` instead of hard-coding.
- Regenerate OpenAPI clients before merging whenever backend contracts shift.
