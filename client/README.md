# Next.js Client Application

This is the frontend application for the full-stack template, built with Next.js 16 and the App Router.

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.0+ (or Node.js 20+)
- The backend API running (see `../server/README.md`)

### Installation

```bash
# Install dependencies
bun install

# Copy environment configuration
cp .env.example .env.local

# Update .env.local with your API URL if different from default
```

### Development

```bash
# Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The page auto-updates as you edit files. Hot module replacement (HMR) is enabled by default.

### Available Scripts

```bash
# Development server with hot reload
bun run dev

# Production build
bun run build

# Start production server (after build)
bun run start

# Type checking
bun run test:ts

# Linting
bun run lint

# Generate TypeScript types from API OpenAPI spec
bun run generate:api
```

## 📁 Project Structure

```
client/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (demo of API integration)
│   └── dashboard/         # Example dashboard feature
├── components/            # React components
│   ├── ui/               # Reusable UI components (Radix UI based)
│   └── *.tsx             # Feature-specific components
├── lib/                   # Utility functions and configuration
│   ├── api/              # API client and generated types
│   │   ├── apiClient.ts  # Configured openapi-fetch client
│   │   └── v1.ts         # Auto-generated API types
│   └── utils.ts          # Helper functions
├── services/              # API service layer
│   └── weatherForecastService.ts  # Example service
├── hooks/                 # Custom React hooks
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🎨 Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **API Client**: openapi-fetch (type-safe)
- **Form Handling**: react-hook-form with Zod validation
- **State Management**: React hooks (useState, useContext)
- **Tables**: TanStack Table
- **Icons**: Lucide React + Tabler Icons

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5294
```

All environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

### Tailwind Configuration

Customize colors, fonts, and other design tokens in `tailwind.config.ts` (Tailwind v4 uses CSS variables).

### TypeScript Configuration

The project uses strict TypeScript. Configuration is in `tsconfig.json`.

## 🔄 Working with the API

### Generating Types

When the backend API changes, regenerate TypeScript types:

```bash
# Ensure the API server is running first
cd ../server && dotnet run

# In another terminal, generate types
cd ../client
bun run generate:api
```

This updates `lib/api/v1.ts` with the latest API contracts.

### Creating New Services

Follow the pattern in `services/weatherForecastService.ts`:

1. Import the API client and types
2. Create service functions that wrap API calls
3. Handle errors and edge cases
4. Export type-safe functions

Example:

```typescript
import { api } from "@/lib/api/apiClient";
import type { components } from "@/lib/api/v1";

type MyResource = components["schemas"]["MyResource"];

export async function getMyResources(): Promise<MyResource[]> {
  const { data, error } = await api.GET("/api/myresources");
  if (error) throw error;
  return data ?? [];
}
```

## 🧪 Testing

The template includes TypeScript type checking. To add tests:

1. Install a testing framework (e.g., Vitest, Jest)
2. Create test files alongside components: `MyComponent.test.tsx`
3. Add test scripts to `package.json`

## 📦 Building for Production

```bash
# Create optimized production build
bun run build

# Test the production build locally
bun run start

# The build output is in .next/
```

## 🎓 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs) - comprehensive guide
- [App Router Guide](https://nextjs.org/docs/app) - new routing paradigm
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) - SSR patterns

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### UI Libraries
- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/) - component patterns (this template uses similar approach)

## 🤝 Contributing

When adding new features:

1. Keep components small and focused
2. Use TypeScript strictly (avoid `any`)
3. Follow existing naming conventions
4. Document complex logic with comments
5. Update this README if adding new patterns

## 📄 License

This is a template - use it however you need for your projects!
