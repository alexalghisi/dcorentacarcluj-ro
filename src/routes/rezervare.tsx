import { useState, type FormEvent } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { CalendarDays, CheckCircle2, ArrowLeft, Loader2, Send } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { getPublicVehicles, getBusyRanges } from '@/lib/admin.functions';
import { submitBookingRequest } from '@/lib/booking-request.functions';
import { bookingRequestSchema, bucharestNow } from '@/lib/booking-request';
import { conflictsFor } from '@/lib/bookings';
import { publicVehicleImageSrc } from '@/lib/vehicles';
import { PrivateVehiclePhoto } from '@/components/PrivateVehiclePhoto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { canonicalLinks } from '@/lib/seo';

const title = 'Rezervare mașină în Cluj | DCO Rent a Car';
const description = 'Solicită o rezervare DCO Rent a Car: alege mașina, datele și orele de preluare și returnare în Cluj, Florești sau Gilău. Confirmarea primirii cererii prin e-mail.';
export const Route = createFileRoute('/rezervare')({
  validateSearch: (input: Record<string, unknown>): { masina?: string } => typeof input.masina === 'string' ? { masina: input.masina } : {},
  loader: async () => { const [vehicles, busy] = await Promise.all([getPublicVehicles(), getBusyRanges()]); return { vehicles, busy }; },
  head: () => ({ meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }], links: canonicalLinks('/rezervare') }),
  component: BookingPage,
});

