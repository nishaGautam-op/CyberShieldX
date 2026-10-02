export interface Incident {
  id: string;
  title: string;
  threatType: string;
  severity: "critical" | "high" | "medium" | "low";
  riskScore: number;
  status: "Investigating" | "Contained" | "Resolved" | "Monitoring";
  source: string;
  target: string;
  timestamp: string;
  affectedResource: string;
  confidence: number;
  explanation: {
    summary: string;
    reasons: string[];
    shapFeatures: {
      feature: string;
      contribution: number; // percentage
      direction: "risk" | "safe";
      rawValue?: string;
    }[];
  };
  recommendedAction: string;
  mitreTactic: string;
  mitreTechnique: string;
  packetCount?: number;
  payloadSignature?: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: "user" | "server" | "firewall" | "database" | "gateway" | "threat";
  ip: string;
  status: "secure" | "suspicious" | "critical";
  trafficMbps: number;
  riskScore: number;
  location: string;
  zone: "External" | "DMZ" | "Internal Core" | "Restricted Vault";
  connections: string[]; // ids of connected nodes
}

export interface ThreatIntelligenceItem {
  id: string;
  indicator: string;
  type: "IP" | "Domain" | "Hash" | "CVE" | "ASN";
  category: string;
  confidence: number;
  threatActor?: string;
  firstSeen: string;
  lastSeen: string;
  severity: "critical" | "high" | "medium";
  country: string;
  countryCode: string;
  status: "Active Tracking" | "Sinkholed" | "Blocklisted";
}

export interface ThreatArc {
  id: string;
  originName: string;
  originLat: number;
  originLng: number;
  targetName: string;
  targetLat: number;
  targetLng: number;
  type: string;
  severity: "critical" | "high" | "medium";
  packets: number;
  timestamp: string;
}

