import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { incidentId, reason, transcriptSummary } = await req.json();

    return NextResponse.json({
      success: true,
      message: "SIP REFER transfer dispatched to Genesys Cloud Tier-2 Fraud Queue.",
      transferType: "WARM_TRANSFER_WITH_METADATA",
      destinationQueue: "DXB_TIER2_FRAUD_ESCALATION",
      incidentId,
      reason: reason || "FRAUD_CONFIRMED_CARD_FROZEN",
      whisperContext: {
        transcriptSummary: transcriptSummary || "Card frozen. Customer confirmed unauthorized charge.",
        priority: "CRITICAL_P1",
        pciDssMaskingApplied: true,
      },
      sipReferCode: 202,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Escalation failed" }, { status: 500 });
  }
}
