import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  User,
  Activity,
  ArrowRight,
  FileText,
  Settings,
  Users,
  Bot,
} from "lucide-react"
import Link from "next/link"
import AIAssistantChat from "@/components/shared/ai-assistant-chat"

// Array of inspirational Islamic quotes
const islamicQuotes = [
  {
    quote: "Verily, with hardship comes ease.",
    source: "Quran 94:5",
  },
  {
    quote: "The best of people are those who are most beneficial to people.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "Whoever believes in Allah and the Last Day should speak a good word or remain silent.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    quote:
      "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "Be in this world as if you were a stranger or a traveler.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
    source: "Quran 13:11",
  },
  {
    quote:
      "And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    source: "Quran 2:186",
  },
]

// Get a random quote for the day (changes daily)
const getQuoteOfTheDay = () => {
  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
  return islamicQuotes[dayOfYear % islamicQuotes.length]
}

// Recent activities data
const recentActivities = [
  {
    id: 1,
    action: "Updated agent configuration",
    target: "Intake Assistant",
    path: "/agent-builder/123",
    timestamp: "10 minutes ago",
    icon: <Settings className="h-4 w-4" />,
    section: "Agent Builder",
  },
  {
    id: 2,
    action: "Added knowledge base document",
    target: "Legal FAQ",
    path: "/agent-builder/knowledge-base",
    timestamp: "25 minutes ago",
    icon: <FileText className="h-4 w-4" />,
    section: "Agent Builder",
  },
  {
    id: 3,
    action: "Onboarded new client",
    target: "Johnson Legal Group",
    path: "/law-firm/johnson-legal",
    timestamp: "1 hour ago",
    icon: <Users className="h-4 w-4" />,
    section: "Spaces : Law Firms",
  },
  {
    id: 4,
    action: "Updated billing information",
    target: "Smith & Associates",
    path: "/law-firm/smith-associates/billing",
    timestamp: "2 hours ago",
    icon: <FileText className="h-4 w-4" />,
    section: "Spaces : Law Firms",
  },
  {
    id: 5,
    action: "Configured webhook settings",
    target: "Client Intake Agent",
    path: "/agent-builder/456/settings",
    timestamp: "3 hours ago",
    icon: <Settings className="h-4 w-4" />,
    section: "Agent Builder",
  },
  {
    id: 6,
    action: "Reviewed call history",
    target: "All agents",
    path: "/agent-builder/call-history",
    timestamp: "4 hours ago",
    icon: <Phone className="h-4 w-4" />,
    section: "Agent Builder",
  },
  {
    id: 7,
    action: "Updated user permissions",
    target: "Marketing team",
    path: "/internal-operations/users",
    timestamp: "5 hours ago",
    icon: <Users className="h-4 w-4" />,
    section: "Intakely Operations",
  },
  {
    id: 8,
    action: "Analyzed call metrics",
    target: "Q2 Performance",
    path: "/agent-builder/analytics",
    timestamp: "Yesterday",
    icon: <Activity className="h-4 w-4" />,
    section: "Agent Builder",
  },
  {
    id: 9,
    action: "Updated subscription plan",
    target: "Enterprise tier",
    path: "/internal-operations/billing",
    timestamp: "Yesterday",
    icon: <FileText className="h-4 w-4" />,
    section: "Intakely Operations",
  },
  {
    id: 10,
    action: "Created new agent",
    target: "Client Follow-up Assistant",
    path: "/agent-builder/789",
    timestamp: "2 days ago",
    icon: <User className="h-4 w-4" />,
    section: "Agent Builder",
  },
  {
    id: 11,
    action: "Configured batch call settings",
    target: "Outreach campaign",
    path: "/agent-builder/batch-call",
    timestamp: "2 days ago",
    icon: <Phone className="h-4 w-4" />,
    section: "Agent Builder",
  },
]

// Sample chat history
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! How can I assist you with the CRM today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    content: "I need to find the latest documents for the Johnson case.",
    role: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
  },
  {
    id: "3",
    content:
      "I found 3 recent documents for Johnson v. Smith (Case #JL-2023-42):\n\n1. Motion to Dismiss (uploaded yesterday)\n2. Client Statement (uploaded 3 days ago)\n3. Evidence Summary (uploaded last week)\n\nWould you like me to open any of these?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
  },
]

