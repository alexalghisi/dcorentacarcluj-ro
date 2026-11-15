import React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text, Link } from '@react-email/components';
import type { TemplateEntry } from './registry';
interface Props { name?: string; vehicle?: string; start?: string; end?: string; pickup?: string; reference?: string; email?: string; phone?: string; note?: string }
function Details(p: Props) {
  return <><Text>Mașină: {p.vehicle}</Text><Text>Preluare: {p.start}</Text><Text>Returnare: {p.end}</Text><Text>Loc solicitat: {p.pickup}</Text><Text>Referință: {p.reference}</Text></>;
}
function Customer(p: Props) {
  return <Html lang="ro"><Head /><Preview>Am primit cererea ta de rezervare — DCO Rent a Car Cluj</Preview><Body style={body}><Container style={container}><Heading>DCO Rent a Car Cluj</Heading><Text>Bună, {p.name}!</Text><Text>Am primit cererea ta de rezervare.</Text><Details {...p} /><Text>Acest e-mail confirmă primirea cererii. Disponibilitatea, tariful final și punctul de predare se confirmă separat de echipa DCO.</Text><Text><Link href="tel:+40742925934">(0742) 925 934</Link></Text></Container></Body></Html>;
}
function Owner(p: Props) {
  return <Html lang="ro"><Head /><Preview>Cerere nouă de rezervare</Preview><Body style={body}><Container style={container}><Heading>Cerere nouă — DCO Rent a Car</Heading><Details {...p} /><Text>Client: {p.name}</Text><Text>E-mail: {p.email}</Text><Text>Telefon: {p.phone}</Text><Text>Observații: {p.note || '—'}</Text><Text><Link href="https://dcorentacarcluj.ro/admin">Deschide administrarea</Link></Text></Container></Body></Html>;
}
export const template = { component: Customer, subject: 'Am primit cererea ta de rezervare | DCO Rent a Car Cluj', displayName: 'Primire cerere rezervare' } satisfies TemplateEntry;
export const ownerTemplate = { component: Owner, subject: 'Cerere nouă de rezervare | DCO Rent a Car Cluj', displayName: 'Solicitare pentru proprietar', to: 'Ovidiu_danciu@yahoo.com' } satisfies TemplateEntry;
const body = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' };
const container = { maxWidth: '560px', padding: '24px' };