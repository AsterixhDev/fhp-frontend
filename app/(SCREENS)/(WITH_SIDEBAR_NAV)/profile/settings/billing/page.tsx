"use client"

import React from "react"

export default function BillingSettingsPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Billing</h1>
        <div className="space-y-3">
          <div className="bg-neutral-900/40 rounded-lg p-3">Current plan</div>
          <div className="bg-neutral-900/40 rounded-lg p-3">Payment methods</div>
          <div className="bg-neutral-900/40 rounded-lg p-3">Billing history</div>
        </div>
      </div>
    </main>
  )
}