export const INITIAL_METRICS = {
  threatsDetected: 1284,
  criticalThreats: 27,
  activeIncidents: 8,
  systemsProtected: 142,
  threatDetectionRate: 98.7,
  securityScore: 94,
  subScores: {
    networkSecurity: 96,
    authenticationSecurity: 91,
    behavioralSecurity: 95,
    threatExposure: 89,
    incidentResponse: 98,
  },
};

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: "INC-2048",
    title: "Suspicious Privilege Escalation & Distributed Brute-Force",
    threatType: "Credential Stuffing & Auth Anomaly",
    severity: "critical",
    riskScore: 92,
    status: "Investigating",
    source: "194.26.29.112 (Autonomous System AS49870)",
    target: "auth-cluster-04.corp.internal (Port 443 / 8443)",
    timestamp: "2 mins ago",
    affectedResource: "Authentication & Identity Server (auth-srv-04)",
    confidence: 97.4,
    explanation: {
      summary:
        "Multi-stage behavioral anomaly detected across distributed ingress points targeting privileged root credentials.",
      reasons: [
        "Unusual geographical origin (IP routing through known bulletproof hosting in Bucharest)",
        "Multiple failed authentication attempts (48 attempts within 22 seconds)",
        "Abnormal access time (03:14:22 UTC outside regular maintenance windows)",
        "Device fingerprint not previously registered in zero-trust ledger",
        "Abnormal burst in OAuth grant request token frequency (+420% delta)",
      ],
      shapFeatures: [
        { feature: "Unusual Geo Location", contribution: 31, direction: "risk", rawValue: "ASN 49870 (High Threat Index)" },
        { feature: "Failed Auth Velocity", contribution: 24, direction: "risk", rawValue: "48 fails / 22s" },
        { feature: "Unknown Device Hash", contribution: 18, direction: "risk", rawValue: "TLS JA3 fingerprint unknown" },
        { feature: "Access Time Variance", contribution: 12, direction: "risk", rawValue: "03:14 AM (Off-hours)" },
        { feature: "API Request Frequency", contribution: 9, direction: "risk", rawValue: "+420% standard deviation" },
        { feature: "Known Valid Session Token", contribution: -6, direction: "safe", rawValue: "No valid SSO ticket" },
      ],
    },
    recommendedAction:
      "Temporarily restrict ASN 49870 ingress, isolate auth-cluster-04, and enforce hardware FIDO2 re-challenge for all active admin sessions.",
    mitreTactic: "Credential Access",
    mitreTechnique: "T1110.004 - Credential Stuffing",
    packetCount: 14209,
    payloadSignature: "POST /v2/auth/token?grant_type=client_credentials",
  },
  {
    id: "INC-2047",
    title: "Exfiltration Pattern & Lateral Kerberos Ticket Probe",
    threatType: "Lateral Movement & C2 Communication",
    severity: "critical",
    riskScore: 89,
    status: "Contained",
    source: "10.0.4.18 (DevOps Staging Workstation)",
    target: "vault-db-prod.internal (Port 5432)",
    timestamp: "18 mins ago",
    affectedResource: "Production Customer PII Database Vault",
    confidence: 95.8,
    explanation: {
      summary:
        "High-entropy encrypted payloads routed towards internal staging pod with unexpected DNS tunneling indicators.",
      reasons: [
        "Unauthorized outbound TCP handshakes to unverified internal database subnet",
        "High data entropy consistent with pre-encryption staging before exfiltration",
        "Rapid sequential port scanning of internal database cluster ports",
        "Active directory ticket request with anomalous SPN mismatch",
      ],
      shapFeatures: [
        { feature: "High-Entropy Payload", contribution: 35, direction: "risk", rawValue: "Entropy: 7.94 bits/byte" },
        { feature: "Internal Subnet Violation", contribution: 28, direction: "risk", rawValue: "Staging -> Vault access" },
        { feature: "Anomalous SPN Request", contribution: 16, direction: "risk", rawValue: "Ticket grant anomaly" },
        { feature: "Port Scan Signature", contribution: 14, direction: "risk", rawValue: "18 ports in 2 seconds" },
        { feature: "Signed Host Process", contribution: -8, direction: "safe", rawValue: "Valid system daemon" },
      ],
    },
    recommendedAction:
      "Isolate DevOps workstation 10.0.4.18 via micro-segmentation rule, revoke Active Directory Kerberos ticket-granting session.",
    mitreTactic: "Lateral Movement",
    mitreTechnique: "T1558.003 - Kerberoasting",
    packetCount: 38240,
    payloadSignature: "TGS-REQ / cifs/vault-db-prod",
  },
  {
    id: "INC-2046",
    title: "Layer-7 Adaptive API Flooding & Bypass Attempt",
    threatType: "Distributed Denial of Service",
    severity: "high",
    riskScore: 78,
    status: "Contained",
    source: "Botnet Cluster 'Nyx-44' (Distributed 842 IPs)",
    target: "api-gateway-edge.cybershieldx.net",
    timestamp: "45 mins ago",
    affectedResource: "Global Edge WAF & Envoy Ingress Proxy",
    confidence: 93.2,
    explanation: {
      summary:
        "Volumetric HTTP/2 rapid reset stream manipulation attempting to deplete connection pooling threads.",
      reasons: [
        "HTTP/2 RST_STREAM frames exceeding 15,000 requests per multiplexed TCP stream",
        "Header randomization spoofing diverse mobile user agents",
        "Geographically dispersed residential proxy network usage",
      ],
      shapFeatures: [
        { feature: "RST_STREAM Ratio", contribution: 42, direction: "risk", rawValue: "98% cancellation rate" },
        { feature: "Distributed Origin Spread", contribution: 22, direction: "risk", rawValue: "842 distinct ASNs" },
        { feature: "Header Consistency Check", contribution: 18, direction: "risk", rawValue: "Entropy anomaly" },
        { feature: "Geo-blocking Policy Match", contribution: -12, direction: "safe", rawValue: "No sanctions flag" },
      ],
    },
    recommendedAction:
      "Engage adaptive Cloudflare/WAF rate-limiting tier-3, trigger CAPTCHA challenge on non-session tokens.",
    mitreTactic: "Impact",
    mitreTechnique: "T1498 - Network Denial of Service",
    packetCount: 894002,
  },
  {
    id: "INC-2045",
    title: "Blind SQL Injection & Second-Order Taint Payload",
    threatType: "Application Vulnerability Exploitation",
    severity: "high",
    riskScore: 74,
    status: "Resolved",
    source: "185.162.247.88 (Hosting Services Ltd)",
    target: "checkout.cybershieldx.net/v1/orders",
    timestamp: "1 hr ago",
    affectedResource: "E-Commerce Billing Microservice",
    confidence: 98.9,
    explanation: {
      summary:
        "Malicious hex-encoded SQL statement detected inside HTTP JSON payload targeting order transaction lookup.",
      reasons: [
        "Pattern match on nested `UNION SELECT SLEEP(5)` SQL dialect syntax",
        "Tampering with input parameter `transaction_id` containing hex escape characters",
        "WAF regex inspection caught stacked query delimiters",
      ],
      shapFeatures: [
        { feature: "SQL Syntax Heuristics", contribution: 45, direction: "risk", rawValue: "UNION SELECT regex" },
        { feature: "Hex Encoded Payload", contribution: 25, direction: "risk", rawValue: "0x27204f52" },
        { feature: "Input Length Delta", contribution: 15, direction: "risk", rawValue: "+350 bytes above schema" },
        { feature: "Authenticated Customer", contribution: -10, direction: "safe", rawValue: "Guest checkout mode" },
      ],
    },
    recommendedAction:
      "Payload blocked automatically at edge. Parameterized query sanitation verified in billing service v2.4.1.",
    mitreTactic: "Initial Access",
    mitreTechnique: "T1190 - Exploit Public-Facing Application",
    packetCount: 650,
  },
  {
    id: "INC-2044",
    title: "Suspicious MFA Push Fatigue Attack",
    threatType: "Social Engineering / Auth Bypass",
    severity: "medium",
    riskScore: 65,
    status: "Resolved",
    source: "203.0.113.45 (Residential ISP)",
    target: "sso.cybershieldx.net",
    timestamp: "2 hrs ago",
    affectedResource: "Corporate Okta SSO Identity Provider",
    confidence: 91.5,
    explanation: {
      summary:
        "Repeated out-of-band push notifications issued to senior security engineer within 3 minutes.",
      reasons: [
        "12 push notifications triggered in 180 seconds",
        "Geographic distance impossible travel (Login in London 10 mins after New York)",
        "Prompt rejection by user flagged as fraud",
      ],
      shapFeatures: [
        { feature: "Push Velocity", contribution: 38, direction: "risk", rawValue: "12 prompts / 3m" },
        { feature: "Impossible Travel Speed", contribution: 34, direction: "risk", rawValue: "3,400 mph required" },
        { feature: "User Flagged Alert", contribution: 20, direction: "risk", rawValue: "User tapped Deny" },
      ],
    },
    recommendedAction:
      "User password invalidated, session cookies purged across all active devices. Identity verification call scheduled.",
    mitreTactic: "Credential Access",
    mitreTechnique: "T1621 - Multi-Factor Authentication Request Generation",
    packetCount: 88,
  },
  {
    id: "INC-2043",
    title: "C2 Beaconing via DGA (Domain Generation Algorithm)",
    threatType: "Malware Communication",
    severity: "medium",
    riskScore: 61,
    status: "Monitoring",
    source: "10.0.12.89 (Marketing Laptop)",
    target: "xj882-cloud-sync.xyz (DNS Port 53)",
    timestamp: "3 hrs ago",
    affectedResource: "Internal DNS Resolver (dns-internal-01)",
    confidence: 88.0,
    explanation: {
      summary:
        "Periodic high-frequency DNS query bursts for pseudo-random high-entropy subdomains matching known DGA seed.",
      reasons: [
        "Domain entropy calculation exceeds 4.2",
        "Consistent beacon interval jitter (every 45s +/- 2s)",
        "Zero previous history for target top-level domain `.xyz`",
      ],
      shapFeatures: [
        { feature: "DGA Domain Entropy", contribution: 40, direction: "risk", rawValue: "Entropy: 4.38" },
        { feature: "Beaconing Jitter Regularity", contribution: 30, direction: "risk", rawValue: "Interval: 45.2s" },
        { feature: "Newly Registered TLD", contribution: 18, direction: "risk", rawValue: "Created 48h ago" },
      ],
    },
    recommendedAction:
      "Sinkhole DGA domain family at internal DNS server, isolate endpoint via EDR agent.",
    mitreTactic: "Command and Control",
    mitreTechnique: "T1568.002 - Domain Generation Algorithms",
    packetCount: 340,
  },
];

