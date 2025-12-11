"use client"

import React from "react"
import MenuItem from "../../MenuItem"

export default function PrivacySettingsPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Privacy</h1>
        <div className="space-y-2">
          <MenuItem href="/profile/settings/privacy/sharing" title="Sharing" subtitle="Manage profile sharing" />
          <MenuItem href="/profile/settings/privacy/blocklist" title="Blocklist" subtitle="Blocked users" />
        </div>
      </div>
    </main>
  )
}
