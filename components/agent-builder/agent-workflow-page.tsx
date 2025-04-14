"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronDown,
  Edit,
  Settings,
  ArrowLeft,
  MessageSquare,
  BookOpen,
  Phone,
  FileText,
  BarChart,
  Shield,
  Webhook,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import WorkflowBackground from "@/components/agent-builder/workflow-background"
import TestConsole from "@/components/agent-builder/test-console"

export default function AgentWorkflowPage() {
  // State for the agent configuration
  const [activeTab, setActiveTab] = useState("create")
  const [selectedLLM, setSelectedLLM] = useState("GPT 4o mini")
  const [selectedVoice, setSelectedVoice] = useState("Noah")
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [welcomeMessageType, setWelcomeMessageType] = useState("ai-initiates")
  const [welcomeMessage, setWelcomeMessage] = useState("Hello Sam. This is Chris. I've just got a minute?")
  const [welcomeDropdownOpen, setWelcomeDropdownOpen] = useState(false)

  // State for sidebar
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>(null)

  // Agent information - This would come from your database in a real implementation
  const agentInfo = {
    name: "AI Intake Specialist",
    id: "ai-intake-specialist",
    llmId: "5.10.0",
    price: "$0.076/min",
    latency: "900-1050ms",
  }

  // Agent prompt content
  const agentPrompt = `## Role and Task
"Your role is to be approachable, friendly, and professional—like a helpful neighbor rather than a pushy salesperson. Think of yourself as someone who enjoys a genuine chat, makes people smile, and helps them make informed decisions—without pressure.

##Key changes
-Use getDateTime for date and time.
"DO post_data after booking appointment. only send the data required by the post_data.
-book_appointment_without_email if the client doesn't share email
-don't give away transcript_object. only send transcript.

## dynamic variables
name : John Doe
phone_number: (123) 456-7890

Use a warm, relaxed tone with occasional light humor when appropriate.`

  // Welcome message options
  const welcomeMessageOptions = [
    { id: "ai-initiates", label: "AI Initiates: AI begins with your defined begin message." },
    { id: "dynamic-opening", label: "AI Initiates: AI begins with a dynamic opening message." },
    { id: "user-initiates", label: "User Initiates: AI Waits until the User Speaks." },
  ]

  // Sidebar menu items
  const sidebarItems = [
    {
      id: "functions",
      icon: <FileText className="h-5 w-5" />,
      title: "Functions",
      description: "Configure function calling capabilities for your agent",
    },
    {
      id: "knowledge",
      icon: <BookOpen className="h-5 w-5" />,
      title: "Knowledge Base",
      description: "Add documents to enhance your agent's knowledge",
    },
    {
      id: "speech",
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Speech Settings",
      description: "Configure voice, speech rate, and other speech settings",
    },
    {
      id: "call",
      icon: <Phone className="h-5 w-5" />,
      title: "Call Settings",
      description: "Configure call behavior, timeouts, and other call settings",
    },
    {
      id: "analysis",
      icon: <BarChart className="h-5 w-5" />,
      title: "Post-Call Analysis",
      description: "Configure post-call analysis and summaries",
    },
    {
      id: "security",
      icon: <Shield className="h-5 w-5" />,
      title: "Security & Fallback Settings",
      description: "Configure security settings and fallback behavior",
    },
    {
      id: "webhook",
      icon: <Webhook className="h-5 w-5" />,
      title: "Webhook Settings",
      description: "Configure webhooks for real-time notifications",
    },
  ]

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
    if (!sidebarExpanded) {
      setActiveSidebarItem(null)
    }
  }

  const handleSidebarItemClick = (itemId: string) => {
    if (sidebarExpanded) {
      setActiveSidebarItem(activeSidebarItem === itemId ? null : itemId)
    } else {
      setSidebarExpanded(true)
      setActiveSidebarItem(itemId)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#0d0d11]">
      {/* Fixed Header */}
      <div className="flex-none border-b border-[#1e1e2a] bg-[#0d0d11]">
        <div className="flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <div className="h-8 w-8 rounded-md bg-purple-600"></div>
            <span className="text-xl font-bold text-white">Intakely AI</span>
          </div>
          <div className="ml-8 text-white font-medium">{agentInfo.name}</div>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <span>Law-Firm — Workspace</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Agent Info Bar */}
      <div className="flex-none border-b border-[#1e1e2a] bg-[#0d0d11] px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Agent ID: {agentInfo.id}</span>
          <span>•</span>
          <span>Retail LLM ID: {agentInfo.llmId}</span>
          <span>•</span>
          <span>{agentInfo.price}</span>
          <span>•</span>
          <span>{agentInfo.latency} latency</span>
        </div>
      </div>

      {/* Tabs and Model Selection */}
      <div className="flex-none flex justify-between items-center border-b border-[#1e1e2a] bg-[#0d0d11] px-4 py-2">
        <div className="flex items-center gap-4">
          {/* LLM Model Selector */}
          <div className="flex items-center gap-2 rounded-md bg-[#13131a] px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e1e2a]">
              <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-white">GPT 4o mini</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
            <Settings className="ml-2 h-4 w-4 text-gray-400" />
          </div>

          {/* Voice Selector */}
          <div className="flex items-center gap-2 rounded-md bg-[#13131a] px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-[#1e1e2a]">
              <span className="text-xs">N</span>
            </div>
            <span className="text-white">Noah</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
            <Settings className="ml-2 h-4 w-4 text-gray-400" />
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 rounded-md bg-[#13131a] px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
              <img src="/images/uk-flag.png" alt="Language flag" className="h-full w-full object-cover" />
            </div>
            <span className="text-white">English</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

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

      {/* Main Content Area - Three independently scrollable columns */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Navigation - Independently scrollable */}
        <div
          className={cn(
            "flex-none border-r border-[#1e1e2a] bg-[#0d0d11] transition-all duration-300",
            sidebarExpanded ? "w-64" : "w-16",
          )}
        >
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent">
            <div className="flex flex-col space-y-1 p-3">
              {sidebarItems.map((item) => (
                <div key={item.id} className="px-2 py-1">
                  <button
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md p-2 transition-colors",
                      activeSidebarItem === item.id
                        ? "bg-[#1e1e2a] text-white"
                        : "text-gray-400 hover:bg-[#1e1e2a] hover:text-white",
                    )}
                    onClick={() => handleSidebarItemClick(item.id)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center">{item.icon}</div>
                    {sidebarExpanded && (
                      <div className="flex flex-1 flex-col items-start overflow-hidden">
                        <span className="text-sm font-medium">{item.title}</span>
                        {activeSidebarItem === item.id && (
                          <span className="mt-1 text-xs text-gray-400">{item.description}</span>
                        )}
                      </div>
                    )}
                    {sidebarExpanded && activeSidebarItem !== item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                    {sidebarExpanded && activeSidebarItem === item.id && <ChevronDown className="ml-auto h-4 w-4" />}
                  </button>

                  {/* Expanded Content */}
                  {sidebarExpanded && activeSidebarItem === item.id && (
                    <div className="mt-2 rounded-md bg-[#13131a] p-4">
                      <p className="text-sm text-gray-400">{item.description}</p>
                      {/* This is where we would add specific settings for each section */}
                      <div className="mt-3 flex justify-end">
                        <Button size="sm" className="bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]">
                          Configure
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Prompt and Welcome Message - Independently scrollable */}
        <div className="flex-1 border-r border-[#1e1e2a] overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent">
          <div className="p-4">
            {/* Agent Prompt - First scrollable area */}
            <div className="mb-6 rounded-md bg-[#13131a] p-4 text-white">
              <div className="h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2a] scrollbar-track-transparent">
                <pre className="font-mono text-sm whitespace-pre-wrap">{agentPrompt}</pre>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-white">Welcome Message</h3>
              <div className="mb-2 text-xs text-gray-400">AI Initiates: AI begins with your defined begin message.</div>
              <div className="rounded-md bg-[#1e1e2a] p-3 text-sm text-white">
                Hello Sam. This is Chris. I've just got a minute?
              </div>
            </div>

            {/* Edit Prompt Tree Button */}
            <div className="mt-4 relative">
              <WorkflowBackground />
              <Button
                variant="outline"
                className="relative z-10 w-full border-[#1e1e2a] bg-black/80 text-white hover:bg-[#2d2d3a]"
                onClick={() => (window.location.href = `/agent-builder/${agentInfo.id}/workflow`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit prompt tree
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Testing Console - Independently scrollable */}
        <div className="w-[30%] overflow-hidden">
          <TestConsole />
        </div>
      </div>
    </div>
  )
}
