"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  FileText,
  Grid,
  List,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Upload,
  Wrench,
} from "lucide-react"

// Mock data for tools
const toolsData = [
  {
    id: "1",
    name: "Calendar Booking",
    description: "Schedule appointments and manage availability",
    category: "Calendar",
    icon: Calendar,
  },
  {
    id: "2",
    name: "Email Sender",
    description: "Send personalized emails with templates",
    category: "Email",
    icon: Mail,
  },
  {
    id: "3",
    name: "Call Transfer",
    description: "Transfer calls to specific departments or agents",
    category: "Call",
    icon: Phone,
  },
  {
    id: "4",
    name: "Web Search",
    description: "Search the web for information",
    category: "Web",
    icon: Search,
  },
  {
    id: "5",
    name: "Document Generator",
    description: "Generate legal documents from templates",
    category: "Document",
    icon: FileText,
  },
  {
    id: "6",
    name: "Message Dispatcher",
    description: "Send messages to Slack, Discord, or other platforms",
    category: "Messaging",
    icon: MessageSquare,
  },
]

export default function ToolsManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter tools based on search query
  const filteredTools = toolsData.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Tools</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-primary text-primary">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="default" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Tool
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Tools</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="call">Call</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="document">Document</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex flex-col rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 p-2">
                      <tool.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{tool.name}</h3>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{tool.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                      {tool.category}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 p-6 text-center">
                <div className="mb-2 rounded-full bg-primary/10 p-3">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">Invent a Tool</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Describe what you need and we'll create a custom tool for you
                </p>
                <Button variant="outline" className="border-primary text-primary">
                  Get Started
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted p-4 font-medium text-muted-foreground">
                <div className="col-span-4">Name</div>
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-1"></div>
              </div>
              {filteredTools.map((tool) => (
                <div key={tool.id} className="grid grid-cols-12 gap-4 border-b border-border p-4 last:border-0">
                  <div className="col-span-4 flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 p-1">
                      <tool.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{tool.name}</span>
                  </div>
                  <div className="col-span-5 text-muted-foreground">{tool.description}</div>
                  <div className="col-span-2">
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                      {tool.category}
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="sm" className="text-primary">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        {/* Other tab contents would be similar but filtered by category */}
      </Tabs>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Recently Used Tools</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.slice(0, 3).map((tool) => (
            <div
              key={`recent-${tool.id}`}
              className="flex items-center gap-3 rounded-md border border-border bg-card p-3"
            >
              <div className="rounded-md bg-primary/10 p-1.5">
                <tool.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{tool.name}</h4>
                <p className="text-xs text-muted-foreground">Last used 2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
