"use client"

import React from "react"
import { User } from "@/lib/movie-structure/types"
import ThumbnailImage from "@/components/ui/ThumbnailImage"

interface Props {
  user?: Partial<User>
}

export default function ProfileHeader({ user }: Props) {
  return (
    <div className="bg-neutral-900/40 rounded-xl p-4 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden">
        <ThumbnailImage src={user?.avatar_url || undefined} alt={`${user?.name || "Profile"}`} width={64} height={64} className="w-full h-full object-cover" fallback={<div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white">PP</div>} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{user?.name ?? "Peter Paul"}</h2>
          <span className="text-xs text-white/60">ID: 63820170</span>
        </div>
        <p className="text-sm text-white/60">Member since 2023</p>
      </div>
    </div>
  )
}
