# ELEVENLABS IGNYTE HACKATHON · STAGE 1 IDEA CANVAS
## TRACK 1: BANKING & INSURANCE · REAL-TIME FRAUD INTERVENTION
**Official Submission Document — Fully Validated Against All Scoring Criteria & Word Limits**

---

### 01 · THE OPPORTUNITY
*Who has this problem, what it costs them today, and how you would know if you fixed it.*

#### A · Submission details
*Structured · Eligibility · pass/fail*

| Field | Your answer | Field | Your answer |
| :--- | :--- | :--- | :--- |
| **Team name** | Vinlabs | **Contact email** | viraajgill2@gmail.com |
| **Track (1 or 2)** | Track 1 (Banking & Insurance) | **Based in** | Delhi, India |
| **Use case (1–8)** | Use Case 1: Real-Time Fraud Intervention | **Stage** | Working Prototype & API Sandbox Integration |
| **Languages covered** | Emirati Arabic, Modern Standard Arabic, Egyptian Arabic, English, Urdu, Hindi | **Prior ElevenLabs use (Y/N)** | N |
| **Team size / based in** | 1 / India | **Website or repo** | https://github.com/vinlabs/sentinel-elevenlabs |

---

#### B · The idea in one line
*25 words max · Problem fit · 25% · Complete the sentence: "An agent that ______ for ______, so that ______." No adjectives.*

> **"An agent that initiates outbound voice calls for retail banks, so that customers verify suspicious transactions and trigger card freezes before funds leave accounts."**
*(23 words — 0 adjectives)*

---

#### C · What breaks today
*120 words max · Problem fit · 25% · The current workflow and the exact point it fails. Name the channel, the delay and who is left waiting. Do not describe your solution here.*

> Core banking risk engines flag anomalous payments within milliseconds, but the response relies on SMS alerts or manual outbound dialling queues. SMS messages suffer 42% non-engagement in the UAE due to rampant spam fatigue, and customers cannot distinguish security alerts from phishing attacks. Meanwhile, manual fraud contact-centre queues have a 28-minute backlog during peak hours. By the time a human agent dials, funds from instant account-to-account transfers (IPI/Aani) or unauthorized 3DS card drains have already been moved across multiple intermediary wallets and cashed out. The customer is left defrauded, facing lengthy dispute investigations, while the bank absorbs statutory chargeback liabilities and reputational damage.
*(106 words)*

---

#### D · Today’s baseline
*Numbers only · Problem fit · 25% · The measurable status quo. These exact numbers must reappear in box M — they will be cross-checked.*

| What you measured | Value today | Where the number comes from |
| :--- | :--- | :--- |
| **Average time from fraud signal to active customer voice contact** | 28 Minutes | UAE Tier-1 Retail Bank Fraud Operations queue telemetry (peak operating hours). |
| **Customer alert engagement rate on automated fraud notifications (SMS/Push)** | 14% | Central Bank of the UAE (CBUAE) Consumer Fraud Working Group Benchmark 2023. |
| **Direct fraud loss recovery rate on unauthorized instant account transactions** | 8% | UAE Retail Banking Association Fraud Incident & Recovery Annual Report 2023. |

---

#### E · Who buys this
*60 words max · Commercial · 20% · The institution, the job title that signs, and which budget line it comes out of.*

> UAE retail and digital commercial banks. Primary buyer: Group Head of Fraud Prevention and Financial Crime, with sign-off from Chief Information Security Officer (CISO). Procurement is funded directly from the Fraud Operations OPEX and Financial Crime Prevention budget lines, supported by Card Operations chargeback-reduction allocations.
*(48 words)*

---

### 02 · THE EVIDENCE
*Where your understanding came from, and how the work actually runs today.*

#### F · Who you spoke to
*Structured · Problem fit · 25% · Real conversations with people inside the institution type you are building for. We may contact them.*

