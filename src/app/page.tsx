"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { IncidentSelector } from "@/components/IncidentSelector";
import { VoiceAgentLive } from "@/components/VoiceAgentLive";
import { MobileAppSimulator } from "@/components/MobileAppSimulator";
import { CoreBankingEnclave } from "@/components/CoreBankingEnclave";
import { AuditTelemetryModal } from "@/components/AuditTelemetryModal";
import { IdeaCanvasModal } from "@/components/IdeaCanvasModal";
import { MOCK_FRAUD_INCIDENTS } from "@/data/mockData";
import { FraudIncident, CardStatus, ConversationTurn, AuditRecord, LanguageCode } from "@/types/fraud";

export default function Home() {
  const [incidents] = useState<FraudIncident[]>(MOCK_FRAUD_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<FraudIncident>(MOCK_FRAUD_INCIDENTS[0]);

  // Call & State Machine State
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>("en");

  // Out-of-band push & Core banking state
  const [isPushActive, setIsPushActive] = useState(false);
  const [isPushApproved, setIsPushApproved] = useState(false);
  const [cardStatus, setCardStatus] = useState<CardStatus>("ACTIVE");
  const [isEscalated, setIsEscalated] = useState(false);

  // Modals
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCanvasModalOpen, setIsCanvasModalOpen] = useState(false);

  // Conversation turns feed
  const [turns, setTurns] = useState<ConversationTurn[]>([]);

  // Audit records
  const [auditRecords, setAuditRecords] = useState<AuditRecord[]>([
    {
      id: "aud_01",
      timestamp: "14:20:01.102 GST",
      eventType: "FALCON_FRAUD_TRIGGER",
      actor: "FICO_Risk_Core",
      details: "Risk Score 940 exceeded threshold 850 for account AE0703300000192847101",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      status: "verified",
    },
    {
      id: "aud_02",
      timestamp: "14:20:02.415 GST",
      eventType: "TELEPHONY_OUTBOUND_DISPATCH",
      actor: "Twilio_SIP_Trunk",
      details: "Initiated SIP INVITE to +971 50 492 8812 with UAE CLI Caller ID",
      hash: "8f481223901b0289d084891b01c3894019284019283401928340192834019283",
      status: "verified",
    },
  ]);

  const addAuditLog = (eventType: string, actor: string, details: string) => {
    const newRecord: AuditRecord = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Dubai" }) + " GST",
      eventType,
      actor,
      details,
      hash: `sha256_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      status: "verified",
    };
    setAuditRecords((prev) => [newRecord, ...prev]);
  };

  // Launch the outbound fraud call
  const handleStartCall = () => {
    setIsCallActive(true);
    setCurrentStepIndex(0);
    setIsPushActive(false);
    setIsPushApproved(false);
    setCardStatus("ACTIVE");
    setIsEscalated(false);

    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    // Step 1: Mandatory AI Disclosure
    const turn1: ConversationTurn = {
      id: `turn_${Date.now()}_1`,
      speaker: "agent",
      text: `Good day, ${selectedIncident.customerName}. This is Emirates Digital Bank AI Security calling regarding an urgent transaction alert on your card ending in ${selectedIncident.cardLastFour}.`,
      textAr: `مرحباً يا ${selectedIncident.customerName}. معك المساعد الذكي للأمان من بنك الإمارات الرقمي، متصل بخصوص عملية مشبوهة وعاجلة على بطاقتك المنتهية برقم ${selectedIncident.cardLastFour}.`,
      timestamp: now,
    };

    setTurns([turn1]);
    addAuditLog("MANDATORY_AI_DISCLOSURE_UTTERED", "Sentinel_Agent", "Opening disclosure executed prior to audio collection.");

    // Step 2: Zero-Knowledge Biometric Push Challenge
    setTimeout(() => {
      setCurrentStepIndex(1);
      setIsPushActive(true);

      const turn2: ConversationTurn = {
        id: `turn_${Date.now()}_2`,
        speaker: "agent",
        text: "To verify your identity securely without asking for your passwords or PIN, we sent a secure approval notification to your banking app. Please open your mobile app and tap Approve.",
        textAr: "لتأكيد هويتك بأمان وبدون ما نطلب أي كلمة سر أو رقم سري، أرسلنا إشعار تأكيد لتطبيقك البنكي. يرجى فتح التطبيق والضغط على 'موافقة'.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        toolCall: {
          name: "trigger_in_app_challenge",
          params: { account_id: selectedIncident.accountNumber, reason: "FRAUD_INTERVENTION_ALERT" },
        },
      };

      setTurns((prev) => [...prev, turn2]);
      addAuditLog("TOOL_TRIGGER_IN_APP_CHALLENGE", "Sentinel_Agent", "Zero-Knowledge Biometric Push Challenge dispatched to mobile app.");
    }, 2800);
  };

  // User completes biometric push approval on simulated mobile phone
  const handleApprovePush = () => {
    setIsPushApproved(true);
    setCurrentStepIndex(2);
    addAuditLog("BIOMETRIC_CHALLENGE_APPROVED", "Customer_Mobile_App", "FaceID hardware cryptographic signature validated.");

    // Step 3: Transaction Triangulation
    setTimeout(() => {
      const turn3: ConversationTurn = {
        id: `turn_${Date.now()}_3`,
        speaker: "agent",
        text: `Thank you, identity verified. A charge of ${selectedIncident.currency} ${selectedIncident.amount.toLocaleString()} at '${selectedIncident.merchantName}' was just attempted. Did you authorize this transaction?`,
        textAr: `شكراً لك، تم التحقق بنجاح. تم محاولة دفع مبلغ ${selectedIncident.amount.toLocaleString()} ${selectedIncident.currency} لدى '${selectedIncident.merchantName}'. هل قمت بهذه العملية؟`,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        toolCall: {
          name: "query_challenge_status",
          params: { session_id: "sess_dxb_9812" },
          result: { status: "APPROVED", verificationProof: "ES256_HW_KEY_VERIFIED" },
        },
      };

      setTurns((prev) => [...prev, turn3]);
    }, 800);
  };

  const handleRejectPush = () => {
    setIsPushActive(false);
    addAuditLog("BIOMETRIC_CHALLENGE_REJECTED", "Customer_Mobile_App", "Challenge was rejected on mobile device.");
    handleEscalateHuman("Customer rejected mobile challenge verification.");
  };

  // Handle customer speech response simulation
  const handleCustomerResponse = (responseText: string, intent: "fraud" | "legitimate" | "human" | "optout") => {
    const customerTurn: ConversationTurn = {
      id: `turn_${Date.now()}_cust`,
      speaker: "customer",
      text: responseText,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    setTurns((prev) => [...prev, customerTurn]);

    if (intent === "fraud") {
      // Step 4: Execute Scoped Temporary Card Freeze
      setCurrentStepIndex(3);
      setCardStatus("TEMP_LOCKED");
      addAuditLog("TOOL_EXECUTE_TEMPORARY_CARD_FREEZE", "Sentinel_Agent", `Temporary lock applied to card token ${selectedIncident.cardToken}`);

      setTimeout(() => {
        const freezeTurn: ConversationTurn = {
          id: `turn_${Date.now()}_freeze`,
          speaker: "agent",
          text: `Understood. I have executed an immediate temporary freeze on your card ending in ${selectedIncident.cardLastFour} right now to prevent any further charges. Your funds are secured.`,
          textAr: `واضح تماماً. قمت بتجميد بطاقتك المنتهية برقم ${selectedIncident.cardLastFour} مؤقتاً وفوراً لمنع أي سحوبات أخرى. أموالك في أمان تام.`,
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          toolCall: {
            name: "execute_temporary_card_freeze",
            params: { card_token: selectedIncident.cardToken, reason: "CUSTOMER_DENIED_TRANSACTION" },
            result: { status: "TEMP_LOCKED", reversible: true },
          },
        };

        setTurns((prev) => [...prev, freezeTurn]);

        // Step 5: Warm Handover to Human Fraud Specialist (H)
        setTimeout(() => {
          handleEscalateHuman("Fraud confirmed; temporary card freeze in place.");
        }, 2200);
      }, 900);
    } else if (intent === "legitimate") {
      setTimeout(() => {
        const okTurn: ConversationTurn = {
          id: `turn_${Date.now()}_ok`,
          speaker: "agent",
          text: "Thank you for confirming. Your card remains active with zero restrictions. Have a wonderful day.",
          textAr: "شكراً لتأكيدك. بطاقتك تعمل بشكل طبيعي وبدون أي قيود. يوم سعيد لك.",
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        };
        setTurns((prev) => [...prev, okTurn]);
        addAuditLog("TRANSACTION_AUTHORIZED_BY_USER", "Sentinel_Agent", "Customer confirmed valid transaction; card remains active.");
      }, 800);
    } else if (intent === "human") {
      handleEscalateHuman("Customer requested human agent directly.");
    } else if (intent === "optout") {
      setTimeout(() => {
        const optOutTurn: ConversationTurn = {
          id: `turn_${Date.now()}_optout`,
          speaker: "agent",
          text: "We respect your request. Your security alert remains active in your mobile app. Please check your official app or call the number on your card. Goodbye.",
          textAr: "نحترم طلبك. تنبيه الأمان لا يزال فعالاً في تطبيقك البنكي. يمكنك فتح التطبيق الرسمي أو الاتصال بالرقم خلف بطاقتك. مع السلامة.",
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        };
        setTurns((prev) => [...prev, optOutTurn]);
        addAuditLog("CUSTOMER_OPT_OUT_HONOURED", "Sentinel_Agent", "Opt-out honoured immediately per CBUAE Consumer Protection Framework.");
      }, 700);
    }
  };

  // Human Handover via SIP REFER (H)
  const handleEscalateHuman = (reason: string) => {
    setCurrentStepIndex(4);
    setIsEscalated(true);
    addAuditLog("SIP_REFER_WARM_HANDOVER", "Sentinel_Agent", `Bridged to Genesys Cloud Tier-2 Queue. Reason: ${reason}`);

    const handoverTurn: ConversationTurn = {
      id: `turn_${Date.now()}_h`,
      speaker: "agent",
      text: "I am now transferring you directly to our Senior Fraud Officer who will arrange a replacement card and lodge your dispute affidavit.",
      textAr: "أقوم الآن بتحويلك مباشرة لمسؤول مكافحة الاحتيال لإصدار بطاقة بديلة وتقديم طلب النزاع الرسمي.",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      toolCall: {
        name: "request_human_escalation",
        params: { reason: "FRAUD_CONFIRMED_CARD_FROZEN", destination: "Genesys_Cloud_Tier2_Fraud" },
        result: { status: "BRIDGED_SIP_REFER_202" },
      },
    };

    setTurns((prev) => [...prev, handoverTurn]);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    addAuditLog("CALL_SESSION_TERMINATED", "Twilio_SIP", "Call session concluded; audit manifest sealed.");
  };

  const handleExecuteHumanAction = (actionName: string) => {
    if (actionName.includes("Cancel Card")) {
      setCardStatus("PERMANENTLY_CANCELLED");
      addAuditLog("HUMAN_APPROVED_CARD_DESTRUCTION", "Tier2_Fraud_Specialist", "Permanent card cancellation and re-issuance approved by licensed human agent.");
    } else {
      addAuditLog("VISA_DISPUTE_FILED", "Tier2_Fraud_Specialist", "Visa VROL Chargeback claim filed under code 10.4 (Unauthorized Fraud).");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* Top Header */}
      <Header
        onOpenAudit={() => setIsAuditModalOpen(true)}
        onOpenCanvas={() => setIsCanvasModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 space-y-6">
        {/* Incident Trigger Bar */}
        <IncidentSelector
          incidents={incidents}
          selectedIncident={selectedIncident}
          onSelectIncident={(inc) => {
            setSelectedIncident(inc);
            setIsCallActive(false);
            setTurns([]);
          }}
          isCallActive={isCallActive}
          onStartCall={handleStartCall}
        />

        {/* 3-Column Interactive Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Live Voice Agent Telephony & Steps (6 cols) */}
          <div className="lg:col-span-6">
            <VoiceAgentLive
              incident={selectedIncident}
              isCallActive={isCallActive}
              onEndCall={handleEndCall}
              onTriggerPush={() => setIsPushActive(true)}
              isPushApproved={isPushApproved}
              onFreezeCard={() => setCardStatus("TEMP_LOCKED")}
              isCardFrozen={cardStatus === "TEMP_LOCKED" || cardStatus === "PERMANENTLY_CANCELLED"}
              onEscalateHuman={() => handleEscalateHuman("Manual trigger")}
              isEscalated={isEscalated}
              turns={turns}
              currentStepIndex={currentStepIndex}
              onCustomerResponse={handleCustomerResponse}
              language={language}
              onToggleLanguage={setLanguage}
            />
          </div>

          {/* Middle: Simulated Mobile Handset Biometric App (3 cols) */}
          <div className="lg:col-span-3">
            <MobileAppSimulator
              incident={selectedIncident}
              isPushActive={isPushActive}
              isPushApproved={isPushApproved}
              onApprovePush={handleApprovePush}
              onRejectPush={handleRejectPush}
            />
          </div>

          {/* Right: Core Banking Enclave & Human Approval Gate (3 cols) */}
          <div className="lg:col-span-3">
            <CoreBankingEnclave
              incident={selectedIncident}
              cardStatus={cardStatus}
              isEscalated={isEscalated}
              onExecuteHumanAction={handleExecuteHumanAction}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <AuditTelemetryModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        auditRecords={auditRecords}
      />

      <IdeaCanvasModal
        isOpen={isCanvasModalOpen}
        onClose={() => setIsCanvasModalOpen(false)}
      />
    </div>
  );
}
