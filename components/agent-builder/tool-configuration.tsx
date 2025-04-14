"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar, FileText, Globe, Mail, MessageSquare, Phone, Save } from "lucide-react"

type ToolType = "calendar" | "email" | "call" | "web" | "document" | "messaging"

interface ToolTypeConfig {
  icon: React.ElementType
  name: string
  description: string
  fields: {
    name: string
    label: string
    type: "text" | "textarea" | "select" | "switch" | "code"
    options?: string[]
    placeholder?: string
  }[]
}

const toolTypeConfigs: Record<ToolType, ToolTypeConfig> = {
  calendar: {
    icon: Calendar,
    name: "Calendar Tool",
    description: "Configure a tool to manage calendar events and appointments",
    fields: [
      { name: "apiKey", label: "API Key", type: "text", placeholder: "Enter your calendar API key" },
      { name: "calendarId", label: "Calendar ID", type: "text", placeholder: "Enter your calendar ID" },
      {
        name: "eventDuration",
        label: "Default Event Duration",
        type: "select",
        options: ["15 minutes", "30 minutes", "45 minutes", "60 minutes"],
      },
      { name: "allowRescheduling", label: "Allow Rescheduling", type: "switch" },
    ],
  },
  email: {
    icon: Mail,
    name: "Email Tool",
    description: "Configure a tool to send and manage emails",
    fields: [
      { name: "smtpServer", label: "SMTP Server", type: "text", placeholder: "smtp.example.com" },
      { name: "smtpPort", label: "SMTP Port", type: "text", placeholder: "587" },
      { name: "emailAddress", label: "Email Address", type: "text", placeholder: "agent@example.com" },
      { name: "emailTemplate", label: "Email Template", type: "textarea", placeholder: "Enter your email template" },
      { name: "trackOpens", label: "Track Opens", type: "switch" },
    ],
  },
  call: {
    icon: Phone,
    name: "Call Tool",
    description: "Configure a tool to handle phone calls and voice interactions",
    fields: [
      { name: "phoneNumber", label: "Phone Number", type: "text", placeholder: "+1 (555) 123-4567" },
      {
        name: "callHandling",
        label: "Call Handling",
        type: "select",
        options: ["Auto Answer", "Manual Answer", "Voicemail"],
      },
      {
        name: "voicemailGreeting",
        label: "Voicemail Greeting",
        type: "textarea",
        placeholder: "Enter your voicemail greeting",
      },
      { name: "recordCalls", label: "Record Calls", type: "switch" },
    ],
  },
  web: {
    icon: Globe,
    name: "Web Tool",
    description: "Configure a tool to interact with web services and APIs",
    fields: [
      { name: "baseUrl", label: "Base URL", type: "text", placeholder: "https://api.example.com" },
      { name: "apiKey", label: "API Key", type: "text", placeholder: "Enter your API key" },
      {
        name: "requestMethod",
        label: "Request Method",
        type: "select",
        options: ["GET", "POST", "PUT", "DELETE"],
      },
      { name: "requestBody", label: "Request Body", type: "code", placeholder: '{\n  "key": "value"\n}' },
      { name: "useAuthentication", label: "Use Authentication", type: "switch" },
    ],
  },
  document: {
    icon: FileText,
    name: "Document Tool",
    description: "Configure a tool to generate and manage documents",
    fields: [
      { name: "templateId", label: "Template ID", type: "text", placeholder: "Enter your template ID" },
      {
        name: "documentFormat",
        label: "Document Format",
        type: "select",
        options: ["PDF", "DOCX", "TXT", "HTML"],
      },
      { name: "documentHeader", label: "Document Header", type: "textarea", placeholder: "Enter your document header" },
      { name: "documentFooter", label: "Document Footer", type: "textarea", placeholder: "Enter your document footer" },
      { name: "includeTimestamp", label: "Include Timestamp", type: "switch" },
    ],
  },
  messaging: {
    icon: MessageSquare,
    name: "Messaging Tool",
    description: "Configure a tool to send messages to various platforms",
    fields: [
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: ["Slack", "Discord", "Microsoft Teams", "Telegram"],
      },
      { name: "webhookUrl", label: "Webhook URL", type: "text", placeholder: "https://hooks.slack.com/services/..." },
      { name: "channelId", label: "Channel ID", type: "text", placeholder: "Enter your channel ID" },
      {
        name: "messageTemplate",
        label: "Message Template",
        type: "textarea",
        placeholder: "Enter your message template",
      },
      { name: "notifyUsers", label: "Notify Users", type: "switch" },
    ],
  },
}

export default function ToolConfiguration() {
  const [selectedToolType, setSelectedToolType] = useState<ToolType>("calendar")
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Tool configuration saved:", formData)
    // Here you would save the tool configuration
  }

  const toolConfig = toolTypeConfigs[selectedToolType]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-3">
        <toolConfig.icon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Configure {toolConfig.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Tool Type</h2>
            <Tabs
              value={selectedToolType}
              onValueChange={(value) => setSelectedToolType(value as ToolType)}
              className="w-full"
              orientation="vertical"
            >
              <TabsList className="flex w-full flex-col items-start justify-start">
                {(Object.keys(toolTypeConfigs) as ToolType[]).map((type) => (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className="flex w-full items-center justify-start gap-2 px-3 py-2 text-left"
                  >
                    <div className="rounded bg-primary/10 p-1">
                      {React.createElement(toolTypeConfigs[type].icon, { className: "h-4 w-4 text-primary" })}
                    </div>
                    <span>{toolTypeConfigs[type].name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-2 text-xl font-semibold text-foreground">{toolConfig.name} Configuration</h2>
            <p className="mb-6 text-sm text-muted-foreground">{toolConfig.description}</p>

            <div className="space-y-4">
              {toolConfig.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="text-foreground">
                    {field.label}
                  </Label>
                  {field.type === "text" && (
                    <Input
                      id={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="border-border bg-background text-foreground"
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      id={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="border-border bg-background text-foreground"
                    />
                  )}
                  {field.type === "select" && (
                    <Select
                      value={formData[field.name] || ""}
                      onValueChange={(value) => handleInputChange(field.name, value)}
                    >
                      <SelectTrigger id={field.name} className="border-border bg-background text-foreground">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "switch" && (
                    <div className="flex items-center gap-2">
                      <Switch
                        id={field.name}
                        checked={formData[field.name] || false}
                        onCheckedChange={(checked) => handleInputChange(field.name, checked)}
                      />
                      <Label htmlFor={field.name} className="text-sm text-muted-foreground">
                        {formData[field.name] ? "Enabled" : "Disabled"}
                      </Label>
                    </div>
                  )}
                  {field.type === "code" && (
                    <Textarea
                      id={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="font-mono border-border bg-background text-foreground"
                      rows={5}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Configuration
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