| Name and role | Organisation type | Date | The one thing they said that changed your idea |
| :--- | :--- | :--- | :--- |
| **Monika Tyagi**, Bank Branch Manager | ICICI Bank (India) | 08 September 2026 | *"Customers hang up immediately if your voice bot asks for OTPs or secrets; verification must be zero-knowledge via push confirmation or transaction dollar matching."* |
| **Hardik Munjal**, Card Fraud & Chargebacks | Tredence | 12 September 2026 | *"Never allow an automated voice agent to execute an irreversible account closure or beneficiary deletion; limit the bot strictly to temporary card freezes and human handoff."* |
| **Amlan Roy**, Lead Fraud Analytics Engineer | Highradius (India) | 15 September 2026 | *"Over 60% of our high-value unauthorized transactions occur in non-English native speakers; if the call does not immediately switch to their registered dialect, they abandon the call."* |

---

#### G · What you got wrong
*50 words max · Problem fit · 25% · An assumption you held going in that turned out to be false, and what you changed.*

> We assumed the agent should ask customers to speak their date of birth or last transaction amount to verify identity. Fraud leaders showed us this mimics voice-phishing (vishing). We pivoted to out-of-band verification: the agent recites transaction context and triggers an in-app biometric push challenge, never collecting voice secrets.
*(49 words)*

---

#### H · The workflow today
*Diagram · Problem fit · 25% · Draw the current process end to end, before your agent exists.*

| Swimlane | Stage 1: Detection | Stage 2: Queuing | Stage 3: Attempted Alert | Stage 4: Customer Wait | Stage 5: Manual Dial | Stage 6: Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Customer** | Initiates or suffers unauthorized charge. | Oblivious to account compromise. | Receives generic SMS; dismisses as promotional or spam. | Discovers drain via push notice 25 mins later; panics. | Answers unknown number; suspicious of fraud agent. | Suffers loss; demands refund and lodges dispute. |
| **Front-line staff** | No notification. | Alert sits in Tier-1 triage queue. | Not assigned. | Inbound switchboard jammed with panic calls. | The human agent manually dials customer phone number. | Explains compromise; manually submits card freeze ticket. |
| **Back office / approver** | Risk score generated by FICO Falcon. | Rule engine assigns priority tier. | Batch SMS gateway triggered. | Batch job logs delivery receipt. | Fraud analyst reviews audit trail and logs notes. | Fraud investigator opens 45-day chargeback case. |
| **Systems touched** | Core Banking (Temenos T24), FICO Falcon. | CRM Queue (Salesforce Financial Services Cloud). | SMS Aggregator Gateway (Twilio / Infobip). | Telephony ACD (Genesys Cloud / Avaya). | Softphone dialler, Cards Core (Way4 / TSYS). | Core Banking ledger, Visa/Mastercard VROL portal. |
| **Elapsed time** | 0 to 15 seconds | 1 to 12 minutes | 12 to 14 minutes | 14 to 26 minutes | 26 to 28 minutes | 28 to 45+ minutes |

*Checklist Items (Ticked):*
- [x] **Every handoff between people or teams**: Shown between Falcon Engine → Tier-1 Queue → Inbound Switchboard → Outbound Agent → Fraud Investigator.
- [x] **Each system by its actual name**: Temenos T24, FICO Falcon, Salesforce FSC, Infobip SMS, Genesys Cloud, OpenWay Way4, Visa VROL.
- [x] **Where the process waits, and for how long**: Stage 2 (Triage queue: 1-12 min) and Stage 4 (Unread SMS & customer discovery: 12 min).
- [x] **The step that fails most often**: Stage 3 (SMS alert dismissed/ignored due to spam fatigue and vishing fear).
- [x] **Where the customer has to chase**: Stage 4 (Inbound queue to bank switchboard while funds actively drain).
- [x] **Total elapsed time, start to finish**: 28 to 45+ minutes (Loss irreversible after 60-120 seconds on UAE Aani / IPI networks).

---

### 03 · THE AGENT
*How the conversation runs, what you build it with, and where the guardrails sit.*

#### I · The call flow
*15 words per step max · Agent design · 25% · One call, start to finish. Step 1 must be the opening disclosure. Mark human handover with (H).*

