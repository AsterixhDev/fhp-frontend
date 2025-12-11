"use client"

import React from "react"
import MenuItem from "../../MenuItem"

export default function NotificationsSettingsPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="space-y-2">
          <MenuItem href="/profile/settings/notifications/email" title="Email" subtitle="Manage email alerts" />
          <MenuItem href="/profile/settings/notifications/push" title="Push" subtitle="Mobile and in-app" />
        </div>
      </div>
    </main>
  )
}
