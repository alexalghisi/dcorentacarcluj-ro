export interface BookingRange {
  vehicle_id: string;
  start_date: string;
  end_date: string;
}

export interface Booking extends BookingRange {
  id: string;
  customer_name: string;
  customer_phone: string;
  note: string;
  status: "confirmed" | "option" | "blocked";
}

export interface BookingInput {
  id?: string | undefined;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  customer_name: string;
  customer_phone: string;
  note: string;
  status: "confirmed" | "option" | "blocked";
}

export const BOOKING_STATUS_LABELS: Record<Booking["status"], string> = {
  confirmed: "Confirmată",
  option: "Opțiune",
  blocked: "Blocată",
};

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Inclusive overlap between [aStart,aEnd] and [bStart,bEnd] (ISO yyyy-mm-dd). */
export function rangesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart <= bEnd && aEnd >= bStart;
}

/** Busy periods of one vehicle that clash with the requested interval. */
export function conflictsFor(
  ranges: BookingRange[],
  vehicleId: string | undefined,
  from: string,
  to: string,
): BookingRange[] {
  if (!vehicleId) return [];
  return ranges
    .filter((r) => r.vehicle_id === vehicleId && rangesOverlap(from, to, r.start_date, r.end_date))
    .sort((a, b) => a.start_date.localeCompare(b.start_date));
}

const fmt = new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "short" });

export function formatDateRo(iso: string): string {
  return fmt.format(new Date(`${iso}T00:00:00Z`));
}

export function formatRangeRo(start: string, end: string): string {
  return start === end ? formatDateRo(start) : `${formatDateRo(start)} – ${formatDateRo(end)}`;
}

/** First day the vehicle is free again after the given conflicts. */
export function freeAgainFrom(conflicts: BookingRange[]): string | null {
  if (conflicts.length === 0) return null;
  const last = conflicts.reduce((max, r) => (r.end_date > max ? r.end_date : max), conflicts[0]!.end_date);
  return addDaysISO(last, 1);
}
