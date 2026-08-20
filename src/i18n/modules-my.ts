export interface ModuleMyanmarContent {
  id: string;
  moduleNumber: number;
  title: string;
  tagline: string;
  description: string;
  theme: string;
  learningOutcomes: string[];
  overview: string[];
  keyConcepts: { title: string; desc: string }[];
  productionRules: string[];
}

export const modulesMyanmar: Record<string, ModuleMyanmarContent> = {
  '00-foundations': {
    id: '00-foundations',
    moduleNumber: 0,
    title: 'စနစ်ဒီဇိုင်း အခြေခံသဘောတရားများနှင့် Mental Models',
    tagline: 'First-Principles စဉ်းစားနည်း- Global Infrastructure၊ ကုန်ကျစရိတ်ထိန်းချုပ်မှုနှင့် Architecture ရေးဆွဲနည်း',
    description: 'Cloud Architecture များကို မှန်ကန်စွာ သုံးသပ်နိုင်ရန် လိုအပ်သော အခြေခံသဘောတရားများကို လေ့လာပါ။ AWS Regions၊ Availability Zones (AZ) နှင့် Edge Locations များ မည်သို့ချိတ်ဆက်လုပ်ဆောင်သည်၊ Shared Responsibility Model ဖြင့် လုံခြုံရေးကို မည်သို့တည်ဆောက်သည်နှင့် ကုန်ကျစရိတ် အဆမတန်မတက်အောင် မည်သို့ကာကွယ်ရမည်ကို သင်ယူရမည်။',
    theme: 'အခြေခံ အဆောက်အအုံနှင့် ကုန်ကျစရိတ်ဆိုင်ရာ အသိပညာ',
    learningOutcomes: [
      'စီးပွားရေးလုပ်ငန်းလိုအပ်ချက်များကို Well-Architected စနစ်နည်းပညာ ကန့်သတ်ချက်များအဖြစ် ခွဲခြမ်းစိတ်ဖြာနိုင်ခြင်း။',
      'Regions, Availability Zones, Local Zones နှင့် Edge Locations များ၏ လက်တွေ့ကွာခြားချက်နှင့် ကွန်ရက် Latency ကို နားလည်ခြင်း။',
      'အလိုအလျောက် Billing Alarms၊ Anomaly Detectors နှင့် AWS Organizations SCP Budget Guardrails များ ချမှတ်နိုင်ခြင်း။',
      'Logical စနစ်ဒီဇိုင်းပုံများကို Physical AWS VPC Subnet Topologies အဖြစ် လက်တွေ့ပြောင်းလဲနိုင်ခြင်း။'
    ],
    overview: [
      'Developer အများစုသည် Cloud ၏ အခြေခံကန့်သတ်ချက်များကို ကောင်းစွာနားမလည်ဘဲ EC2 သို့မဟုတ် Lambda များကို စတင်အသုံးပြုလေ့ရှိကြသည်။',
      'AWS ပေါ်တွင် စနစ်တစ်ခု တည်ဆောက်တိုင်း အောက်ပါ အခြေခံအချက် (၄) ချက်ကို မဖြစ်မနေ ထည့်သွင်းစဉ်းစားရပါသည် - (၁) Network Latency (Cross-AZ ~1ms နှင့် Cross-Region ~80ms)၊ (၂) Failure Domains (စနစ်တစ်ခု ချို့ယွင်းသော်လည်း စနစ်တစ်ခုလုံး မပြိုလဲစေရန် တည်ဆောက်ခြင်း)၊ (၃) Shared Responsibility Model (AWS သည် Cloud ၏ လုံခြုံရေးကို တာဝန်ယူပြီး၊ မိမိက Cloud အတွင်းရှိ Data နှင့် IAM လုံခြုံရေးကို တာဝန်ယူရခြင်း)၊ (၄) Cost Velocity (Cloud ကုန်ကျစရိတ်ကို ကြိုတင်စောင့်ကြည့် ထိန်းချုပ်ခြင်း)။'
    ],
    keyConcepts: [
      { title: 'AWS Well-Architected Pillars ၆ ရပ်', desc: 'Operational Excellence, Security, Reliability, Performance, Cost Optimization, Sustainability တို့ဖြင့် စနစ်တိုင်းကို အကဲဖြတ်ခြင်း။' },
      { title: 'Failure Isolation Boundaries', desc: 'AZ တစ်ခုလုံး ပျက်စီးသွားသော်လည်း စနစ်ဆက်လက်လည်ပတ်နိုင်စေရန် Multi-AZ ဒီဇိုင်း ရေးဆွဲခြင်း။' },
      { title: 'Shared Responsibility Model', desc: 'Physical Hardware ကို AWS ကတာဝန်ယူပြီး IAM, Encryption နှင့် Firewall များကို မိမိက တာဝန်ယူရခြင်း။' }
    ],
    productionRules: [
      'အကောင့်စတင်ဖွင့်ပြီးသည်နှင့် $10, $50, $100 စသည့် အဆင့်ဆင့် AWS Budgets & Anomaly Alerts များကို ချက်ချင်းဖွင့်ပါ။',
      'Root User အား API Keys မထုတ်ပေးပါနှင့်၊ MFA ခံထားပြီး နေ့စဉ်အလုပ်များအတွက် IAM Administrator Role ကိုသာ သုံးပါ။',
      'Multi-AZ စနစ် ရေးဆွဲရာတွင် Data Transfer Costs (Cross-AZ $0.01/GB) ကို အမြဲထည့်သွင်းတွက်ချက်ပါ။'
    ]
  },

  '01-static-website': {
    id: '01-static-website',
    moduleNumber: 1,
    title: 'Global Static Website နှင့် CDN Architecture',
    tagline: 'S3, CloudFront CDN, Route 53 DNS နှင့် ACM SSL ဖြင့် 100% Serverless ကမ္ဘာလုံးဆိုင်ရာ Hosting စနစ်',
    description: 'Server မလိုဘဲ ကမ္ဘာတစ်ဝှမ်း Latency အနည်းဆုံး (Sub-50ms) ဖြင့် ပေါ့ပါးမြန်ဆန်ပြီး လုံခြုံမှုအပြည့်ရှိသော Static Website များနှင့် Single Page Apps (SPA) များကို S3, CloudFront CDN, Route 53 နှင့် ACM သုံး၍ တည်ဆောက်နည်း။',
    theme: 'Edge Caching, DNS Routing & SSL Automation',
    learningOutcomes: [
      'Amazon S3 Static Hosting ၏ အားသာချက်နှင့် Security Pitfalls များကို ကျွမ်းကျင်စွာ ကိုင်တွယ်နိုင်ခြင်း။',
      'CloudFront Origin Access Control (OAC) ဖြင့် S3 Bucket အား အများပြည်သူ တိုက်ရိုက်ဝင်ရောက်မှုမရှိအောင် ပိတ်ထားနိုင်ခြင်း။',
      'Custom Domain များအတွက် Route 53 Alias Records နှင့် AWS Certificate Manager (ACM) SSL Automation ချိတ်ဆက်နိုင်ခြင်း။',
      'CloudFront Functions / Lambda@Edge သုံး၍ Edge ပေါ်တွင် URL Rewrites, Security Headers (CSP, HSTS) ထည့်သွင်းနိုင်ခြင်း။'
    ],
    overview: [
      'အစဉ်အလာအရ Web Server (Apache/Nginx) ထိုင်၍ Static Website လွှင့်ခြင်းသည် Server Maintenance, Security Patching နှင့် Cost များကို မလိုအပ်ဘဲ တက်စေပါသည်။',
      'S3 + CloudFront Architecture သည် Server မလိုဘဲ အသုံးပြုသူနှင့် အနီးဆုံး Edge Location မှ Cache Data ကို တိုက်ရိုက်ပို့ပေးသောကြောင့် အလွန်မြန်ဆန်ပြီး 99.99% Availability ရရှိစေပါသည်။'
    ],
    keyConcepts: [
      { title: 'Origin Access Control (OAC)', desc: 'S3 Bucket ကို Public မဖွင့်ဘဲ CloudFront မှသာ Signed Request ဖြင့် ဖတ်ရှုခွင့်ပြုသည့် လုံခြုံရေးစနစ်။' },
      { title: 'Edge Caching & TTL Strategy', desc: 'Static Assets (CSS/JS) များကို Cache-Control: max-age=31536000 ပေး၍ HTML ကိုမူ max-age=0 ဖြင့် စီမံခြင်း။' },
      { title: 'Route 53 Alias Routing', desc: 'CNAME အစား Apex Domain (@) အတွက် AWS Resource သို့ တိုက်ရိုက်ချိတ်ဆက်ပေးသော DNS စနစ်။' }
    ],
    productionRules: [
      'S3 Bucket Public Access ကို အမြဲတမ်း Block All လုပ်ထားပြီး CloudFront OAC သာ ခွင့်ပြုပါ။',
      'Production Deployment တိုင်းတွင် Static File များအတွက် Content Hash (ဥပမာ main.a8f9.js) သုံးပြီး Invalidation Cost ကို လျှော့ချပါ။'
    ]
  },

  '02-compute-basics': {
    id: '02-compute-basics',
    moduleNumber: 2,
    title: 'High Availability Compute Architecture (EC2, ASG & ALB)',
    tagline: 'Fault-Tolerant Virtual Machines၊ Auto Scaling နှင့် Multi-AZ Load Balancing စနစ်များ',
    description: 'EC2 Virtual Servers များကို အခြေခံ၍ သုံးစွဲသူ Traffic တက်လာပါက အလိုအလျောက် Scale ဖြစ်ပြီး၊ Server တစ်လုံး ပျက်စီးသွားပါက အလိုအလျောက် ပြန်လည်အစားထိုးပေးနိုင်သော Multi-AZ Application Load Balancer နှင့် Auto Scaling Group စနစ် တည်ဆောက်ပုံ။',
    theme: 'Resilient Compute, Traffic Distribution & State Isolation',
    learningOutcomes: [
      'Compute ရွေးချယ်မှုများ (T4g/C7g/M7g Graviton ARM vs x86) ၏ စွမ်းဆောင်ရည်နှင့် ဈေးနှုန်း ကွာခြားချက်ကို နားလည်ခြင်း။',
      'Application Load Balancer (ALB) ဖြင့် Path-based routing, SSL Offloading နှင့် Health Checks စီမံနိုင်ခြင်း။',
      'Auto Scaling Groups (ASG) ဖြင့် CPU/Request Count အလိုက် Dynamic Scaling နှင့် Self-Healing စနစ် တပ်ဆင်နိုင်ခြင်း။',
      'Stateless Web Tier တည်ဆောက်၍ Session Data များကို ElastiCache / DynamoDB သို့ ရွှေ့ပြောင်းနိုင်ခြင်း။'
    ],
    overview: [
      'Monolithic အပလီကေးရှင်းများကို Cloud ပေါ်သို့ စတင်ရွှေ့ပြောင်းရာတွင် Single Server ပေါ်တွင်သာ ထိုင်ထားပါက Single Point of Failure (SPOF) ဖြစ်စေပါသည်။',
      'ALB ကို Multi-AZ Public Subnet တွင်ထားပြီး၊ EC2 Instance များကို Private Subnet တွင် Auto Scaling Group ဖြင့် အုပ်စုဖွဲ့ထားခြင်းဖြင့် Server များ ပျက်ကျသော်လည်း User ဘက်မှ Downtime မရှိဘဲ အလိုအလျောက် ပြန်လည်ကောင်းမွန်စေပါသည်။'
    ],
    keyConcepts: [
      { title: 'Stateless Architecture', desc: 'EC2 Server ပေါ်တွင် Session / Upload File များ မသိမ်းဘဲ S3 နှင့် Redis သို့ ခွဲထုတ်ထားခြင်း။' },
      { title: 'Deep Health Checks', desc: 'TCP Port 80 သာမက Database ချိတ်ဆက်မှုကိုပါ စစ်ဆေးသော Application-level /health Endpoint သုံးခြင်း။' },
      { title: 'Graviton (ARM64) Processors', desc: 'x86 ထက် ဈေး ၂၀% သက်သာပြီး စွမ်းဆောင်ရည် ၄၀% ပိုမိုကောင်းမွန်သော AWS Custom Silicon Chip များ။' }
    ],
    productionRules: [
      'EC2 Instances များကို Public Subnet တွင် တိုက်ရိုက် မထားပါနှင့်၊ ALB နောက်ရှိ Private Subnet တွင်သာ ထားပါ။',
      'SSH Key Pairs အစား AWS Systems Manager (SSM) Session Manager ကို သုံး၍ Port 22 ကို လုံးဝပိတ်ထားပါ။'
    ]
  },

  '03-serverless-apps': {
    id: '03-serverless-apps',
    moduleNumber: 3,
    title: 'Serverless Microservices Architecture',
    tagline: 'API Gateway, AWS Lambda, DynamoDB နှင့် Event-Driven Serverless စနစ်များ',
    description: 'Server စီမံခန့်ခွဲရန် လုံးဝမလိုဘဲ သန်းနှင့်ချီသော Request များကို အလိုအလျောက် Sub-second အလိုက် Scale လုပ်ပေးနိုင်သည့် Event-Driven Serverless Microservices စနစ်များကို API Gateway, Lambda, DynamoDB နှင့် SQS/SNS ဖြင့် တည်ဆောက်ပုံ။',
    theme: 'Event-Driven Primitives, Concurrency & Pay-per-Execution',
    learningOutcomes: [
      'Synchronous REST APIs (API Gateway + Lambda) နှင့် Asynchronous Event Pipelines (EventBridge + SQS) ကို ခွဲခြားအသုံးပြုနိုင်ခြင်း။',
      'Lambda Cold Starts ကို လျှော့ချခြင်း၊ Reserved Concurrency နှင့် Provisioned Concurrency ကို စီမံနိုင်ခြင်း။',
      'Idempotency Keys နှင့် Dead Letter Queues (DLQ) ဖြင့် Message ဆုံးရှုံးမှု မရှိအောင် ကာကွယ်နိုင်ခြင်း။',
      'Serverless Cost Optimization (Execution duration, memory allocation, ARM Graviton runtime) ကို ကျွမ်းကျင်စွာ ချိန်ညှိနိုင်ခြင်း။'
    ],
    overview: [
      'Serverless ဆိုသည်မှာ Server မရှိခြင်း မဟုတ်ဘဲ၊ Server ၏ Operating System, Patching, Scaling နှင့် Capacity Planning များကို AWS က အပြည့်အဝ တာဝန်ယူပေးသော စနစ်ဖြစ်ပါသည်။',
      'သင်သည် ကုဒ် Run သည့် မီလီစက္ကန့်အတွက်သာ ငွေပေးရပြီး Request မရှိသည့်အချိန်တွင် $0 ကုန်ကျသောကြောင့် Startup များနှင့် Microservices များအတွက် အကောင်းဆုံး ဖြစ်ပါသည်။'
    ],
    keyConcepts: [
      { title: 'Lambda Concurrency & Cold Start', desc: 'Function စတင် Wake up ဖြစ်ချိန် Execution Environment ဖန်တီးရသည့် ကြာချိန်နှင့် ပြိုင်တူ Run နိုင်သော စွမ်းရည်။' },
      { title: 'Event-Driven Decoupling', desc: 'စနစ်တစ်ခုနှင့်တစ်ခု တိုက်ရိုက်မချိတ်ဘဲ SQS / EventBridge Queue များခံ၍ လွတ်လပ်စွာ လုပ်ဆောင်စေခြင်း။' },
      { title: 'Dead Letter Queue (DLQ)', desc: 'လုပ်ဆောင်၍ မအောင်မြင်သော Error Messages များကို စစ်ဆေးပြင်ဆင်နိုင်ရန် သီးသန့် Queue တွင် သိမ်းဆည်းခြင်း။' }
    ],
    productionRules: [
      'Lambda Function တိုင်းတွင် သင့်တော်သော Timeout (Default 3s-10s) နှင့် Memory ကို Power Tuning Tool ဖြင့် တိုင်းတာသတ်မှတ်ပါ။',
      'Asynchronous Event Lambda တိုင်းတွင် Dead Letter Queue (DLQ) ကို မဖြစ်မနေ ထည့်သွင်းထားပါ။'
    ]
  },

  '04-databases': {
    id: '04-databases',
    moduleNumber: 4,
    title: 'Cloud Database Architecture & Caching Strategies',
    tagline: 'Amazon Aurora (PostgreSQL/MySQL), DynamoDB Single-Table Design နှင့် Redis Caching',
    description: 'လုပ်ငန်းသုံး Relational Data (ACID) နှင့် NoSQL High-Scale Key-Value Data များအတွက် Amazon Aurora Serverless, DynamoDB Single-Table Design, Read Replicas နှင့် ElastiCache Redis ဖြင့် Ultra-Low Latency Database စနစ် ရေးဆွဲနည်း။',
    theme: 'Data Modeling, Replication Latency & Polyglot Persistence',
    learningOutcomes: [
      'Relational (Aurora) နှင့် NoSQL (DynamoDB) အား ဘယ်အချိန်တွင် မည်သည့်စနစ်ကို ရွေးချယ်ရမည်ကို ဆုံးဖြတ်နိုင်ခြင်း။',
      'Aurora Multi-AZ Replication နှင့် Storage Tiering (Auto-scaling up to 128TB) ကို နားလည်ခြင်း။',
      'DynamoDB Single-Table Design (PK/SK, GSI, Inverted Indexes) ဖြင့် Query Pattern အလိုက် Data Model ရေးဆွဲနိုင်ခြင်း။',
      'ElastiCache (Redis) ဖြင့် Cache-Aside, Write-Through နှင့် Cache Stampede Mitigation နည်းလမ်းများ ထည့်သွင်းနိုင်ခြင်း။'
    ],
    overview: [
      'Cloud Architecture တွင် အခက်ခဲဆုံးနှင့် အရေးအကြီးဆုံး အပိုင်းမှာ Database ရွေးချယ်မှုနှင့် Data Modeling ဖြစ်ပါသည်။',
      'စနစ်တစ်ခုတည်းတွင် SQL နှင့် NoSQL နှစ်မျိုးစလုံးကို သင့်တော်သလို တွဲဖက်အသုံးပြုသော Polyglot Persistence ဒီဇိုင်းသည် စနစ်ကို ပိုမိုမြန်ဆန်စေပြီး ကုန်ကျစရိတ်ကို သိသာစွာ သက်သာစေပါသည်။'
    ],
    keyConcepts: [
      { title: 'Aurora Shared Distributed Storage', desc: 'Data များကို 3 AZs အတွင်း 6 Copies ခွဲသိမ်းပြီး SSD ပေါ်သို့ တိုက်ရိုက် Log Stream ပြုလုပ်သော စနစ်။' },
      { title: 'DynamoDB Single-Table Architecture', desc: 'Table တစ်ခုတည်းတွင် Entity အမျိုးမျိုးကို PK/SK ပုံစံဖြင့် သိမ်းဆည်း၍ Single Query ဖြင့် ဆွဲယူနိုင်သော NoSQL နည်းပညာ။' },
      { title: 'Cache Stampede Prevention', desc: 'Cache သက်တမ်းကုန်ချိန်တွင် Request အားလုံး Database သို့ တစ်ပြိုင်နက် မပြေးစေရန် Probabilistic Early Expiration သုံးခြင်း။' }
    ],
    productionRules: [
      'Production RDS/Aurora တွင် Multi-AZ Deployment ကို အမြဲ On ထားပြီး Automated Backup Retention ကို အနည်းဆုံး ၇ ရက် ထားပါ။',
      'Lambda Function မှ Relational Database သို့ ချိတ်ဆက်ရာတွင် Connection Pool မပြည့်စေရန် Amazon RDS Proxy ကို မဖြစ်မနေ သုံးပါ။'
    ]
  },

  '05-networking-security': {
    id: '05-networking-security',
    moduleNumber: 5,
    title: 'Enterprise VPC Networking & Zero-Trust Security',
    tagline: '3-Tier Subnet Topology, VPC Endpoints, Transit Gateway, WAF နှင့် IAM Boundaries',
    description: 'အဆင့်မြင့် လုပ်ငန်းသုံး ကွန်ရက်လုံခြုံရေး ဒီဇိုင်းများ- 3-Tier Isolated Subnets (Public, Private, Isolated Database), NAT Gateways, VPC Endpoints (PrivateLink), AWS WAF Layer-7 ကာကွယ်မှုနှင့် IAM Least-Privilege Role Architecture။',
    theme: 'Network Isolation, Micro-Segmentation & Threat Surface Reduction',
    learningOutcomes: [
      'Production-grade 3-Tier VPC Architecture (Public ALB, Private App, Isolated Data Subnets) ရေးဆွဲနိုင်ခြင်း။',
      'AWS PrivateLink / VPC Interface Endpoints ဖြင့် Traffic များကို Public Internet သို့ မထွက်စေဘဲ AWS Network အတွင်း၌သာ ပို့ဆောင်နိုင်ခြင်း။',
      'Security Groups (Stateful) နှင့် Network ACLs (Stateless) များ၏ အလုပ်လုပ်ပုံကို ရှင်းလင်းစွာ ခွဲခြားအသုံးပြုနိုင်ခြင်း။',
      'AWS WAF (Web Application Firewall) ဖြင့် SQL Injection, Cross-Site Scripting (XSS) နှင့် DDoS တိုက်ခိုက်မှုများကို ကာကွယ်နိုင်ခြင်း။'
    ],
    overview: [
      'လုံခြုံရေးဆိုသည်မှာ ပတ်လည်တံတိုင်းတစ်ခုတည်း ကာရံထားခြင်း မဟုတ်ဘဲ အဆင့်တိုင်းတွင် စစ်ဆေးကာကွယ်သော Defense-in-Depth ပုံစံ ဖြစ်ရပါမည်။',
      'Zero-Trust မူဝါဒအရ VPC အတွင်းရှိ Server အချင်းချင်းပင်လျှင် IAM Authentication နှင့် Security Group Port Level ခွင့်ပြုချက်မရှိဘဲ ဆက်သွယ်ခွင့် မပြုရပါ။'
    ],
    keyConcepts: [
      { title: 'Isolated Database Subnet', desc: 'Internet Gateway သို့မဟုတ် NAT Gateway လမ်းကြောင်း လုံးဝမရှိသော သီးသန့်လုံခြုံသည့် Subnet။' },
      { title: 'VPC Gateway & Interface Endpoints', desc: 'S3, DynamoDB နှင့် SSM တို့ကို Public IP မလိုဘဲ Private IP ဖြင့်သာ ဆက်သွယ်စေသည့် နည်းပညာ။' },
      { title: 'IAM Permission Boundaries', desc: 'Developer များအား IAM Role ဖန်တီးခွင့်ပေးသော်လည်း Privilege Escalation မလုပ်နိုင်အောင် ကန့်သတ်သည့် မူဝါဒ။' }
    ],
    productionRules: [
      'Database Subnets များတွင် 0.0.0.0/0 Route (Internet Route) ကို လုံးဝ မထည့်ပါနှင့်။',
      'S3 Bucket Access အတွက် NAT Gateway Data Transfer အစား အခမဲ့ဖြစ်သော VPC Gateway Endpoint (S3) ကို သုံးပါ။'
    ]
  },

  '06-data-analytics': {
    id: '06-data-analytics',
    moduleNumber: 6,
    title: 'Real-Time Streaming & Data Lakehouse Architecture',
    tagline: 'Amazon Kinesis, S3 Data Lake, AWS Glue, Athena နှင့် Amazon Redshift',
    description: 'သန်းပေါင်းများစွာသော IoT Telemetry နှင့် User Clickstream Data များကို စက္ကန့်ပိုင်းအတွင်း ဖမ်းယူဆန်းစစ်နိုင်သည့် Kinesis Data Streams, S3 Lakehouse (Parquet Partitioning), Glue Data Catalog, Athena Serverless Queries နှင့် Redshift Data Marts တည်ဆောက်ပုံ။',
    theme: 'High-Throughput Ingestion, Partitioning & Serverless Analytics',
    learningOutcomes: [
      'Streaming Ingestion (Kinesis Data Streams / Firehose) နှင့် Batch Ingestion ၏ Trade-offs များကို နားလည်ခြင်း။',
      'S3 Data Lake ပေါ်တွင် Apache Parquet Columnar format ဖြင့် သိမ်းဆည်း၍ Storage နှင့် Query ကုန်ကျစရိတ် ၉၀% လျှော့ချနိုင်ခြင်း။',
      'AWS Glue Crawler ဖြင့် Data Schema များကို အလိုအလျောက် ဖတ်ရှုပြီး Amazon Athena ဖြင့် SQL Queries မောင်းနှင်နိုင်ခြင်း။',
      'Real-time Analytics Dashboard များအတွက် Managed Grafana နှင့် QuickSight ချိတ်ဆက်နိုင်ခြင်း။'
    ],
    overview: [
      'Big Data စနစ်များတွင် Database ပေါ်သို့ တိုက်ရိုက် INSERT လုပ်ခြင်းသည် Database ကို ပြိုကျစေပါသည်။',
      'Stream Ingestion Buffer (Kinesis/Kafka) ခံထားပြီး S3 Data Lake သို့ Parquet ပုံစံဖြင့် Batch ခွဲသိမ်းခြင်းသည် ကုန်ကျစရိတ် အသက်သာဆုံးနှင့် စွမ်းဆောင်ရည် အမြင့်ဆုံး ဖြစ်ပါသည်။'
    ],
    keyConcepts: [
      { title: 'Columnar Storage (Parquet)', desc: 'Row အလိုက် မသိမ်းဘဲ Column အလိုက် သိမ်းဆည်းပြီး Compress လုပ်ထားသောကြောင့် Scan Data ကို ၉၀% လျှော့ချပေးသော ဖိုင်ပုံစံ။' },
      { title: 'Hive Partitioning', desc: 'S3 ပေါ်တွင် s3://bucket/year=2026/month=08/day=20/ ပုံစံဖြင့် သိမ်းဆည်း၍ Query ရှာဖွေမှု အလွန်မြန်ဆန်စေခြင်း။' },
      { title: 'Kinesis Sharding', desc: 'Shard တစ်ခုလျှင် 1MB/sec Write နှင့် 2MB/sec Read စွမ်းရည်ဖြင့် လိုသလို တိုးချဲ့နိုင်သော Stream ပိုက်လိုင်း။' }
    ],
    productionRules: [
      'S3 Data Lake ပေါ်တွင် JSON/CSV အကြမ်းဖိုင်များကို တိုက်ရိုက် မထားပါနှင့်၊ Glue Job ဖြင့် Snappy-compressed Parquet သို့ ပြောင်းလဲသိမ်းဆည်းပါ။',
      'Athena Queries များ ကုန်ကျစရိတ် သက်သာစေရန် Partition Pruning (WHERE year=2026) ကို အမြဲသုံးပါ။'
    ]
  },

  '07-containers': {
    id: '07-containers',
    moduleNumber: 7,
    title: 'Production Container Platforms (ECS Fargate & EKS)',
    tagline: 'Docker Containerization, Serverless ECS Fargate, Kubernetes (EKS) နှင့် App Mesh',
    description: 'Microservices များကို Dockerize ပြုလုပ်ပြီး Server မလိုသည့် AWS Fargate ပေါ်တွင် Deploy လုပ်ခြင်း၊ Elastic Container Service (ECS) Task Definitions, Service Discovery, ECR Image Scanning နှင့် EKS Kubernetes Cluster စီမံခန့်ခွဲမှု စနစ်များ။',
    theme: 'Container Orchestration, Zero-Server Operations & Pod Autoscaling',
    learningOutcomes: [
      'ECS EC2 Launch Type နှင့် Serverless ECS Fargate ၏ ကုန်ကျစရိတ်နှင့် လုပ်ငန်းလည်ပတ်မှု အားသာချက်များကို ချိန်ဆနိုင်ခြင်း။',
      'ECS Task Execution Role (ECR pull, CloudWatch logs) နှင့် Task Role (App permissions) များကို ခွဲခြားသတ်မှတ်နိုင်ခြင်း။',
      'AWS Cloud Map ဖြင့် Internal Microservices များ အချင်းချင်း Private DNS ဖြင့် ချိတ်ဆက်နိုင်ခြင်း (Service Discovery)။',
      'ECR Image Vulnerability Scanning ဖြင့် လုံခြုံမှုမရှိသော Container Image များကို CI/CD အဆင့်တွင် တားဆီးနိုင်ခြင်း။'
    ],
    overview: [
      'Container နည်းပညာသည် Developer စက်ပေါ်တွင် Run သည့် ပတ်ဝန်းကျင်နှင့် Production ပတ်ဝန်းကျင်ကို တထပ်တည်း တူညီစေပါသည်။',
      'ECS Fargate ကို အသုံးပြုခြင်းဖြင့် EC2 Host OS များကို Patch လုပ်ရန် မလိုတော့ဘဲ Container CPU/Memory အတိုင်းသာ တိကျစွာ ငွေပေးချေရပါသည်။'
    ],
    keyConcepts: [
      { title: 'AWS Fargate', desc: 'Container များအတွက် Serverless Compute Engine ဖြစ်ပြီး EC2 Instance စီမံခန့်ခွဲရန် လုံးဝမလိုပါ။' },
      { title: 'Task Definition vs Service', desc: 'Task Definition သည် Blueprint (Container Image, CPU, Memory) ဖြစ်ပြီး Service သည် ၎င်း blueprint အတိုင်း Task အရေအတွက်ကို ထိန်းကျောင်းပေးသည့် စနစ်။' },
      { title: 'Rolling Update vs Blue/Green', desc: 'Container အသစ်များကို အဆင့်ဆင့် အစားထိုးခြင်း သို့မဟုတ် Target Group သစ်သို့ 100% လွှဲပြောင်းပေးခြင်း။' }
    ],
    productionRules: [
      'Container Image များကို Root User အနေဖြင့် မ Run ပါနှင့် (USER non-root directive သုံးပါ)။',
      'Task CPU နှင့် Memory ကို တိကျစွာ သတ်မှတ်ပြီး Container သေဆုံးမှု (OOM Killed) မဖြစ်စေရန် သင့်တော်သော Memory Limit ပေးပါ။'
    ]
  },

  '08-devops-iac': {
    id: '08-devops-iac',
    moduleNumber: 8,
    title: 'DevOps, Infrastructure as Code & GitOps Pipelines',
    tagline: 'Terraform, AWS CDK (TypeScript), CodePipeline, GitHub Actions နှင့် Blue/Green Deployments',
    description: 'AWS Console ပေါ်တွင် လက်ဖြင့် Click နှိပ် တည်ဆောက်ခြင်းကို ရပ်တန့်ပြီး Infrastructure as Code (Terraform / AWS CDK) ဖြင့် စနစ်တစ်ခုလုံးကို Code အဖြစ် ရေးဆွဲခြင်း၊ Multi-Environment GitOps Pipelines နှင့် Zero-Downtime Deployment စနစ်များ။',
    theme: 'Reproducible Infrastructure, Automated Testing & Immutable Deployments',
    learningOutcomes: [
      'Terraform (HCL) State Management, Remote S3 Backend နှင့် DynamoDB State Locking ကို ကျွမ်းကျင်စွာ တပ်ဆင်နိုင်ခြင်း။',
      'AWS CDK (TypeScript/Python) ဖြင့် Type-safe Object-Oriented Infrastructure Constructs များ တည်ဆောက်နိုင်ခြင်း။',
      'GitHub Actions သို့မဟုတ် CodePipeline ဖြင့် Automated Linting, Security Scanning (Tfsec) နှင့် Deployments ပြုလုပ်နိုင်ခြင်း။',
      'CodeDeploy ဖြင့် Canary Deployments (Traffic 10% ပို့၍ စမ်းသပ်ခြင်း) နှင့် Automated Rollback စနစ် ထည့်သွင်းနိုင်ခြင်း။'
    ],
    overview: [
      'Production Cloud စနစ်တစ်ခုသည် Disaster Recovery ဖြစ်ပွားချိန်တွင် မိနစ်ပိုင်းအတွင်း အစအဆုံး ပြန်လည်တည်ဆောက်နိုင်ရပါမည်။',
      'IaC ကို အသုံးပြုခြင်းဖြင့် လူမှားယွင်းမှု (Human Errors) ကို ပပျောက်စေပြီး Version Control (Git) ဖြင့် အပြောင်းအလဲတိုင်းကို Audit လုပ်နိုင်ပါသည်။'
    ],
    keyConcepts: [
      { title: 'State Locking (DynamoDB)', desc: 'Engineer နှစ်ဦး တစ်ပြိုင်နက် Terraform Apply လုပ်မိ၍ State File ပျက်စီးသွားခြင်းကို တားဆီးသော စနစ်။' },
      { title: 'AWS CDK Constructs', desc: 'ကုဒ်လိုင်းပေါင်း ရာချီသော CloudFormation ကို Type-safe Library ခေါ်ယူမှု ၃ လိုင်းဖြင့် တည်ဆောက်နိုင်သော နည်းပညာ။' },
      { title: 'Canary Deployment Strategy', desc: 'ဗားရှင်းအသစ်သို့ Traffic 10% ကို အရင်ပို့၍ Error မရှိမှသာ ကျန် 90% ကို လွှဲပြောင်းပေးသော ဘေးကင်းသည့် စနစ်။' }
    ],
    productionRules: [
      'Production Infrastructure ကို AWS Console မှ တိုက်ရိုက် မပြင်ပါနှင့် (No ClickOps in Production)။',
      'Terraform State File ကို Public မဖွင့်ဘဲ S3 Bucket တွင် KMS Encryption နှင့် Versioning ဖွင့်၍ သိမ်းဆည်းပါ။'
    ]
  },

  '09-observability': {
    id: '09-observability',
    moduleNumber: 9,
    title: 'Cloud Observability & Self-Healing Telemetry',
    tagline: 'Amazon CloudWatch, OpenSearch, AWS X-Ray Distributed Tracing နှင့် Self-Healing EventBridge',
    description: 'ရှုပ်ထွေးသော Cloud စနစ်များတွင် ပြဿနာဖြစ်ပွားပါက မည်သည့်နေရာတွင် မည်သည့်အတွက် ချို့ယွင်းသွားသည်ကို သိရှိနိုင်သော Observability မဏ္ဍိုင် ၃ ရပ် (Metrics, Logs, Traces) နှင့် စနစ်ချို့ယွင်းချက်ကို အလိုအလျောက် ပြင်ဆင်ပေးသော Self-Healing Architecture။',
    theme: 'Full-Stack Observability, SLI/SLO Monitoring & Automated Remediation',
    learningOutcomes: [
      'Metrics, Logs နှင့် Distributed Traces (The 3 Pillars of Observability) ကို စနစ်တကျ ချိတ်ဆက်နိုင်ခြင်း။',
      'AWS X-Ray သုံး၍ Microservices များအကြား Request ပျောက်ဆုံးမှုနှင့် Bottleneck Latency များကို Pinpoint ရှာဖွေနိုင်ခြင်း။',
      'CloudWatch Metric Alarms နှင့် Composite Alarms များ ဖန်တီး၍ Alarm Fatigue (အချက်ပေးသံများလွန်း၍ မေ့လျော့ခြင်း) ကို လျှော့ချနိုင်ခြင်း။',
      'Amazon EventBridge + Lambda ဖြင့် EC2/RDS ပျက်စီးမှုများကို လူမပါဘဲ အလိုအလျောက် ကုစားပေးသော Self-Healing စနစ် တည်ဆောက်နိုင်ခြင်း။'
    ],
    overview: [
      'စနစ်ကြီးမားလာသည်နှင့်အမျှ "ကျွနု်ပ်တို့ Server ပျက်နေသလား" ဟု ကြည့်ရုံဖြင့် မလုံလောက်တော့ဘဲ "User များထဲမှ 0.1% သည် ဘာကြောင့် 500 Error ကြုံနေရသလဲ" ကို ချက်ချင်း ဖြေရှင်းနိုင်ရပါမည်။',
      'Observability သည် စနစ်၏ အခြေအနေကို အချိန်နှင့်တပြေးညီ မြင်သာစေပြီး စီးပွားရေးဆုံးရှုံးမှုကို အနည်းဆုံးဖြစ်အောင် ကာကွယ်ပေးပါသည်။'
    ],
    keyConcepts: [
      { title: 'Distributed Tracing (X-Ray)', desc: 'User Request တစ်ခုသည် API Gateway -> Lambda -> DynamoDB -> 3rd-party API သို့ သွားသော ခရီးစဉ်တစ်ခုလုံးကို ID တစ်ခုတည်းဖြင့် ခြေရာခံခြင်း။' },
      { title: 'SLI / SLO / SLA', desc: 'Service Level Indicator (လက်ရှိ အခြေအနေ), Service Level Objective (အတွင်းပိုင်း ပစ်မှတ်), Service Level Agreement (သုံးစွဲသူနှင့် ချုပ်ဆိုထားသော ကတိကဝတ်)။' },
      { title: 'Self-Healing Automated Runbooks', desc: 'Disk Space ပြည့်သွားပါက သို့မဟုတ် Memory Leak ဖြစ်ပါက Lambda က အလိုအလျောက် သန့်ရှင်းရေးလုပ်ပေးသော စနစ်။' }
    ],
    productionRules: [
      'Log များကို Plaintext အဖြစ် မသိမ်းဘဲ JSON Structured Logs အဖြစ် အမြဲထုတ်ပါ (CloudWatch Logs Insights ဖြင့် Query လုပ်ရလွယ်ကူစေရန်)။',
      'CPU Usage တစ်ခုတည်းကို ကြည့်၍ Alarm မတင်ပါနှင့်၊ Business-critical Metrics (ဥပမာ 5xx Error Rate, Order Processing Latency) ကိုပါ Alarm ချိတ်ပါ။'
    ]
  },

  '10-capstones': {
    id: '10-capstones',
    moduleNumber: 10,
    title: 'Enterprise Capstone Architectures',
    tagline: 'Multi-Region Active-Active Banking, Global Multi-Tenant SaaS နှင့် Netflix-Style Media Streaming',
    description: 'အဆင့်မြင့်ဆုံး စနစ်ဒီဇိုင်းများ- ဒေါ်လာဘီလီယံချီသော ဘဏ်လုပ်ငန်းသုံး Multi-Region Active-Active Global Database, B2B Enterprise SaaS Data Isolation နှင့် ကမ္ဘာလုံးဆိုင်ရာ Live Media Transcoding & Streaming စနစ်များ၏ Master-level Architecture ဒီဇိုင်းများ။',
    theme: 'Extreme Scale, Zero-Downtime DR, Global Consensus & Complex Trade-Offs',
    learningOutcomes: [
      'Multi-Region Active-Active (RPO=0, RTO<1min) စနစ်များနှင့် Aurora Global Database / DynamoDB Global Tables ကို ကျွမ်းကျင်စွာ ရေးဆွဲနိုင်ခြင်း။',
      'B2B SaaS တွင် Tenant Isolation မော်ဒယ်များ (Silo Model vs Pool Model) ၏ ကုန်ကျစရိတ်နှင့် လုံခြုံရေး Trade-offs များကို ပိုင်းခြားနိုင်ခြင်း။',
      'Global Route 53 ARC (Application Recovery Controller) ဖြင့် Region တစ်ခုလုံး ပျက်ကျချိန်တွင် အခြား Region သို့ Traffic အလိုအလျောက် လွှဲပြောင်းနိုင်ခြင်း။',
      'CAP Theorem (Consistency vs Availability vs Partition Tolerance) ကို လက်တွေ့ AWS ဝန်ဆောင်မှုများပေါ်တွင် မှန်ကန်စွာ အသုံးချနိုင်ခြင်း။'
    ],
    overview: [
      'Capstone Module သည် သင်ခန်းစာ (၉) ခုလုံးတွင် သင်ယူခဲ့သော Network, Compute, Storage, Database, Security, DevOps နှင့် Observability အသိပညာအားလုံးကို ပေါင်းစပ်၍ အမှန်တကယ် Enterprise စနစ်ကြီးများကို ရေးဆွဲသည့် အဆင့်ဖြစ်ပါသည်။',
      'ဤနေရာတွင် ရိုးရှင်းသော အဖြေမရှိဘဲ၊ စီးပွားရေးကန့်သတ်ချက်၊ ဘတ်ဂျက်နှင့် ဥပဒေစည်းမျဉ်းများ (GDPR, PCI-DSS) အပေါ်မူတည်၍ အကောင်းဆုံး Trade-offs ဆုံးဖြတ်ချက်များကို ချမှတ်ရပါမည်။'
    ],
    keyConcepts: [
      { title: 'Active-Active Multi-Region', desc: 'Region ၂ ခု သို့မဟုတ် ၃ ခုစလုံးတွင် Traffic ကို တစ်ပြိုင်နက် လက်ခံပြီး Data ကို Two-way Synchronize လုပ်သော အဆင့်မြင့်ဆုံး စနစ်။' },
      { title: 'Tenant Isolation Matrix', desc: 'Client တစ်ဦးချင်းစီအတွက် သီးသန့် Database ထားပေးခြင်း (Silo) သို့မဟုတ် မျှဝေသုံးစွဲပြီး Tenant ID ဖြင့် ခွဲခြားခြင်း (Pool)။' },
      { title: 'Split-Brain Prevention', desc: 'Network ပြတ်တောက်ချိန်တွင် Region နှစ်ခုစလုံးက မိမိကိုယ်ကို Master ဟု သတ်မှတ်၍ Data ကွဲလွဲသွားခြင်းကို တားဆီးသော Consensus စနစ်။' }
    ],
    productionRules: [
      'Multi-Region စနစ်များတွင် Conflict Resolution (Last-Write-Wins vs CRDTs) မူဝါဒကို ကြိုတင်သတ်မှတ်ထားပါ။',
      'Disaster Recovery (DR) Plan ကို စာရွက်ပေါ်တွင်သာ မထားဘဲ AWS Fault Injection Simulator (FIS) ဖြင့် Chaos Engineering စမ်းသပ်မှု ပုံမှန် ပြုလုပ်ပါ။'
    ]
  }
};
