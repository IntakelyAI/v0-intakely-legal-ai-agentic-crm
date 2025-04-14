"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar, ChevronDown, FileText, Globe, Mail, MessageSquare, Phone, Settings, Wrench } from "lucide-react"

type ToolType = "calendar" | "email" | "call" | "web" | "document" | "messaging"

interface ToolTypeConfig {
  icon: React.ElementType
  name: string
  color: string
}

const toolTypeConfigs: Record<ToolType, ToolTypeConfig> = {
  calendar: {
    icon: Calendar,
    name: "Calendar Tool",
    color: "bg-blue-500",
  },
  email: {
    icon: Mail,
    name: "Email Tool",
    color: "bg-green-500",
  },
  call: {
    icon: Phone,
    name: "Call Tool",
    color: "bg-yellow-500",
  },
  web: {
    icon: Globe,
    name: "Web Tool",
    color: "bg-purple-500",
  },
  document: {
    icon: FileText,
    name: "Document Tool",
    color: "bg-red-500",
  },
  messaging: {
    icon: MessageSquare,
    name: "Messaging Tool",
    color: "bg-indigo-500",
  },
}

export default function WorkflowToolNode() {
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null)
  const [isConfigOpen, setIsConfigOpen] = useState(false)

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-1.5">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Tool Action</h3>
        </div>
        <Popover open={isConfigOpen} onOpenChange={setIsConfigOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="border-b border-border p-3">
              <h4 className="text-sm font-medium text-foreground">Tool Configuration</h4>
            </div>
            <div className="p-3">
              <div className="mb-3 space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Tool Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground"
                  placeholder="Enter tool name"
                />
              </div>
              <div className="mb-3 space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Description</label>
                <textarea
                  className="w-full rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <Button size="sm" className="w-full">
                Save Configuration
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {selectedTool ? (
        <div className="mb-3 flex items-center gap-2">
          <div className={`rounded-full p-1 ${toolTypeConfigs[selectedTool].color}`}>
            {React.createElement(toolTypeConfigs[selectedTool].icon, { className: "h-4 w-4 text-white" })}
          </div>
          <span className="text-sm font-medium text-foreground">{toolTypeConfigs[selectedTool].name}</span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-6 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setSelectedTool(null)}
          >
            Change
          </Button>
        </div>
      ) : (
        <div className="mb-3 space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Select Tool Type</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(toolTypeConfigs) as ToolType[]).map((type) => (
              <button
                key={type}
                className="flex flex-col items-center rounded-md border border-border bg-background p-2 text-center hover:border-primary hover:bg-primary/5"
                onClick={() => setSelectedTool(type)}
              >
                <div className="rounded-full bg-primary/10 p-1">
                  {React.createElement(toolTypeConfigs[type].icon, { className: "h-4 w-4 text-primary" })}
                </div>
                <span className="mt-1 text-xs text-foreground">{type}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-md border border-border bg-background p-3">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Tool Parameters</h4>
          <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground hover:text-foreground">
            <ChevronDown className="mr-1 h-3 w-3" />
            Advanced
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">Input: User Query</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="text-xs text-muted-foreground">Output: Tool Response</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs">
          Test Tool
        </Button>
        <Button size="sm" className="text-xs">
          Add to Workflow
        </Button>
      </div>
    </div>
  )
}
