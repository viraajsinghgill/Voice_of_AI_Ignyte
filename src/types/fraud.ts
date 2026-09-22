export type FraudRiskLevel = "CRITICAL" | "HIGH" | "MEDIUM";

export type CardStatus = "ACTIVE" | "TEMP_LOCKED" | "PERMANENTLY_CANCELLED";

export type LanguageCode = "en" | "ar";

export interface FraudIncident {
  id: string;
  customerName: string;
  customerPhone: string;
  cardLastFour: string;
  cardToken: string;
  accountNumber: string;
  merchantName: string;
  merchantCategory: string;
  amount: number;
  currency: string;
  timestamp: string;
  location: string;
  riskScore: number; // 0 to 1000 (FICO Falcon)
  riskLevel: FraudRiskLevel;
  fraudType: string;
  deviceFingerprint: string;
}

export interface CallStep {
  stepNumber: number;
  title: string;
  description: string;
  status: "pending" | "active" | "completed" | "failed";
  timestamp?: string;
  isHumanGate?: boolean;
}

export interface ConversationTurn {
  id: string;
  speaker: "agent" | "customer" | "system";
  text: string;
  textAr?: string;
  timestamp: string;
  audioUrl?: string;
  toolCall?: {
    name: string;
    params: Record<string, any>;
    result?: Record<string, any>;
  };
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  eventType: string;
  actor: string;
  details: string;
  hash: string;
  status: "verified" | "flagged";
}
