"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Send, Minimize, Maximize, MessageSquare, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface AIAssistantChatProps {
  className?: string
  initialMessages?: Message[]
  onSendMessage?: (message: string) => Promise<string>
}

export default function AIAssistantChat({ className, initialMessages = [], onSendMessage }: AIAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isExpanded, isMinimized])

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // If onSendMessage is provided, use it to get the response
      // Otherwise, use a mock response for demo purposes
      const response = onSendMessage ? await onSendMessage(inputValue) : await mockAssistantResponse(inputValue)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Here you would implement actual voice recording functionality
    if (!isRecording) {
      // Start recording
      console.log("Starting voice recording...")
    } else {
      // Stop recording and process
      console.log("Stopping voice recording...")

      // Mock receiving voice input
      setTimeout(() => {
        const voiceInput = "This is a simulated voice message from the user."
        setInputValue(voiceInput)
      }, 1000)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Mock assistant response function for demo purposes
  const mockAssistantResponse = async (message: string): Promise<string> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const responses = [
      "I've updated the client record with that information.",
      "The document has been generated and saved to the matter folder.",
      "I've scheduled that meeting for you and sent invitations to all participants.",
      "Based on the case details, I recommend reviewing the precedent in Smith v. Jones (2021).",
      "I've analyzed the contract and flagged three potential issues in section 4.2.",
      "The invoice has been generated and sent to the client.",
      "I've added that task to your priority list for tomorrow.",
      "The client's matter history shows three previous consultations on this issue.",
      "I've updated the billing record with the time entry.",
      "Would you like me to prepare a draft response to that email?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isMinimized) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className)}>
        <Button
          onClick={toggleMinimize}
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <Card
      className={cn(
        "fixed z-50 shadow-lg transition-all duration-200 dark:bg-card dark:border-border",
        isExpanded ? "bottom-4 right-4 w-96 h-[600px]" : "bottom-4 right-4 w-80 h-[450px]",
        className,
      )}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground dark:bg-primary/90">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h3 className="font-medium">Intakely Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          {isExpanded ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleExpand}
              className="h-7 w-7 text-primary-foreground hover:bg-primary/80 dark:hover:bg-primary/70"
            >
              <Minimize className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleExpand}
              className="h-7 w-7 text-primary-foreground hover:bg-primary/80 dark:hover:bg-primary/70"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMinimize}
            className="h-7 w-7 text-primary-foreground hover:bg-primary/80 dark:hover:bg-primary/70"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <CardContent className="p-0 flex flex-col h-full dark:bg-card">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
              <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
              <p className="mb-2">How can I assist you today?</p>
              <p className="text-sm">Ask me about clients, matters, documents, or any other CRM tasks.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col max-w-[85%] rounded-lg p-3 space-y-1",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground dark:bg-primary/90"
                    : "bg-secondary dark:bg-secondary/50 dark:text-secondary-foreground",
                )}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 self-end">{formatTime(message.timestamp)}</span>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex max-w-[85%] rounded-lg p-3 bg-secondary dark:bg-secondary/50">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t dark:border-border">
          <div className="flex items-end gap-2">
            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[60px] resize-none dark:bg-secondary/30 dark:border-border"
            />
            <div className="flex flex-col gap-2">
              <Button
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className="h-10 w-10 dark:border-border dark:bg-secondary/30 dark:hover:bg-secondary/50"
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === "" || isLoading}
                size="icon"
                className="h-10 w-10"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