export const NETWORK_NODES: NetworkNode[] = [
  {
    id: "ext-actor-01",
    name: "External Adversary Cluster (AS49870)",
    type: "threat",
    ip: "194.26.29.112",
    status: "critical",
    trafficMbps: 450.2,
    riskScore: 92,
    location: "Bucharest, RO",
    zone: "External",
    connections: ["fw-edge-01"],
  },
  {
    id: "fw-edge-01",
    name: "Next-Gen Edge Firewall",
    type: "firewall",
    ip: "198.51.100.1",
    status: "suspicious",
    trafficMbps: 1250.0,
    riskScore: 78,
    location: "US-East Edge",
    zone: "DMZ",
    connections: ["gw-ingress-01", "gw-auth-01"],
  },
  {
    id: "gw-ingress-01",
    name: "Kubernetes Envoy Ingress Gateway",
    type: "gateway",
    ip: "10.0.1.10",
    status: "secure",
    trafficMbps: 840.5,
    riskScore: 24,
    location: "AWS us-east-1",
    zone: "DMZ",
    connections: ["srv-api-01", "srv-web-01"],
  },
  {
    id: "gw-auth-01",
    name: "Zero-Trust Identity Proxy",
    type: "gateway",
    ip: "10.0.1.20",
    status: "critical",
    trafficMbps: 320.1,
    riskScore: 92,
    location: "AWS us-east-1",
    zone: "DMZ",
    connections: ["srv-auth-04"],
  },
  {
    id: "srv-auth-04",
    name: "Core Auth & IAM Server (auth-srv-04)",
    type: "server",
    ip: "10.0.2.14",
    status: "critical",
    trafficMbps: 180.4,
    riskScore: 92,
    location: "Internal VPC Core",
    zone: "Internal Core",
    connections: ["db-vault-01"],
  },
  {
    id: "srv-api-01",
    name: "Microservices API Mesh",
    type: "server",
    ip: "10.0.2.30",
    status: "secure",
    trafficMbps: 650.0,
    riskScore: 18,
    location: "Internal VPC Core",
    zone: "Internal Core",
    connections: ["db-vault-01", "db-analytics-01"],
  },
  {
    id: "srv-web-01",
    name: "Edge Web Application Host",
    type: "server",
    ip: "10.0.2.40",
    status: "secure",
    trafficMbps: 420.2,
    riskScore: 12,
    location: "Internal VPC Core",
    zone: "Internal Core",
    connections: [],
  },
  {
    id: "db-vault-01",
    name: "Encrypted PII Database Vault",
    type: "database",
    ip: "10.0.3.50",
    status: "suspicious",
    trafficMbps: 95.8,
    riskScore: 89,
    location: "Protected Enclave",
    zone: "Restricted Vault",
    connections: [],
  },
  {
    id: "db-analytics-01",
    name: "Security Telemetry Data Lake",
    type: "database",
    ip: "10.0.3.60",
    status: "secure",
    trafficMbps: 540.3,
    riskScore: 8,
    location: "Protected Enclave",
    zone: "Restricted Vault",
    connections: [],
  },
  {
    id: "usr-admin-01",
    name: "SOC Analyst Console (Nisha)",
    type: "user",
    ip: "10.0.99.14",
    status: "secure",
    trafficMbps: 12.4,
    riskScore: 4,
    location: "SOC Terminal L5",
    zone: "Internal Core",
    connections: ["srv-auth-04", "srv-api-01"],
  },
];

