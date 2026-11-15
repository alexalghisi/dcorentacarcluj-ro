import { createServerFn } from '@tanstack/react-start';
import { bookingRequestSchema } from './booking-request';

export const submitBookingRequest = createServerFn({ method: 'POST' })
  .inputValidator(input => bookingRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin: db } = await import('@/integrations/supabase/client.server');
    const { data: vehicle } = await db.from('vehicles').select('id,name').eq('id', data.vehicle_id).eq('is_active', true).maybeSingle();
    if (!vehicle) return { ok: false as const, error: 'Mașina nu mai este disponibilă în flotă.' };
    const { data: busy, error: busyError } = await db.from('vehicle_bookings').select('id').eq('vehicle_id', vehicle.id).lte('start_date', data.end_date).gte('end_date', data.start_date).limit(1);
    if (busyError) return { ok: false as const, error: 'Nu putem verifica disponibilitatea. Încearcă din nou.' };
    if (busy?.length) return { ok: false as const, error: 'Mașina este rezervată în perioada aleasă. Alege altă perioadă sau altă mașină.' };
    const { data: request, error } = await db.from('booking_requests').insert(data).select('id').single();
    if (error || !request) return { ok: false as const, error: error?.message.includes('booking_rate_limit') ? 'Ai trimis mai multe cereri. Încearcă mai târziu sau sună-ne.' : 'Cererea nu a fost salvată. Verifică perioada și încearcă din nou.' };
    const { sendTemplateEmail } = await import('@/lib/email-templates/send-email');
    const templateData = { name: data.customer_name, vehicle: vehicle.name, start: `${data.start_date} ${data.start_time}`, end: `${data.end_date} ${data.end_time}`, pickup: data.pickup_location, reference: request.id, email: data.customer_email, phone: data.customer_phone, note: data.note };
    const send = async (name: string, recipient: string) => {
      try { return (await sendTemplateEmail(name, recipient, { templateData, idempotencyKey: `${name}-${request.id}` })).sent; }
      catch { return false; }
    };
    const [customerEmailSent, ownerEmailSent] = await Promise.all([send('booking-request', data.customer_email), send('booking-request-owner', '')]);
    return { ok: true as const, reference: request.id, customerEmailSent, ownerEmailSent };
  });

export const adminBookingRequests = createServerFn({ method: 'GET' }).handler(async () => {
  const { requireAdmin } = await import('@/lib/admin.server');
  await requireAdmin();
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data, error } = await supabaseAdmin.from('booking_requests').select('*').order('created_at', { ascending: false }).limit(100);
  if (error) throw new Error('Nu putem încărca solicitările.');
  return data ?? [];
});