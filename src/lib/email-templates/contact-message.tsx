import React from "react";
import { Body, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  email?: string;
  message?: string;
}

function Customer(p: Props) {
  return (
    <Html lang="ro">
      <Head />
      <Preview>Am primit mesajul tău — DCO Rent a Car Cluj</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading>DCO Rent a Car Cluj</Heading>
          <Text>Bună, {p.name}!</Text>
          <Text>Am primit mesajul tău și îți răspundem pe acest e-mail.</Text>
          <Text>{p.message}</Text>
          <Text>
            <Link href="tel:+40742925934">(0742) 925 934</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Owner(p: Props) {
  return (
    <Html lang="ro">
      <Head />
      <Preview>Mesaj nou de pe site</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading>Mesaj nou — DCO Rent a Car</Heading>
          <Text>Nume: {p.name}</Text>
          <Text>E-mail: {p.email}</Text>
          <Text>{p.message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: Customer,
  subject: "Am primit mesajul tău | DCO Rent a Car Cluj",
  displayName: "Confirmare mesaj de contact",
} satisfies TemplateEntry;

export const ownerTemplate = {
  component: Owner,
  subject: "Mesaj nou de pe site | DCO Rent a Car Cluj",
  displayName: "Mesaj de contact pentru proprietar",
  to: "Ovidiu_danciu@yahoo.com",
} satisfies TemplateEntry;

const body = { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" };
const container = { maxWidth: "560px", padding: "24px" };
