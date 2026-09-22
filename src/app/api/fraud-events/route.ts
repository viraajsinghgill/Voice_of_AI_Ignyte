import { NextResponse } from "next/server";
import { MOCK_FRAUD_INCIDENTS } from "@/data/mockData";

export async function GET() {
  return NextResponse.json({
    success: true,
    total: MOCK_FRAUD_INCIDENTS.length,
    incidents: MOCK_FRAUD_INCIDENTS,
    source: "FICO Falcon Real-Time Risk Engine v10.4",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newIncident = {
      id: `INC-DXB-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: body.customerName || "Rashid Al-Kindi",
      customerPhone: body.customerPhone || "+971 50 123 4567",
      cardLastFour: body.cardLastFour || "9182",
      cardToken: `tok_ae_${Math.random().toString(36).substring(7)}`,
      accountNumber: "AE1203300000998877665",
      merchantName: body.merchantName || "Dubai Gold Souk Jewellers",
      merchantCategory: "High Value Retail",
      amount: body.amount || 9450,
      currency: "AED",
      timestamp: "Just now",
      location: "Deira Dubai, UAE",
      riskScore: body.riskScore || 955,
      riskLevel: "CRITICAL",
      fraudType: "Immediate Outbound Intervention Triggered",
      deviceFingerprint: "Unknown iOS 18 (Untrusted Device)",
    };

    return NextResponse.json({
      success: true,
      message: "Fraud event received; Sentinel Voice Agent outbound dispatch initiated.",
      incident: newIncident,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}
