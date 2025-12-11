"use client"

import React from "react"
import MenuItem from "../MenuItem"

export default function SettingsPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="space-y-2">
          <MenuItem href="/profile/settings/account" title="Account" subtitle="Email, username, country" />
          <MenuItem href="/profile/settings/profile" title="Profile" subtitle="Name, avatar" />
          <MenuItem href="/profile/settings/privacy" title="Privacy" subtitle="Sharing, blocklist" />
          <MenuItem href="/profile/settings/security" title="Security" subtitle="Password, two-factor, sessions" />
          <MenuItem href="/profile/settings/notifications" title="Notifications" subtitle="Email and push settings" />
          <MenuItem href="/profile/settings/preferences" title="Preferences" subtitle="Appearance, language, playback, downloads" />
          <MenuItem href="/profile/settings/billing" title="Billing" subtitle="Plan and payments" />
          <MenuItem href="/profile/settings/parental-controls" title="Parental Controls" subtitle="Content restrictions" />
        </div>
      </div>
    </main>
  )
}
