import { Box, Text } from "ink";
import { useEffect, useState } from "react";

import {
  type SpeedTestResult,
  streamSpeedTestResult,
} from "./utils/speed-test.ts";

export default function App() {
  const [result, setResult] = useState<SpeedTestResult | null>(null);

  useEffect(() => {
    void (async () => {
      for await (const result of streamSpeedTestResult()) {
        setResult(result);
      }
    })();
  }, []);

  if (result === null) {
    return null;
  }

  const {
    download,
    upload,
    latency,
    bufferbloat,
    downloadSucceeded,
    uploadSucceeded,
    latencySucceeded,
    bufferbloatSucceeded,
    client,
    server,
  } = result;

  return (
    <>
      <Box borderStyle="single" paddingLeft={2} width={80}>
        <Text
          color={download.value === 0 ? "white" : "blue"}
          dimColor={!downloadSucceeded}
        >
          ↓ {download.value} {download.unit}
        </Text>
        <Text color="white"> / </Text>
        <Text
          color={upload.value === 0 ? "white" : "blue"}
          dimColor={!uploadSucceeded}
        >
          ↑ {upload.value} {upload.unit}
        </Text>
      </Box>
      <Box
        borderStyle="single"
        flexDirection="column"
        paddingLeft={2}
        width={80}
      >
        <Text color="white">
          지연 시간:{" "}
          <Text
            color={latency.value === 0 ? "white" : "blue"}
            dimColor={!latencySucceeded}
          >
            {latency.value} {latency.unit}
          </Text>{" "}
          (트래픽 없음) /{" "}
          <Text
            color={bufferbloat.value === 0 ? "white" : "blue"}
            dimColor={!bufferbloatSucceeded}
          >
            {bufferbloat.value} {bufferbloat.unit}
          </Text>{" "}
          (트래픽 많음)
        </Text>
        <Text color="white">
          클라이언트: {client.location} — {client.ip} ({client.isp})
        </Text>
        <Text color="white">서버: {server.locations.join(" | ")}</Text>
      </Box>
    </>
  );
}
