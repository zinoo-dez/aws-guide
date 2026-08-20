---
moduleNumber: 1
title: "Static Website & Global CDN"
tagline: "Ultra-High Availability, Edge Caching, Zero-Maintenance Architecture"
description: "Learn how to deliver web assets worldwide with sub-second latency, automated SSL/TLS certificates, Origin Access Control (OAC), and edge compute headers using S3, CloudFront, Route 53, and ACM."
theme: "Content Delivery, Edge Security & Storage"
keyServices:
  - "Amazon S3"
  - "Amazon CloudFront"
  - "Amazon Route 53"
  - "AWS Certificate Manager (ACM)"
  - "CloudFront Functions"
difficulty: "Beginner"
estimatedHours: 4
icon: "globe"
order: 1
learningOutcomes:
  - "Configure Amazon S3 private bucket storage with CloudFront Origin Access Control (OAC)."
  - "Deploy custom domains with Route 53 Anycast DNS and automated ACM SSL renewal."
  - "Implement edge compute security headers (CSP, HSTS, X-Frame-Options) via CloudFront Functions."
  - "Design multi-region edge caching strategies to absorb massive traffic spikes with 99%+ cache hit rates."
---

## The Static Architecture Philosophy
In traditional hosting, web servers (e.g. Apache, Nginx) handle file I/O, TLS negotiation, and connection keep-alives. When traffic spikes 1,000x, servers run out of file descriptors and memory.

By decoupling **storage (Amazon S3)** from **global distribution (Amazon CloudFront)**:
- S3 acts as a highly durable (11 9s) file store that is never directly exposed to the public internet.
- CloudFront's 450+ Edge Points of Presence (PoPs) cache content within milliseconds of end-users worldwide.
- TLS negotiation is offloaded to the edge, dropping Time to First Byte (TTFB) significantly.
- Costs collapse from $50–$300/month for VM clusters to mere cents per gigabyte transferred.

```mermaid
graph LR
    User([Global Users]) -->|Anycast DNS Query| R53[Amazon Route 53]
    R53 -->|Routed to Nearest Edge| CF[CloudFront Edge PoP]
    CF -->|Edge Compute: Headers / Rewrites| CFF[CloudFront Functions]
    CF -->|Cache Hit: Return Sub-15ms| User
    CF -->|Cache Miss: SigV4 Auth OAC| S3[(Amazon S3 Private Bucket)]
    ACM[AWS Certificate Manager] -.->|Auto TLS 1.3 Cert| CF

    style CF fill:#18223B,stroke:#FF9900,stroke-width:2px,color:#fff
    style S3 fill:#101728,stroke:#38BDF8,stroke-width:1px,color:#fff
    style CFF fill:#101728,stroke:#10B981,stroke-width:1px,color:#fff
```

---

## Case Studies in This Module
1. **[Zero-Maintenance Developer Portfolio](/case-studies/personal-portfolio-docs)**: Sub-cent/month static hosting with custom domain and automatic SSL.
2. **[Viral Startup Marketing Landing Page](/case-studies/startup-marketing-site)**: Absorbing 50k req/sec viral traffic surges with 99.8% edge cache hit ratio.
3. **[Global Multi-Language Enterprise Blog](/case-studies/company-global-blog)**: Edge-localized content routing and security headers (CSP, HSTS) with CloudFront Functions.