export const THREAT_INTEL_FEED: ThreatIntelligenceItem[] = [
  {
    id: "TI-991",
    indicator: "194.26.29.112",
    type: "IP",
    category: "Brute-Force & Credential Stuffing Proxy",
    confidence: 99.2,
    threatActor: "APT-29 (Cozy Bear Affiliate)",
    firstSeen: "2026-09-28",
    lastSeen: "12m ago",
    severity: "critical",
    country: "Romania",
    countryCode: "RO",
    status: "Blocklisted",
  },
  {
    id: "TI-992",
    indicator: "auth-verify-security.cloud-tokens.xyz",
    type: "Domain",
    category: "EvilGinx Phishing Reverse Proxy",
    confidence: 96.8,
    threatActor: "Scatter Swine (Muddled Libra)",
    firstSeen: "2026-10-01",
    lastSeen: "28m ago",
    severity: "critical",
    country: "Russian Federation",
    countryCode: "RU",
    status: "Active Tracking",
  },
  {
    id: "TI-993",
    indicator: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    type: "Hash",
    category: "LockBit 3.0 Ransomware Stager",
    confidence: 100,
    threatActor: "LockBit Group",
    firstSeen: "2026-09-15",
    lastSeen: "1h ago",
    severity: "critical",
    country: "Global",
    countryCode: "UN",
    status: "Blocklisted",
  },
  {
    id: "TI-994",
    indicator: "91.240.118.172",
    type: "IP",
    category: "Cobalt Strike Team Server C2",
    confidence: 94.5,
    threatActor: "FIN7",
    firstSeen: "2026-09-22",
    lastSeen: "3h ago",
    severity: "high",
    country: "Netherlands",
    countryCode: "NL",
    status: "Sinkholed",
  },
  {
    id: "TI-995",
    indicator: "CVE-2026-38491",
    type: "CVE",
    category: "Remote Code Execution in OpenSSL v3.4 Handshake",
    confidence: 98.0,
    firstSeen: "2026-09-30",
    lastSeen: "4h ago",
    severity: "critical",
    country: "Global",
    countryCode: "UN",
    status: "Active Tracking",
  },
  {
    id: "TI-996",
    indicator: "AS49870",
    type: "ASN",
    category: "Bulletproof Autonomous System Provider",
    confidence: 92.1,
    firstSeen: "2026-08-10",
    lastSeen: "5m ago",
    severity: "high",
    country: "Seychelles",
    countryCode: "SC",
    status: "Blocklisted",
  },
];

