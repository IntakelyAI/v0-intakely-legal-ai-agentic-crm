"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { templates } from "@/data/templates"

export default function TemplateGallery() {
  const [filter, setFilter] = useState("all")

  const filteredTemplates = filter === "all" ? templates : templates.filter((template) => template.category === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
        >
          All Templates
        </Button>
        <Button
          variant={filter === "intake" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("intake")}
          className={filter === "intake" ? "bg-purple-600 hover:bg-purple-700" : ""}
        >
          Intake
        </Button>
        <Button
          variant={filter === "billing" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("billing")}
          className={filter === "billing" ? "bg-purple-600 hover:bg-purple-700" : ""}
        >
          Billing
        </Button>
        <Button
          variant={filter === "document" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("document")}
          className={filter === "document" ? "bg-purple-600 hover:bg-purple-700" : ""}
        >
          Document
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="bg-gray-900 border-gray-800 hover:border-purple-600/50 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">{template.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/agent-builder/workflow/${template.id}?template=${template.id}`} className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Use Template</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
