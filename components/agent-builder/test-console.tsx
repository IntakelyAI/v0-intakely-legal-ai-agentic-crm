"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MessageSquare, Play, X, Plus, ChevronDown } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface TestConsoleProps {
  className?: string
  initialMode?: "audio" | "llm"
}

export default function TestConsole({ className, initialMode = "audio" }: TestConsoleProps) {
  const [activeTab, setActiveTab] = useState<"audio" | "llm">(initialMode)
  const [showDynamicVariables, setShowDynamicVariables] = useState(false)

  // Add state for simulation dialog
  const [showSimulationDialog, setShowSimulationDialog] = useState(false)
  const [simulationPrompt, setSimulationPrompt] = useState(`## Identity

Your name is Mike.
Your date of birth is June 10, 1999.
Your order number is 7891273.

## Goal

Your primary objective is to return the package you received and get a refund.

## Personality

You are a patient customer. However, if the conversation becomes too long or complicated, you will show signs of impatience. If the issue remains unresolved, you may become frustrated and angry.`)

  // Audio test chat messages
  const [audioMessages, setAudioMessages] = useState([
    { role: "assistant", content: "Hello Sam. This is Chris. I've just got a minute?" },
    { role: "user", content: "Yeah, Chris. I only have two men." },
    {
      role: "assistant",
      content:
        "I appreciate that, Sam! I'll keep it brief. I wanted to let you know that there's been a lot of interest in your neighborhood lately. Have you ever thought about selling or maybe just assessing your property's value?",
    },
    { role: "user", content: "No. I'm not interested." },
    {
      role: "assistant",
      content:
        "I completely understand, Sam. Maybe now isn't the right time. But just so you know, we've got several buyers eager for properties like yours, and they're even making offers without listings. If you ever",
    },
  ])

  // Manual chat messages
  const [manualMessages, setManualMessages] = useState([
    { role: "user", content: "How are you doing?" },
    { role: "assistant", content: "I am doing well" },
  ])

  // User prompt for manual testing
  const [userPrompt, setUserPrompt] = useState("You are a customer who wants to return a package...")

  // Dynamic variables
  const [dynamicVariables, setDynamicVariables] = useState([
    { name: "greeting", value: "Initial greeting to introduce yourself" },
    { name: "introduction", value: "Brief introduction and explanation" },
    { name: "lead_interest", value: "Response from the lead about" },
    { name: "value_assessment_proposal", value: "Proposition for a free no-obl" },
    { name: "follow_up_inquiry", value: "Check if the lead agrees to a" },
    { name: "assessment_confirmation", value: "Confirmation details if the le" },
    { name: "response_to_greeting", value: "Acknowledging the greeting" },
    { name: "response_to_intro", value: "Reactive statement based on" },
  ])

  return (
    <div className={`flex flex-col h-full bg-[#0d0d11] ${className}`}>
      {/* Test Tabs - Fixed position */}
      <div className="flex-none flex border-b border-[#1e1e2a] p-2">
        <button
          className={`flex items-center gap-2 rounded-md px-4 py-2 ${
            activeTab === "audio" ? "bg-[#1e1e2a] text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("audio")}
        >
          <Mic className="h-5 w-5" />
          <span>Test Audio</span>
        </button>
        <button
          className={`flex items-center gap-2 rounded-md px-4 py-2 ${
            activeTab === "llm" ? "bg-[#1e1e2a] text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("llm")}
        >
          <MessageSquare className="h-5 w-5" />
          <span>Test LLM</span>
        </button>
        <button
          className="ml-auto flex items-center justify-center rounded-md bg-[#1e1e2a] p-2 text-white"
          onClick={() => setShowDynamicVariables(!showDynamicVariables)}
        >
          <span className="text-lg">
            {"{"} {"}"}
          </span>
        </button>
      </div>

      {/* Dynamic Variables Panel - Full screen overlay with its own scrolling */}
      {showDynamicVariables && (
        <div className="absolute right-0 top-0 z-50 h-full w-full bg-[#0d0d11]">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Dynamic Variables</h2>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowDynamicVariables(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="mb-6 text-gray-400">Set dynamic variables for dashboard audio and llm tests</p>

            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-4 bg-[#13131a] p-4 rounded-md">
              <div className="text-white font-medium">Variable Name</div>
              <div className="text-white font-medium">Test Value</div>
              <div></div>
            </div>

            {dynamicVariables.map((variable, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-4">
                <div className="bg-[#13131a] p-4 rounded-md text-white">{variable.name}</div>
                <div className="bg-[#13131a] p-4 rounded-md text-white">{variable.value}</div>
                <button className="flex items-center justify-center h-12 w-12 bg-transparent text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14H18C19.1046 14 20 13.1046 20 12V12C20 10.8954 19.1046 10 18 10H10C8.89543 10 8 10.8954 8 12V12C8 13.1046 8.89543 14 10 14Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 20H18C19.1046 20 20 19.1046 20 18V18C20 16.8954 19.1046 16 18 16H10C8.89543 16 8 16.8954 8 18V18C8 19.1046 8.89543 20 10 20Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "audio" ? (
        <div className="flex flex-col h-full">
          {/* Audio Test Chat - Third scrollable area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent p-4">
            {audioMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 max-w-[80%] rounded-lg p-3 ${
                  message.role === "assistant" ? "bg-[#1e1e2a] text-white" : "ml-auto bg-[#2d2d3a] text-white"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          {/* Test UI - Fixed position */}
          <div className="flex-none flex flex-col items-center justify-center p-4">
            <div className="text-center text-sm text-gray-400 mb-4">Test your agent</div>
            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#1e1e2a]">
              <Mic className="h-12 w-12 text-gray-400" />
            </div>
            <Button className="w-full bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]">Test</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* LLM Test Chat - Third scrollable area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent p-4">
            {manualMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 max-w-[80%] rounded-lg p-3 ${
                  message.role === "assistant" ? "bg-[#1e1e2a] text-white" : "ml-auto bg-[#2d2d3a] text-white"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          {/* Test Controls - Fixed position */}
          <div className="flex-none border-t border-[#1e1e2a] py-2">
            <div className="flex items-center gap-2 px-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
              <div className="flex items-center gap-1 text-gray-400">
                <ChevronDown className="h-4 w-4" />
                <span>Unsaved Simulation Test</span>
              </div>
            </div>
          </div>

          {/* Manual Chat Section - Fixed position */}
          <div className="flex-none p-4 border-t border-[#1e1e2a]">
            <h3 className="mb-2 text-sm font-medium text-white">User Prompt</h3>
            <Textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="mb-4 h-24 resize-none border-[#1e1e2a] bg-[#13131a] text-white"
            />
            <Button
              className="w-full bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]"
              onClick={() => setShowSimulationDialog(true)}
            >
              <Play className="mr-2 h-4 w-4" />
              Simulate Conversation
            </Button>
          </div>
        </div>
      )}

      {/* Simulation Dialog */}
      <Dialog open={showSimulationDialog} onOpenChange={setShowSimulationDialog}>
        <DialogContent className="sm:max-w-[600px] bg-[#0d0d11] border-[#1e1e2a] text-white p-0">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">Provide a prompt to generate user responses.</h2>
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent">
              <Textarea
                value={simulationPrompt}
                onChange={(e) => setSimulationPrompt(e.target.value)}
                className="min-h-[400px] resize-none border-[#1e1e2a] bg-[#13131a] text-white font-mono"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                className="border-[#1e1e2a] text-white hover:bg-[#1e1e2a]"
                onClick={() => setShowSimulationDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]"
                onClick={() => {
                  // Here we would handle the simulation logic
                  setShowSimulationDialog(false)
                }}
              >
                Start Simulation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
