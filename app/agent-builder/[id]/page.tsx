"use client"

import { useParams } from "next/navigation"
import AgentBuilderLayout from "@/components/agent-builder/layout"
import AgentConfiguration from "@/components/agent-builder/agent-configuration"
import { agents } from "@/data/agents"

export default function AgentDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Find the agent by ID
  const agent = agents.find((a) => a.id === id) || agents[0]

  return (
    <AgentBuilderLayout>
      <AgentConfiguration agent={agent} />
    </AgentBuilderLayout>
  )
}
