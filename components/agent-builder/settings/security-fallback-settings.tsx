"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SecurityFallbackSettings() {
  const [enableSecurityRules, setEnableSecurityRules] = useState(true)
  const [fallbackBehavior, setFallbackBehavior] = useState("transfer-to-agent")
  const [fallbackAgent, setFallbackAgent] = useState("")
  const [errorMessage, setErrorMessage] = useState("An unexpected error occurred. Please try again later.")

  return (
    <div className="flex flex-col space-y-6 py-4">
      <div className="px-4 space-y-6">
        {/* Enable Security Rules */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Enable Security Rules</Label>
              <p className="text-sm text-gray-400">
                Enable security rules to protect against malicious input and unauthorized access.
              </p>
            </div>
            <Switch checked={enableSecurityRules} onCheckedChange={setEnableSecurityRules} />
          </div>
        </div>

        {/* Fallback Behavior */}
        <div className="space-y-2">
          <Label className="text-white">Fallback Behavior</Label>
          <p className="text-sm text-gray-400">
            Define what happens when the AI agent encounters an error or cannot fulfill a request.
          </p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="transfer-to-agent"
                checked={fallbackBehavior === "transfer-to-agent"}
                onChange={() => setFallbackBehavior("transfer-to-agent")}
                className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-white">Transfer to Agent</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="play-message"
                checked={fallbackBehavior === "play-message"}
                onChange={() => setFallbackBehavior("play-message")}
                className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-white">Play Error Message</span>
            </label>
          </div>
        </div>

        {/* Fallback Agent (Conditional) */}
        {fallbackBehavior === "transfer-to-agent" && (
          <div className="space-y-2">
            <Label className="text-white">Fallback Agent</Label>
            <input
              type="text"
              value={fallbackAgent}
              onChange={(e) => setFallbackAgent(e.target.value)}
              placeholder="Enter agent name or ID"
              className="bg-[#1e1e2a] border-[#2d2d3a] text-white w-full rounded-md p-2"
            />
          </div>
        )}

        {/* Error Message (Conditional) */}
        {fallbackBehavior === "play-message" && (
          <div className="space-y-2">
            <Label className="text-white">Error Message</Label>
            <Textarea
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              className="bg-[#1e1e2a] border-[#2d2d3a] text-white min-h-[100px]"
              placeholder="Enter error message here..."
            />
          </div>
        )}
      </div>
    </div>
  )
}
