import type { ReactNode } from "react"

export default function LawFirmLayout({ children }: { children: ReactNode }) {
  return <div className="flex-1 overflow-auto">{children}</div>
}
