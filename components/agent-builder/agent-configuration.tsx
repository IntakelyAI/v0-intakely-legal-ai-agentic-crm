"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, Mic, Edit, Settings, MessageSquare } from "lucide-react"
import type { Agent } from "@/types/agent"
import { Textarea } from "@/components/ui/textarea"
import SimulationTesting from "./simulation-testing"

interface AgentConfigurationProps {
  agent: Agent
}

export default function AgentConfiguration({ agent }: AgentConfigurationProps) {
  const [activeTab, setActiveTab] = useState("create")
  const [selectedLLM, setSelectedLLM] = useState("GPT 4o mini")
  const [selectedVoice, setSelectedVoice] = useState(agent.voice || "Angelo")
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [welcomeMessageType, setWelcomeMessageType] = useState("ai-initiates")
  const [welcomeMessage, setWelcomeMessage] = useState("Hello Sam. This is Chris. I've just got a minute?")
  const [welcomeDropdownOpen, setWelcomeDropdownOpen] = useState(false)

  // Welcome message options
  const welcomeMessageOptions = [
    { id: "ai-initiates", label: "AI Initiates: AI begins with your defined begin message." },
    { id: "dynamic-opening", label: "AI Initiates: AI begins with a dynamic opening message." },
    { id: "user-initiates", label: "User Initiates: AI Waits until the User Speaks." },
  ]

  // Voice selection dialog state
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false)
  const [activeVoiceTab, setActiveVoiceTab] = useState("Elevenlabs")
  const [voiceSearchQuery, setVoiceSearchQuery] = useState("")
  const [voiceGenderFilter, setVoiceGenderFilter] = useState("Male")
  const [voiceAccentFilter, setVoiceAccentFilter] = useState("American")
  const [voiceTypeFilter, setVoiceTypeFilter] = useState("All Types")

  // Dummy variables for demonstration purposes
  const name = "John Doe"
  const phone_number = "123-456-7890"

  // LLM options
  const llmOptions = [
    { name: "GPT 4o Realtime", price: "$0.5/min", icon: "openai" },
    { name: "GPT 4o mini Realtime", price: "$0.125/min", icon: "openai" },
    { name: "GPT 4o", price: "$0.05/min", icon: "openai" },
    { name: "GPT 4o mini", price: "$0.006/min", icon: "openai", selected: true },
    { name: "Claude 3.7 Sonnet", price: "$0.06/min", icon: "anthropic" },
    { name: "Claude 3.5 Haiku", price: "$0.02/min", icon: "anthropic" },
    { name: "Gemini 2.0 Flash", price: "$0.006/min", icon: "google" },
    { name: "Gemini 2.0 Flash Lite", price: "$0.003/min", icon: "google" },
  ]

  // Voice options
  const voiceOptions = [
    { name: "Auto(Play 3.0 mini)", description: "Fast, high quality" },
    { name: "Play 3.0 mini", description: "Fast, high quality" },
    { name: "Play Dialog", description: "Slow, highest quality" },
  ]

  // Voice list for the dialog
  const voiceList = [
    {
      id: "11labs-Adrian",
      name: "Adrian",
      accent: "American",
      age: "Young",
      provider: "Retell",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11labs-Andrew",
      name: "Andrew",
      accent: "American",
      age: "Young",
      provider: "Retell",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11labs-Billy",
      name: "Billy",
      accent: "American",
      age: "Young",
      provider: "Retell",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11labs-Bing",
      name: "Bing",
      accent: "American",
      age: "Young",
      provider: "Retell",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11labs-Brian",
      name: "Brian",
      accent: "American",
      age: "Young",
      provider: "Retell",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11labs-Ethan",
      name: "Ethan",
      accent: "American",
      age: "Young",
      provider: "Retell",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11labs-Gilfoy",
      name: "Gilfoy",
      accent: "American",
      age: "Middle Aged",
      provider: "Retell",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "play-Angelo",
      name: "Angelo",
      accent: "American",
      age: "Young",
      provider: "Provider",
      avatar: "/placeholder.svg?height=40&width=40",
      isUser: true,
    },
  ]

  // Language options
  const languageOptions = [
    { name: "English", region: "US", flag: "/placeholder.svg?height=24&width=24" },
    { name: "Multilingual", region: "", flag: "/placeholder.svg?height=24&width=24" },
    { name: "Spanish", region: "Spain", flag: "/placeholder.svg?height=24&width=24" },
    { name: "Spanish", region: "Latin America", flag: "/placeholder.svg?height=24&width=24" },
    { name: "English", region: "India", flag: "/placeholder.svg?height=24&width=24" },
    { name: "English", region: "UK", flag: "/placeholder.svg?height=24&width=24" },
    { name: "English", region: "Australia", flag: "/placeholder.svg?height=24&width=24" },
    { name: "English", region: "New Zealand", flag: "/placeholder.svg?height=24&width=24" },
    { name: "French", region: "", flag: "/placeholder.svg?height=24&width=24" },
  ]

  // LLM Settings Dialog
  const [llmSettingsOpen, setLlmSettingsOpen] = useState(false)

  // Voice Settings Dialog
  const [voiceSettingsOpen, setVoiceSettingsOpen] = useState(false)

  // LLM Dropdown
  const [llmDropdownOpen, setLlmDropdownOpen] = useState(false)

  // Language Dropdown
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)

  // Update the voice settings dialog to include the additional dropdowns

  // First, add these state variables near the top of the component where the other state variables are defined:
  const [voiceGender, setVoiceGender] = useState("Male")
  const [voiceAccent, setVoiceAccent] = useState("American")
  const [voiceType, setVoiceType] = useState("All Types")
  const [voiceGenderDropdownOpen, setVoiceGenderDropdownOpen] = useState(false)
  const [voiceAccentDropdownOpen, setVoiceAccentDropdownOpen] = useState(false)
  const [voiceTypeDropdownOpen, setVoiceTypeDropdownOpen] = useState(false)

  // Add these arrays for the dropdown options:
  const genderOptions = ["Male", "Female"]
  const accentOptions = ["American", "Australian", "British", "Indian", "Spanish"]
  const typeOptions = [
    "All Types",
    "Intakely Presets",
    "Elevenlabs Presets",
    "PlayHT Presets",
    "Cartesia Presets",
    "Custom Presets",
  ]

  // Add a new state variable for the agent prompt
  const [agentPrompt, setAgentPrompt] = useState(`## Role and Task
"Your role is to be approachable, friendly, and professional—like a helpful neighbor rather than a pushy salesperson. Think of yourself as someone who enjoys a genuine chat, makes people smile, and helps them make informed decisions—without pressure.

##Key changes
-Use getDateTime for date and time.
"DO post_data after booking appointment. only send the data required by the post_data.
-book_appointment_without_email if the client doesn't share email
-don't give away transcript_object. only send transcript.

## dynamic variables
name : ${name}
phone_number: ${phone_number}

Use a warm, relaxed tone with occasional light humor when appropriate.`)

  const [testMode, setTestMode] = useState<"audio" | "llm">("audio")
  const [showDynamicVariables, setShowDynamicVariables] = useState(false)
  const [userPrompt, setUserPrompt] = useState("You are a customer who wants to return a package...")

  // Chat messages for LLM test
  const [chatMessages, setChatMessages] = useState([
    { role: "user", content: "How are you doing?" },
    { role: "assistant", content: "I am doing well" },
  ])

  // Dynamic variables
  const [dynamicVariables, setDynamicVariables] = useState([
    { name: "inbound_call", value: "" },
    { name: "inbound_message", value: "" },
    { name: "outbound_call", value: "" },
    { name: "practice_area", value: "" },
    { name: "contact_information", value: "" },
    { name: "intake_answers_qualification", value: "" },
    { name: "practice_area_attorney_name", value: "" },
    { name: "calendar_booking", value: "" },
  ])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[#1e1e2a] p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium text-white">{agent.name}</h1>
          <Edit className="h-4 w-4 cursor-pointer text-gray-400 hover:text-white" />
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid w-[200px] grid-cols-2 bg-[#1e1e2a]">
              <TabsTrigger value="create" className="data-[state=active]:bg-[#2d2d3a]">
                Create
              </TabsTrigger>
              <TabsTrigger value="simulation" className="data-[state=active]:bg-[#2d2d3a]">
                Simulation
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="border-b border-[#1e1e2a] bg-[#0d0d11] p-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Agent ID: {agent.id}</span>
          <span>•</span>
          <span>Retail LLM ID: 5.10.0</span>
          <span>•</span>
          <span>$0.076/min</span>
          <span>•</span>
          <span>900-1050ms latency</span>
        </div>
      </div>

      {activeTab === "create" ? (
        <>
          <div className="border-b border-[#1e1e2a] bg-[#0d0d11] p-2">
            <div className="flex items-center gap-4">
              {/* LLM Model Selector */}
              <div className="flex items-center gap-2 rounded-md bg-[#13131a] px-3 py-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e1e2a]">
                  <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-white">{selectedLLM}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
                <Settings className="ml-2 h-4 w-4 text-gray-400" />
              </div>

              {/* Voice Selector */}
              <div className="flex items-center gap-2 rounded-md bg-[#13131a] px-3 py-2">
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-[#1e1e2a]">
                  <span className="text-xs">{selectedVoice.charAt(0)}</span>
                </div>
                <span className="text-white">{selectedVoice}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
                <Settings className="ml-2 h-4 w-4 text-gray-400" />
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2 rounded-md bg-[#13131a] px-3 py-2">
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                  <img src="/colorful-pennant-banner.png" alt="Language flag" className="h-full w-full object-cover" />
                </div>
                <span className="text-white">{selectedLanguage}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-1">
            <div className="flex-1 border-r border-[#1e1e2a] p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent">
              {/* Section 1: Editable Prompt with internal scrollbar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">Agent Prompt</h3>
                  <Button variant="ghost" size="sm" className="h-7 text-gray-400 hover:text-white">
                    <Edit className="h-4 w-4 mr-1" />
                    <span className="text-xs">Edit</span>
                  </Button>
                </div>
                <div className="rounded-md border border-[#1e1e2a] bg-[#13131a] p-4">
                  <Textarea
                    className="min-h-[200px] resize-none border-0 bg-transparent p-0 text-sm text-white font-mono focus-visible:ring-0 scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent"
                    value={agentPrompt}
                    onChange={(e) => setAgentPrompt(e.target.value)}
                  />
                </div>
              </div>

              {/* Section 2: Welcome Message with dropdown */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">Welcome Message</h3>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-gray-400 hover:text-white flex items-center gap-1"
                      onClick={() => setWelcomeDropdownOpen(!welcomeDropdownOpen)}
                    >
                      <span className="text-xs">
                        {welcomeMessageOptions.find((o) => o.id === welcomeMessageType)?.label.split(":")[0]}
                      </span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>

                    {welcomeDropdownOpen && (
                      <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-md border border-[#1e1e2a] bg-[#13131a] p-1 shadow-md">
                        {welcomeMessageOptions.map((option) => (
                          <button
                            key={option.id}
                            className="flex w-full flex-col items-start rounded-sm px-2 py-1.5 text-left text-sm text-white hover:bg-[#1e1e2a]"
                            onClick={() => {
                              setWelcomeMessageType(option.id)
                              setWelcomeDropdownOpen(false)
                            }}
                          >
                            <span className="font-medium">{option.label.split(":")[0]}</span>
                            <span className="text-xs text-gray-400">{option.label.split(":")[1]}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {welcomeMessageOptions.find((o) => o.id === welcomeMessageType)?.label.split(":")[1]}
                </div>
                <div className="rounded-md border border-[#1e1e2a] bg-[#13131a] p-3">
                  <Textarea
                    className="min-h-[60px] resize-none border-0 bg-transparent p-0 text-sm text-white focus-visible:ring-0"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                  />
                </div>
              </div>

              {/* Section 3: Edit Prompt Tree with workflow watermark */}
              <div className="mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <img
                    src="/thoughtful-gaze.png"
                    alt="Workflow Background"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <Link href={`/agent-builder/${agent.id}/workflow`}>
                  <Button
                    variant="outline"
                    className="relative z-10 w-full border-[#1e1e2a] bg-[#13131a]/80 text-white hover:bg-[#2d2d3a]"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit prompt tree - Workflow Builder
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex w-80 flex-col border-l border-[#1e1e2a] bg-[#0d0d11]">
              {/* Test Options Tabs */}
              <div className="flex border-b border-[#1e1e2a] p-2">
                <button
                  className={`flex items-center gap-2 rounded-md px-4 py-2 ${testMode === "audio" ? "bg-[#1e1e2a] text-white" : "text-gray-400 hover:text-white"}`}
                  onClick={() => setTestMode("audio")}
                >
                  <Mic className="h-4 w-4" />
                  <span className="text-sm">Test Audio</span>
                </button>
                <button
                  className={`flex items-center gap-2 rounded-md px-4 py-2 ${testMode === "llm" ? "bg-[#1e1e2a] text-white" : "text-gray-400 hover:text-white"}`}
                  onClick={() => setTestMode("llm")}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">Test LLM</span>
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

              {/* Dynamic Variables Panel - Full screen overlay */}
              {showDynamicVariables && (
                <div className="absolute right-0 top-0 z-50 h-full w-full bg-[#0d0d11]">
                  <div className="h-full overflow-y-auto p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">Dynamic Variables</h2>
                      <button className="text-gray-400 hover:text-white" onClick={() => setShowDynamicVariables(false)}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
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
                        <input
                          type="text"
                          placeholder="Enter the value"
                          className="bg-[#13131a] p-4 rounded-md text-white border-none"
                          value={variable.value}
                          onChange={(e) => {
                            const newVariables = [...dynamicVariables]
                            newVariables[index].value = e.target.value
                            setDynamicVariables(newVariables)
                          }}
                        />
                        <button className="flex items-center justify-center h-12 w-12 bg-transparent text-white">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test Content based on mode */}
              {testMode === "audio" ? (
                <div className="flex flex-1 flex-col items-center justify-center p-4">
                  <div className="mb-4 text-center text-sm text-gray-400">Test your agent</div>
                  <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#1e1e2a]">
                    <Mic className="h-12 w-12 text-gray-400" />
                  </div>
                  <Button className="w-full bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]">Test</Button>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  {/* LLM Test Chat */}
                  <div className="flex-1 overflow-y-auto p-4 border-b border-[#1e1e2a]">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-3 max-w-[80%] rounded-lg p-3 ${
                          message.role === "assistant" ? "bg-[#1e1e2a] text-white" : "ml-auto bg-[#2d2d3a] text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    ))}
                    <div className="text-center text-white mt-8 mb-2">Manual Chat</div>
                    <div className="text-center text-sm text-gray-400 mb-4">Manually chat with the agent</div>
                  </div>

                  {/* Manual Chat Section */}
                  <div className="p-4">
                    <h3 className="mb-2 text-sm font-medium text-white">User Prompt</h3>
                    <Textarea
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      className="mb-4 h-24 resize-none border-[#1e1e2a] bg-[#13131a] text-white"
                    />
                    <Button className="w-full bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]">
                      <svg
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      Simulate Conversation
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-hidden">
          <SimulationTesting />
        </div>
      )}
    </div>
  )
}
