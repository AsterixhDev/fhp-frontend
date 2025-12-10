"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className={`inline-flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${className ?? ""}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm">Back</span>
    </button>
  )
}
