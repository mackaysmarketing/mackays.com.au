'use client'

import dynamic from 'next/dynamic'
import type { QldFarmMapInnerProps } from './QldFarmMapInner'

const QldFarmMapInner = dynamic(() => import('./QldFarmMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[340px] md:h-[520px] rounded-xl bg-parchment-warm animate-pulse" />
  ),
})

export type QldFarmMapProps = QldFarmMapInnerProps

export function QldFarmMap(props: QldFarmMapProps) {
  return <QldFarmMapInner {...props} />
}
