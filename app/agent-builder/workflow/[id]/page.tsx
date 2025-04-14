"use client"

import { useParams, useSearchParams } from "next/navigation"
import WorkflowBuilderPage from "@/components/agent-builder/workflow-builder-page"

export default function WorkflowPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const templateId = searchParams.get("template")

  return <WorkflowBuilderPage />
}