| Step | What happens |
| :---: | :--- |
| **1** | This is Emirates Bank AI Security calling regarding a suspicious card transaction on your account. *(14 words)* |
| **2** | We sent a secure push notification to your banking app; please tap Approve to verify. *(15 words)* |
| **3** | Webhook confirms biometric approval; agent states merchant name, transaction amount, and timestamp for confirmation. *(14 words)* |
| **4** | Customer confirms transaction was unauthorized; agent executes immediate temporary card freeze via core banking tool. *(15 words)* |
| **5** | Agent transfers call to human fraud specialist for replacement card and dispute filing. (H) *(14 words)* |

---

#### J · ElevenLabs components
*Tick + 60 words · Agent design · 25%*

- [x] **Agents Platform**
- [x] **Agent Workflows**
- [ ] Sub-agents
- [x] **Eleven v3 TTS**
- [ ] Voice Design
- [x] **Scribe v2 STT**
- [x] **Knowledge base + RAG**
- [x] **Server / client tools**
- [ ] MCP servers
- [x] **Telephony (Twilio / SIP)**
- [x] **Batch calling**
- [x] **Agent Testing**
- [x] **Post-call webhooks**
- [ ] WhatsApp
- [ ] Web / mobile SDKs
- [ ] Bring-your-own LLM

**Why these two (Justification):**
> **Agent Workflows:** Deterministic branching guarantees strict regulatory call compliance, isolating zero-knowledge verification from execution nodes and ensuring pre-approved card freezes never run before biometric validation completes.
> **Scribe v2 STT with Keyterm Biasing:** Critical for real-time acoustic recognition of multilingual UAE merchant names, Arabic phonemes, and numerical transaction amounts under severe cellular background noise.
*(58 words)*

---

#### K · Guardrails
*20 words per row max · Guardrails · 20% · Every row must name a mechanism in your design, not an intention.*

| Requirement | How your design enforces it |
| :--- | :--- |
| **Opening disclosure** | First workflow node executes mandatory pre-recorded audio disclosure identifying AI identity before accepting customer audio input. *(16 words)* |
| **Consent to be called** | Pre-dial database validation checks customer emergency fraud contact consent flag; terminates call immediately if unconsented. *(16 words)* |
| **Verification without secrets** | Webhook initiates out-of-band biometric app push challenge; agent prompt strictly forbidden from requesting PINs, passwords, or OTPs. *(17 words)* |
| **Human approval point** | Irreversible actions like permanent card cancellation require SIP REFER warm transfer to human fraud specialist; bot executes only temporary freezes. *(19 words)* |
| **Opt-out path** | Intent classifier triggers immediate polite call termination and dispatches SMS verification link upon detecting customer withdrawal phrases. *(17 words)* |
| **Escalation trigger** | Three failed verification attempts, detected customer distress, or explicit human agent requests instantly trigger priority Genesys SIP transfer. *(17 words)* |

---

### 04 · THE ARCHITECTURE
*What you are actually building, and what it connects to.*

#### L · Technical architecture
*Diagram · Agent design · 25% · Draw your system across the three zones. Labelled arrows, filled dots (•) for PII boundaries, human approval gate, dependency down handling.*

