"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const areaClasses = [
  "col-start-2 col-end-3 row-start-1 row-end-3", // .div1
  "col-start-1 col-end-2 row-start-2 row-end-4", // .div2
  "col-start-1 col-end-2 row-start-4 row-end-6", // .div3
  "col-start-2 col-end-3 row-start-3 row-end-5", // .div4
]

export const GalleryGrid = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4",
        className
      )}
      {...props}
    />
  )
})
GalleryGrid.displayName = "GalleryGrid"

export const GalleryGridCell = React.forwardRef(
  ({ className, transition, index, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          delay: index * 0.2,
          delayChildren: transition?.delayChildren ?? 0.2,
        }}
        className={cn(
          "relative overflow-hidden rounded-xl shadow-xl",
          areaClasses[index],
          className
        )}
        {...props}
      />
    )
  }
)
GalleryGridCell.displayName = "GalleryGridCell"
