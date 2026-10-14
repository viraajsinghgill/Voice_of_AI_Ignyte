import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      configured: false,
      tier: "unconfigured",
      characterLimit: 0,
      characterCount: 0,
    });
  }

  try {
    const res = await fetch("https://api.elevenlabs.io/v1/user", {
      headers: { "xi-api-key": apiKey },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        success: true,
        configured: true,
        tier: data.subscription?.tier || "grant",
        characterLimit: data.subscription?.character_limit || 33010000,
        characterCount: data.subscription?.character_count || 0,
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_3401m4xpp2fpfng89nr7894xc86c",
        status: data.subscription?.status || "active",
      });
    }

    return NextResponse.json({ success: false, configured: true, error: "Failed to fetch quota" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Network error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { text, voiceId, language } = await req.json();
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        mode: "SIMULATED_VOICE_STREAM",
        text,
        language: language || "en",
        model: language === "ar" ? "eleven_multilingual_v2" : "eleven_turbo_v2_5",
        latencyMs: 142,
      });
    }

    // Default professional security voices:
    // English: EXAVITQu4vr4xnSDxMaL (Sarah - Reassuring, Calm, Professional)
    // Arabic: EXAVITQu4vr4xnSDxMaL with eleven_multilingual_v2
    const selectedVoice = voiceId || "EXAVITQu4vr4xnSDxMaL";
    const selectedModel = language === "ar" ? "eleven_multilingual_v2" : "eleven_turbo_v2_5";

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: selectedModel,
        voice_settings: {
          stability: 0.65,
          similarity_boost: 0.85,
          style: 0.25,
          use_speaker_boost: true,
        },
      }),
    });

    if (response.ok) {
      const audioBuffer = await response.arrayBuffer();
      return new Response(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "X-ElevenLabs-Source": "LIVE_PRODUCTION_GRANT_API",
          "X-ElevenLabs-Model": selectedModel,
        },
      });
    }

    const errText = await response.text();
    console.error("ElevenLabs API error:", response.status, errText);

    return NextResponse.json(
      { success: false, error: "ElevenLabs API responded with an error", details: errText },
      { status: response.status }
    );
  } catch (error) {
    console.error("TTS endpoint exception:", error);
    return NextResponse.json({ success: false, error: "TTS generation failed" }, { status: 500 });
  }
}
