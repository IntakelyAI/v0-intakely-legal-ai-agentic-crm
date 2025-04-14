"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { WorkflowState } from "@/types/agent"

interface StateEditorProps {
  state: WorkflowState
  onUpdate: (state: WorkflowState) => void
}

export default function StateEditor({ state, onUpdate }: StateEditorProps) {
  const [name, setName] = useState(state.name)
  const [type, setType] = useState(state.type)
  const [prompt, setPrompt] = useState(state.prompt)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    onUpdate({ ...state, name: e.target.value })
  }

  const handleTypeChange = (value: string) => {
    setType(value)
    onUpdate({ ...state, type: value })
  }

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
    onUpdate({ ...state, prompt: e.target.value })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#1e1e2a] p-4">
        <h2 className="text-lg font-medium text-white">{state.name}</h2>
        <p className="text-sm text-gray-400">{state.type}</p>
      </div>

      <Tabs defaultValue="prompt" className="flex-1">
        <TabsList className="mx-4 mt-4 grid w-[calc(100%-2rem)] grid-cols-2 bg-[#1e1e2a]">
          <TabsTrigger value="prompt" className="data-[state=active]:bg-[#2d2d3a]">
            Prompt
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#2d2d3a]">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="flex-1 overflow-auto p-4">
          <div className="mb-4 text-xs text-gray-400">Read stateful multi-prompt agent best practices.</div>
          <Textarea
            value={prompt}
            onChange={handlePromptChange}
            className="h-[calc(100vh-300px)] min-h-[300px] resize-none border-[#1e1e2a] bg-[#0d0d11] text-white"
          />
        </TabsContent>

        <TabsContent value="settings" className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="state-name" className="text-white">
                State Name
              </Label>
              <Input
                id="state-name"
                value={name}
                onChange={handleNameChange}
                className="mt-1 border-[#1e1e2a] bg-[#0d0d11] text-white"
              />
            </div>

            <div>
              <Label htmlFor="state-type" className="text-white">
                State Type
              </Label>
              <Select value={type} onValueChange={handleTypeChange}>
                <SelectTrigger id="state-type" className="mt-1 border-[#1e1e2a] bg-[#0d0d11] text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="border-[#1e1e2a] bg-[#13131a] text-white">
                  <SelectItem value="trigger">Trigger</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="condition">Condition</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium text-white">Tools (Optional)</h3>
              <p className="mb-4 text-xs text-gray-400">
                Enable this state with capabilities such as calendar bookings, call termination, or your own custom
                functions.
              </p>
              <div className="space-y-2">
                <div className="rounded-md border border-[#1e1e2a] bg-[#0d0d11] p-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                      <path d="M14.05 6A5 5 0 0 1 18 10" />
                    </svg>
                    <span className="text-sm text-white">End Call</span>
                  </div>
                </div>
                <div className="rounded-md border border-[#1e1e2a] bg-[#0d0d11] p-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-sm text-white">Call Transfer</span>
                  </div>
                </div>
                <div className="rounded-md border border-[#1e1e2a] bg-[#0d0d11] p-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h.01" />
                      <path d="M11 7h.01" />
                      <path d="M15 7h.01" />
                      <path d="M7 11h.01" />
                      <path d="M11 11h.01" />
                      <path d="M15 11h.01" />
                      <path d="M7 15h.01" />
                      <path d="M11 15h.01" />
                      <path d="M15 15h.01" />
                    </svg>
                    <span className="text-sm text-white">Press Digit (IVR Navigation)</span>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]">+ Add</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
