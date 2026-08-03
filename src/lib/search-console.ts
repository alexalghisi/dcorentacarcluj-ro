export interface SearchConsoleRow {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchConsoleStats {
  available: boolean;
  message?: string;
  property?: string;
  startDate?: string;
  endDate?: string;
  totals?: { clicks: number; impressions: number; ctr: number; position: number };
  queries?: SearchConsoleRow[];
  pages?: SearchConsoleRow[];
}
