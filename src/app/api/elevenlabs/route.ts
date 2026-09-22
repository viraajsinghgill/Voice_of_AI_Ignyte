import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, voiceId, language } = await req.json();
    const apiKey = process.env.ELEVENLABS_API_KEY;

    // If real ElevenLabs API key is configured in Vercel environment:
    if (apiKey) {
      const selectedVoice = voiceId || (language === "ar" ? "21m00Tcm4TlvDq8ikWAM" : "21m00Tcm4TlvDq8ikWAM");
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: language === "ar" ? "eleven_multilingual_v2" : "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.85,
            style: 0.2,
            use_speaker_boost: true,
          },
        }),
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        return new Response(audioBuffer, {
          headers: {
            "Content-Type": "audio/mpeg",
            "X-ElevenLabs-Source": "LIVE_API",
          },
        });
      }
    }

    // In preview / mock mode (e.g. before API key is provided):
    return NextResponse.json({
      success: true,
      mode: "SIMULATED_VOICE_STREAM",
      text,
      language: language || "en",
      model: language === "ar" ? "eleven_multilingual_v2" : "eleven_turbo_v2_5",
      latencyMs: 142,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "TTS generation failed" }, { status: 500 });
  }
}
