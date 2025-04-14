"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import {
  User,
  BookOpen,
  Phone,
  FileText,
  ChevronDown,
  Grid,
  Headphones,
  Shield,
  Webhook,
  MessageSquare,
  Calendar,
  Hash,
  Code,
  PhoneForwarded,
  Upload,
  Link2,
  FileTextIcon,
  Settings,
  Database,
  LineChart,
  Wrench,
  Mail,
  Globe,
  ChevronsLeft,
  ChevronsRight,
  Bell,
  Cog,
  Search,
  Building,
  Plus,
  Clock,
  Users,
  CreditCard,
  BarChart,
  HelpCircle,
  Briefcase,
  Users2,
  MessageCircle,
  Moon,
  Sun,
  UserCircle,
  FileBox,
  Gavel,
  Receipt,
  ClipboardSignature,
  DollarSign,
  UserPlus,
  Building2,
  ShieldCheck,
  Bot,
  Target,
  PresentationIcon,
  Rocket,
  FileCheck,
  HeartHandshake,
  CheckSquare,
  Workflow,
  ActivityIcon,
  TrendingUp,
  FolderArchive,
  Landmark,
} from "lucide-react"
import { SpeechSettings } from "./settings/speech-settings"
import { CallSettings } from "./settings/call-settings"
import { PostCallAnalysis } from "./settings/post-call-analysis"
import { SecurityFallbackSettings } from "./settings/security-fallback-settings"
import { WebhookSettings } from "./settings/webhook-settings"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SecondaryMenuItem } from "@/components/shared/secondary-menu-item"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  children?: { label: string; href: string; icon?: React.ReactNode }[]
  searchBar?: boolean
  recentItems?: { name: string; href: string; region: string }[]
  createButton?: { label: string; href: string }
}

interface ConfigItem {
  icon: React.ReactNode
  label: string
  description?: string
  items?: { label: string; href: string }[]
}

// Interface for law firm data
interface LawFirm {
  id: string
  name: string
  region: string
  href: string
}

// Move allLawFirms outside the component or use useMemo
const allLawFirms: LawFirm[] = [
  {
    id: "smith-associates",
    name: "Smith & Associates",
    region: "Eastern Regional Space",
    href: "/law-firm/smith-associates",
  },
  {
    id: "johnson-legal",
    name: "Johnson Legal Group",
    region: "Midwest Regional Space",
    href: "/law-firm/johnson-legal",
  },
  {
    id: "williams-law",
    name: "Williams Law Partners",
    region: "Western Regional Space",
    href: "/law-firm/williams-law",
  },
  {
    id: "davis-miller",
    name: "Davis & Miller LLP",
    region: "Southern Regional Space",
    href: "/law-firm/davis-miller",
  },
  { id: "oakwood-law", name: "Oakwood Law Firm", region: "California Regional Space", href: "/law-firm/oakwood-law" },
]

