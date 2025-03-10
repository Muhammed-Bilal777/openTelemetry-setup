import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Tracer, trace } from "@opentelemetry/api";

export function setupTracing(): Tracer {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "ecommerce-app",
    }),
  });

  const exporter = new OTLPTraceExporter({
    url: "http://otel-collector:4318/v1/traces", // HTTP endpoint for OTLP
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  provider.register();

  return trace.getTracer("ecommerce-tracer");
}