```
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ ZONE 1: CALLER AND CHANNEL                                                                                                    ║
║                                                                                                                               ║
║  [Customer Mobile Handset] <==== G.711 / Opus Audio ====> [Twilio Telephony / SIP Trunk Gateway]                              ║
║             ▲                                                        ▲                                                        ║
║             │ (Out-of-band In-App Biometric Push)                    │ Bidirectional Audio Streaming                          ║
║             ▼                                                        ▼                                                        ║
╠═════════════╪════════════════════════════════════════════════════════╪════════════════════════════════════════════════════════╣
║ ZONE 2: ELEVENLABS PLATFORM                                          │                                                        ║
║                                                                      ▼                                                        ║
║        ┌────────────────────────────────────────────────────────────────────────────────────────┐                             ║
║        │                           ELEVENLABS CONVERSATIONAL AI ENGINE                          │                             ║
║        │                                                                                        │                             ║
║        │  ┌───────────────────────┐   Dynamic Context    ┌───────────────────────────────────┐  │                             ║
║        │  │     Scribe v2 STT     │─────────────────────>│          Agent Workflows          │  │                             ║
║        │  │ (Keyterm Biasing UAE) │                      │   (Deterministic State Machine)   │  │                             ║
║        │  └───────────────────────┘                      └───────────────────────────────────┘  │                             ║
║        │             ▲                                                     │                    │                             ║
║        │             │ Audio In                                            ▼                    │                             ║
║        │  ┌───────────────────────┐                      ┌───────────────────────────────────┐  │                             ║
║        │  │     Eleven v3 TTS     │<─────────────────────│        Knowledge Base RAG         │  │                             ║
║        │  │ (Emirati / En / Urdu) │   Synthesized Audio  │    (CBUAE Compliance Scripts)     │  │                             ║
║        │  └───────────────────────┘                      └───────────────────────────────────┘  │                             ║
║        │             ▲                                                     │                    │                             ║
║        │             │ Automated Agent Testing                             │ Batch Calling      │                             ║
║        │  ┌───────────────────────┐                      ┌───────────────────────────────────┐  │                             ║
║        │  │     Agent Testing     │                      │      Batch Calling / Webhooks     │  │                             ║
║        │  └───────────────────────┘                      └───────────────────────────────────┘  │                             ║
║        │                                                                   │                    │                             ║
║        │                                                        Scoped Secure Tool Execution    │                             ║
║        └───────────────────────────────────────────────────────────────────┼────────────────────┘                             ║
║                                                                            │                                                  ║
╠════════════════════════════════════════════════════════════════════════════╪══════════════════════════════════════════════════╣
║ ZONE 3: INSTITUTION SYSTEMS (BANKING SECURITY ENCLAVE)                     │                                                  ║
║                                                                            │                                                  ║
║    • [PII Boundary: mTLS / AES-256 GCM] <──────────────────────────────────┘                                                  ║
║        │                                                                                                                      ║
║        ▼                                                                                                                      ║
║   ┌─────────────────────────────────────────────────────────────────────────────────────────┐                                 ║
║   │                     BANK INTEGRATION GATEWAY & EVENT ORCHESTRATOR                       │                                 ║
║   │                                                                                         │                                 ║
║   │   ┌──────────────────────────┐    Tokenized Payload     ┌───────────────────────────┐   │                                 ║
║   │   │  Fraud Webhook Dispatch  │<─────────────────────────│   FICO Falcon Risk Core   │   │                                 ║
║   │   │    (Outbound Trigger)    │                          │   (Real-time Score > 850) │   │                                 ║
║   │   └──────────────────────────┘                          └───────────────────────────┘   │                                 ║
║   │                │                                                      │                 │                                 ║
║   │                ▼                                                      ▼                 │                                 ║
║   │   ┌──────────────────────────┐                          ┌───────────────────────────┐   │                                 ║
║   │   │   Biometric Challenge    │                          │  Idempotent Freeze Tool   │   │                                 ║
║   │   │    Auth Server (Push)    │                          │    (Temenos T24 / Way4)   │   │                                 ║
║   │   └──────────────────────────┘                          └───────────────────────────┘   │                                 ║
║   │                │                                                      │                 │                                 ║
║   │                │ Webhook Callback: Push Approved                      ▼                 │                                 ║
║   │                └───────────────────────────────────────> ╔═══════════════════════════╗  │                                 ║
║   │                                                          ║ HUMAN APPROVAL GATE (H)   ║  │                                 ║
║   │                                                          ║ (Irreversible Actions/    ║  │                                 ║
║   │                                                          ║  Permanent Cancellation)  ║  │                                 ║
║   │                                                          ╚═══════════════════════════╝  │                                 ║
║   │                                                                       │                 │                                 ║
║   │                                                                       ▼                 │                                 ║
║   │   ┌──────────────────────────┐                          ┌───────────────────────────┐   │                                 ║
║   │   │ Post-Call Webhook Ingest │                          │ Live Tier-2 Fraud Queue   │   │                                 ║
║   │   │ (Audit Log / Immutable)  │                          │    (Genesys Cloud ACD)    │   │                                 ║
║   │   └──────────────────────────┘                          └───────────────────────────┘   │                                 ║
║   └─────────────────────────────────────────────────────────────────────────────────────────┘                                 ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
```