export const THREAT_ARCS: ThreatArc[] = [
  {
    id: "arc-01",
    originName: "Bucharest, Romania",
    originLat: 44.4268,
    originLng: 26.1025,
    targetName: "US-East Data Center (Virginia)",
    targetLat: 38.0336,
    targetLng: -78.508,
    type: "Credential Stuffing",
    severity: "critical",
    packets: 14209,
    timestamp: "2 mins ago",
  },
  {
    id: "arc-02",
    originName: "Moscow, Russia",
    originLat: 55.7558,
    originLng: 37.6173,
    targetName: "EU-Central Frankfurt Node",
    targetLat: 50.1109,
    targetLng: 8.6821,
    type: "C2 Beaconing (Cobalt Strike)",
    severity: "critical",
    packets: 28400,
    timestamp: "7 mins ago",
  },
  {
    id: "arc-03",
    originName: "Beijing, China",
    originLat: 39.9042,
    originLng: 116.4074,
    targetName: "AP-South Tokyo Gateway",
    targetLat: 35.6762,
    targetLng: 139.6503,
    type: "Layer-7 Adaptive Flood",
    severity: "high",
    packets: 894002,
    timestamp: "14 mins ago",
  },
  {
    id: "arc-04",
    originName: "Sao Paulo, Brazil",
    originLat: -23.5505,
    originLng: -46.6333,
    targetName: "US-West Oregon Cluster",
    targetLat: 45.5152,
    targetLng: -122.6784,
    type: "SQL Injection Probe",
    severity: "medium",
    packets: 650,
    timestamp: "32 mins ago",
  },
  {
    id: "arc-05",
    originName: "Amsterdam, Netherlands",
    originLat: 52.3676,
    originLng: 4.9041,
    targetName: "UK London Core Exchange",
    targetLat: 51.5074,
    targetLng: -0.1278,
    type: "MFA Push Fatigue",
    severity: "medium",
    packets: 88,
    timestamp: "45 mins ago",
  },
];

