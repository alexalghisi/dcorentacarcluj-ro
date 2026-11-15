import { z } from 'zod';

export function bucharestNow() {
  const parts = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Bucharest', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date());
  return parts.replace(' ', 'T');
}
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => {
  const parsed = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === v;
}, 'Data nu este validă.');
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Ora nu este validă.');
export const bookingRequestSchema = z.object({
  vehicle_id: z.string().uuid('Alege o mașină.'),
  customer_name: z.string().trim().min(1, 'Completează numele.').max(120),
  customer_email: z.string().trim().email('Completează un e-mail valid.').max(255).transform(v => v.toLowerCase()),
  customer_phone: z.string().trim().min(6).max(40).regex(/^[+\d\s().-]+$/, 'Completează un telefon valid.'),
  start_date: date, start_time: time, end_date: date, end_time: time,
  pickup_location: z.string().trim().min(1, 'Completează locul de preluare.').max(200),
  note: z.string().trim().max(600).default(''),
}).superRefine((v, ctx) => {
  const start = `${v.start_date}T${v.start_time}`;
  if (start <= bucharestNow()) ctx.addIssue({ code: 'custom', path: ['start_date'], message: 'Alege o dată și o oră viitoare pentru preluare.' });
  if (`${v.end_date}T${v.end_time}` <= start) ctx.addIssue({ code: 'custom', path: ['end_date'], message: 'Returnarea trebuie să fie după preluare.' });
});
export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;