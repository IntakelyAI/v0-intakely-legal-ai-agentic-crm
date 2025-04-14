"use client"

import { useParams } from "next/navigation"
import WorkflowBuilderPage from "@/components/agent-builder/workflow-builder-page"

export default function WorkflowPage() {
  const params = useParams()
  const id = params.id as string

  return <WorkflowBuilderPage />
}
