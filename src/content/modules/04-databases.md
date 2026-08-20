---
moduleNumber: 4
title: "Databases & Data Persistence"
tagline: "Relational ACID vs Key-Value NoSQL vs In-Memory Caching"
description: "Master database selection on AWS. Compare Amazon RDS (PostgreSQL/MySQL), Amazon Aurora Serverless v2, DynamoDB single-table design, and ElastiCache Redis under extreme concurrency and throughput."
theme: "Database Architecture, Replication & Caching"
keyServices:
  - "Amazon RDS (PostgreSQL/MySQL)"
  - "Amazon Aurora Serverless v2"
  - "Amazon DynamoDB"
  - "Amazon ElastiCache (Redis)"
  - "AWS RDS Proxy"
difficulty: "Intermediate"
estimatedHours: 6
icon: "database"
order: 4
learningOutcomes:
  - "Select the right database engine based on data access patterns, ACID requirements, and query complexity."
  - "Architect Multi-AZ standby failover and Read Replicas for high-read relational workloads."
  - "Leverage AWS RDS Proxy to prevent serverless Lambda connections from overwhelming PostgreSQL/MySQL pools."
  - "Implement write-through and cache-aside caching patterns in ElastiCache Redis."
---

## The Database Selection Framework
Modern cloud architectures rarely rely on a single database. Instead, they leverage **polyglot persistence**:

| Database Engine | Primary Strengths | Scaling Model | Best Use Cases |
| :--- | :--- | :--- | :--- |
| **Amazon Aurora Serverless v2** | Full PostgreSQL/MySQL ACID compliance, sub-minute auto-scaling ACUs, storage auto-growth to 128TB. | Auto-scaling Compute (0.5 to 128 ACUs), Read Replicas with sub-10ms lag. | Core financial ledger, relational order processing, complex analytical joins. |
| **Amazon DynamoDB** | Single-digit millisecond latency at any scale, serverless pay-per-request, predictable partitioning. | Automatic partition scaling based on Partition Key (PK) hash. | Shopping carts, session states, user profiles, gaming telemetry, metadata indexes. |
| **Amazon ElastiCache (Redis)** | Microsecond in-memory response times, atomic counters, Sorted Sets, Pub/Sub. | Multi-node cluster with in-memory replication across AZs. | Real-time leaderboards, rate limiters, session stores, hot database query cache. |

```mermaid
graph TD
    App[Application Tier / Lambdas] -->|Connection Pool Gatekeeper| Proxy[AWS RDS Proxy]
    Proxy -->|ACID Writes & Transactions| Primary[Aurora Serverless v2 Primary]
    Primary -.->|Storage Level Replication < 10ms| Replica[Aurora Read Replica]
    App -->|Read Heavy Queries| Replica
    
    App -->|Sub-10ms Key-Value Lookups| DDB[(Amazon DynamoDB)]
    App -->|Sub-Millisecond Cache / Sorted Sets| Redis[(Amazon ElastiCache Redis)]

    style Primary fill:#18223B,stroke:#38BDF8,stroke-width:2px,color:#fff
    style DDB fill:#101728,stroke:#FF9900,stroke-width:1px,color:#fff
    style Redis fill:#101728,stroke:#FB7185,stroke-width:1px,color:#fff
```

---

## Case Studies in This Module
1. **[E-Commerce Orders & Catalog Split](/case-studies/ecommerce-catalog-orders)**: ACID transaction handling in Aurora combined with low-latency DynamoDB catalog reads.
2. **[Distributed Global Session Store](/case-studies/global-session-management)**: Distributed user authentication and session clustering with ElastiCache Redis.
3. **[Sub-Millisecond Gaming Leaderboard](/case-studies/realtime-gaming-leaderboard)**: High-write velocity leaderboard system utilizing Redis Sorted Sets with DynamoDB persistence.
