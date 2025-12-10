"use client"

import React from "react"
import Link from "next/link"

interface Props {
  href: string
  title: string
  subtitle?: string
}

export default function MenuItem({ href, title, subtitle }: Props) {
  return (
    <Link href={href} className="block">
      <div className="bg-neutral-900/40 rounded-lg p-3 flex items-center justify-between hover:bg-neutral-900/60 transition">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-white/60">{subtitle}</div>}
        </div>
        <div className="text-white/50">›</div>
      </div>
    </Link>
  )
}
