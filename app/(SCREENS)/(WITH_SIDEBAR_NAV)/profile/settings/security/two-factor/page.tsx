"use client"

import React from "react"

export default function SecurityTwoFactorPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
        <div className="space-y-3">
          <div className="bg-neutral-900/40 rounded-lg p-3">Authenticator app</div>
          <div className="bg-neutral-900/40 rounded-lg p-3">Backup codes</div>
          <div className="bg-neutral-900/40 rounded-lg p-3">SMS verification</div>
        </div>
      </div>
    </main>
  )
}
