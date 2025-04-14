"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SettingsLayoutProps {
  children: ReactNode
  title: string
  description: string
  tabs?: {
    id: string
    label: string
    content: ReactNode
  }[]
}

export default function SettingsLayout({ children, title, description, tabs }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>

      {tabs ? (
        <Tabs defaultValue={tabs[0].id} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 lg:grid-cols-5">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card className="bg-[#1e1e2a] border-[#2e2e3a] text-white">
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      )}
    </div>
  )
}
