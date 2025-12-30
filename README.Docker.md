# Docker Setup

This repository includes Docker and Docker Compose configuration for running both the .NET server and Next.js client applications.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

To run the entire application stack with Docker Compose:

```bash
# Build and start all services
docker compose up --build

# Or run in detached mode (background)
docker compose up -d --build
```

The services will be available at:
- **Client (Next.js)**: http://localhost:3000
- **Server (API)**: http://localhost:5294

## Docker Compose Commands

```bash
# Start services
docker compose up

# Start services in background
docker compose up -d

# Build/rebuild services
docker compose build

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v

# View logs
docker compose logs

# Follow logs in real-time
docker compose logs -f

# View logs for specific service
docker compose logs -f client
docker compose logs -f server
```

## Architecture

The `docker-compose.yml` file defines two services:

1. **server**: ASP.NET Core API
   - Exposed on port 5294 (host) → 8080 (container)
   - Built from `./server/Dockerfile`
   - Includes health check for the WeatherForecast endpoint

2. **client**: Next.js application
   - Exposed on port 3000 (host) → 3000 (container)
   - Built from `./client/Dockerfile`
   - Configured to connect to the server via internal network
   - Depends on server service

Both services are connected via a shared `app-network` bridge network, allowing the client to communicate with the server using the service name `server` as the hostname.

## Environment Variables

The client is pre-configured to connect to the server using:
```
NEXT_PUBLIC_API_BASE_URL=http://server:8080
```

To customize environment variables, you can:
1. Modify the `environment` section in `docker-compose.yml`
2. Create a `.env` file in the root directory

## Development vs Production

This Docker setup is optimized for production deployment. For development, it's recommended to run the services locally:

```bash
# Terminal 1 - Run the server
cd server
dotnet watch run

# Terminal 2 - Run the client
cd client
bun run dev
```

## Troubleshooting

**Port already in use**: If ports 3000 or 5294 are already in use, you can modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Change host port from 3000 to 3001
```

**Rebuild after code changes**: After making code changes, rebuild the containers:

```bash
docker compose up --build
```

**Clear everything and start fresh**:

```bash
docker compose down -v
docker compose up --build
```
