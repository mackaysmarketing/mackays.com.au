'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { WorkOpportunity } from '@/content/types'

export interface OpportunitiesAccordionProps {
  opportunities: WorkOpportunity[]
  applyLabel: string
}

export function OpportunitiesAccordion({
  opportunities,
  applyLabel,
}: OpportunitiesAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3 mt-12">
      {opportunities.map((opportunity, index) => {
        const value = `opportunity-${index}`
        return (
          <Accordion.Item
            key={value}
            value={value}
            className="bg-parchment-cool rounded-xl border border-parchment-deep overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className="group w-full flex justify-between items-center py-5 px-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-parchment"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-heading font-semibold text-[15px] text-ink leading-snug">
                    {opportunity.title}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 mr-4">
                  <Badge variant="neutral" label={opportunity.location} />
                  <Badge variant="gold" label={opportunity.type} />
                </div>
                <ChevronDown
                  className="w-5 h-5 text-dust shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 pb-6 pt-2">
              <div className="flex md:hidden items-center gap-2 mb-4">
                <Badge variant="neutral" label={opportunity.location} />
                <Badge variant="gold" label={opportunity.type} />
              </div>
              <p className="font-body text-[14px] text-ink-mid leading-[1.7] mb-6">
                {opportunity.responsibilities}
              </p>
              <Button
                variant="gold"
                size="md"
                href={opportunity.applyHref}
              >
                {applyLabel} →
              </Button>
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}
