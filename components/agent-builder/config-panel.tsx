"use client"

import type React from "react"

import { useState } from "react"
import type { WorkflowNode } from "@/types/workflow"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConfigPanelProps {
  node: WorkflowNode
  onUpdate: (node: WorkflowNode) => void
}

export default function ConfigPanel({ node, onUpdate }: ConfigPanelProps) {
  const [label, setLabel] = useState(node.label)
  const [description, setDescription] = useState(node.description || "")
  const [type, setType] = useState(node.type)

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value)
    onUpdate({ ...node, label: e.target.value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    onUpdate({ ...node, description: e.target.value })
  }

  const handleTypeChange = (value: string) => {
    setType(value)
    onUpdate({ ...node, type: value })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="node-type">Node Type</Label>
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger id="node-type" className="bg-gray-800 border-gray-700">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="trigger">Trigger</SelectItem>
            <SelectItem value="action">Action</SelectItem>
            <SelectItem value="condition">Condition</SelectItem>
            <SelectItem value="output">Output</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="node-label">Label</Label>
        <Input id="node-label" value={label} onChange={handleLabelChange} className="bg-gray-800 border-gray-700" />
      </div>

      <div>
        <Label htmlFor="node-description">Description</Label>
        <Textarea
          id="node-description"
          value={description}
          onChange={handleDescriptionChange}
          className="bg-gray-800 border-gray-700"
          rows={3}
        />
      </div>

      {type === "action" && (
        <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
          <h3 className="mb-2 text-sm font-medium text-white">Action Settings</h3>
          <p className="text-xs text-gray-400">
            Additional action configuration options will be available in the full version.
          </p>
        </div>
      )}

      {type === "condition" && (
        <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
          <h3 className="mb-2 text-sm font-medium text-white">Condition Settings</h3>
          <p className="text-xs text-gray-400">Condition logic configuration will be available in the full version.</p>
        </div>
      )}
    </div>
  )
}
