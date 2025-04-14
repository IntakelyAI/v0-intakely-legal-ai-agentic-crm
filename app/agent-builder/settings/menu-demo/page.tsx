import AgentBuilderLayout from "@/components/agent-builder/layout"
import { ExpandableMenuItem } from "@/components/agent-builder/expandable-menu-item"
import { Phone, PhoneForwarded, Calendar, Hash, Code, Clock, MessageSquare } from "lucide-react"

export default function MenuDemoPage() {
  // Function options as shown in the image
  const functionOptions = [
    {
      id: "end-call",
      label: "End Call",
      icon: <Phone className="h-4 w-4" />,
      onClick: () => console.log("End Call clicked"),
    },
    {
      id: "call-transfer",
      label: "Call Transfer",
      icon: <PhoneForwarded className="h-4 w-4" />,
      onClick: () => console.log("Call Transfer clicked"),
    },
    {
      id: "check-calendar",
      label: "Check Calendar Availability (Cal.com)",
      icon: <Calendar className="h-4 w-4" />,
      onClick: () => console.log("Check Calendar clicked"),
    },
    {
      id: "book-calendar",
      label: "Book on the Calendar (Cal.com)",
      icon: <Calendar className="h-4 w-4" />,
      onClick: () => console.log("Book Calendar clicked"),
    },
    {
      id: "press-digit",
      label: "Press Digit (IVR Navigation)",
      icon: <Hash className="h-4 w-4" />,
      onClick: () => console.log("Press Digit clicked"),
    },
    {
      id: "custom-function",
      label: "Custom Function",
      icon: <Code className="h-4 w-4" />,
      onClick: () => console.log("Custom Function clicked"),
    },
  ]

  return (
    <AgentBuilderLayout>
      <div className="max-w-md mx-auto mt-8 bg-[#0d0d11] border border-[#1e1e2a] rounded-md overflow-hidden">
        <ExpandableMenuItem
          icon={<Code className="h-5 w-5" />}
          label="Functions"
          description="Enable your agent with capabilities such as calendar bookings, call termination, etc."
          options={functionOptions}
        />

        <ExpandableMenuItem
          icon={<Calendar className="h-5 w-5" />}
          label="Calendar"
          description="Configure calendar integration settings"
          options={[
            {
              id: "connect-calendar",
              label: "Connect Calendar",
              icon: <Calendar className="h-4 w-4" />,
              onClick: () => console.log("Connect Calendar clicked"),
            },
            {
              id: "availability",
              label: "Set Availability",
              icon: <Clock className="h-4 w-4" />,
              onClick: () => console.log("Set Availability clicked"),
            },
          ]}
        />

        <ExpandableMenuItem
          icon={<Phone className="h-5 w-5" />}
          label="Phone Settings"
          description="Configure phone call settings"
          options={[
            {
              id: "voicemail",
              label: "Voicemail Settings",
              icon: <MessageSquare className="h-4 w-4" />,
              onClick: () => console.log("Voicemail Settings clicked"),
            },
            {
              id: "forwarding",
              label: "Call Forwarding",
              icon: <PhoneForwarded className="h-4 w-4" />,
              onClick: () => console.log("Call Forwarding clicked"),
            },
          ]}
        />
      </div>
    </AgentBuilderLayout>
  )
}
