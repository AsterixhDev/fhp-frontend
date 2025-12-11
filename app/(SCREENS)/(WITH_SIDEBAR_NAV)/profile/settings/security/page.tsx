"use client"

import React from "react"
import MenuItem from "../../MenuItem"

export default function SecuritySettingsPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Security</h1>
        <div className="space-y-2">
          <MenuItem href="/profile/settings/security/password" title="Password" subtitle="Change password" />
          <MenuItem href="/profile/settings/security/two-factor" title="Two-Factor" subtitle="Authentication methods" />
          <MenuItem href="/profile/settings/security/sessions" title="Sessions" subtitle="Active devices" />
        </div>
      </div>
    </main>
  )
}
