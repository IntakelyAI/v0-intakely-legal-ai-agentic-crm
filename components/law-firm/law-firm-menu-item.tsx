"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MenuOption {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

interface LawFirmMenuItemProps {
  icon: React.ReactNode
  label: string
  description?: string
  options: MenuOption[]
}

export function LawFirmMenuItem({ icon, label, description, options }: LawFirmMenuItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [isExpanded, options])

  return (
    <div className="border-b border-[#1e1e2a] last:border-b-0">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="text-purple-500 h-5 w-5 flex items-center justify-center">{icon}</div>
          <span className="text-white font-medium">{label}</span>
        </div>
        <ChevronDown
          className={cn("h-4 w-4 text-gray-400 transition-transform duration-200", isExpanded ? "rotate-180" : "")}
        />
      </div>

      {description && isExpanded && <div className="px-4 pb-2 text-sm text-gray-400">{description}</div>}

      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-200",
          isExpanded ? "max-h-[400px] overflow-y-auto" : "max-h-0",
        )}
      >
        <div className="px-4 pb-3">
          <Button
            variant="outline"
            size="sm"
            className="mb-3 bg-[#1e1e2a] border-[#2e2e3a] hover:bg-[#2a2a3a] text-white w-full justify-start"
          >
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>

          <div className="space-y-1">
            {options.map((option) => (
              <Link
                key={option.id}
                href={option.href}
                className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-[#1e1e2a] hover:text-white transition-colors"
              >
                <div className="text-gray-400 h-4 w-4 flex items-center justify-center">{option.icon}</div>
                <span>{option.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
