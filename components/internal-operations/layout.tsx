import type { ReactNode } from "react"

export default function InternalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 overflow-auto bg-gray-950">
      <main className="p-6">{children}</main>
    </div>
  )
}
