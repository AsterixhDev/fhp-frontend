"use client"

import React from "react"

export default function PrivacyBlocklistPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Blocklist</h1>
        <div className="space-y-3">
          <div className="bg-neutral-900/40 rounded-lg p-3">Blocked users</div>
          <div className="bg-neutral-900/40 rounded-lg p-3">Blocked keywords</div>
        </div>
      </div>
    </main>
  )
}
