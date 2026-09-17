export type ActionType = 'AUTO_REPLY' | 'ESCALATE';

export type IntentId =
  | 'BATTERY_POWER_HARDWARE'
  | 'APPLE_ID_ACCOUNT_SECURITY'
  | 'IOS_UPDATE_CRASHES'
  | 'AUDIO_BLUETOOTH_CONNECTIVITY'
  | 'APPSTORE_BILLING_REFUNDS'
  | 'ICLOUD_STORAGE_SYNC';

export interface IntentCategory {
  id: IntentId;
  name: string;
  tag: string;
  description: string;
  keywords: string[];
  historicalVolumePct: number;
  sampleTweet: string;
  canonicalResolution: string;
  escalationRatePct: number;
}

export interface GroundedContextPair {
  id: string;
  customerQuery: string;
  officialReply: string;
  similarityScore: number;
  sourceUrl?: string;
  keyResolutionPoints: string[];
}

export interface AgentResponse {
  intent: IntentId;
  intentName: string;
  reply: string;
  action: ActionType;
  escalation_reason: string | null;
  confidence: number;
  sentiment_score: number; // -1.0 (very negative) to +1.0 (positive)
  rule_triggered: string;
  retrieved_context?: GroundedContextPair[];
  stage_latencies_ms: {
    intent_classification: number;
    rag_retrieval: number;
    reply_generation: number;
    escalation_decision: number;
    total: number;
  };
}

export type SamplingCategory = 'routine' | 'escalation_trigger' | 'ambiguous' | 'edge_case';

export interface GoldenSample {
  tweet_id: string;
  incoming_text: string;
  gold_intent: IntentId;
  gold_action: ActionType;
  gold_reply_key_points: string;
  sampling_reason: string;
  sample_category: SamplingCategory;
  sentiment_label?: 'positive' | 'neutral' | 'negative' | 'hostile';
}

export interface CalibrationItem {
  id: number;
  tweet_id: string;
  incoming_text: string;
  human_score: number; // 1 to 5
  llm_score: number;   // 1 to 5
  human_action: ActionType;
  llm_action: ActionType;
  groundedness_score: number;
  brand_tone_score: number;
  correctness_score: number;
  helpfulness_score: number;
  notes: string;
}

export interface BaselineComparison {
  name: string;
  description: string;
  accuracy: number;
  macroF1: number;
  actionF1: number;
  bleu4: number;
  rougeL: number;
  semanticSimilarity: number;
  avgJudgeScore: number; // out of 5
  avgLatencyMs: number;
  costPer1kTokens: string;
}

export interface FailureModeCase {
  id: string;
  title: string;
  category: string;
  tweetExample: string;
  actualModelOutput: {
    intent: string;
    action: ActionType;
    reply: string;
  };
  expectedGoldOutput: {
    intent: string;
    action: ActionType;
    rationale: string;
  };
  rootCauseHypothesis: string;
  concreteMitigation: string;
  impactSeverity: 'Critical' | 'High' | 'Medium';
}

export interface DecisionLogEntry {
  id: number;
  decision: string;
  alternativesConsidered: string[];
  chosenApproach: string;
  tradeOffAccepted: string;
  productionImpact: string;
}
