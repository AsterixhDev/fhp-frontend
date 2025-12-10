"use client"

import React from "react"

export default function HistoryPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Watch History</h1>
        <p className="text-white/60 mb-6">Your recently watched titles will appear here.</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-neutral-900 rounded-lg" />
          <div className="h-40 bg-neutral-900 rounded-lg" />
          <div className="h-40 bg-neutral-900 rounded-lg" />
          <div className="h-40 bg-neutral-900 rounded-lg" />
        </div>
      </div>
    </main>
  )
}
