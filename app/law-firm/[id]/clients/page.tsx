"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react"

export default function LawFirmClients({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-8" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>Manage your firm's clients and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b bg-muted/50 px-4 py-2 font-medium">
              <div>Name</div>
              <div>Contact</div>
              <div>Type</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            {[
              { name: "Acme Corporation", contact: "John Smith", type: "Corporate", status: "Active" },
              { name: "TechStart Inc.", contact: "Sarah Johnson", type: "Corporate", status: "Active" },
              { name: "Robert Williams", contact: "Robert Williams", type: "Individual", status: "Active" },
              { name: "Global Enterprises", contact: "Michael Chen", type: "Corporate", status: "Inactive" },
              { name: "Jennifer Davis", contact: "Jennifer Davis", type: "Individual", status: "Active" },
            ].map((client, i) => (
              <div key={i} className="grid grid-cols-5 items-center px-4 py-3 border-b last:border-0">
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-muted-foreground">{client.contact}</div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      client.type === "Corporate" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {client.type}
                  </span>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      client.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {client.status}
                  </span>
                </div>
                <div className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
