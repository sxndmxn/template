import Image from "next/image";
import { getWeatherForecast, getWeatherForecastById } from "@/services/weatherForecastService";

async function getWeatherData() {
  try {
    const weather = await getWeatherForecast();
    const oneWeather = await getWeatherForecastById(5);
    return { weather, oneWeather, error: null };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return { weather: [], oneWeather: null, error: "Failed to connect to API" };
  }
}

export default async function Home() {
  const { weather, oneWeather, error } = await getWeatherData();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
            <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">API Connection Error</h2>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">
              Unable to connect to the API. Make sure the server is running at {process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5294"}
            </p>
          </div>
        ) : (
          <>
            {oneWeather && (
              <div className="mb-8 rounded-lg border p-4">
                <h2 className="text-lg font-semibold">Sample Forecast (ID: {oneWeather.id})</h2>
                <p className="mt-2">Date: {oneWeather.date}</p>
                <p>Temperature: {oneWeather.temperatureC}°C / {oneWeather.temperatureF}°F</p>
                <p>Summary: {oneWeather.summary}</p>
              </div>
            )}
            
            <h1 className="text-xl font-bold">All Weather Forecasts</h1>
            {weather.length === 0 ? (
              <p className="mt-4 text-muted-foreground">No forecasts available</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {weather.map((w, i) => (
                  <li key={`weather-${i}`} className="rounded border p-3">
                    <div className="font-medium">{w.date}</div>
                    <div className="text-sm text-muted-foreground">{w.summary}</div>
                    <div className="text-sm">{w.temperatureC}°C / {w.temperatureF}°F</div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
