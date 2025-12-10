"use client"

import React from "react"
import ProfileHeader from "./ProfileHeader"
import MenuItem from "./MenuItem"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <ProfileHeader />

        <div className="space-y-2">
          <MenuItem href="/profile/favorites" title="My Favorites" subtitle="Saved movies and shows" />
          <MenuItem href="/profile/history" title="Watch History" subtitle="Continue where you left off" />
          <MenuItem href="/profile/settings" title="Settings" subtitle="Account & preferences" />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Watch History</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {/* Placeholder thumbnails - these could be replaced with real history items */}
            <div className="w-28 h-40 bg-neutral-900 rounded-lg" />
            <div className="w-28 h-40 bg-neutral-900 rounded-lg" />
            <div className="w-28 h-40 bg-neutral-900 rounded-lg" />
            <div className="w-28 h-40 bg-neutral-900 rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  )
}
