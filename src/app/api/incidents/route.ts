import { NextRequest, NextResponse } from "next/server";
import { INITIAL_INCIDENTS } from "@/lib/data/mockSecurityData";

export async function GET() {
  return NextResponse.json({
    total: INITIAL_INCIDENTS.length,
    incidents: INITIAL_INCIDENTS,
  });
}
