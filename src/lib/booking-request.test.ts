import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bookingRequestSchema } from './booking-request';
const valid = { vehicle_id: '00000000-0000-4000-8000-000000000001', customer_name: 'Client', customer_email: 'client@example.com', customer_phone: '+40742925934', start_date: '2099-01-02', start_time: '10:00', end_date: '2099-01-03', end_time: '11:00', pickup_location: 'Gilău', note: '' };
test('accepts a vehicle, dates, hours and customer email', () => assert.equal(bookingRequestSchema.parse(valid).start_time, '10:00'));
test('rejects return before pickup', () => assert.equal(bookingRequestSchema.safeParse({ ...valid, end_date: '2099-01-02', end_time: '09:00' }).success, false));
test('rejects past pickup', () => assert.equal(bookingRequestSchema.safeParse({ ...valid, start_date: '2020-01-01' }).success, false));
test('rejects invalid email', () => assert.equal(bookingRequestSchema.safeParse({ ...valid, customer_email: 'not-an-email' }).success, false));