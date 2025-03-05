import { NodeSDK } from "@opentelemetry/sdk-node";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { Resource } from "@opentelemetry/resources";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { MongooseInstrumentation } from "@opentelemetry/instrumentation-mongoose";

// Enable diagnostic logging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

export const instrumentationInitializetion = () => {
  console.log("OpenTelemetry started here");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("ZIPKIN_ENDPOINT:", process.env.ZIPKIN_ENDPOINT);

  const traceExporter = new ZipkinExporter({
    url: process.env.ZIPKIN_ENDPOINT || "http://zipkin:9411/api/v2/spans",
    serviceName: "Testing",
  });

  const sdk = new NodeSDK({
    resource: new Resource({
      [ATTR_SERVICE_NAME]: "Testing",
      [ATTR_SERVICE_VERSION]: "1.0",
    }),
    traceExporter,
    instrumentations: [
      new ExpressInstrumentation(),
      new HttpInstrumentation(),
      new MongooseInstrumentation(),
    ],
  });

  sdk.start();

  process.on("SIGTERM", () => {
    sdk
      .shutdown()
      .then(() => console.log("Tracing terminated"))
      .catch((error) => console.error("Error terminating tracing:", error))
      .finally(() => process.exit(0));
  });

  console.log("OpenTelemetry ended here after initialization done");
};
