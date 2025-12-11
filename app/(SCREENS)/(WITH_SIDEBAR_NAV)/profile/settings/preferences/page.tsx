"use client"

import React from "react"
import MenuItem from "../../MenuItem"

export default function PreferencesSettingsPage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Preferences</h1>
        <div className="space-y-2">
          <MenuItem href="/profile/settings/preferences/appearance" title="Appearance" subtitle="Theme and UI density" />
          <MenuItem href="/profile/settings/preferences/language" title="Language" subtitle="Content and UI language" />
          <MenuItem href="/profile/settings/preferences/playback" title="Playback" subtitle="Streaming quality and captions" />
          <MenuItem href="/profile/settings/preferences/downloads" title="Downloads" subtitle="Storage and quality" />
        </div>
      </div>
    </main>
  )
}
