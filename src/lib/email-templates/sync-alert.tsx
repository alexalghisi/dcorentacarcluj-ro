import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import type { TemplateEntry } from "./registry";

interface Props {
  reason?: string;
  ranAt?: string;
  found?: number;
  sourceUrl?: string;
}

const Email = ({ reason, ranAt, found, sourceUrl }: Props) => (
  <Html lang="ro" dir="ltr">
    <Head />
    <Preview>Sincronizarea flotei de pe OLX a eșuat</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Sincronizare OLX eșuată</Heading>
        <Text style={text}>
          Sincronizarea automată a flotei pentru dcorentacarcluj.ro nu a reușit să extragă
          date din anunțul sursă.
        </Text>
        <Section style={box}>
          <Text style={label}>Motiv</Text>
          <Text style={value}>{reason || "Eroare necunoscută"}</Text>
          <Hr style={hr} />
          <Text style={label}>Moment</Text>
          <Text style={value}>{ranAt || new Date().toISOString()}</Text>
          <Hr style={hr} />
          <Text style={label}>Mașini găsite</Text>
          <Text style={value}>{typeof found === "number" ? String(found) : "0"}</Text>
        </Section>
        <Text style={text}>
          Flota afișată pe site rămâne neschimbată (ultimele date valide), deci vizitatorii
          nu văd erori. Verifică anunțul sursă:
        </Text>
        <Text style={text}>
          <Link href={sourceUrl || "https://www.olx.ro/"} style={link}>
            {sourceUrl || "https://www.olx.ro/"}
          </Link>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Alertă automată — DCO Rent a Car Cluj</Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: "⚠️ Sincronizarea OLX a eșuat — DCO Rent a Car Cluj",
  displayName: "Alertă sincronizare OLX",
  previewData: {
    reason: "Nu s-au putut extrage date din pagina OLX (0 mașini găsite).",
    ranAt: new Date().toISOString(),
    found: 0,
    sourceUrl: "https://www.olx.ro/",
  },
  to: "Ovidiu_danciu@yahoo.com",
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" };
const container = { padding: "24px", maxWidth: "560px" };
const h1 = { color: "#0f172a", fontSize: "22px", margin: "0 0 12px" };
const text = { color: "#334155", fontSize: "15px", lineHeight: "24px" };
const box = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "16px 18px",
  margin: "18px 0",
};
const label = {
  color: "#64748b",
  fontSize: "11px",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  margin: "0",
};
const value = { color: "#0f172a", fontSize: "15px", margin: "2px 0 0", fontWeight: 600 };
const hr = { borderColor: "#e2e8f0", margin: "12px 0" };
const link = { color: "#f59e0b" };
const footer = { color: "#94a3b8", fontSize: "12px" };
