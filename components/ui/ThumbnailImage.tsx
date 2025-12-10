"use client"

import React, { useState } from "react"
import Image, { ImageProps } from "next/image"

type Props = Omit<ImageProps, "src"> & {
  src?: string|null;
  fallback?: React.ReactNode
}

export default function ThumbnailImage({ src, alt, className, width, height, fallback, ...rest }: Props) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div
        aria-label={alt}
        className={className}
        style={{ width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height }}
      >
        {fallback ?? <div className="size-full bg-black" />}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width as number}
      height={height as number}
      unoptimized
      onError={() => setError(true)}
      {...rest}
    />
  )
}
