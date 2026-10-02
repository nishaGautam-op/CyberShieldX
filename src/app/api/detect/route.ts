import { NextRequest, NextResponse } from "next/server";
import { analyzeSecurityInput } from "@/lib/ml-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type = "log", content = "" } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content field is required for security evaluation" },
        { status: 400 }
      );
    }

    const result = analyzeSecurityInput(type, content);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process threat telemetry", details: error.message },
      { status: 500 }
    );
  }
}
