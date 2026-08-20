---
moduleNumber: 6
title: "Data Lakes, Analytics & Batch Processing"
tagline: "Schema-on-Read, Serverless Lakehouse & Real-Time Stream Ingestion"
description: "Master big data analytics on AWS. Learn how to ingest high-velocity event streams with Kinesis, build an S3 Lakehouse with Glue Data Catalog, run ad-hoc serverless SQL queries with Athena, and power BI data warehouses with Redshift."
theme: "Data Lakehouse, Analytics & ETL Pipelines"
keyServices:
  - "Amazon S3 Lakehouse"
  - "AWS Glue"
  - "Amazon Athena"
  - "Amazon Kinesis Data Streams"
  - "Amazon Redshift Serverless"
difficulty: "Advanced"
estimatedHours: 7
icon: "activity"
order: 6
learningOutcomes:
  - "Build an immutable S3 Data Lake adopting the Medallion Architecture (Bronze / Silver / Gold tiers)."
  - "Ingest 20,000+ events/sec via Kinesis Data Streams and Kinesis Data Firehose with automated format conversion (JSON to Parquet)."
  - "Partition data by date (`year=YYYY/month=MM/day=DD`) to minimize Athena S3 byte scanning costs by 90%+."
  - "Automate metadata discovery and schema evolution using AWS Glue Crawlers and Glue Data Catalog."
---

## The Serverless Lakehouse Architecture
Traditional data warehouses require costly, always-on provisioned clusters. The modern AWS Lakehouse architecture decouples **storage (S3)** from **serverless compute (Athena, Redshift Serverless)**:

```mermaid
graph LR
    Source([Clickstream / IoT Events]) -->|Real-time Ingest| Kinesis[Amazon Kinesis Streams]
    Kinesis -->|Micro-batch 60s| Firehose[Kinesis Data Firehose]
    Firehose -->|Convert JSON to Snappy Parquet| S3Bronze[(S3 Lakehouse: Raw/Processed)]
    
    Glue[AWS Glue Crawler] -.->|Auto Schema Catalog| S3Bronze
    
    Athena[Amazon Athena Serverless SQL] -->|Query Parquet Partitions| S3Bronze
    Athena -->|BI Visuals| QuickSight[Amazon QuickSight]

    style Kinesis fill:#18223B,stroke:#E879F9,stroke-width:2px,color:#fff
    style S3Bronze fill:#101728,stroke:#FF9900,stroke-width:1px,color:#fff
    style Athena fill:#101728,stroke:#38BDF8,stroke-width:1px,color:#fff
```

---

## Case Studies in This Module
1. **[Real-Time Clickstream Analytics](/case-studies/realtime-clickstream-analytics)**: Streaming 20,000 events/sec through Kinesis Data Firehose into S3 Parquet partitions queried via Athena.
2. **[Centralized Enterprise Security Log Lake](/case-studies/centralized-security-log-lake)**: Aggregating multi-account CloudTrail and VPC Flow Logs into a searchable Glue/Athena lake.
3. **[Executive BI Datamart Pipeline](/case-studies/executive-bi-dashboard)**: Automated batch ETL pipeline transforming raw transaction logs into Redshift Serverless dimensional models.