export const SAMPLE_LOGS = [
  {
    id: "sample-bruteforce",
    name: "APT-29 Distributed Brute Force (High Risk)",
    category: "Authentication",
    content: `2026-10-02T21:44:12Z [AUTH_GATEWAY] WARN src_ip="194.26.29.112" user="root" status="FAILURE" reason="BAD_PASSWORD" attempt=48 duration_ms=12 client_fingerprint="ja3:771,4865-4866,0-23" geo="RO" asn="AS49870"
2026-10-02T21:44:14Z [AUTH_GATEWAY] WARN src_ip="194.26.29.112" user="admin" status="FAILURE" reason="MFA_TIMEOUT" attempts_past_60s=52
2026-10-02T21:44:16Z [ANOMALY_ENGINE] ALERT anomaly="RAPID_AUTH_FAILURE_BURST" entropy=0.91 threat_score=92 action_suggested="CONTAIN_NODE"`,
  },
  {
    id: "sample-sqli",
    name: "Blind SQL Injection in Orders API (Critical)",
    category: "Application",
    content: `2026-10-02T21:40:02Z [INGRESS_WAF] REQ method="POST" path="/v1/orders/lookup" client="185.162.247.88" payload="{'order_id': '1042\' UNION SELECT SLEEP(5)--', 'auth_token': 'guest_session'}"
2026-10-02T21:40:03Z [WAF_INSPECT] ALERT rule_id="SQLI-942100" matched="UNION SELECT SLEEP" score=88 classification="MALICIOUS_PAYLOAD"
2026-10-02T21:40:03Z [INGRESS_WAF] ACTION blocked=true code=403 latency_ms=2.4`,
  },
  {
    id: "sample-ddos",
    name: "HTTP/2 Rapid Reset Flooding (High Risk)",
    category: "Network / Infrastructure",
    content: `2026-10-02T21:38:15Z [EDGE_PROXY] TRAFFIC_SURGE streams_opened=48200 streams_reset=47900 rst_ratio=0.993 client_ips_count=842
2026-10-02T21:38:16Z [DEFENSE_MATRIX] ALERT protocol="HTTP/2" attack_type="CVE-2023-44487_RAPID_RESET" rps=894000
2026-10-02T21:38:17Z [RATE_LIMITER] ENFORCE_TIER3 threshold=1000 action="DROP_EXCESS_TCP"`,
  },
  {
    id: "sample-benign",
    name: "Routine Backup & Health Check (Benign 0% Risk)",
    category: "System Maintenance",
    content: `2026-10-02T21:30:00Z [CRON_SCHEDULER] INFO task="k8s_etcd_snapshot" status="SUCCESS" size_mb=420 node="master-us-east-1a"
2026-10-02T21:30:01Z [HEALTH_CHECK] INFO endpoint="/healthz" status=200 latency_ms=1.2 ssl_cert_valid_days=84
2026-10-02T21:30:05Z [ZERO_TRUST_ENGINE] INFO integrity_score=100 all_nodes_compliant=true anomalies=0`,
  },
];
