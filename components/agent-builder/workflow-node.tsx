"use client"

import type React from "react"

import type { WorkflowNode } from "@/types/workflow"

interface NodeComponentProps {
  node: WorkflowNode
  isSelected: boolean
  onSelect: () => void
  onDragStart: (node: WorkflowNode, e: React.MouseEvent) => void
}

export default function NodeComponent({ node, isSelected, onSelect, onDragStart }: NodeComponentProps) {
  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case "trigger":
        return "bg-blue-600"
      case "action":
        return "bg-purple-600"
      case "condition":
        return "bg-yellow-600"
      case "output":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div
      className={`absolute flex flex-col rounded-md border ${
        isSelected ? "border-purple-500" : "border-gray-700"
      } bg-gray-800 shadow-lg transition-shadow hover:shadow-xl`}
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        width: "200px",
        zIndex: isSelected ? 10 : 1,
      }}
      onClick={onSelect}
      onMouseDown={(e) => onDragStart(node, e)}
    >
      <div
        className={`flex cursor-move items-center justify-between rounded-t-md px-3 py-2 ${getNodeTypeColor(node.type)}`}
      >
        <span className="text-sm font-medium text-white">{node.type.charAt(0).toUpperCase() + node.type.slice(1)}</span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-white">{node.label}</h3>
        {node.description && <p className="mt-1 text-xs text-gray-400">{node.description}</p>}
      </div>
    </div>
  )
}