function DateField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button id={id} variant="outline" className="w-full justify-start font-normal"><CalendarDays className="h-4 w-4" />{value ? format(new Date(`${value}T12:00:00`), 'dd MMM yyyy', { locale: ro }) : 'Alege data'}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" locale={ro} selected={value ? new Date(`${value}T12:00:00`) : undefined} disabled={date => format(date, 'yyyy-MM-dd') < bucharestNow().slice(0, 10)} onSelect={date => { if (date) { onChange(format(date, 'yyyy-MM-dd')); setOpen(false); } }} className="pointer-events-auto p-3" /></PopoverContent></Popover></div>;
}
function BookingPage() {
  const { vehicles, busy } = Route.useLoaderData();
  const { masina } = Route.useSearch();
  const [vehicleId, setVehicleId] = useState(masina ?? '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ reference: string; customerEmailSent: boolean } | null>(null);
  const submit = useServerFn(submitBookingRequest);
  const vehicle = vehicles.find(v => v.id === vehicleId);
  const unavailable = !!(startDate && endDate && conflictsFor(busy, vehicleId, startDate, endDate).length);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = bookingRequestSchema.safeParse({ ...values, vehicle_id: vehicleId, start_date: startDate, end_date: endDate });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Verifică datele.'); return; }
    setSubmitting(true);
    try { const response = await submit({ data: parsed.data }); if (response.ok) setResult(response); else setError(response.error); }
    catch { setError('Nu am putut trimite cererea. Încearcă din nou sau sună la (0742) 925 934.'); }
    finally { setSubmitting(false); }
  }
  return <div className="min-h-screen bg-background"><header className="border-b border-border"><div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-5"><Link to="/" className="font-display text-sm font-bold">DCO RENT A CAR CLUJ</Link><Button variant="outline" asChild><Link to="/"><ArrowLeft className="h-4 w-4" /> Acasă</Link></Button></div></header><main className="mx-auto max-w-5xl px-5 py-9 sm:py-12"><h1 className="font-display text-3xl font-bold tracking-normal">Rezervă o mașină</h1><p className="mt-3 text-muted-foreground">Cluj-Napoca · Florești · Gilău</p>
    {result ? <section className="mt-10 max-w-2xl space-y-4" aria-live="polite"><CheckCircle2 className="h-10 w-10 text-primary" /><h2 className="text-2xl font-semibold">Cererea ta a fost primită</h2><p>{result.customerEmailSent ? 'Am trimis pe e-mail detaliile cererii.' : 'Cererea este salvată, dar e-mailul nu a putut fi trimis. Pentru detalii, sună la (0742) 925 934.'}</p><p className="text-muted-foreground">Disponibilitatea, tariful și locul de predare se confirmă separat cu echipa DCO.</p><p className="break-all text-sm text-muted-foreground">Referință: {result.reference}</p><Button asChild><Link to="/">Înapoi la mașini</Link></Button></section> : <div className="mt-9 grid gap-10 md:grid-cols-[minmax(0,1fr)_300px]"><form onSubmit={onSubmit} className="min-w-0 space-y-7"><div className="space-y-2"><Label htmlFor="vehicle">Mașina</Label><Select value={vehicleId} onValueChange={setVehicleId}><SelectTrigger id="vehicle" className="w-full"><SelectValue placeholder="Alege mașina" /></SelectTrigger><SelectContent>{vehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}</SelectContent></Select></div>
      <section className="space-y-4"><h2 className="text-lg font-semibold">Preluare</h2><div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3"><DateField id="start_date" label="Data preluării" value={startDate} onChange={setStartDate} /><div className="space-y-2"><Label htmlFor="start_time">Ora</Label><Input id="start_time" name="start_time" type="time" defaultValue="10:00" required /></div></div><Label htmlFor="pickup_location">Locul preluării</Label><Input id="pickup_location" name="pickup_location" placeholder="Gilău, Florești, Cluj-Napoca…" maxLength={200} required /></section>
      <section className="space-y-4"><h2 className="text-lg font-semibold">Returnare</h2><div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3"><DateField id="end_date" label="Data returnării" value={endDate} onChange={setEndDate} /><div className="space-y-2"><Label htmlFor="end_time">Ora</Label><Input id="end_time" name="end_time" type="time" defaultValue="10:00" required /></div></div></section>
      {unavailable && <p role="alert" className="text-sm text-destructive">Mașina este rezervată în această perioadă. Alege alte date sau altă mașină.</p>}
      <section className="space-y-4 border-t border-border pt-6"><h2 className="text-lg font-semibold">Date de contact</h2><div className="space-y-2"><Label htmlFor="customer_name">Nume și prenume</Label><Input id="customer_name" name="customer_name" autoComplete="name" maxLength={120} required /></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="customer_email">E-mail</Label><Input id="customer_email" name="customer_email" type="email" autoComplete="email" maxLength={255} required /></div><div className="space-y-2"><Label htmlFor="customer_phone">Telefon</Label><Input id="customer_phone" name="customer_phone" type="tel" autoComplete="tel" minLength={6} maxLength={40} required /></div></div><div className="space-y-2"><Label htmlFor="note">Observații (opțional)</Label><Textarea id="note" name="note" maxLength={600} /></div></section>
      <p className="text-sm leading-relaxed text-muted-foreground">Cererea nu constituie o rezervare definitivă. Tariful și disponibilitatea se confirmă separat. Datele sunt folosite pentru această solicitare, conform <Link to="/confidentialitate" className="text-primary underline">politicii de confidențialitate</Link>.</p>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit" disabled={submitting || unavailable || !vehicles.length} className="w-full sm:w-auto">{submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{submitting ? 'Se trimite…' : 'Trimite cererea de rezervare'}</Button></form>
      <aside className="min-w-0 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-7 md:pt-0">{vehicle ? <><PrivateVehiclePhoto src={publicVehicleImageSrc(vehicle.image_url)} alt={vehicle.name} className="aspect-[4/3] w-full" /><h2 className="mt-4 text-xl font-semibold">{vehicle.name}</h2><p className="mt-2 text-sm text-muted-foreground">{vehicle.seats} · {vehicle.transmission} · {vehicle.fuel}</p><p className="mt-3 font-semibold">{vehicle.price_label}</p></> : <h2 className="text-lg font-semibold">DCO Rent a Car Cluj</h2>}<p className="mt-5 text-sm text-muted-foreground">Prețul final depinde de mașină și de perioada solicitată.</p><a href="tel:+40742925934" className="mt-5 inline-block font-semibold text-primary">(0742) 925 934</a></aside></div>}
  </main><footer className="mt-8 border-t border-border px-5 py-6 text-center text-sm text-muted-foreground">DCO Rent a Car · Gilău · Cluj</footer></div>;
}