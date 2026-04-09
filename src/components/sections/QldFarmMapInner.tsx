'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { FarmMarker } from '@/content/types'

export interface QldFarmMapInnerProps {
  markers: FarmMarker[]
  interactionDisabled?: boolean
  className?: string
}

export default function QldFarmMapInner({
  markers,
  interactionDisabled = false,
  className,
}: QldFarmMapInnerProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!token) {
    return (
      <div
        className={[
          'w-full h-[340px] md:h-[520px] rounded-xl border border-parchment-deep bg-parchment-warm flex items-center justify-center',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <p className="font-heading text-[12px] text-dust uppercase tracking-[0.12em]">
          Map unavailable — NEXT_PUBLIC_MAPBOX_TOKEN not set
        </p>
      </div>
    )
  }

  const active = markers.find((m) => m.id === activeId) ?? null

  return (
    <div
      className={[
        'relative w-full h-[340px] md:h-[520px] rounded-xl overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: 145.5,
          latitude: -18.5,
          zoom: 6,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        dragPan={!interactionDisabled}
        scrollZoom={!interactionDisabled}
        doubleClickZoom={!interactionDisabled}
        touchZoomRotate={!interactionDisabled}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="center"
          >
            <button
              type="button"
              onClick={() => setActiveId(marker.id)}
              aria-label={`${marker.label} — ${marker.crops}`}
              className="w-3 h-3 rounded-full bg-crimson ring-2 ring-harvest-gold ring-offset-0 hover:scale-125 transition-transform focus-visible:outline-none focus-visible:ring-4"
            />
          </Marker>
        ))}
      </Map>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm bg-parchment-cool border border-parchment-deep rounded-lg p-5 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <p className="font-heading font-semibold text-[16px] text-ink">
                {active.label}
              </p>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close region details"
                className="font-heading text-[11px] text-dust hover:text-crimson"
              >
                Close
              </button>
            </div>
            <p className="font-heading text-[10px] uppercase tracking-[0.14em] text-crimson mb-2">
              {active.crops} · {active.hectares}
            </p>
            <p className="font-body text-[13px] text-ink-mid leading-[1.6]">
              {active.note}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
