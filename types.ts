
export interface SummaryResult {
  overallSummary: string;
  keyFindings: string[];
  phageDisplaySection: string;
  methodology: string;
  conclusions: string;
}

export enum ProcessingStatus {
  IDLE = 'IDLE',
  READING_PDF = 'READING_PDF',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface AppState {
  status: ProcessingStatus;
  result: SummaryResult | null;
  error: string | null;
  fileName: string | null;
}