export default function CollapsibleNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [showAgentConfig, setShowAgentConfig] = useState(false)
  const [showLawFirmConfig, setShowLawFirmConfig] = useState(false)
  const [showInternalOpsConfig, setShowInternalOpsConfig] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState<string[]>([])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showSpeechSettings, setShowSpeechSettings] = useState(false)
  const [showCallSettings, setShowCallSettings] = useState(false)
  const [showPostCallAnalysis, setShowPostCallAnalysis] = useState(false)
  const [showSecuritySettings, setShowSecuritySettings] = useState(false)
  const [showWebhookSettings, setShowWebhookSettings] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false)
  const [selectedLawFirm, setSelectedLawFirm] = useState<LawFirm | null>(null)

  // Recent law firms the user has worked with
  const recentLawFirms = allLawFirms.slice(0, 4)

  // Determine current section for header display
  const getCurrentSection = () => {
    if (pathname === "/") return { name: "Your Regional Team Space", icon: <Bot className="h-6 w-6" /> }
    if (pathname.includes("/internal-operations"))
      return { name: "Intakely Operations", icon: <Building className="h-6 w-6" /> }
    if (pathname.includes("/agent-builder")) return { name: "Agent Builder", icon: <User className="h-6 w-6" /> }

    // Check if we're in a specific law firm route
    const lawFirmMatch = pathname.match(/\/law-firm\/([^/]+)/)
    if (lawFirmMatch && lawFirmMatch[1] !== "create") {
      const firmId = lawFirmMatch[1]
      const firm = allLawFirms.find((f) => f.id === firmId)
      if (firm) {
        return { name: firm.region, icon: <Briefcase className="h-6 w-6" /> }
      }
    }

    if (pathname.includes("/law-firm")) return { name: "Spaces : Law Firms", icon: <Briefcase className="h-6 w-6" /> }
    return { name: "Intakely", icon: <div className="h-8 w-8 rounded-md bg-primary"></div> }
  }

  const currentSection = getCurrentSection()

  // Detect if we're in an agent configuration page, law firm page, or internal operations page and auto-collapse the menu
  useEffect(() => {
    // Check for agent builder routes
    if (
      pathname === "/agent-builder" ||
      (pathname.startsWith("/agent-builder/") &&
        !pathname.includes("/workflow") &&
        !pathname.includes("/knowledge-base") &&
        !pathname.includes("/phone-numbers") &&
        !pathname.includes("/batch-call") &&
        !pathname.includes("/call-history") &&
        !pathname.includes("/analytics") &&
        !pathname.includes("/tools"))
    ) {
      setShowAgentConfig(true)
      setShowLawFirmConfig(false)
      setShowInternalOpsConfig(false)
      setCollapsed(true) // Collapse only when secondary menu appears
      setSelectedLawFirm(null)

      // Open the Agent Builder section in the menu
      if (!openSections.includes("Agent Builder")) {
        setOpenSections((prev) => [...prev, "Agent Builder"])
      }
    } else if (pathname.includes("/agent-builder/") && pathname.includes("/workflow")) {
      setShowAgentConfig(false)
      setShowLawFirmConfig(false)
      setShowInternalOpsConfig(false)
      setCollapsed(true) // Collapse for workflow pages too
      setSelectedLawFirm(null)
    } else if (pathname.includes("/internal-operations")) {
      // Show internal operations config
      setShowInternalOpsConfig(true)
      setShowAgentConfig(false)
      setShowLawFirmConfig(false)
      setCollapsed(true)
      setSelectedLawFirm(null)
    } else {
      // Check for law firm routes
      const lawFirmMatch = pathname.match(/\/law-firm\/([^/]+)/)
      if (lawFirmMatch && lawFirmMatch[1] !== "create") {
        const firmId = lawFirmMatch[1]
        const firm = allLawFirms.find((f) => f.id === firmId)

        if (firm) {
          setSelectedLawFirm(firm)
          setShowLawFirmConfig(true)
          setShowAgentConfig(false)
          setShowInternalOpsConfig(false)
          setCollapsed(true) // Collapse when showing law firm config
        } else {
          setShowLawFirmConfig(false)
          setShowAgentConfig(false)
          setShowInternalOpsConfig(false)
          setSelectedLawFirm(null)
        }
      } else if (pathname === "/law-firm") {
        // On the main law firm page
        setShowLawFirmConfig(false)
        setShowAgentConfig(false)
        setShowInternalOpsConfig(false)
        setCollapsed(false)
        setSelectedLawFirm(null)
      } else {
        // Any other page
        setShowAgentConfig(false)
        setShowLawFirmConfig(false)
        setShowInternalOpsConfig(false)
        setCollapsed(false) // Keep expanded for other pages
        setSelectedLawFirm(null)
      }
    }
  }, [pathname, openSections]) // Remove allLawFirms from the dependency array

  // Rearranged main nav items according to the requested order
  const mainNavItems: NavItem[] = [
    {
      icon: <Bot className="h-5 w-5" />,
      label: "Personal Assistant",
      href: "/", // Keep original dashboard link
      active: pathname === "/",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: "Spaces : Law Firms",
      href: "/law-firm",
      active: pathname.includes("/law-firm"),
      searchBar: true,
      recentItems: recentLawFirms,
      createButton: { label: "Create New Space", href: "/law-firm/create" },
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Agent Builder",
      href: "/agent-builder",
      active: pathname.includes("/agent-builder"),
      children: [
        { label: "Agents", href: "/agent-builder", icon: <User className="h-4 w-4" /> },
        { label: "Knowledge Base", href: "/agent-builder/knowledge-base", icon: <BookOpen className="h-4 w-4" /> },
        { label: "Phone Numbers", href: "/agent-builder/phone-numbers", icon: <Phone className="h-4 w-4" /> },
        { label: "Batch Call", href: "/agent-builder/batch-call", icon: <FileText className="h-4 w-4" /> },
        { label: "Call History", href: "/agent-builder/call-history", icon: <Clock className="h-4 w-4" /> },
        { label: "Analytics", href: "/agent-builder/analytics", icon: <BarChart className="h-4 w-4" /> },
        { label: "Tools", href: "/agent-builder/tools", icon: <Wrench className="h-4 w-4" /> },
      ],
    },
    {
      icon: <Building className="h-5 w-5" />,
      label: "Intakely Operations",
      href: "/internal-operations",
      active: pathname.includes("/internal-operations"),
      children: [
        {
          label: "Internal User Management & Team Assignments",
          href: "/internal-operations/user-management",
          icon: <Users className="h-4 w-4" />,
        },
        {
          label: "Market Targeting, Lead Generation & Outreach",
          href: "/internal-operations/marketing",
          icon: <Target className="h-4 w-4" />,
        },
        {
          label: "Sales Demos & Conversion Tracking",
          href: "/internal-operations/sales",
          icon: <PresentationIcon className="h-4 w-4" />,
        },
        {
          label: "AI-Led Onboarding & Workspace Provisioning",
          href: "/internal-operations/onboarding",
          icon: <Rocket className="h-4 w-4" />,
        },
        {
          label: "Subscription, Contract & Billing Terms",
          href: "/internal-operations/billing",
          icon: <CreditCard className="h-4 w-4" />,
        },
        {
          label: "Customer Success & Lifecycle Nurturing",
          href: "/internal-operations/customer-success",
          icon: <HeartHandshake className="h-4 w-4" />,
        },
        {
          label: "Task Management, Automation & Logs",
          href: "/internal-operations/tasks",
          icon: <CheckSquare className="h-4 w-4" />,
        },
        {
          label: "Internal Automation & AI Workflows",
          href: "/internal-operations/automation",
          icon: <Workflow className="h-4 w-4" />,
        },
        {
          label: "Internal Activity & Event Logging",
          href: "/internal-operations/logging",
          icon: <ActivityIcon className="h-4 w-4" />,
        },
        {
          label: "Internal Performance Metrics & KPIs",
          href: "/internal-operations/performance",
          icon: <TrendingUp className="h-4 w-4" />,
        },
      ],
    },
  ]

  // Function options as shown in the image
  const functionOptions = [
    {
      id: "end-call",
      label: "End Call",
      icon: <Phone className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("End Call clicked"),
    },
    {
      id: "call-transfer",
      label: "Call Transfer",
      icon: <PhoneForwarded className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Call Transfer clicked"),
    },
    {
      id: "check-calendar",
      label: "Check Calendar Availability (Cal.com)",
      icon: <Calendar className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Check Calendar clicked"),
    },
    {
      id: "book-calendar",
      label: "Book on the Calendar (Cal.com)",
      icon: <Calendar className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Book Calendar clicked"),
    },
    {
      id: "press-digit",
      label: "Press Digit (IVR Navigation)",
      icon: <Hash className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Press Digit clicked"),
    },
    {
      id: "custom-function",
      label: "Custom Function",
      icon: <Code className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Custom Function clicked"),
    },
  ]

  // Knowledge Base options based on our existing functionality
  const knowledgeBaseOptions = [
    {
      id: "add-web-page",
      label: "Add Web Pages",
      icon: <Link2 className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Add Web Pages clicked"),
    },
    {
      id: "upload-files",
      label: "Upload Files",
      icon: <Upload className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Upload Files clicked"),
    },
    {
      id: "add-text",
      label: "Add Text",
      icon: <FileTextIcon className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Add Text clicked"),
    },
    {
      id: "manage-documents",
      label: "Manage Documents",
      icon: <Database className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Manage Documents clicked"),
    },
    {
      id: "kb-settings",
      label: "Knowledge Base Settings",
      icon: <Settings className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Knowledge Base Settings clicked"),
    },
  ]

  // Tools options for the expandable menu
  const toolsOptions = [
    {
      id: "calendar-tool",
      label: "Calendar Tool",
      icon: <Calendar className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Calendar Tool clicked"),
    },
    {
      id: "email-tool",
      label: "Email Tool",
      icon: <Mail className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Email Tool clicked"),
    },
    {
      id: "call-tool",
      label: "Call Tool",
      icon: <Phone className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Call Tool clicked"),
    },
    {
      id: "web-tool",
      label: "Web Search Tool",
      icon: <Globe className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Web Search Tool clicked"),
    },
    {
      id: "custom-tool",
      label: "Custom Tool",
      icon: <Wrench className="h-4 w-4" />,
      href: "#",
      onClick: () => console.log("Custom Tool clicked"),
    },
  ]

  // First, let's replace the existing law firm menu options with the new structure

  // Replace the existing clientManagementOptions, matterManagementOptions, billingFinanceOptions, and documentManagementOptions with these new options:

  // Communications options
  const communicationsOptions = [
    {
      id: "email",
      label: "Email",
      icon: <Mail className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/communications/email` : "#",
    },
    {
      id: "chat",
      label: "Chat",
      icon: <MessageCircle className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/communications/chat` : "#",
    },
    {
      id: "phone",
      label: "Phone",
      icon: <Phone className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/communications/phone` : "#",
    },
  ]

  // Appointments options
  const appointmentsOptions = [
    {
      id: "calendar",
      label: "Calendar",
      icon: <Calendar className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/appointments/calendar` : "#",
    },
    {
      id: "scheduling",
      label: "Scheduling",
      icon: <Clock className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/appointments/scheduling` : "#",
    },
  ]

  // Interactions/Tasks/Tags/CustomFields options
  const interactionsOptions = [
    {
      id: "tasks",
      label: "Tasks",
      icon: <FileText className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/interactions/tasks` : "#",
    },
    {
      id: "tags",
      label: "Tags",
      icon: <Hash className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/interactions/tags` : "#",
    },
    {
      id: "custom-fields",
      label: "Custom Fields",
      icon: <Database className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/interactions/custom-fields` : "#",
    },
  ]

  // Agenda options
  const agendaOptions = [
    {
      id: "daily",
      label: "Daily Agenda",
      icon: <Calendar className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/agenda/daily` : "#",
    },
    {
      id: "weekly",
      label: "Weekly Agenda",
      icon: <Calendar className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/agenda/weekly` : "#",
    },
  ]

  // Documents options
  const documentsOptions = [
    {
      id: "files",
      label: "Files",
      icon: <FileBox className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/documents/files` : "#",
    },
    {
      id: "templates",
      label: "Templates",
      icon: <FileText className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/documents/templates` : "#",
    },
    {
      id: "e-signatures",
      label: "E-Signatures",
      icon: <ClipboardSignature className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/documents/e-signatures` : "#",
    },
  ]

  // Billing options
  const billingOptions = [
    {
      id: "invoices",
      label: "Invoices",
      icon: <Receipt className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/billing/invoices` : "#",
    },
    {
      id: "payments",
      label: "Payments",
      icon: <DollarSign className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/billing/payments` : "#",
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: <CreditCard className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/billing/expenses` : "#",
    },
  ]

  // Intake/Matter/Cases options
  const intakeOptions = [
    {
      id: "intake",
      label: "Intake Forms",
      icon: <FileText className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/intake/forms` : "#",
    },
    {
      id: "matters",
      label: "Matters",
      icon: <Briefcase className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/intake/matters` : "#",
    },
    {
      id: "cases",
      label: "Cases",
      icon: <Gavel className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/intake/cases` : "#",
    },
  ]

  // Leads/Clients/Companies/Contacts options
  const leadsClientsOptions = [
    {
      id: "leads",
      label: "Leads",
      icon: <UserPlus className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/contacts/leads` : "#",
    },
    {
      id: "clients",
      label: "Clients",
      icon: <UserCircle className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/contacts/clients` : "#",
    },
    {
      id: "companies",
      label: "Companies",
      icon: <Building2 className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/contacts/companies` : "#",
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: <Users2 className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/contacts/contacts` : "#",
    },
  ]

  // Account Settings options
  const accountSettingsOptions = [
    {
      id: "profile",
      label: "Profile",
      icon: <UserCircle className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/settings/profile` : "#",
    },
    {
      id: "team",
      label: "Team Members",
      icon: <Users className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/settings/team` : "#",
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: <Settings className="h-4 w-4" />,
      href: selectedLawFirm ? `${selectedLawFirm.href}/settings/preferences` : "#",
    },
  ]

  // Now let's create the new Intakely Operations menu options

  // 1. Internal User Management & Team Assignments
  const internalUserManagementOptions = [
    {
      id: "users",
      label: "Users",
      icon: <Users className="h-4 w-4" />,
      href: "/internal-operations/user-management/users",
    },
    {
      id: "teams",
      label: "Teams",
      icon: <Users2 className="h-4 w-4" />,
      href: "/internal-operations/user-management/teams",
    },
    {
      id: "roles",
      label: "Roles & Permissions",
      icon: <ShieldCheck className="h-4 w-4" />,
      href: "/internal-operations/user-management/roles",
    },
    {
      id: "assignments",
      label: "Team Assignments",
      icon: <FileCheck className="h-4 w-4" />,
      href: "/internal-operations/user-management/assignments",
    },
  ]

  // 2. Market Targeting, Lead Generation & Outreach
  const marketTargetingOptions = [
    {
      id: "targeting",
      label: "Market Targeting",
      icon: <Target className="h-4 w-4" />,
      href: "/internal-operations/marketing/targeting",
    },
    {
      id: "lead-generation",
      label: "Lead Generation",
      icon: <UserPlus className="h-4 w-4" />,
      href: "/internal-operations/marketing/lead-generation",
    },
    {
      id: "outreach",
      label: "Outreach Campaigns",
      icon: <Mail className="h-4 w-4" />,
      href: "/internal-operations/marketing/outreach",
    },
  ]

  // 3. Sales Demos & Conversion Tracking
  const salesDemosOptions = [
    {
      id: "demos",
      label: "Sales Demos",
      icon: <PresentationIcon className="h-4 w-4" />,
      href: "/internal-operations/sales/demos",
    },
    {
      id: "conversion",
      label: "Conversion Tracking",
      icon: <LineChart className="h-4 w-4" />,
      href: "/internal-operations/sales/conversion",
    },
    {
      id: "pipeline",
      label: "Sales Pipeline",
      icon: <BarChart className="h-4 w-4" />,
      href: "/internal-operations/sales/pipeline",
    },
  ]

  // 4. AI-Led Onboarding & Workspace Provisioning
  const aiOnboardingOptions = [
    {
      id: "onboarding",
      label: "AI-Led Onboarding",
      icon: <Rocket className="h-4 w-4" />,
      href: "/internal-operations/onboarding/ai-led",
    },
    {
      id: "workspace",
      label: "Workspace Provisioning",
      icon: <Building2 className="h-4 w-4" />,
      href: "/internal-operations/onboarding/workspace",
    },
    {
      id: "templates",
      label: "Onboarding Templates",
      icon: <FileText className="h-4 w-4" />,
      href: "/internal-operations/onboarding/templates",
    },
  ]

  // 5. Subscription, Contract & Billing Terms
  const subscriptionContractOptions = [
    {
      id: "subscriptions",
      label: "Subscriptions",
      icon: <CreditCard className="h-4 w-4" />,
      href: "/internal-operations/billing/subscriptions",
    },
    {
      id: "contracts",
      label: "Contracts",
      icon: <FileCheck className="h-4 w-4" />,
      href: "/internal-operations/billing/contracts",
    },
    {
      id: "billing-terms",
      label: "Billing Terms",
      icon: <Landmark className="h-4 w-4" />,
      href: "/internal-operations/billing/terms",
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: <Receipt className="h-4 w-4" />,
      href: "/internal-operations/billing/invoices",
    },
  ]

  // 6. Customer Success & Lifecycle Nurturing
  const customerSuccessOptions = [
    {
      id: "success",
      label: "Customer Success",
      icon: <HeartHandshake className="h-4 w-4" />,
      href: "/internal-operations/customer-success/management",
    },
    {
      id: "lifecycle",
      label: "Lifecycle Nurturing",
      icon: <ActivityIcon className="h-4 w-4" />,
      href: "/internal-operations/customer-success/lifecycle",
    },
    {
      id: "support",
      label: "Support Tickets",
      icon: <HelpCircle className="h-4 w-4" />,
      href: "/internal-operations/customer-success/support",
    },
  ]

  // 7. Task Management & Assignments
  const taskManagementOptions = [
    {
      id: "tasks",
      label: "Tasks",
      icon: <CheckSquare className="h-4 w-4" />,
      href: "/internal-operations/tasks/all",
    },
    {
      id: "assignments",
      label: "Task Assignments",
      icon: <Users className="h-4 w-4" />,
      href: "/internal-operations/tasks/assignments",
    },
    {
      id: "deadlines",
      label: "Deadlines & Reminders",
      icon: <Clock className="h-4 w-4" />,
      href: "/internal-operations/tasks/deadlines",
    },
  ]

  // 8. Internal Automation & AI Workflows
  const internalAutomationOptions = [
    {
      id: "automation",
      label: "Automation Rules",
      icon: <Workflow className="h-4 w-4" />,
      href: "/internal-operations/automation/rules",
    },
    {
      id: "ai-workflows",
      label: "AI Workflows",
      icon: <Bot className="h-4 w-4" />,
      href: "/internal-operations/automation/ai-workflows",
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: <Link2 className="h-4 w-4" />,
      href: "/internal-operations/automation/integrations",
    },
  ]

  // 9. Internal Activity & Event Logging
  const internalActivityOptions = [
    {
      id: "activity-logs",
      label: "Activity Logs",
      icon: <ActivityIcon className="h-4 w-4" />,
      href: "/internal-operations/logging/activity",
    },
    {
      id: "event-logs",
      label: "Event Logs",
      icon: <FileText className="h-4 w-4" />,
      href: "/internal-operations/logging/events",
    },
    {
      id: "audit-trails",
      label: "Audit Trails",
      icon: <FolderArchive className="h-4 w-4" />,
      href: "/internal-operations/logging/audit",
    },
  ]

  // 10. Internal Performance Metrics & KPIs
  const internalPerformanceOptions = [
    {
      id: "metrics",
      label: "Performance Metrics",
      icon: <BarChart className="h-4 w-4" />,
      href: "/internal-operations/performance/metrics",
    },
    {
      id: "kpis",
      label: "KPIs",
      icon: <TrendingUp className="h-4 w-4" />,
      href: "/internal-operations/performance/kpis",
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FileText className="h-4 w-4" />,
      href: "/internal-operations/performance/reports",
    },
  ]

  const handleMouseEnter = (label: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setHoveredItem(label)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 300)
  }

  const toggleSection = (label: string) => {
    setOpenSections((prev) => (prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]))
  }

  const toggleSpeechSettings = () => {
    setShowSpeechSettings(!showSpeechSettings)
  }

  const toggleCallSettings = () => {
    setShowCallSettings(!showCallSettings)
  }

  const togglePostCallAnalysis = () => {
    setShowPostCallAnalysis(!showPostCallAnalysis)
  }

  const toggleSecuritySettings = () => {
    setShowSecuritySettings(!showSecuritySettings)
  }

  const toggleWebhookSettings = () => {
    setShowWebhookSettings(!showWebhookSettings)
  }

  // Handle navigation to agent pages
  const handleAgentNavigation = (href: string) => {
    // If navigating to an agent page, collapse the menu
    if (href.startsWith("/agent-builder")) {
      setCollapsed(true)
    }
  }

  // Handle navigation to law firm pages
  const handleLawFirmNavigation = (firm: LawFirm) => {
    // Set the selected law firm first
    setSelectedLawFirm(firm)
    setShowLawFirmConfig(true)
    setShowAgentConfig(false)
    setShowInternalOpsConfig(false)
    setCollapsed(true)

    // Then navigate to the firm's dashboard page
    router.push(`${firm.href}/dashboard`)
  }

  // Filter law firms based on search query
  const filteredLawFirms = allLawFirms.filter((firm) => firm.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col h-full">
      {/* Header - dynamically shows the current section or selected law firm's region */}
      <header className="w-64 h-16 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {currentSection.icon}
          <span className="text-xl font-bold">{currentSection.name}</span>
        </div>
      </header>

      {/* Navigation */}
      <div className="flex h-full flex-1">
        {/* Main Navigation */}
        <div
          className={cn(
            "flex h-full flex-col border-r border-border bg-background transition-all duration-300",
            collapsed ? "w-16" : "w-64",
          )}
        >
          <div className="flex items-center justify-end p-2">
            <button
              onClick={() => {
                setCollapsed(!collapsed)
                // If expanding, reset all secondary menus
                if (collapsed) {
                  setShowAgentConfig(false)
                  setShowLawFirmConfig(false)
                  setShowInternalOpsConfig(false)
                }
              }}
              className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {collapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto scrollable">
              <div className="flex flex-col space-y-1 p-3">
                {mainNavItems.map((item) => (
                  <div key={item.label} className="relative">
                    {item.children || item.searchBar ? (
                      <div>
                        <div
                          className={cn(
                            "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium cursor-pointer",
                            pathname.includes(item.href.split("/")[1])
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                          )}
                          onClick={() => {
                            // If menu is collapsed, expand it first
                            if (collapsed) {
                              setCollapsed(false)
                              // After expanding, open this section
                              if (!openSections.includes(item.label)) {
                                setOpenSections((prev) => [...prev, item.label])
                              }
                            } else {
                              toggleSection(item.label)
                            }
                          }}
                          onMouseEnter={() => handleMouseEnter(item.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="flex items-center">
                            <div className="flex h-5 w-5 items-center justify-center">{item.icon}</div>
                            {!collapsed && <span className="ml-3">{item.label}</span>}
                          </div>
                          {!collapsed && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                openSections.includes(item.label) ? "rotate-180" : "",
                              )}
                            />
                          )}
                          {collapsed && hoveredItem === item.label && (
                            <span className="absolute left-16 z-50 bg-popover px-3 py-2 rounded-md whitespace-nowrap">
                              {item.label}
                            </span>
                          )}
                        </div>
                        {!collapsed && openSections.includes(item.label) && (
                          <div className="mt-1 space-y-1">
                            {/* Search bar for Law Firm CRM */}
                            {item.searchBar && (
                              <div className="px-3 py-2">
                                <div className="relative">
                                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Search law firms..."
                                    className="pl-8 h-9 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Recent items for Law Firm CRM */}
                            {item.recentItems && (
                              <div className="px-3 py-1">
                                <h4 className="text-xs font-semibold text-muted-foreground mb-2">RECENT LAW FIRMS</h4>
                                <div className="space-y-1">
                                  {(searchQuery ? filteredLawFirms : item.recentItems).map((firm) => (
                                    <button
                                      key={firm.href}
                                      className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                      onClick={() => handleLawFirmNavigation(firm)}
                                    >
                                      {firm.name}
                                    </button>
                                  ))}
                                  {searchQuery && filteredLawFirms.length === 0 && (
                                    <p className="text-xs text-muted-foreground px-3 py-2">
                                      No matching law firms found
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Create button for Law Firm CRM */}
                            {item.createButton && (
                              <div className="px-3 py-1 mt-2">
                                <Link
                                  href={item.createButton.href}
                                  className="flex items-center justify-center gap-1 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                  <Plus className="h-4 w-4" />
                                  {item.createButton.label}
                                </Link>
                              </div>
                            )}

                            {/* Regular menu items - only for non-Law Firm sections */}
                            {!item.searchBar && item.children && (
                              <div className="ml-8 space-y-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={cn(
                                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                                      pathname === child.href
                                        ? "bg-accent/50 text-accent-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                    )}
                                    onClick={() => handleAgentNavigation(child.href)}
                                  >
                                    {child.icon && child.icon}
                                    <span>{child.label}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                          item.active
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                        onClick={() => {
                          setActiveItem(item.label)
                          // If menu is collapsed, expand it first
                          if (collapsed) {
                            setCollapsed(false)
                          }
                          // Reset all secondary menus when clicking a main menu item
                          setShowAgentConfig(false)
                          setShowLawFirmConfig(false)
                          setShowInternalOpsConfig(false)
                        }}
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="flex h-5 w-5 items-center justify-center">{item.icon}</div>
                        {!collapsed && <span className="ml-3">{item.label}</span>}
                        {collapsed && hoveredItem === item.label && (
                          <span className="absolute left-16 z-50 bg-popover px-3 py-2 rounded-md whitespace-nowrap">
                            {item.label}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom navigation items */}
            <div className="mt-auto p-3 border-t border-border">
              <div className="space-y-1">
                {/* Contacts button */}
                <button
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => console.log("Contacts clicked")}
                  onMouseEnter={() => handleMouseEnter("Contacts")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex h-5 w-5 items-center justify-center">
                    <Users2 className="h-5 w-5" />
                  </div>
                  {!collapsed && <span className="ml-3">Contacts</span>}
                  {collapsed && hoveredItem === "Contacts" && (
                    <span className="absolute left-16 z-50 bg-popover px-3 py-2 rounded-md whitespace-nowrap">
                      Contacts
                    </span>
                  )}
                </button>

                {/* Channels button */}
                <button
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => console.log("Channels clicked")}
                  onMouseEnter={() => handleMouseEnter("Channels")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex h-5 w-5 items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  {!collapsed && <span className="ml-3">Channels</span>}
                  {collapsed && hoveredItem === "Channels" && (
                    <span className="absolute left-16 z-50 bg-popover px-3 py-2 rounded-md whitespace-nowrap">
                      Channels
                    </span>
                  )}
                </button>

                {/* Notifications button */}
                <button
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => console.log("Notifications clicked")}
                  onMouseEnter={() => handleMouseEnter("Notifications")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      3
                    </span>
                  </div>
                  {!collapsed && <span className="ml-3">Notifications</span>}
                  {collapsed && hoveredItem === "Notifications" && (
                    <span className="absolute left-16 z-50 bg-popover px-3 py-2 rounded-md whitespace-nowrap">
                      Notifications
                    </span>
                  )}
                </button>

                {/* Settings dropdown with theme options */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                      onMouseEnter={() => handleMouseEnter("Settings")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex h-5 w-5 items-center justify-center">
                        <Cog className="h-5 w-5" />
                      </div>
                      {!collapsed && <span className="ml-3">Settings</span>}
                      {collapsed && hoveredItem === "Settings" && (
                        <span className="absolute left-16 z-50 bg-popover px-3 py-2 rounded-md whitespace-nowrap">
                          Settings
                        </span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log("Account settings clicked")}>
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Preferences clicked")}>Preferences</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
                      <Sun className="h-4 w-4" /> Light Theme
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
                      <Moon className="h-4 w-4" /> Dark Theme
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
                      <Settings className="h-4 w-4" /> System Theme
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Configuration Menu - Only show for specific agent-builder routes */}
        {showAgentConfig && (
          <div className="w-64 border-r border-[#1e1e2a] bg-[#121218] overflow-hidden">
            <div className="h-full overflow-y-auto scrollable">
              <div className="flex flex-col py-2">
                {/* Functions expandable menu */}
                <SecondaryMenuItem
                  icon={<Grid className="h-5 w-5" />}
                  label="Functions"
                  description="Enable your agent with capabilities such as calendar bookings, call termination, etc."
                  options={functionOptions}
                  showAddButton
                />

                {/* Knowledge Base expandable menu */}
                <SecondaryMenuItem
                  icon={<BookOpen className="h-5 w-5" />}
                  label="Knowledge Base"
                  description="Enhance your agent with domain-specific information and documents."
                  options={knowledgeBaseOptions}
                  showAddButton
                />

                {/* Tools expandable menu */}
                <SecondaryMenuItem
                  icon={<Wrench className="h-5 w-5" />}
                  label="Tools"
                  description="Access and manage tools for your agent to use during conversations."
                  options={toolsOptions}
                  showAddButton
                />

                {/* Speech Settings - using our component */}
                <div className="border-b border-[#1e1e2a] last:border-b-0">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={toggleSpeechSettings}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      <span className="text-white font-medium">Speech Settings</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform duration-200",
                        showSpeechSettings ? "rotate-180" : "",
                      )}
                    />
                  </div>

                  {showSpeechSettings && <SpeechSettings />}
                </div>

                {/* Call Settings - using our component */}
                <div className="border-b border-[#1e1e2a] last:border-b-0">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={toggleCallSettings}
                  >
                    <div className="flex items-center gap-3">
                      <Headphones className="h-5 w-5 text-purple-500" />
                      <span className="text-white font-medium">Call Settings</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform duration-200",
                        showCallSettings ? "rotate-180" : "",
                      )}
                    />
                  </div>

                  {showCallSettings && <CallSettings />}
                </div>

                {/* Post-Call Analysis - using our component */}
                <div className="border-b border-[#1e1e2a] last:border-b-0">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={togglePostCallAnalysis}
                  >
                    <div className="flex items-center gap-3">
                      <LineChart className="h-5 w-5 text-purple-500" />
                      <span className="text-white font-medium">Post-Call Analysis</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform duration-200",
                        showPostCallAnalysis ? "rotate-180" : "",
                      )}
                    />
                  </div>

                  {showPostCallAnalysis && <PostCallAnalysis />}
                </div>

                {/* Security &amp; Fallback Settings - using our component */}
                <div className="border-b border-[#1e1e2a] last:border-b-0">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={toggleSecuritySettings}
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple-500" />
                      <span className="text-white font-medium">Security &amp; Fallback Settings</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform duration-200",
                        showSecuritySettings ? "rotate-180" : "",
                      )}
                    />
                  </div>

                  {showSecuritySettings && <SecurityFallbackSettings />}
                </div>

                {/* Webhook Settings - using our component */}
                <div className="border-b border-[#1e1e2a] last:border-b-0">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={toggleWebhookSettings}
                  >
                    <div className="flex items-center gap-3">
                      <Webhook className="h-5 w-5 text-purple-500" />
                      <span className="text-white font-medium">Webhook Settings</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform duration-200",
                        showWebhookSettings ? "rotate-180" : "",
                      )}
                    />
                  </div>

                  {showWebhookSettings && <WebhookSettings />}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Internal Operations Configuration Menu - Only show for internal operations routes */}
        {showInternalOpsConfig && (
          <div className="w-64 border-r border-[#1e1e2a] bg-[#121218] overflow-hidden">
            <div className="h-full overflow-y-auto scrollable">
              <div className="flex flex-col py-2">
                {/* 1. Internal User Management & Team Assignments */}
                <SecondaryMenuItem
                  icon={<Users className="h-5 w-5" />}
                  label="Internal User Management & Team Assignments"
                  description="Manage internal users, teams, roles, and assignments."
                  options={internalUserManagementOptions}
                  showAddButton
                />

                {/* 2. Market Targeting, Lead Generation & Outreach */}
                <SecondaryMenuItem
                  icon={<Target className="h-5 w-5" />}
                  label="Market Targeting, Lead Generation & Outreach"
                  description="Define target markets, generate leads, and manage outreach campaigns."
                  options={marketTargetingOptions}
                  showAddButton
                />

                {/* 3. Sales Demos & Conversion Tracking */}
                <SecondaryMenuItem
                  icon={<PresentationIcon className="h-5 w-5" />}
                  label="Sales Demos & Conversion Tracking"
                  description="Schedule and track sales demos and monitor conversion rates."
                  options={salesDemosOptions}
                  showAddButton
                />

                {/* 4. AI-Led Onboarding & Workspace Provisioning */}
                <SecondaryMenuItem
                  icon={<Rocket className="h-5 w-5" />}
                  label="AI-Led Onboarding & Workspace Provisioning"
                  description="Automate customer onboarding and workspace setup with AI."
                  options={aiOnboardingOptions}
                  showAddButton
                />

                {/* 5. Subscription, Contract & Billing Terms */}
                <SecondaryMenuItem
                  icon={<CreditCard className="h-5 w-5" />}
                  label="Subscription, Contract & Billing Terms"
                  description="Manage subscriptions, contracts, and billing terms."
                  options={subscriptionContractOptions}
                  showAddButton
                />

                {/* 6. Customer Success & Lifecycle Nurturing */}
                <SecondaryMenuItem
                  icon={<HeartHandshake className="h-5 w-5" />}
                  label="Customer Success & Lifecycle Nurturing"
                  description="Ensure customer success and nurture customer relationships."
                  options={customerSuccessOptions}
                  showAddButton
                />

                {/* 7. Task Management & Assignments */}
                <SecondaryMenuItem
                  icon={<CheckSquare className="h-5 w-5" />}
                  label="Task Management & Assignments"
                  description="Create, assign, and track internal tasks and deadlines."
                  options={taskManagementOptions}
                  showAddButton
                />

                {/* 8. Internal Automation & AI Workflows */}
                <SecondaryMenuItem
                  icon={<Workflow className="h-5 w-5" />}
                  label="Internal Automation & AI Workflows"
                  description="Create and manage internal automation rules and AI workflows."
                  options={internalAutomationOptions}
                  showAddButton
                />

                {/* 9. Internal Activity & Event Logging */}
                <SecondaryMenuItem
                  icon={<ActivityIcon className="h-5 w-5" />}
                  label="Internal Activity & Event Logging"
                  description="Track and monitor internal activities, events, and audit trails."
                  options={internalActivityOptions}
                  showAddButton={false}
                />

                {/* 10. Internal Performance Metrics & KPIs */}
                <SecondaryMenuItem
                  icon={<TrendingUp className="h-5 w-5" />}
                  label="Internal Performance Metrics & KPIs"
                  description="Monitor and analyze internal performance metrics and KPIs."
                  options={internalPerformanceOptions}
                  showAddButton={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Law Firm Configuration Menu - Only show when a law firm is selected */}
        {showLawFirmConfig && selectedLawFirm && (
          <div className="w-64 border-r border-[#1e1e2a] bg-[#121218] overflow-hidden">
            <div className="h-full overflow-y-auto scrollable">
              <div className="flex flex-col py-2">
                {/* Communications */}
                <SecondaryMenuItem
                  icon={<MessageCircle className="h-5 w-5" />}
                  label="Communications"
                  description="Manage emails, chats, and phone communications."
                  options={communicationsOptions}
                  showAddButton
                />

                {/* Appointments */}
                <SecondaryMenuItem
                  icon={<Calendar className="h-5 w-5" />}
                  label="Appointments"
                  description="Schedule and manage appointments and meetings."
                  options={appointmentsOptions}
                  showAddButton
                />

                {/* Interactions/Tasks/Tags/CustomFields */}
                <SecondaryMenuItem
                  icon={<FileText className="h-5 w-5" />}
                  label="Interactions/Tasks/Tags/CustomFields"
                  description="Manage tasks, tags, and custom fields for contacts."
                  options={interactionsOptions}
                  showAddButton
                />

                {/* Agenda */}
                <SecondaryMenuItem
                  icon={<Calendar className="h-5 w-5" />}
                  label="Agenda"
                  description="View and manage your daily and weekly agenda."
                  options={agendaOptions}
                  showAddButton={false}
                />

                {/* Documents */}
                <SecondaryMenuItem
                  icon={<FileBox className="h-5 w-5" />}
                  label="Documents"
                  description="Manage files, templates, and e-signatures."
                  options={documentsOptions}
                  showAddButton
                />

                {/* Billing */}
                <SecondaryMenuItem
                  icon={<DollarSign className="h-5 w-5" />}
                  label="Billing"
                  description="Handle invoices, payments, and expenses."
                  options={billingOptions}
                  showAddButton
                />

                {/* Intake/Matter/Cases */}
                <SecondaryMenuItem
                  icon={<Briefcase className="h-5 w-5" />}
                  label="Intake/Matter/Cases"
                  description="Manage intake forms, matters, and cases."
                  options={intakeOptions}
                  showAddButton
                />

                {/* Leads/Clients/Companies/Contacts */}
                <SecondaryMenuItem
                  icon={<Users className="h-5 w-5" />}
                  label="Leads/Clients/Companies/Contacts"
                  description="Manage leads, clients, companies, and contacts."
                  options={leadsClientsOptions}
                  showAddButton
                />

                {/* Account Settings */}
                <SecondaryMenuItem
                  icon={<Settings className="h-5 w-5" />}
                  label="Account Settings"
                  description="Manage profile, team members, and preferences."
                  options={accountSettingsOptions}
                  showAddButton={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
