'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTACT } from '@/content'
import {
  contactSchema,
  type ContactFormValues,
} from '@/lib/contact-schema'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const INPUT_CLASS =
  'bg-parchment border border-parchment-deep rounded-[var(--radius-md)] px-4 py-3 font-body text-[14px] text-ink placeholder:text-dust focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all w-full'

const LABEL_CLASS =
  'font-heading text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-mid block mb-2'

const ERROR_CLASS = 'text-crimson font-body text-[12px] mt-1'

export function ContactForm() {
  const form = CONTACT.form
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    if (status === 'submitting') return
    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        setStatus('error')
        return
      }
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <h2 className="font-heading font-bold text-[22px] tracking-[-0.02em] text-ink mb-6">
        {form.heading}
      </h2>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            className="bg-harvest-gold border-l-4 border-crimson rounded-[var(--radius-md)] p-6 flex gap-4 items-start"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2
              className="w-6 h-6 text-crimson shrink-0"
              aria-hidden
            />
            <div>
              <p className="font-heading font-bold text-[16px] text-ink mb-1">
                {form.successHeading}
              </p>
              <p className="font-body text-[14px] text-ink-mid">
                {form.successBody}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className={LABEL_CLASS}>
                  {form.labels.name} *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder={form.placeholders.name}
                  autoComplete="name"
                  className={INPUT_CLASS}
                  aria-invalid={Boolean(errors.name) || undefined}
                  {...register('name')}
                />
                {errors.name && (
                  <p className={ERROR_CLASS}>{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-company" className={LABEL_CLASS}>
                  {form.labels.company}
                </label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder={form.placeholders.company}
                  autoComplete="organization"
                  className={INPUT_CLASS}
                  {...register('company')}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className={LABEL_CLASS}>
                  {form.labels.email} *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={form.placeholders.email}
                  autoComplete="email"
                  className={INPUT_CLASS}
                  aria-invalid={Boolean(errors.email) || undefined}
                  {...register('email')}
                />
                {errors.email && (
                  <p className={ERROR_CLASS}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-phone" className={LABEL_CLASS}>
                  {form.labels.phone}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder={form.placeholders.phone}
                  autoComplete="tel"
                  className={INPUT_CLASS}
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-enquiry" className={LABEL_CLASS}>
                {form.labels.enquiryType} *
              </label>
              <select
                id="contact-enquiry"
                className={INPUT_CLASS}
                defaultValue=""
                aria-invalid={Boolean(errors.enquiryType) || undefined}
                {...register('enquiryType')}
              >
                <option value="" disabled>
                  {form.placeholders.enquiryTypePlaceholder}
                </option>
                {form.enquiryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.enquiryType && (
                <p className={ERROR_CLASS}>{errors.enquiryType.message}</p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className={LABEL_CLASS}>
                {form.labels.message} *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder={form.placeholders.message}
                className={`${INPUT_CLASS} resize-y`}
                aria-invalid={Boolean(errors.message) || undefined}
                {...register('message')}
              />
              {errors.message && (
                <p className={ERROR_CLASS}>{errors.message.message}</p>
              )}
            </div>

            {status === 'error' && (
              <p
                className="mt-5 border-l-4 border-crimson bg-crimson-pale px-4 py-3 font-body text-[13px] text-crimson-dark"
                role="alert"
              >
                {form.errorBody}
              </p>
            )}

            <div className="mt-8">
              {(() => {
                const busy = isSubmitting || status === 'submitting'
                return (
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={busy}
                    aria-busy={busy}
                    className="w-full md:w-auto"
                  >
                    {busy ? form.submittingLabel : form.submitLabel}
                  </Button>
                )
              })()}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
