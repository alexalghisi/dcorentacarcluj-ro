import type { ComponentType } from 'react'

import { template as syncAlertTemplate } from './sync-alert'
import { template as bookingTemplate, ownerTemplate } from './booking-request'

export interface TemplateEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each template has its own props
  component: ComponentType<any>
  subject: string | ((data: Record<string, unknown>) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 *
 * Example:
 *   import { template as welcomeTemplate } from './welcome'
 *   // then add to TEMPLATES: 'welcome': welcomeTemplate
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'booking-request': bookingTemplate,
  'booking-request-owner': ownerTemplate,
  'sync-alert': syncAlertTemplate,
}
