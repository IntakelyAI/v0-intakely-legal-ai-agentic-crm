"use client"

import { useState } from "react"
import AIAssistantChat from "./ai-assistant-chat"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatDemoPage() {
  const [showChat, setShowChat] = useState(true)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Assistant Chat Demo</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Chat Interface Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowChat(!showChat)} className="mb-4">
            {showChat ? "Hide Chat" : "Show Chat"}
          </Button>

          <div className="text-sm space-y-2">
            <p>This demo shows the AI Assistant Chat component that can be integrated throughout the CRM.</p>
            <p>The chat window can be:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Minimized to a button</li>
              <li>Expanded or collapsed</li>
              <li>Used for both text and voice input</li>
            </ul>
            <p className="mt-4">
              In a production environment, this would connect to your AI backend for real responses.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sample CRM Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This represents other content in your CRM interface.</p>
            <p className="mt-4">The chat window remains accessible while users navigate through different sections.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Try interacting with the chat window:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Type a message and press Enter or click Send</li>
              <li>Click the microphone icon to simulate voice input</li>
              <li>Minimize the chat to a button</li>
              <li>Expand or collapse the chat window</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {showChat && <AIAssistantChat />}
    </div>
  )
}