export default function Dashboard() {
  const quoteOfTheDay = getQuoteOfTheDay()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Personal Assistant Dashboard</h1>
            <div className="mt-2 p-4 bg-accent/50 rounded-lg border border-border">
              <p className="text-lg italic text-foreground">"{quoteOfTheDay.quote}"</p>
              <p className="text-sm text-muted-foreground mt-1">— {quoteOfTheDay.source}</p>
            </div>
          </div>

          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="personalAssistant">Personal Assistant</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasks in Progress</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">4 due today</p>
                    <div className="mt-4 space-y-3">
                      <Link href="/internal-operations/tasks/review-logs">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Review agent call logs</span>
                          </div>
                          <span className="text-xs text-muted-foreground">2:30 PM</span>
                        </div>
                      </Link>
                      <Link href="/law-firm/johnson-legal/onboarding">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Onboard Johnson Legal Group</span>
                          </div>
                          <span className="text-xs text-muted-foreground">4:00 PM</span>
                        </div>
                      </Link>
                      <Link href="/agent-builder/settings/webhooks">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Configure webhook settings</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Tomorrow</span>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Calls</CardTitle>
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Next call in 45 minutes</p>
                    <div className="mt-4 space-y-3">
                      <Link href="/law-firm/smith-associates/calls/123">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-sm">Smith & Associates</span>
                          </div>
                          <span className="text-xs text-muted-foreground">11:30 AM</span>
                        </div>
                      </Link>
                      <Link href="/law-firm/williams-law/calls/456">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-sm">Williams Law Partners</span>
                          </div>
                          <span className="text-xs text-muted-foreground">2:00 PM</span>
                        </div>
                      </Link>
                      <Link href="/law-firm/davis-miller/calls/789">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-sm">Davis & Miller LLP</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Tomorrow</span>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Calendar Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">2 meetings today</p>
                    <div className="mt-4 space-y-3">
                      <Link href="/calendar/events/123">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">Team Standup</span>
                          </div>
                          <span className="text-xs text-muted-foreground">10:00 AM</span>
                        </div>
                      </Link>
                      <Link href="/calendar/events/456">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">Client Demo</span>
                          </div>
                          <span className="text-xs text-muted-foreground">1:30 PM</span>
                        </div>
                      </Link>
                      <Link href="/calendar/events/789">
                        <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">Product Planning</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Tomorrow</span>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>You have 3 unread notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/law-firm/johnson-legal">
                    <div className="flex items-start gap-4 rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <Bell className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">New client onboarded</p>
                        <p className="text-sm text-muted-foreground">
                          Johnson Legal Group has been successfully onboarded.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/agent-builder/call-history">
                    <div className="flex items-start gap-4 rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <Bell className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Agent call completed</p>
                        <p className="text-sm text-muted-foreground">
                          Agent "Intake Assistant" completed a 15-minute call with potential client.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">45 minutes ago</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/internal-operations/system-updates">
                    <div className="flex items-start gap-4 rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <Bell className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">System update completed</p>
                        <p className="text-sm text-muted-foreground">
                          The system has been updated to version 2.4.0 with new features.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communications" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>You have 5 unread messages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/messages/123">
                      <div className="flex items-start gap-4 p-3 rounded-md transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary bg-accent hover:bg-accent/50 shadow-sm">
                        <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">
                            Can we schedule a call to discuss the new agent features?
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">20 minutes ago</p>
                        </div>
                      </div>
                    </Link>
                    <Link href="/messages/456">
                      <div className="flex items-start gap-4 p-3 rounded-md transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary bg-accent hover:bg-accent/50 shadow-sm">
                        <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Michael Williams</p>
                          <p className="text-sm text-muted-foreground">
                            The webhook integration is working perfectly now. Thanks!
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Emails</CardTitle>
                    <CardDescription>You have 3 unread emails</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/emails/123">
                      <div className="flex items-start gap-4 p-3 rounded-md transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary bg-accent hover:bg-accent/50 shadow-sm">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Quarterly Report</p>
                          <p className="text-sm text-muted-foreground">The Q2 report is ready for your review.</p>
                          <p className="text-xs text-muted-foreground mt-1">35 minutes ago</p>
                        </div>
                      </div>
                    </Link>
                    <Link href="/emails/456">
                      <div className="flex items-start gap-4 p-3 rounded-md transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary bg-accent hover:bg-accent/50 shadow-sm">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">New Feature Announcement</p>
                          <p className="text-sm text-muted-foreground">
                            We're excited to announce our new AI-powered analytics dashboard.
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Overview of system metrics for the past 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Link href="/agent-builder/analytics/calls">
                      <div className="rounded-md bg-accent p-4 text-center hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                        <p className="text-sm font-medium">Agent Calls</p>
                        <p className="text-3xl font-bold text-primary mt-1">128</p>
                        <p className="text-xs text-muted-foreground mt-1">↑ 12% from yesterday</p>
                      </div>
                    </Link>
                    <Link href="/agent-builder/analytics/duration">
                      <div className="rounded-md bg-accent p-4 text-center hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                        <p className="text-sm font-medium">Avg. Call Duration</p>
                        <p className="text-3xl font-bold text-primary mt-1">4:32</p>
                        <p className="text-xs text-muted-foreground mt-1">↓ 0:18 from yesterday</p>
                      </div>
                    </Link>
                    <Link href="/agent-builder/analytics/success-rate">
                      <div className="rounded-md bg-accent p-4 text-center hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                        <p className="text-sm font-medium">Success Rate</p>
                        <p className="text-3xl font-bold text-primary mt-1">94%</p>
                        <p className="text-xs text-muted-foreground mt-1">↑ 2% from yesterday</p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personalAssistant" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Bot className="h-8 w-8 text-primary" />
                    <h2 className="text-xl font-semibold">Chat with Assistant</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Ask questions, get information, or request help with tasks
                  </p>
                  <button className="w-full bg-primary text-primary-foreground rounded-md py-2 flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Start Chat</span>
                  </button>
                </div>

                <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <h2 className="text-xl font-semibold">Recent Documents</h2>
                  </div>
                  <ul className="space-y-3 mb-4">
                    <li className="flex items-center justify-between">
                      <span>Client Intake Form.docx</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Case Summary Report.pdf</span>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Legal Brief Template.docx</span>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </li>
                  </ul>
                  <button className="w-full bg-secondary text-secondary-foreground rounded-md py-2">
                    View All Documents
                  </button>
                </div>

                <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                    <h2 className="text-xl font-semibold">Upcoming Events</h2>
                  </div>
                  <ul className="space-y-3 mb-4">
                    <li className="flex items-center justify-between">
                      <span>Client Meeting - Johnson Case</span>
                      <span className="text-xs text-muted-foreground">Today, 2:00 PM</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Court Hearing - Smith v. Davis</span>
                      <span className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Team Strategy Session</span>
                      <span className="text-xs text-muted-foreground">Friday, 1:00 PM</span>
                    </li>
                  </ul>
                  <button className="w-full bg-secondary text-secondary-foreground rounded-md py-2">
                    View Calendar
                  </button>
                </div>

                <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                  </div>
                  <ul className="space-y-3 mb-4">
                    <li className="flex items-center justify-between">
                      <span>Document generated: Client Agreement</span>
                      <span className="text-xs text-muted-foreground">1 hour ago</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Email sent to: Sarah Williams</span>
                      <span className="text-xs text-muted-foreground">3 hours ago</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Calendar event added: Deposition</span>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </li>
                  </ul>
                  <button className="w-full bg-secondary text-secondary-foreground rounded-md py-2">
                    View All Activity
                  </button>
                </div>

                <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-8 w-8 text-primary" />
                    <h2 className="text-xl font-semibold">Assistant Settings</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">Customize your assistant's behavior and preferences</p>
                  <button className="w-full bg-secondary text-secondary-foreground rounded-md py-2">
                    Configure Settings
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Recent Activities Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Activities</h2>
              <Link href="/activity-history" className="text-sm text-primary flex items-center hover:underline">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentActivities.map((activity) => (
                    <Link key={activity.id} href={activity.path}>
                      <div className="flex items-start p-4 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                        <div className="mr-4 mt-0.5 bg-accent/50 p-2 rounded-full">{activity.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.action}</p>
                            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{activity.target}</p>
                          <p className="text-xs text-primary mt-1">{activity.section}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Assistant Chat */}
      <AIAssistantChat initialMessages={initialChatMessages} />
    </div>
  )
}
