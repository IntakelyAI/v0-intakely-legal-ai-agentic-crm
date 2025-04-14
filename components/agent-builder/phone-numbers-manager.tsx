"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Phone, ArrowLeftRight } from "lucide-react"

interface PhoneNumber {
  id: string
  number: string
  provider: string
  inboundAgent: string
  outboundAgent: string
  hasWebhook: boolean
  webhookUrl?: string
}

export default function PhoneNumbersManager() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([
    {
      id: "12727771112",
      number: "+1 (272) 777-1112",
      provider: "Custom telephony",
      inboundAgent: "Real-Estate-Outbound-Appointment-Setter-(Australia)",
      outboundAgent: "Real-Estate-Outbound-Appointment-Setter-(Australia)",
      hasWebhook: false,
    },
  ])

  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(phoneNumbers[0])
  const [showAddOptions, setShowAddOptions] = useState(false)
  const [showBuyNumberDialog, setShowBuyNumberDialog] = useState(false)
  const [showSipTrunkingDialog, setShowSipTrunkingDialog] = useState(false)
  const [outboundDropdownOpen, setOutboundDropdownOpen] = useState(false)
  const [inboundDropdownOpen, setInboundDropdownOpen] = useState(false)

  // Form states
  const [webhookUrl, setWebhookUrl] = useState("")

  // Available agents
  const availableAgents = [
    "None (disable outbound)",
    "Real-Estate-Outbound-Appointment-Setter-(Australia)",
    "Oakwood-Law-Firm-Intake-Benjamin",
    "Healthcare-Exchange-Inbound-Agent-Samuel (USA)",
    "Multi state agent",
    "Custom LLM agent",
  ]

  const handleSelectNumber = (number: PhoneNumber) => {
    setSelectedNumber(number)
  }

  const handleAddWebhook = (checked: boolean) => {
    if (selectedNumber) {
      const updatedNumber = {
        ...selectedNumber,
        hasWebhook: checked,
        webhookUrl: checked ? webhookUrl : undefined,
      }

      setSelectedNumber(updatedNumber)
      setPhoneNumbers(phoneNumbers.map((num) => (num.id === selectedNumber.id ? updatedNumber : num)))
    }
  }

  const handleWebhookUrlChange = (url: string) => {
    setWebhookUrl(url)
    if (selectedNumber && selectedNumber.hasWebhook) {
      const updatedNumber = { ...selectedNumber, webhookUrl: url }
      setSelectedNumber(updatedNumber)
      setPhoneNumbers(phoneNumbers.map((num) => (num.id === selectedNumber.id ? updatedNumber : num)))
    }
  }

  const handleChangeAgent = (type: "inbound" | "outbound", agent: string) => {
    if (selectedNumber) {
      const updatedNumber =
        type === "inbound" ? { ...selectedNumber, inboundAgent: agent } : { ...selectedNumber, outboundAgent: agent }

      setSelectedNumber(updatedNumber)
      setPhoneNumbers(phoneNumbers.map((num) => (num.id === selectedNumber.id ? updatedNumber : num)))
    }
  }

  const handleBuyNumber = () => {
    // Logic to buy a new number would go here
    setShowBuyNumberDialog(false)
  }

  const handleConnectSip = () => {
    // Logic to connect via SIP trunking would go here
    setShowSipTrunkingDialog(false)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-[#1e1e2a] p-4">
        <h1 className="text-lg font-medium text-white">Phone Numbers</h1>
        <div className="relative">
          <Button
            onClick={() => setShowAddOptions(!showAddOptions)}
            className="bg-white text-black hover:bg-gray-200 rounded-full h-10 w-10 p-0"
          >
            <Plus className="h-5 w-5" />
          </Button>

          {showAddOptions && (
            <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-md border border-[#1e1e2a] bg-[#13131a] shadow-md">
              <div className="py-1">
                <button
                  className="flex w-full items-center px-4 py-3 text-white hover:bg-[#1e1e2a]"
                  onClick={() => {
                    setShowAddOptions(false)
                    setShowBuyNumberDialog(true)
                  }}
                >
                  <Plus className="mr-3 h-5 w-5" />
                  Buy New Number
                </button>
                <button
                  className="flex w-full items-center px-4 py-3 text-white hover:bg-[#1e1e2a]"
                  onClick={() => {
                    setShowAddOptions(false)
                    setShowSipTrunkingDialog(true)
                  }}
                >
                  <ArrowLeftRight className="mr-3 h-5 w-5" />
                  Connect to your number via SIP trunking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Phone Numbers List */}
        <div className="w-64 border-r border-[#1e1e2a] bg-[#0d0d11] overflow-y-auto">
          {phoneNumbers.map((number) => (
            <button
              key={number.id}
              className={`flex w-full items-center px-4 py-3 text-left hover:bg-[#1e1e2a] ${
                selectedNumber?.id === number.id ? "bg-[#1e1e2a] text-white" : "text-gray-400"
              }`}
              onClick={() => handleSelectNumber(number)}
            >
              <Phone className="mr-3 h-5 w-5" />
              <span>{number.number}</span>
            </button>
          ))}
        </div>

        {/* Phone Number Details */}
        {selectedNumber ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-white">{selectedNumber.number}</h2>
                <Button variant="ghost" size="icon" className="ml-2 text-gray-400 hover:text-white">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <Button className="bg-[#1e1e2a] hover:bg-[#2d2d3a] text-white">Make an outbound call</Button>
            </div>

            <div className="mb-6 text-sm text-gray-400">
              ID: {selectedNumber.id} • Provider: {selectedNumber.provider}
            </div>

            <div className="space-y-8">
              {/* Inbound Call Agent */}
              <div>
                <h3 className="mb-3 text-lg font-medium text-white">Inbound call agent</h3>
                <Select
                  value={selectedNumber.inboundAgent}
                  onValueChange={(value) => handleChangeAgent("inbound", value)}
                >
                  <SelectTrigger className="w-full bg-[#13131a] border-[#1e1e2a] text-white">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#13131a] border-[#1e1e2a] text-white">
                    {availableAgents
                      .filter((agent) => agent !== "None (disable outbound)")
                      .map((agent) => (
                        <SelectItem key={agent} value={agent}>
                          {agent}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <div className="mt-4 flex items-center space-x-2">
                  <Checkbox id="webhook" checked={selectedNumber.hasWebhook} onCheckedChange={handleAddWebhook} />
                  <label
                    htmlFor="webhook"
                    className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Add an inbound webhook. <span className="text-blue-400">(Learn more)</span>.
                  </label>
                </div>

                {selectedNumber.hasWebhook && (
                  <div className="mt-3">
                    <Input
                      placeholder="Enter Url"
                      value={selectedNumber.webhookUrl || ""}
                      onChange={(e) => handleWebhookUrlChange(e.target.value)}
                      className="bg-[#13131a] border-[#1e1e2a] text-white"
                    />
                  </div>
                )}
              </div>

              {/* Outbound Call Agent */}
              <div>
                <h3 className="mb-3 text-lg font-medium text-white">Outbound call agent</h3>
                <Select
                  value={selectedNumber.outboundAgent}
                  onValueChange={(value) => handleChangeAgent("outbound", value)}
                >
                  <SelectTrigger className="w-full bg-[#13131a] border-[#1e1e2a] text-white">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#13131a] border-[#1e1e2a] text-white">
                    {availableAgents.map((agent) => (
                      <SelectItem key={agent} value={agent}>
                        {agent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400">Select a phone number to view details</p>
          </div>
        )}
      </div>

      {/* Buy Number Dialog */}
      <Dialog open={showBuyNumberDialog} onOpenChange={setShowBuyNumberDialog}>
        <DialogContent className="sm:max-w-[500px] bg-[#0d0d11] border-[#1e1e2a] text-white">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Buy a new phone number</h2>
            <p className="text-gray-400 mb-6">
              Select a country and area code to purchase a new phone number for your agents.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-white mb-2 block">Country</label>
                <Select defaultValue="us">
                  <SelectTrigger className="w-full bg-[#13131a] border-[#1e1e2a] text-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#13131a] border-[#1e1e2a] text-white">
                    <SelectItem value="us">United States (+1)</SelectItem>
                    <SelectItem value="ca">Canada (+1)</SelectItem>
                    <SelectItem value="uk">United Kingdom (+44)</SelectItem>
                    <SelectItem value="au">Australia (+61)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-white mb-2 block">Area Code (Optional)</label>
                <Input placeholder="e.g. 415" className="bg-[#13131a] border-[#1e1e2a] text-white" />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowBuyNumberDialog(false)}
                className="border-[#1e1e2a] text-white hover:bg-[#1e1e2a]"
              >
                Cancel
              </Button>
              <Button onClick={handleBuyNumber} className="bg-white text-black hover:bg-gray-200">
                Buy Number
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SIP Trunking Dialog */}
      <Dialog open={showSipTrunkingDialog} onOpenChange={setShowSipTrunkingDialog}>
        <DialogContent className="sm:max-w-[500px] bg-[#0d0d11] border-[#1e1e2a] text-white">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Connect via SIP Trunking</h2>
            <p className="text-gray-400 mb-6">Connect your existing phone system to Intakely using SIP trunking.</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-white mb-2 block">Phone Number</label>
                <Input placeholder="+1 (555) 123-4567" className="bg-[#13131a] border-[#1e1e2a] text-white" />
              </div>

              <div>
                <label className="text-sm text-white mb-2 block">SIP URI</label>
                <Input placeholder="sip:example.com" className="bg-[#13131a] border-[#1e1e2a] text-white" />
              </div>

              <div>
                <label className="text-sm text-white mb-2 block">Authentication Username (Optional)</label>
                <Input placeholder="username" className="bg-[#13131a] border-[#1e1e2a] text-white" />
              </div>

              <div>
                <label className="text-sm text-white mb-2 block">Authentication Password (Optional)</label>
                <Input type="password" placeholder="••••••••" className="bg-[#13131a] border-[#1e1e2a] text-white" />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowSipTrunkingDialog(false)}
                className="border-[#1e1e2a] text-white hover:bg-[#1e1e2a]"
              >
                Cancel
              </Button>
              <Button onClick={handleConnectSip} className="bg-white text-black hover:bg-gray-200">
                Connect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
