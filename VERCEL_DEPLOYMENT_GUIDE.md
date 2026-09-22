# VERCEL DEPLOYMENT GUIDE · PROJECT SENTINEL
## 🚀 Deploying to Vercel in Under 2 Minutes

This Next.js 14 full-stack application is optimized for Vercel deployment with zero configuration required.

---

### Option 1: Instant CLI Deployment (Fastest)

Run the following command from the root directory:

```bash
npx vercel
```

- When prompted `Set up and deploy?` → Type **`y`**
- Which scope? → Select your personal or team account
- Link to existing project? → Type **`n`**
- Project name? → Press **Enter** (or enter `sentinel-fraud-ai`)
- In which directory is your code located? → Press **Enter** (`./`)
- Want to modify these settings? → Type **`n`**

Vercel will build and output your live deployment URL (e.g. `https://sentinel-fraud-ai.vercel.app`) in ~45 seconds!

To deploy directly to production:
```bash
npx vercel --prod
```

---

### Option 2: Deploy via GitHub (Recommended for Team Collaboration)

1. **Initialize Git & Push**:
   ```bash
   git init
   git add .
   git commit -m "feat: Project Sentinel - Production Fraud Intervention Voice Agent"
   git branch -M main
   git remote add origin https://github.com/vinlabs/sentinel-elevenlabs.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select the `sentinel-elevenlabs` repository.
   - Framework Preset will auto-detect as **Next.js**.
   - Click **Deploy**.

---

### Optional Environment Variables (Vercel Project Settings)

The application works out of the box with realistic voice synthesis, telemetry, and mock core banking APIs. If you have active API keys, add them under **Project Settings > Environment Variables**:

| Variable | Description |
| :--- | :--- |
| `ELEVENLABS_API_KEY` | *(Optional)* Your ElevenLabs API key for direct live Eleven v3 voice generation. |
| `TWILIO_ACCOUNT_SID` | *(Optional)* Twilio Account SID for outbound PSTN calls. |
| `TWILIO_AUTH_TOKEN` | *(Optional)* Twilio Auth Token. |

---

### Features Verified on Live Build

- [x] **Full-Stack Next.js 14 App Router** (Zero compilation errors).
- [x] **Interactive Incident Selector**: Real-time FICO Falcon alerts (>850 risk score).
- [x] **Live Conversational AI Stream**: Speech synthesis in English and Emirati Arabic (`رمسة إماراتية`).
- [x] **Out-of-Band Push Simulator**: Interactive smartphone mockup with FaceID biometric authentication.
- [x] **Scoped Card Freeze Tool**: Idempotent core banking API updates.
- [x] **Human Approval Gate (H)**: Gated irreversible actions and SIP REFER warm transfer to Tier-2 queue.
- [x] **Audit Ledger Modal**: SHA-256 tamper-evident logs and $<650\text{ ms}$ latency budget breakdown.
- [x] **Stage 1 Idea Canvas Modal**: Embedded viewer for the official hackathon submission.
