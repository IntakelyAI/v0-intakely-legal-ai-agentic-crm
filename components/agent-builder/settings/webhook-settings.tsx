"use client"

import { useState } from "react"
import { Webhook, Plus, Trash2, AlertCircle, Bell, ClipboardList } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WebhookEndpoint {
  id: string
  name: string
  url: string
  active: boolean
  events: string[]
}

interface WebhookEvent {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface WebhookLog {
  id: string
  timestamp: string
  event: string
  status: "success" | "failed"
  endpoint: string
  responseCode: number
}

export function WebhookSettings() {
  const [activeTab, setActiveTab] = useState("endpoints")
  const [webhookEndpoints, setWebhookEndpoints] = useState<WebhookEndpoint[]>([
    {
      id: "webhook-1",
      name: "CRM Integration",
      url: "https://api.example.com/webhooks/crm",
      active: true,
      events: ["call.started", "call.ended", "call.transferred"],
    },
  ])
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([
    {
      id: "event-1",
      name: "call.started",
      description: "Triggered when a call is initiated",
      enabled: true,
    },
    {
      id: "event-2",
      name: "call.ended",
      description: "Triggered when a call is completed",
      enabled: true,
    },
    {
      id: "event-3",
      name: "call.transferred",
      description: "Triggered when a call is transferred to another agent",
      enabled: true,
    },
    {
      id: "event-4",
      name: "appointment.booked",
      description: "Triggered when an appointment is booked",
      enabled: false,
    },
  ])
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([
    {
      id: "log-1",
      timestamp: "2023-06-15 14:32:45",
      event: "call.started",
      status: "success",
      endpoint: "CRM Integration",
      responseCode: 200,
    },
    {
      id: "log-2",
      timestamp: "2023-06-15 14:45:12",
      event: "call.ended",
      status: "success",
      endpoint: "CRM Integration",
      responseCode: 200,
    },
    {
      id: "log-3",
      timestamp: "2023-06-15 15:01:23",
      event: "call.transferred",
      status: "failed",
      endpoint: "CRM Integration",
      responseCode: 500,
    },
  ])
  const [showAddEndpointDialog, setShowAddEndpointDialog] = useState(false)
  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    url: "",
  })

  const toggleEndpointStatus = (id: string) => {
    setWebhookEndpoints(
      webhookEndpoints.map((endpoint) => (endpoint.id === id ? { ...endpoint, active: !endpoint.active } : endpoint)),
    )
  }

  const deleteEndpoint = (id: string) => {
    setWebhookEndpoints(webhookEndpoints.filter((endpoint) => endpoint.id !== id))
  }

  const toggleEventStatus = (id: string) => {
    setWebhookEvents(webhookEvents.map((event) => (event.id === id ? { ...event, enabled: !event.enabled } : event)))
  }

  const addEndpoint = () => {
    if (newEndpoint.name && newEndpoint.url) {
      const newId = `webhook-${webhookEndpoints.length + 1}`
      setWebhookEndpoints([
        ...webhookEndpoints,
        {
          id: newId,
          name: newEndpoint.name,
          url: newEndpoint.url,
          active: true,
          events: [],
        },
      ])
      setNewEndpoint({ name: "", url: "" })
      setShowAddEndpointDialog(false)
    }
  }

  return (
    <div className="px-4 py-2 text-white">
      <div className="border-b border-[#1e1e2a] pb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#1e1e2a]">
            <TabsTrigger value="endpoints" className="data-[state=active]:bg-[#2d2d3d]">
              Endpoints
            </TabsTrigger>
            <TabsTrigger value="triggers" className="data-[state=active]:bg-[#2d2d3d]">
              Event Triggers
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-[#2d2d3d]">
              Logs
            </TabsTrigger>
          </TabsList>

          {/* Webhook Endpoints Tab */}
          <TabsContent value="endpoints" className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Webhook Endpoints</h3>
                <p className="text-sm text-gray-400">Configure external services to receive event notifications</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-[#1e1e2a] hover:bg-[#2d2d3d] border-[#3d3d4d]"
                onClick={() => setShowAddEndpointDialog(true)}
              >
                <Plus className="h-4 w-4" />
                Add Endpoint
              </Button>
            </div>

            <div className="space-y-4">
              {webhookEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="flex items-center justify-between p-3 bg-[#1e1e2a] rounded-md">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Webhook className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">{endpoint.name}</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{endpoint.url}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Events: {endpoint.events.length > 0 ? endpoint.events.join(", ") : "None"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Switch checked={endpoint.active} onCheckedChange={() => toggleEndpointStatus(endpoint.id)} />
                      <span className="text-sm">{endpoint.active ? "Active" : "Inactive"}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                      onClick={() => deleteEndpoint(endpoint.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {webhookEndpoints.length === 0 && (
                <div className="flex flex-col items-center justify-center p-6 bg-[#1e1e2a] rounded-md">
                  <Webhook className="h-12 w-12 text-gray-500 mb-2" />
                  <p className="text-gray-400">No webhook endpoints configured</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-[#2d2d3d] hover:bg-[#3d3d4d] border-[#3d3d4d]"
                    onClick={() => setShowAddEndpointDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Endpoint
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Webhook Event Triggers Tab */}
          <TabsContent value="triggers" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Webhook Event Triggers</h3>
              <p className="text-sm text-gray-400">Configure which events will trigger webhook notifications</p>
            </div>

            <div className="space-y-4">
              {webhookEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-[#1e1e2a] rounded-md">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">{event.name}</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{event.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={event.enabled} onCheckedChange={() => toggleEventStatus(event.id)} />
                    <span className="text-sm">{event.enabled ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Webhook Logs Tab */}
          <TabsContent value="logs" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Webhook Logs</h3>
              <p className="text-sm text-gray-400">View recent webhook delivery attempts and their status</p>
            </div>

            <div className="space-y-4">
              {webhookLogs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-center justify-between p-3 ${
                    log.status === "success" ? "bg-[#1e2a1e]" : "bg-[#2a1e1e]"
                  } rounded-md`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">{log.event}</span>
                      {log.status === "failed" && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {log.timestamp} • {log.endpoint}
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      log.status === "success" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                    }`}
                  >
                    {log.status === "success" ? "Success" : "Failed"} ({log.responseCode})
                  </div>
                </div>
              ))}

              {webhookLogs.length === 0 && (
                <div className="flex flex-col items-center justify-center p-6 bg-[#1e1e2a] rounded-md">
                  <ClipboardList className="h-12 w-12 text-gray-500 mb-2" />
                  <p className="text-gray-400">No webhook logs available</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Endpoint Dialog */}
      <Dialog open={showAddEndpointDialog} onOpenChange={setShowAddEndpointDialog}>
        <DialogContent className="bg-[#0d0d11] border-[#1e1e2a] text-white">
          <DialogHeader>
            <DialogTitle>Add Webhook Endpoint</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Endpoint Name</Label>
              <Input
                id="name"
                placeholder="CRM Integration"
                value={newEndpoint.name}
                onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                className="bg-[#1e1e2a] border-[#3d3d4d]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Webhook URL</Label>
              <Input
                id="url"
                placeholder="https://api.example.com/webhooks/callback"
                value={newEndpoint.url}
                onChange={(e) => setNewEndpoint({ ...newEndpoint, url: e.target.value })}
                className="bg-[#1e1e2a] border-[#3d3d4d]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="events">Events (Optional)</Label>
              <Select>
                <SelectTrigger className="bg-[#1e1e2a] border-[#3d3d4d]">
                  <SelectValue placeholder="Select events to trigger this webhook" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e1e2a] border-[#3d3d4d]">
                  {webhookEvents.map((event) => (
                    <SelectItem key={event.id} value={event.name}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">You can configure specific events after creating the endpoint</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddEndpointDialog(false)}
              className="bg-transparent hover:bg-[#1e1e2a] border-[#3d3d4d]"
            >
              Cancel
            </Button>
            <Button onClick={addEndpoint} className="bg-purple-600 hover:bg-purple-700">
              Add Endpoint
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
