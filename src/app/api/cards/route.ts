import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cardToken, action, reason } = await req.json();

    // Check action scoping - bot is strictly forbidden from executing permanent cancellation
    if (action === "CANCEL_PERMANENT") {
      return NextResponse.json(
        {
          success: false,
          error: "ACCESS_DENIED: Irreversible actions require Human Approval Gate (H).",
          code: "CBUAE_RULE_VIOLATION",
        },
        { status: 403 }
      );
    }

    // Scoped pre-approved protective action: temporary card freeze
    const auditHash = `sha256_${Math.random().toString(36).substring(2)}${Date.now()}`;

    return NextResponse.json({
      success: true,
      cardToken,
      status: "TEMP_LOCKED",
      isReversible: true,
      executedBy: "Sentinel_Agent_Scoped_Tool",
      targetCore: "Temenos T24 Cards Gateway (UAE Enclave)",
      auditHash,
      reason: reason || "CUSTOMER_CONFIRMED_UNAUTHORIZED_ACTIVITY",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to freeze card" }, { status: 500 });
  }
}
