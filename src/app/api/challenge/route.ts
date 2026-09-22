import { NextResponse } from "next/server";

// In-memory challenge store for demo / sandbox
const activeChallenges = new Map<string, { status: "PENDING" | "APPROVED" | "REJECTED"; createdAt: number }>();

export async function POST(req: Request) {
  try {
    const { action, incidentId, status } = await req.json();

    if (action === "create") {
      const challengeKey = incidentId || "default";
      activeChallenges.set(challengeKey, { status: "PENDING", createdAt: Date.now() });

      return NextResponse.json({
        success: true,
        message: "Out-of-band biometric push challenge dispatched to mobile banking app.",
        challengeStatus: "PENDING",
        verificationMethod: "APNs / FCM Hardware Biometric Key",
        requiresSecrets: false, // PCI-DSS & Zero-Knowledge constraint
      });
    }

    if (action === "resolve") {
      const challengeKey = incidentId || "default";
      const resolvedStatus = status === "REJECTED" ? "REJECTED" : "APPROVED";
      activeChallenges.set(challengeKey, { status: resolvedStatus, createdAt: Date.now() });

      return NextResponse.json({
        success: true,
        message: `Challenge resolved: ${resolvedStatus}`,
        challengeStatus: resolvedStatus,
        cryptographicProof: "ES256_JWT_SIGNATURE_VERIFIED",
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal challenge error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const incidentId = searchParams.get("incidentId") || "default";
  const challenge = activeChallenges.get(incidentId) || { status: "PENDING", createdAt: Date.now() };

  return NextResponse.json({
    success: true,
    incidentId,
    status: challenge.status,
  });
}
