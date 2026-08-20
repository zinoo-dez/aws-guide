---
moduleNumber: 3
title: "Serverless Applications & Event-Driven Systems"
tagline: "Pay-Per-Execution, Zero Idle Servers, Sub-Second Autoscaling"
description: "Master event-driven cloud architecture. Learn how to combine AWS Lambda, API Gateway, DynamoDB, Amazon EventBridge, and SQS to build resilient backends that scale from zero to tens of thousands of requests per second."
theme: "Serverless Architecture & Event Choreography"
keyServices:
  - "AWS Lambda"
  - "Amazon API Gateway"
  - "Amazon DynamoDB"
  - "Amazon EventBridge"
  - "Amazon SQS"
  - "AWS Step Functions"
difficulty: "Intermediate"
estimatedHours: 6
icon: "zap"
order: 3
learningOutcomes:
  - "Design asynchronous event choreography using Amazon EventBridge and SQS Dead-Letter Queues (DLQs)."
  - "Mitigate Lambda cold starts through optimal memory allocation, provisioned concurrency, and bundle tree-shaking."
  - "Select between API Gateway HTTP APIs (low latency, cost-effective) and REST APIs (WAF, request validation, API keys)."
  - "Build sub-15ms CRUD endpoints backed by DynamoDB single-table design."
---

## The Serverless Mental Shift
Serverless is not merely running code without servers; it is a fundamental shift toward **event-driven choreography**:
- **Zero Idle Cost**: You pay strictly for execution milliseconds and IOPS. If zero users hit your service at 3 AM, your bill is exactly $0.00.
- **Micro-Concurrency**: Each request or event triggers an isolated execution container, eliminating traditional thread starvation and connection pool exhaustions.
- **Decoupled Buffering**: Direct integrations between API Gateway and SQS allow ingest spikes of 100,000 requests/sec without overloading downstream processors.

```mermaid
graph LR
    Client([Mobile / Web Clients]) -->|HTTPS REST| APIGW[Amazon API Gateway]
    APIGW -->|Direct Ingestion| SQS[(Amazon SQS Queue)]
    SQS -->|Batch Trigger: 10 msgs| Lambda[AWS Lambda Worker]
    Lambda -->|Single-Digit ms Write| DDB[(Amazon DynamoDB)]
    Lambda -->|Publish Domain Event| EB[Amazon EventBridge]
    EB -->|Filter Rule: OrderCompleted| NotifLambda[Notification Lambda]
    NotifLambda -->|Push Alert| SNS[Amazon SNS]

    style APIGW fill:#18223B,stroke:#FF9900,stroke-width:2px,color:#fff
    style Lambda fill:#101728,stroke:#A78BFA,stroke-width:1px,color:#fff
    style DDB fill:#101728,stroke:#38BDF8,stroke-width:1px,color:#fff
    style EB fill:#101728,stroke:#F59E0B,stroke-width:1px,color:#fff
```

---

## Case Studies in This Module
1. **[Real-Time Image Processing Pipeline](/case-studies/image-processing-pipeline)**: S3 upload event triggering async thumbnail generation, watermarking, and metadata tagging.
2. **[Resilient Webhook Ingestion Engine](/case-studies/webhook-notification-system)**: High-throughput webhook ingestion buffering payloads into SQS via direct API Gateway integration.
3. **[High-Scale Serverless URL Shortener](/case-studies/serverless-url-shortener)**: Ultra-low cost, sub-15ms URL redirection service on API Gateway HTTP APIs + DynamoDB.
