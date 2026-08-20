---
moduleNumber: 7
title: "Containers & Modern Application Platforms"
tagline: "Microservices Orchestration: Amazon ECS Fargate vs Amazon EKS"
description: "Master modern containerization on AWS. Compare serverless container orchestration (AWS Fargate) with Kubernetes on AWS (EKS), container security in ECR, service discovery with AWS Cloud Map, and ALB path-based ingress routing."
theme: "Containers, Microservices & Kubernetes"
keyServices:
  - "Amazon ECS (AWS Fargate)"
  - "Amazon EKS (Kubernetes)"
  - "Amazon ECR"
  - "Application Load Balancer (ALB)"
  - "AWS Cloud Map"
  - "Karpenter"
difficulty: "Advanced"
estimatedHours: 8
icon: "box"
order: 7
learningOutcomes:
  - "Evaluate the architectural decision matrix between ECS Fargate (simplicity, low Ops) and EKS (Kubernetes ecosystem, multi-cloud)."
  - "Implement IAM Roles for Service Accounts (IRSA) and ECS Task Execution Roles for granular least-privilege security."
  - "Configure ALB target groups with path-based and header-based routing to decouple microservices."
  - "Deploy Karpenter just-in-time autoscaling on EKS to achieve sub-45s node provisioning."
---

## Containers: ECS Fargate vs Amazon EKS
Choosing a container platform is one of the most consequential decisions for modern engineering organizations:

```mermaid
graph TD
    Client([Internet Traffic]) -->|HTTPS| ALB[Application Load Balancer]
    
    subgraph Microservices [Container Orchestration Layer]
        ALB -->|/api/users*| SvcUsers[Users Service: ECS Fargate Task]
        ALB -->|/api/orders*| SvcOrders[Orders Service: ECS Fargate Task]
        ALB -->|/api/payments*| SvcPayments[Payments Service: ECS Fargate Task]
    end

    ECR[Amazon Elastic Container Registry] -.->|Pull Immutable Images| SvcUsers
    ECR -.->|Pull Immutable Images| SvcOrders
    ECR -.->|Pull Immutable Images| SvcPayments

    style ALB fill:#18223B,stroke:#FF9900,stroke-width:2px,color:#fff
    style SvcUsers fill:#101728,stroke:#06B6D4,stroke-width:1px,color:#fff
    style SvcOrders fill:#101728,stroke:#06B6D4,stroke-width:1px,color:#fff
    style SvcPayments fill:#101728,stroke:#06B6D4,stroke-width:1px,color:#fff
```

---

## Case Studies in This Module
1. **[Monolith to Microservices on Fargate](/case-studies/monolith-to-containers)**: Decomposing a monolithic Ruby/Django backend into Dockerized Fargate microservices with ALB path-based routing.
2. **[High-Resiliency Multi-Tenant EKS Platform](/case-studies/multiservice-ecommerce-platform)**: Polyglot microservices on Amazon EKS with Karpenter auto-scaling and AWS Load Balancer Controller.
