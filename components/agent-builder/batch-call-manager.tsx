"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, ArrowLeft, Download, Upload, Calendar } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface BatchCall {
  id: string
  name: string
  fromNumber: string
  recipients: string[]
  scheduledTime?: Date
  status: "draft" | "scheduled" | "completed" | "in-progress"
  createdAt: Date
}

export default function BatchCallManager() {
  const [batchCalls, setBatchCalls] = useState<BatchCall[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [sendOption, setSendOption] = useState("now")
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Form state
  const [batchCallName, setBatchCallName] = useState("")
  const [fromNumber, setFromNumber] = useState("+1 (272) 777-1112")

  // Available phone numbers
  const phoneNumbers = [
    {
      number: "+1 (272) 777-1112",
      agent: "Real-Estate-Outbound-Appointment-Setter-(Australia)",
    },
  ]

  const handleCreateBatchCall = () => {
    setShowCreateForm(true)
  }

  const handleCloseForm = () => {
    setShowCreateForm(false)
    resetForm()
  }

  const resetForm = () => {
    setBatchCallName("")
    setFromNumber("+1 (272) 777-1112")
    setSendOption("now")
    setScheduledTime(null)
    setUploadedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleSaveAsDraft = () => {
    const newBatchCall: BatchCall = {
      id: `batch-${Date.now()}`,
      name: batchCallName || "Untitled Batch Call",
      fromNumber,
      recipients: [],
      status: "draft",
      createdAt: new Date(),
    }

    if (sendOption === "schedule" && scheduledTime) {
      newBatchCall.scheduledTime = scheduledTime
      newBatchCall.status = "scheduled"
    }

    setBatchCalls([...batchCalls, newBatchCall])
    setShowCreateForm(false)
    resetForm()
  }

  const handleSend = () => {
    // In a real app, this would initiate the batch call
    handleSaveAsDraft()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-[#1e1e2a] p-4">
        <h1 className="text-lg font-medium text-white">Batch Call</h1>
        <Button onClick={handleCreateBatchCall} className="bg-white text-black hover:bg-gray-200">
          Create a batch call
        </Button>
      </div>

      {showCreateForm ? (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCloseForm}
                    className="mr-2 text-gray-400 hover:text-white"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-xl font-bold text-white">Create a batch call</h2>
                </div>
                <p className="text-sm text-gray-400">Batch call cost $0.005 per dial</p>
              </div>

              <div className="space-y-6 max-w-2xl">
                {/* Batch Call Name */}
                <div>
                  <label htmlFor="batch-name" className="block text-white mb-2">
                    Batch Call Name
                  </label>
                  <Input
                    id="batch-name"
                    placeholder="Enter"
                    value={batchCallName}
                    onChange={(e) => setBatchCallName(e.target.value)}
                    className="bg-[#13131a] border-[#1e1e2a] text-white"
                  />
                </div>

                {/* From Number */}
                <div>
                  <label htmlFor="from-number" className="block text-white mb-2">
                    From number
                  </label>
                  <Select value={fromNumber} onValueChange={setFromNumber}>
                    <SelectTrigger id="from-number" className="bg-[#13131a] border-[#1e1e2a] text-white">
                      <SelectValue placeholder="Select a number" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#13131a] border-[#1e1e2a] text-white">
                      {phoneNumbers.map((phone) => (
                        <SelectItem key={phone.number} value={phone.number}>
                          {phone.number} ({phone.agent.length > 25 ? phone.agent.substring(0, 25) + "..." : phone.agent}
                          )
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Upload Recipients */}
                <div>
                  <label className="block text-white mb-2">Upload Recipients</label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-4 border-[#1e1e2a] text-gray-400 hover:text-white hover:bg-[#1e1e2a]"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download the template
                  </Button>

                  <div
                    className="border border-dashed border-[#1e1e2a] rounded-md p-8 text-center cursor-pointer hover:bg-[#13131a]"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <input id="file-upload" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                    <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                    <p className="text-white mb-1">Choose a csv or drag & drop it here.</p>
                    <p className="text-sm text-gray-400">Up to 50 MB</p>
                  </div>
                </div>

                {/* When to send the calls */}
                <div>
                  <label className="block text-white mb-2">When to send the calls</label>
                  <RadioGroup value={sendOption} onValueChange={setSendOption} className="flex space-x-4">
                    <div className="flex-1">
                      <div
                        className={`flex items-center justify-between p-4 rounded-md border ${sendOption === "now" ? "border-white bg-[#1e1e2a]" : "border-[#1e1e2a] bg-[#13131a]"}`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="now" id="send-now" className="mr-2" />
                          <Label htmlFor="send-now" className="text-white">
                            Send Now
                          </Label>
                        </div>
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`flex items-center justify-between p-4 rounded-md border ${sendOption === "schedule" ? "border-white bg-[#1e1e2a]" : "border-[#1e1e2a] bg-[#13131a]"}`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="schedule" id="schedule" className="mr-2" />
                          <Label htmlFor="schedule" className="text-white">
                            Schedule
                          </Label>
                        </div>
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </RadioGroup>

                  {sendOption === "schedule" && (
                    <div className="mt-4">
                      <Input
                        type="datetime-local"
                        className="bg-[#13131a] border-[#1e1e2a] text-white"
                        onChange={(e) => setScheduledTime(new Date(e.target.value))}
                      />
                    </div>
                  )}
                </div>

                {/* Estimated Time */}
                <div>
                  <label className="block text-white mb-2">Estimated Time to complete calls</label>
                  <div className="p-4 bg-[#13131a] border border-[#1e1e2a] rounded-md text-gray-400">
                    Please add recipients first
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleSaveAsDraft}
                    className="border-[#1e1e2a] text-white hover:bg-[#1e1e2a]"
                  >
                    Save as draft
                  </Button>
                  <Button
                    onClick={handleSend}
                    className="bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]"
                    disabled={!batchCallName || !uploadedFile}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recipients Panel */}
          <div className="w-80 border-l border-[#1e1e2a] bg-[#0d0d11] p-6">
            <h3 className="text-lg font-medium text-white mb-6">Recipients</h3>
            <div className="flex items-center justify-center h-40 text-gray-400 text-center">
              Please upload recipients first
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-md bg-white flex items-center justify-center mb-4">
            <Phone className="h-8 w-8 text-black" />
          </div>
          <p className="text-white mb-6">You don't have any batch call</p>
          <Button onClick={handleCreateBatchCall} className="bg-white text-black hover:bg-gray-200">
            Create a batch call
          </Button>
        </div>
      )}
    </div>
  )
}
