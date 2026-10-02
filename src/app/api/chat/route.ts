import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const q = query.toLowerCase();
    let text = "";
    let actionRecommendation = "";

    if (q.includes("score") || q.includes("low")) {
      text =
        "The security score decreased from 98 to 94 due to 3 high-velocity authentication anomalies detected in the auth cluster.";
      actionRecommendation = "Isolate auth-srv-04 and enforce hardware MFA challenges.";
    } else if (q.includes("investigate first") || q.includes("priority")) {
      text =
        "Start with Incident #INC-2048 because it carries the highest composite risk score (92/100, CRITICAL).";
      actionRecommendation = "Execute Playbook PB-402 to block ASN 49870 ingress.";
    } else {
      text = `ShieldAI verified "${query}" against active zero-trust baseline telemetry. All defensive rings are operational.`;
    }

    return NextResponse.json({
      sender: "shield-ai",
      text,
      timestamp: new Date().toLocaleTimeString(),
      actionRecommendation,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
