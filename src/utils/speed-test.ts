import { type Locator, chromium } from "playwright";

export interface SpeedTestResult {
  download: Metric;
  upload: Metric;
  latency: Metric;
  bufferbloat: Metric;
  downloadSucceeded: boolean;
  uploadSucceeded: boolean;
  latencySucceeded: boolean;
  bufferbloatSucceeded: boolean;
  client: ClientInformation;
  server: ServerInformation;
}

interface Metric {
  value: number;
  unit: string;
}

interface ClientInformation {
  location: string;
  ip: string;
  isp: string;
}

interface ServerInformation {
  locations: string[];
}

interface SpeedTestStreamOptions {
  url?: string;
  interval?: number;
}

export async function* streamSpeedTestResult(
  options: SpeedTestStreamOptions = {},
): AsyncGenerator<SpeedTestResult> {
  const { url = "https://fast.com", interval = 500 } = options;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url);

    const downloadValueLocator = page.locator("#speed-value");
    const downloadUnitLocator = page.locator("#speed-units");
    const downloadSucceededLocator = page.locator("#speed-value.succeeded");
    const uploadValueLocator = page.locator("#upload-value");
    const uploadUnitLocator = page.locator("#upload-units");
    const uploadSucceededLocator = page.locator("#upload-value.succeeded");
    const latencyValueLocator = page.locator("#latency-value");
    const latencyUnitLocator = page.locator("#latency-units");
    const latencySucceededLocator = page.locator("#latency-value.succeeded");
    const bufferbloatValueLocator = page.locator("#bufferbloat-value");
    const bufferbloatUnitLocator = page.locator("#bufferbloat-units");
    const bufferbloatSucceededLocator = page.locator(
      "#bufferbloat-value.succeeded",
    );
    const clientLocationLocator = page.locator("#user-location");
    const clientIPLocator = page.locator("#user-ip");
    const clientISPLocator = page.locator("#user-isp");
    const serverLocationsLocator = page.locator("#server-locations");

    async function isSucceeded(succeededLocator: Locator) {
      return (await succeededLocator.count()) > 0;
    }

    let latestResult: SpeedTestResult;

    do {
      yield (latestResult = {
        download: {
          value: Number(await getTrimmedTextContent(downloadValueLocator)),
          unit: (await getTrimmedTextContent(downloadUnitLocator)) ?? "Mbps",
        },
        upload: {
          value: Number(await getTrimmedTextContent(uploadValueLocator)),
          unit: (await getTrimmedTextContent(uploadUnitLocator)) ?? "Mbps",
        },
        latency: {
          value: Number(await getTrimmedTextContent(latencyValueLocator)),
          unit: (await getTrimmedTextContent(latencyUnitLocator)) ?? "ms",
        },
        bufferbloat: {
          value: Number(await getTrimmedTextContent(bufferbloatValueLocator)),
          unit: (await getTrimmedTextContent(bufferbloatUnitLocator)) ?? "ms",
        },
        downloadSucceeded: await isSucceeded(downloadSucceededLocator),
        uploadSucceeded: await isSucceeded(uploadSucceededLocator),
        latencySucceeded: await isSucceeded(latencySucceededLocator),
        bufferbloatSucceeded: await isSucceeded(bufferbloatSucceededLocator),
        client: {
          location:
            (await getTrimmedTextContent(clientLocationLocator)) ??
            "알 수 없는 위치",
          ip: (await getTrimmedTextContent(clientIPLocator)) ?? "알 수 없는 IP",
          isp:
            (await getTrimmedTextContent(clientISPLocator)) ?? "알 수 없는 ISP",
        },
        server: {
          locations:
            (await getTrimmedTextContent(serverLocationsLocator))?.split(
              /\s*\|\s*/,
            ) ?? [],
        },
      } satisfies SpeedTestResult);

      await page.waitForTimeout(interval);
    } while (!latestResult.downloadSucceeded || !latestResult.uploadSucceeded);
  } finally {
    await context.close();
    await browser.close();
  }
}

async function getTrimmedTextContent(locator: Locator) {
  const trimmedTextContent = (await locator.textContent())?.trim();
  return trimmedTextContent === "" || typeof trimmedTextContent === "undefined"
    ? null
    : trimmedTextContent;
}
