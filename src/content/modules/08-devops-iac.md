---
moduleNumber: 8
title: "DevOps, CI/CD & Infrastructure as Code"
tagline: "Automate Everything: GitOps, Blue/Green Deployments & CDK/Terraform"
description: "Master automated delivery pipelines and declarative cloud provisioning on AWS. Learn how to architect end-to-end CI/CD with CodePipeline, CodeBuild, CodeDeploy, AWS CDK (TypeScript), and Terraform."
theme: "DevOps, GitOps, CI/CD & IaC"
keyServices:
  - "AWS CodePipeline"
  - "AWS CodeBuild"
  - "AWS CodeDeploy"
  - "AWS Cloud Development Kit (CDK)"
  - "HashiCorp Terraform"
  - "AWS Systems Manager (SSM)"
difficulty: "Advanced"
estimatedHours: 6
icon: "git-pull-request"
order: 8
learningOutcomes:
  - "Construct multi-stage GitOps deployment pipelines with automated lint, test, security scan, and manual approval gates."
  - "Implement zero-downtime Blue/Green and progressive Canary traffic shifting with automatic CloudWatch rollback alarms."
  - "Model cloud architectures in TypeScript using AWS CDK construct libraries."
  - "Manage secrets and dynamic application configurations securely with Systems Manager Parameter Store."
---

## The Zero-Downtime Deployment Lifecycle
In modern high-availability environments, code must be deployed continuously without dropping a single active customer HTTP connection:

```mermaid
graph LR
    Git([Git Push to Main]) --> CP[AWS CodePipeline]
    CP -->|Build & Dockerize| CB[AWS CodeBuild]
    CB -->|Publish Artifact| ECR[(Amazon ECR)]
    
    CP -->|Deploy Step| CD[AWS CodeDeploy]
    CD -->|1. Provision Green Fleet| Green[Green Fleet: v2.0]
    CD -->|2. Synthetic Health Check| Check{Passed?}
    Check -->|Yes: Shift 10% → 100%| ALB[ALB Target Group]
    Check -->|No: Abort & Rollback| Blue[Blue Fleet: v1.0]

    style CP fill:#18223B,stroke:#34D399,stroke-width:2px,color:#fff
    style Green fill:#101728,stroke:#10B981,stroke-width:1px,color:#fff
    style Blue fill:#101728,stroke:#38BDF8,stroke-width:1px,color:#fff
```

---

## Case Studies in This Module
1. **[Automated Multi-Environment GitOps Engine](/case-studies/gitops-multienv-pipeline)**: Trunk-based development pipeline deploying to Dev/Staging/Prod with synthetic smoke test gates.
2. **[Zero-Downtime Blue/Green Traffic Shifting](/case-studies/zero-downtime-blue-green)**: Progressive canary traffic shifting (10% → 50% → 100%) with automated CloudWatch alarm rollbacks.
