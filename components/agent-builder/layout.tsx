import type React from "react"

interface AgentBuilderLayoutProps {
  children: React.ReactNode
}

export default function AgentBuilderLayout({ children }: AgentBuilderLayoutProps) {
  return <div className="h-full overflow-auto">{children}</div>
}
