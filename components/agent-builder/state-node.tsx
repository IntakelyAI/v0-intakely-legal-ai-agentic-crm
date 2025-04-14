"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { WorkflowState } from "@/types/agent"

interface StateNodeProps {
  state: WorkflowState
  isSelected: boolean
  onSelect: () => void
}

export default function StateNode({ state, isSelected, onSelect }: StateNodeProps) {
  const [position, setPosition] = useState(state.position)
  const [isDragging, setIsDragging] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect()
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      setIsDragging(true)
      onSelect()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && nodeRef.current) {
      const parentRect = nodeRef.current.parentElement?.getBoundingClientRect()
      if (parentRect) {
        const x = e.clientX - parentRect.left - dragOffset.current.x
        const y = e.clientY - parentRect.top - dragOffset.current.y
        setPosition({ x, y })
        state.position = { x, y }
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add event listeners for mouse move and up
  useState(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const getStateColor = () => {
    switch (state.type) {
      case "trigger":
        return "bg-blue-600"
      case "action":
        return "bg-green-600"
      case "condition":
        return "bg-yellow-600"
      case "end":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div
      ref={nodeRef}
      className={`absolute cursor-move rounded-md border ${
        isSelected ? "border-purple-500" : "border-[#1e1e2a]"
      } bg-[#13131a] shadow-lg transition-shadow hover:shadow-xl`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "200px",
        zIndex: isSelected ? 10 : 1,
      }}
      onClick={onSelect}
      onMouseDown={handleMouseDown}
    >
      <div className={`flex items-center justify-between rounded-t-md px-3 py-2 ${getStateColor()}`}>
        <span className="text-sm font-medium text-white">{state.name}</span>
      </div>
      <div className="p-3">
        <div className="text-xs text-gray-400">{state.type}</div>
      </div>
    </div>
  )
}
