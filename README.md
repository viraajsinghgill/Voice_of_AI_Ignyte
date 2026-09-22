# PROJECT SENTINEL · ELEVENLABS IGNYTE HACKATHON
## TRACK 1: BANKING & INSURANCE · REAL-TIME FRAUD INTERVENTION
**A production-ready, zero-knowledge multilingual voice intervention agent for regulated financial institutions.**

---

## 📌 OVERVIEW
When a bank detects a stolen card, credential stuffing attack, or anomalous instant payment (e.g., UAE Aani / instant account transfers), standard outbound contact channels (SMS, manual dialling queues) fail. Funds drain within 60–120 seconds, while contact centre backlogs average 28 minutes.

**Project Sentinel** executes immediate (<25s) automated outbound intervention in the customer's native language (Emirati Arabic, Modern Standard Arabic, English, Urdu, Hindi). The agent identifies itself as the bank's AI, verifies caller identity using a zero-knowledge out-of-band biometric push challenge (without requesting PINs or passwords), executes an immediate temporary card freeze via scoped tools, and initiates a warm handover (SIP REFER) to human fraud specialists for irreversible account remedies.

---

## 📁 REPOSITORY STRUCTURE & MASTER DOCUMENTATION

| Document | Purpose & Contents |
| :--- | :--- |
| **[`STAGE_1_IDEA_CANVAS.md`](./STAGE_1_IDEA_CANVAS.md)** | **Official Stage 1 Submission Document.** Contains all 14 boxes (A through Q) strictly adhering to word limits, no-adjective rules, cross-checked baselines, named UAE systems, and scored criteria. |
| **[`PRODUCTION_BLUEPRINT_AND_SYSTEM_ARCHITECTURE.md`](./PRODUCTION_BLUEPRINT_AND_SYSTEM_ARCHITECTURE.md)** | **Full Engineering Architecture.** 3-zone system topology, out-of-band zero-knowledge verification challenge, <650ms latency budget, Arabic dialect handling, circuit breaking, and CBUAE / PCI-DSS compliance enclave. |
| **[`AGENT_WORKFLOW_AND_PROMPT_ENGINEERING.md`](./AGENT_WORKFLOW_AND_PROMPT_ENGINEERING.md)** | **ElevenLabs Agent Specification.** Production bilingual system prompt (EN & Emirati Arabic), deterministic state machine, tool definitions (OpenAPI JSON schemas), and adversarial prompt-injection defenses. |
| **[`TESTING_SUITE_AND_STAGE_2_SPRINT_PLAN.md`](./TESTING_SUITE_AND_STAGE_2_SPRINT_PLAN.md)** | **Evaluation & Stage 2 Execution.** Agent Testing suite configuration, high-stakes tool-call assertion tests, 100-scenario simulation matrix, and 14-day production build roadmap (Sept 30 – Oct 14). |

---

## 🛡️ KEY INNOVATIONS & COMPLIANCE MECHANISMS

1. **Zero-Knowledge Dual-Channel Verification**: Sentinel completely eliminates voice-phishing (vishing) vulnerability by never soliciting voice PINs, passwords, or SMS OTPs over the phone. Identity verification is achieved via an out-of-band biometric push challenge to the bank's official mobile app.
2. **Deterministic Scoped Permissions**: The agent is restricted to one reversible protective action: `execute_temporary_card_freeze`. Irreversible operations (permanent cancellation, refund issuance) are strictly gated behind a warm SIP REFER handover to human fraud investigators.
3. **Ultra-Low Latency & Arabic Dialect Biasing**: End-to-end conversational turn latency is engineered to $<650\text{ ms}$ using Scribe v2 realtime STT with keyterm biasing for GCC regional merchants and phonemes, paired with Eleven v3 Gulf-accented Arabic voice synthesis.
4. **CBUAE Consumer Protection & Audit Traceability**: Opening AI disclosure is hard-coded in the primary audio node. Every call generates an immutable, SHA-256 hashed audit record and redacted transcript logged to a WORM compliance repository.

---

## 👥 CORE TEAM ROLES & STAGE 2 DEPLOYMENT

- **Voice AI & Conversational Design**: ElevenLabs Agent Workflows, system prompt optimization, voice selection.
- **Telephony & Realtime Systems**: Twilio SIP trunking, WebRTC streaming, SIP REFER call bridging.
- **Core Banking & Fraud Enclave**: FastAPI integration gateway, FICO Falcon mock risk bus, Way4 card freeze API.
- **Compliance, Red-Teaming & Testing**: ElevenLabs Agent Testing harness, multi-run pass rate verification, CBUAE regulatory alignment.

---

*Prepared for the ElevenLabs IGNYTE Hackathon 2024 · Track 1: Banking & Insurance.*