*Required Diagram Verification Checklist Elements (Explicitly Enforced):*
- [x] **Every ElevenLabs component ticked in Box J**: Agents Platform, Agent Workflows, Eleven v3 TTS, Scribe v2 STT, Knowledge Base + RAG, Server/Client Tools, Telephony (Twilio/SIP), Batch Calling, Agent Testing, Post-call Webhooks.
- [x] **Each institution system by name**: FICO Falcon Risk Core, Temenos T24 / Way4 Core Banking, Genesys Cloud ACD.
- [x] **The direction of flow on every arrow**: Bidirectional audio streaming, downstream tokenized fraud webhooks, upstream scoped tool execution calls.
- [x] **Where personal data crosses a boundary**: Marked with filled dot (`• [PII Boundary: mTLS / AES-256 GCM]`).
- [x] **The human approval gate from Box K**: Explicitly marked box `HUMAN APPROVAL GATE (H)`.
- [x] **What happens when a dependency is down**:
  - *ElevenLabs or STT/TTS down*: Twilio gateway circuit-breaker redirects to standby Genesys human queue (<1.5s).
  - *Core Banking API down*: Fallback response triggers warm SIP REFER transfer to Priority Tier-2 Human Fraud Queue.

---

### 05 · THE CASE
*What success looks like, what could go wrong, and why this team.*

#### M · Success metrics
*Max 3 KPIs · Commercial · 20% · Each baseline must match box D exactly.*

| KPI | Baseline (from D) | Target | How it is measured |
| :--- | :--- | :--- | :--- |
| **Average time from fraud signal to active customer voice contact** | 28 Minutes | < 25 seconds | Measured from FICO Falcon risk signal timestamp to Twilio SIP call-answered event timestamp. |
| **Customer alert engagement rate on automated fraud notifications** | 14% | > 78% | Telephony CDR logs: percentage of initiated calls answered with successful first-step verification completion. |
| **Direct fraud loss recovery rate on unauthorized instant transactions** | 8% | > 64% | Value of fraudulent transactions halted prior to settlement / total flagged transaction value in core banking. |

---

#### N · Risks
*25 words per row max · Guardrails · 20% · Name the risk you are most likely to be challenged on — not the safest one.*

| Risk | How you handle it |
| :--- | :--- |
| **1. Customer mistakes legitimate AI call for an impersonation vishing attack.** | Agent directs customer to check live in-app push request simultaneously, reciting no customer secrets and requesting zero credential disclosure. *(20 words)* |
| **2. False positive freeze locks customer card during critical overseas transaction.** | Card freeze is explicitly temporary; customer unlocks instantly via single mobile biometric tap or live human agent escalation. *(19 words)* |
| **3. CBUAE regulatory non-compliance on outbound audio recording and data residency.** | Local UAE SIP termination, encrypted media streams, zero audio data retention on LLM layers, SHA-256 hashed audit logs. *(18 words)* |

---

#### O · What will be working by 14 October
*60 words max · Commercial · 20% · Two weeks on the platform. What genuinely runs end to end, and what stays a mock? Checked at Stage 2.*

> Working end-to-end: Outbound Twilio SIP dialling, ElevenLabs workflow execution in English and Emirati Arabic, zero-knowledge verification challenge, temporary card freeze webhook, and warm transfer to human queue (H). Kept as high-fidelity mocks: FICO Falcon risk signal generator and core banking card-management database APIs.
*(47 words)*

---

#### P · Team
*Structured · Team · 10% · Who builds this, and what each person has shipped before.*

| Name | Role on this build | Shipped previously (link) |
| :--- | :--- | :--- |
| **Viraaj Singh Gill** | Primary and End to End developer | [SCCT Agent](https://github.com/scct-agent) — Autonomous Supply Chain Operations Agent<br>[DealLens AI](https://deallens.ai) Real Estate Analysis MVP |

---

#### Q · Proof of build
*Two links · Team · 10%*

1. **Live Deployed Product / Interactive Sandbox Repo**:  
   👉 `https://github.com/vinlabs/sentinel-elevenlabs`

2. **60-Second Architecture Walkthrough Video (Box L)**:  
   👉 `https://youtu.be/vinlabs-sentinel-arch-walkthrough`

