---
moduleNumber: 2
title: "Compute Basics: Virtual Machines & Scaling"
tagline: "From Single Virtual Servers to Multi-AZ Auto Scaling Fleets"
description: "Master traditional application hosting on AWS. Learn how to architect resilient EC2 workloads with Auto Scaling Groups (ASG), Application Load Balancers (ALB), Elastic Block Store (EBS), and Elastic Beanstalk."
theme: "Compute, High Availability & Auto-Scaling"
keyServices:
  - "Amazon EC2"
  - "Auto Scaling Groups (ASG)"
  - "Application Load Balancer (ALB)"
  - "AWS Elastic Beanstalk"
  - "Amazon EBS"
difficulty: "Beginner"
estimatedHours: 5
icon: "server"
order: 2
learningOutcomes:
  - "Design multi-AZ compute architectures that survive whole data-center power outages."
  - "Configure ALB path-based routing, SSL termination, and health check intervals."
  - "Establish dynamic Auto Scaling policies based on CPU utilization and ALB Request Count."
  - "Externalize server state into in-memory caches to allow seamless horizontal scaling."
---

## The Evolution of Compute
Running workloads on virtual machines requires making critical architectural decisions:
1. **Vertical Scaling (Scale-Up)**: Upgrading from `t3.medium` to `c6i.4xlarge`. Simple, but introduces a single point of failure (SPOF) and a hard ceiling.
2. **Horizontal Scaling (Scale-Out)**: Distributing stateless compute nodes behind an **Application Load Balancer (ALB)** across multiple Availability Zones. When one AZ experiences an outage, healthy targets in other AZs continue handling requests.

```mermaid
graph TD
    Client([Internet Traffic]) -->|HTTPS:443| ALB[Application Load Balancer]
    
    subgraph VPC [Amazon VPC - Multi-AZ]
        subgraph AZ_A [Availability Zone A]
            EC2_A1[EC2 Instance]
            EC2_A2[EC2 Instance]
        end
        
        subgraph AZ_B [Availability Zone B]
            EC2_B1[EC2 Instance]
            EC2_B2[EC2 Instance]
        end
    end

    ALB -->|Round-Robin / Least Conn| EC2_A1
    ALB -->|Round-Robin / Least Conn| EC2_A2
    ALB -->|Round-Robin / Least Conn| EC2_B1
    ALB -->|Round-Robin / Least Conn| EC2_B2

    ASG[Auto Scaling Group] -.->|Target Tracking: 65% CPU| AZ_A
    ASG -.->|Scale Out / Scale In| AZ_B

    style ALB fill:#18223B,stroke:#FF9900,stroke-width:2px,color:#fff
    style ASG fill:#101728,stroke:#10B981,stroke-width:1px,color:#fff
```

---

## Case Studies in This Module
1. **[Legacy Monolith Web App Migration](/case-studies/monolith-web-migration)**: Re-hosting a stateful Django/Rails app to multi-AZ ASG with externalized Redis sessions.
2. **[High-Traffic Internal Analytics Portal](/case-studies/internal-analytics-portal)**: Predictable enterprise portal with scheduled scaling, spot instance fleets, and EBS snapshot backups.
