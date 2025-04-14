"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Code, FileText } from "lucide-react"
import SettingsLayout from "./settings-layout"

// Mock data for functions
const mockFunctions = [
  {
    id: "func-1",
    name: "getClientInfo",
    description: "Retrieves client information from the CRM system",
    code: "async function getClientInfo(clientId) {\n  // API call to retrieve client data\n  const response = await fetch(`/api/clients/${clientId}`);\n  return response.json();\n}",
    isActive: true,
  },
  {
    id: "func-2",
    name: "scheduleAppointment",
    description: "Schedules a new appointment for a client",
    code: "async function scheduleAppointment(clientId, date, time, duration) {\n  // API call to schedule appointment\n  const response = await fetch('/api/appointments', {\n    method: 'POST',\n    body: JSON.stringify({ clientId, date, time, duration }),\n    headers: { 'Content-Type': 'application/json' }\n  });\n  return response.json();\n}",
    isActive: true,
  },
  {
    id: "func-3",
    name: "sendFollowUpEmail",
    description: "Sends a follow-up email to a client after a call",
    code: "async function sendFollowUpEmail(clientId, callId) {\n  // Get call details\n  const callDetails = await getCallDetails(callId);\n  \n  // Generate email content\n  const emailContent = generateEmailContent(callDetails);\n  \n  // Send email\n  const response = await fetch('/api/email', {\n    method: 'POST',\n    body: JSON.stringify({ clientId, subject: 'Follow-up from our call', content: emailContent }),\n    headers: { 'Content-Type': 'application/json' }\n  });\n  return response.json();\n}",
    isActive: false,
  },
]

// Mock templates
const mockTemplates = [
  {
    id: "template-1",
    name: "Client Information Retrieval",
    description: "Template for retrieving client information from various sources",
    code: "// Template for client information retrieval\nasync function getClientInfo(source, clientId) {\n  switch(source) {\n    case 'crm':\n      return await fetchFromCRM(clientId);\n    case 'database':\n      return await queryDatabase(clientId);\n    default:\n      throw new Error('Unknown source');\n  }\n}",
  },
  {
    id: "template-2",
    name: "Appointment Scheduling",
    description: "Template for scheduling appointments with validation",
    code: "// Template for appointment scheduling\nasync function scheduleAppointment(clientId, details) {\n  // Validate appointment details\n  if (!validateAppointmentDetails(details)) {\n    throw new Error('Invalid appointment details');\n  }\n  \n  // Check for conflicts\n  const hasConflicts = await checkForConflicts(details);\n  if (hasConflicts) {\n    throw new Error('Appointment time has conflicts');\n  }\n  \n  // Schedule the appointment\n  return await createAppointment(clientId, details);\n}",
  },
]

export default function FunctionsSettings() {
  const [selectedFunction, setSelectedFunction] = useState(mockFunctions[0])
  const [selectedTab, setSelectedTab] = useState("custom-functions")

  const functionTabs = [
    {
      id: "custom-functions",
      label: "Custom Functions",
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium text-white">Your Custom Functions</h3>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" /> Create Function
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-4">
              {mockFunctions.map((func) => (
                <Card
                  key={func.id}
                  className={`cursor-pointer border ${selectedFunction.id === func.id ? "border-purple-500 bg-[#2a2a3a]" : "border-[#2e2e3a] bg-[#1e1e2a]"}`}
                  onClick={() => setSelectedFunction(func)}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-md font-medium text-white">{func.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Switch id={`active-${func.id}`} checked={func.isActive} />
                      </div>
                    </div>
                    <CardDescription className="text-gray-400 text-sm mt-1">{func.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="md:col-span-2">
              <Card className="border-[#2e2e3a] bg-[#1e1e2a]">
                <CardHeader className="border-b border-[#2e2e3a] p-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium text-white">Function Details</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-500 border-blue-500 hover:bg-blue-500/10"
                      >
                        <Code className="h-4 w-4 mr-1" /> Test
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="function-name">Function Name</Label>
                    <Input id="function-name" value={selectedFunction.name} className="bg-[#0d0d11] border-[#2e2e3a]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="function-description">Description</Label>
                    <Textarea
                      id="function-description"
                      value={selectedFunction.description}
                      className="bg-[#0d0d11] border-[#2e2e3a] min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="function-code">Function Code</Label>
                    <Textarea
                      id="function-code"
                      value={selectedFunction.code}
                      className="bg-[#0d0d11] border-[#2e2e3a] font-mono text-sm min-h-[200px]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="function-active" checked={selectedFunction.isActive} />
                    <Label htmlFor="function-active">Active</Label>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[#2e2e3a] p-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 ml-auto">Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "function-templates",
      label: "Function Templates",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTemplates.map((template) => (
              <Card key={template.id} className="border-[#2e2e3a] bg-[#1e1e2a]">
                <CardHeader className="p-4">
                  <CardTitle className="text-md font-medium text-white">{template.name}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm mt-1">{template.description}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="text-blue-500 border-blue-500 hover:bg-blue-500/10">
                    <FileText className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-1" /> Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "function-settings",
      label: "Settings",
      content: (
        <div className="space-y-6">
          <Card className="border-[#2e2e3a] bg-[#1e1e2a]">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-medium text-white">Function Execution Settings</CardTitle>
              <CardDescription className="text-gray-400 text-sm">
                Configure how functions are executed by the AI agent
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="timeout-setting" className="text-white">
                    Function Timeout (seconds)
                  </Label>
                  <p className="text-sm text-gray-400">Maximum time a function can run before timing out</p>
                </div>
                <Input
                  id="timeout-setting"
                  type="number"
                  defaultValue="30"
                  className="bg-[#0d0d11] border-[#2e2e3a] w-24"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="retry-setting" className="text-white">
                    Max Retries
                  </Label>
                  <p className="text-sm text-gray-400">Number of times to retry a failed function</p>
                </div>
                <Input
                  id="retry-setting"
                  type="number"
                  defaultValue="3"
                  className="bg-[#0d0d11] border-[#2e2e3a] w-24"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Allow External API Calls</Label>
                  <p className="text-sm text-gray-400">Enable functions to make calls to external APIs</p>
                </div>
                <Switch id="external-api-setting" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Function Logging</Label>
                  <p className="text-sm text-gray-400">Log function calls and their results</p>
                </div>
                <Switch id="function-logging-setting" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#2e2e3a] p-4">
              <Button className="bg-purple-600 hover:bg-purple-700 ml-auto">Save Settings</Button>
            </CardFooter>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <SettingsLayout
      title="Functions"
      description="Create and manage custom functions that your AI agent can call during conversations"
      tabs={functionTabs}
    />
  )
}
