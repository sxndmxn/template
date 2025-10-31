# Repository Guidelines

## Project Structure & Module Organization
The repo hosts two apps: `api/` ASP.NET Core service with controllers in `api/Controllers/`, shared models like `WeatherForecast.cs`, and configuration via `api/appsettings*.json`. Build artifacts stay ignored under `api/bin/` and `api/obj/`. The Next.js 16 client lives in `client/`; routes sit in `client/app/`, UI modules in `client/components/`, hooks in `client/hooks/`, and shared utils or DTOs in `client/lib/` and `client/types/`. Place static assets in `client/public/`. Add .NET tests under `api.Tests/` and frontend suites in `client/tests/` or beside the feature.

## Build, Test, and Development Commands
Restore and run the API: `dotnet restore api` then `dotnet watch run --project api/Api.csproj`. Produce a release build with `dotnet publish api -c Release`. Manage client dependencies via `bun install --prefix client`. Start Next.js locally using `bun run dev --prefix client`, build with `bun run build --prefix client`, and lint through `bun run lint --prefix client`.

## Coding Style & Naming Conventions
Use file-scoped namespaces and 4-space indentation across C#. Name controllers `PascalCaseController` and locals `camelCase`. TypeScript adheres to the Next.js ESLint defaults: prefer function components, named exports, and Tailwind helpers defined in `client/lib/`. Components should be `PascalCase.tsx`; hooks follow `useCamelCase.ts`. Run formatters or lint fixes before committing.

## Testing Guidelines
Add .NET unit or integration tests in `api.Tests/` and execute `dotnet test`. Frontend tests should leverage Vitest or Playwright via `bun test --prefix client`. Name test files after their targets (e.g., `WeatherForecastControllerTests.cs`, `ForecastList.test.tsx`). Prioritize coverage for new logic, critical flows, and API contracts when endpoints evolve.

## Commit & Pull Request Guidelines
Follow Conventional Commits such as `feat: add auth flow` or `fix: handle empty forecasts`. Pull requests must summarize changes, list affected endpoints or routes, link related issues, and attach screenshots or API samples for UI or contract updates. Confirm lint and test commands pass locally and flag migrations or configuration changes.

## Environment & Configuration Tips
Store development overrides in `api/appsettings.Development.json` and `client/.env.local`. Coordinate API base URLs through `client/services/` instead of hard-coding. Regenerate OpenAPI clients before merging whenever backend contracts shift.
