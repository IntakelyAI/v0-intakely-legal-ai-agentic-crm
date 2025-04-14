"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  BarChart,
  LineChart,
  PieChart,
  Edit,
  Trash2,
  ChevronDown,
  Check,
  Hash,
} from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
} from "recharts"

// Define types for analytics widgets
interface AnalyticsWidget {
  id: string
  type: "metric" | "line" | "area" | "bar" | "pie" | "donut" | "horizontalBar"
  title: string
  subtitle?: string
  value?: string | number
  data?: any[]
  size: "small" | "medium" | "large"
  colors?: string[]
}

export default function AnalyticsManager() {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showAddWidgetDialog, setShowAddWidgetDialog] = useState(false)
  const [showEditDashboardDialog, setShowEditDashboardDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<number | null>(12) // April 12 selected by default
  const [isDragging, setIsDragging] = useState(false)

  // Add these state variables near the top of the component, after the other useState declarations:
  const [showMetricsDropdown, setShowMetricsDropdown] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("Call Successful/Unsuccessful")
  const [selectedGraphType, setSelectedGraphType] = useState<"column" | "bar" | "donut" | "line" | "number">("column")
  const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large">("medium")

  // Reference to store the dashboard container for scrolling
  const dashboardRef = useRef<HTMLDivElement>(null)

  // Filter options
  const filterOptions = [
    "Agent",
    "Call ID",
    "Batch Call ID",
    "Type",
    "Call Duration",
    "From",
    "To",
    "User Sentiment",
    "Disconnection Reason",
    "Call Successful",
    "Call Status",
    "End to End Latency",
  ]

  // Sample analytics widgets
  const [widgets, setWidgets] = useState<AnalyticsWidget[]>([
    {
      id: "call-counts",
      type: "metric",
      title: "Call Counts",
      subtitle: "All agents",
      value: "200",
      size: "small",
    },
    {
      id: "call-duration",
      type: "metric",
      title: "Call Duration",
      subtitle: "All agents",
      value: "01:55",
      size: "small",
    },
    {
      id: "call-latency",
      type: "metric",
      title: "Call Latency",
      subtitle: "All agents",
      value: "1688ms",
      size: "small",
    },
    {
      id: "call-counts-trend",
      type: "area",
      title: "Call Counts",
      subtitle: "All agents",
      data: [
        { name: "Dec 23", value: 400 },
        { name: "Dec 30", value: 300 },
        { name: "Jan 13", value: 200 },
        { name: "Jan 20", value: 278 },
        { name: "Jan 27", value: 189 },
        { name: "Feb 03", value: 239 },
        { name: "Feb 10", value: 349 },
        { name: "Apr 07", value: 200 },
      ],
      size: "medium",
      colors: ["#6366f1"],
    },
    {
      id: "call-successful",
      type: "donut",
      title: "Call Successful",
      subtitle: "All agents",
      data: [
        { name: "Unknown", value: 70, color: "#6366f1" },
        { name: "Unsuccessful", value: 15, color: "#f97316" },
        { name: "Successful", value: 15, color: "#06b6d4" },
      ],
      size: "small",
      colors: ["#6366f1", "#f97316", "#06b6d4"],
    },
    {
      id: "disconnection-reason",
      type: "donut",
      title: "Disconnection Reason",
      subtitle: "All agents",
      data: [
        { name: "Agent hangup", value: 10, color: "#6366f1" },
        { name: "User hangup", value: 80, color: "#f97316" },
        { name: "Inactivity", value: 5, color: "#06b6d4" },
        { name: "Dial failed", value: 5, color: "#8b5cf6" },
      ],
      size: "small",
      colors: ["#6366f1", "#f97316", "#06b6d4", "#8b5cf6"],
    },
    {
      id: "user-sentiment",
      type: "donut",
      title: "User Sentiment",
      subtitle: "All agents",
      data: [
        { name: "Unknown", value: 75, color: "#6366f1" },
        { name: "Negative", value: 10, color: "#f97316" },
        { name: "Neutral", value: 10, color: "#06b6d4" },
        { name: "Positive", value: 5, color: "#8b5cf6" },
      ],
      size: "small",
      colors: ["#6366f1", "#f97316", "#06b6d4", "#8b5cf6"],
    },
    {
      id: "phone-inbound-outbound",
      type: "donut",
      title: "Phone inbound/outbound",
      subtitle: "All agents",
      data: [
        { name: "Outbound", value: 85, color: "#6366f1" },
        { name: "Inbound", value: 15, color: "#f97316" },
      ],
      size: "small",
      colors: ["#6366f1", "#f97316"],
    },
    {
      id: "call-picked-up-rate",
      type: "area",
      title: "Call Picked Up Rate",
      subtitle: "All agents",
      data: [
        { name: "Dec 30", value: 80 },
        { name: "Jan 20", value: 90 },
        { name: "Feb 03", value: 85 },
        { name: "Mar 01", value: 82 },
        { name: "Apr 07", value: 95 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
    {
      id: "call-successful-rate",
      type: "area",
      title: "Call Successful Rate",
      subtitle: "All agents",
      data: [
        { name: "Dec 30", value: 90 },
        { name: "Jan 20", value: 40 },
        { name: "Feb 03", value: 80 },
        { name: "Mar 01", value: 70 },
        { name: "Apr 07", value: 60 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
    {
      id: "call-transfer-rate",
      type: "area",
      title: "Call Transfer Rate",
      subtitle: "All agents",
      data: [
        { name: "Dec 30", value: 5 },
        { name: "Jan 20", value: 8 },
        { name: "Feb 03", value: 12 },
        { name: "Mar 01", value: 7 },
        { name: "Apr 07", value: 10 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
    {
      id: "voicemail-rate",
      type: "area",
      title: "Voicemail Rate",
      subtitle: "All agents",
      data: [
        { name: "Dec 30", value: 15 },
        { name: "Jan 20", value: 12 },
        { name: "Feb 03", value: 8 },
        { name: "Mar 01", value: 10 },
        { name: "Apr 07", value: 5 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
    {
      id: "average-call-duration",
      type: "area",
      title: "Average call duration",
      subtitle: "All agents",
      data: [
        { name: "Dec 30", value: 90 },
        { name: "Jan 20", value: 30 },
        { name: "Feb 03", value: 60 },
        { name: "Mar 01", value: 45 },
        { name: "Apr 07", value: 40 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
    {
      id: "average-latency",
      type: "area",
      title: "Average Latency",
      subtitle: "All agents",
      data: [
        { name: "Dec 30", value: 1800 },
        { name: "Jan 20", value: 900 },
        { name: "Feb 03", value: 1500 },
        { name: "Mar 01", value: 1200 },
        { name: "Apr 07", value: 1700 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
    {
      id: "call-successful-bar",
      type: "bar",
      title: "Call Successful",
      subtitle: "All agents",
      data: [
        { name: "Jan 13", successful: 40, unknown: 5, unsuccessful: 10 },
        { name: "Feb 03", successful: 25, unknown: 30, unsuccessful: 15 },
        { name: "Mar 01", successful: 30, unknown: 15, unsuccessful: 10 },
        { name: "Apr 07", successful: 35, unknown: 5, unsuccessful: 5 },
      ],
      size: "small",
      colors: ["#6366f1", "#f97316", "#06b6d4"],
    },
    {
      id: "disconnection-reason-bar",
      type: "bar",
      title: "Disconnection Reason",
      subtitle: "All agents",
      data: [
        { name: "Jan 13", "agent hangup": 40, "dial failed": 5, "user hangup": 20 },
        { name: "Feb 03", "agent hangup": 25, "dial failed": 15, "user hangup": 35 },
        { name: "Mar 01", "agent hangup": 30, "dial failed": 10, "user hangup": 25 },
        { name: "Apr 07", "agent hangup": 35, "dial failed": 5, "user hangup": 15 },
      ],
      size: "small",
      colors: ["#06b6d4", "#f97316", "#8b5cf6"],
    },
    {
      id: "user-sentiment-bar",
      type: "bar",
      title: "User Sentiment",
      subtitle: "All agents",
      data: [
        { name: "Jan 13", negative: 40, neutral: 5, positive: 15 },
        { name: "Feb 03", negative: 25, neutral: 15, positive: 20 },
        { name: "Mar 01", negative: 30, neutral: 10, positive: 25 },
        { name: "Apr 07", negative: 35, neutral: 5, positive: 10 },
      ],
      size: "small",
      colors: ["#f97316", "#6366f1", "#06b6d4"],
    },
    {
      id: "call-successful-by-agent",
      type: "horizontalBar",
      title: "Call Successful",
      subtitle: "All agents",
      data: [
        { name: "Oakwood-Law-Firm-Intake-Benjamin", value: 80 },
        { name: "Multi state agent", value: 20 },
        { name: "Healthcare-Exchange-Inbound-Agent", value: 65 },
        { name: "Real-Estate-Outbound-Agent", value: 45 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
    {
      id: "call-picked-up-rate-by-agent",
      type: "horizontalBar",
      title: "Call Picked Up Rate",
      subtitle: "All agents",
      data: [
        { name: "Healthcare-Exchange-Inbound-Agent", value: 95 },
        { name: "Oakwood-Law-Firm-Intake-Benjamin", value: 90 },
        { name: "Multi state agent", value: 85 },
        { name: "Real-Estate-Outbound-Agent", value: 80 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
    {
      id: "call-transfer-rate-by-agent",
      type: "horizontalBar",
      title: "Call Transfer Rate",
      subtitle: "All agents",
      data: [
        { name: "Healthcare-Exchange-Inbound-Agent", value: 15 },
        { name: "Oakwood-Law-Firm-Intake-Benjamin", value: 8 },
        { name: "Multi state agent", value: 12 },
        { name: "Real-Estate-Outbound-Agent", value: 5 },
      ],
      size: "small",
      colors: ["#6366f1"],
    },
  ])

  // Available widget types for adding new widgets
  const availableWidgetTypes = [
    { id: "metric", name: "Metric", icon: <BarChart className="h-5 w-5" /> },
    { id: "line", name: "Line Chart", icon: <LineChart className="h-5 w-5" /> },
    { id: "area", name: "Area Chart", icon: <LineChart className="h-5 w-5" /> },
    { id: "bar", name: "Bar Chart", icon: <BarChart className="h-5 w-5" /> },
    { id: "pie", name: "Pie Chart", icon: <PieChart className="h-5 w-5" /> },
    { id: "donut", name: "Donut Chart", icon: <PieChart className="h-5 w-5" /> },
    { id: "horizontalBar", name: "Horizontal Bar", icon: <BarChart className="h-5 w-5" /> },
  ]

  // Generate calendar days
  const generateCalendarDays = (month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    // Previous month days
    const prevMonthDays = []
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      prevMonthDays.push(daysInPrevMonth - i)
    }

    // Current month days
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    // Next month days
    const nextMonthDays = []
    const totalCells = 42 // 6 rows of 7 days
    const remainingCells = totalCells - prevMonthDays.length - currentMonthDays.length
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push(i)
    }

    return { prevMonthDays, currentMonthDays, nextMonthDays }
  }

  const aprilDays = generateCalendarDays(3, 2025) // April is month 3 (0-indexed)
  const mayDays = generateCalendarDays(4, 2025) // May is month 4 (0-indexed)

  const handleDateSelect = (day: number) => {
    setSelectedDate(day)
  }

  const handleWidgetClick = (widgetId: string) => {
    // Handle widget click to show detailed view
    console.log(`Widget clicked: ${widgetId}`)
    // In a real app, this would open a detailed view of the widget
  }

  const handleAddWidget = () => {
    setShowAddWidgetDialog(true)
  }

  const handleEditDashboard = () => {
    setShowEditDashboardDialog(true)
  }

  const handleDragEnd = (result: any) => {
    setIsDragging(false)
    if (!result.destination) return

    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setWidgets(items)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  // Add this after the state declarations
  const [dataUpdateCounter, setDataUpdateCounter] = useState(0)

  // Add this useEffect to simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDataUpdateCounter((prev) => prev + 1)

      // Update a random widget with slightly different data
      setWidgets((currentWidgets) => {
        const newWidgets = [...currentWidgets]
        const randomIndex = Math.floor(Math.random() * newWidgets.length)
        const widget = { ...newWidgets[randomIndex] }

        if (widget.type === "metric") {
          // For metric widgets, slightly adjust the value
          if (widget.title.includes("Count")) {
            const currentValue = Number.parseInt(widget.value as string) || 0
            widget.value = (currentValue + Math.floor(Math.random() * 5) - 2).toString()
          } else if (widget.title.includes("Duration")) {
            // Format as mm:ss
            const minutes = Math.floor(Math.random() * 3)
            const seconds = Math.floor(Math.random() * 60)
            widget.value = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          } else if (widget.title.includes("Latency")) {
            // Format as milliseconds
            widget.value = `${1500 + Math.floor(Math.random() * 300)}ms`
          }
        } else if (widget.data && widget.data.length > 0) {
          // For chart widgets, adjust the last data point
          const lastDataPoint = { ...widget.data[widget.data.length - 1] }

          if (lastDataPoint.value !== undefined) {
            // For simple value charts
            lastDataPoint.value = Math.max(0, lastDataPoint.value + Math.floor(Math.random() * 10) - 5)
            widget.data[widget.data.length - 1] = lastDataPoint
          } else {
            // For multi-series charts
            const keys = Object.keys(lastDataPoint).filter((k) => k !== "name")
            keys.forEach((key) => {
              lastDataPoint[key] = Math.max(0, lastDataPoint[key] + Math.floor(Math.random() * 10) - 5)
            })
            widget.data[widget.data.length - 1] = lastDataPoint
          }
        }

        newWidgets[randomIndex] = widget
        return newWidgets
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Render different chart types
  const renderWidget = (widget: AnalyticsWidget) => {
    switch (widget.type) {
      case "metric":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold text-white">{widget.value}</div>
          </div>
        )
      case "line":
      case "area":
        return (
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={widget.data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id={`gradient-${widget.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={widget.colors?.[0] || "#6366f1"} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={widget.colors?.[0] || "#6366f1"} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 10 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e2a", borderColor: "#1e1e2a", color: "white" }}
                  formatter={(value) => [`${value}`, widget.title]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={widget.colors?.[0] || "#6366f1"}
                  fillOpacity={1}
                  fill={`url(#gradient-${widget.id})`}
                  animationDuration={1500}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )
      case "bar":
        return (
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={widget.data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 10 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e2a", borderColor: "#1e1e2a", color: "white" }}
                  formatter={(value, name) => [`${value}`, name]}
                />
                <Legend wrapperStyle={{ fontSize: "10px", color: "#6b7280" }} />
                {Object.keys(widget.data?.[0] || {})
                  .filter((key) => key !== "name")
                  .map((key, index) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={widget.colors?.[index % (widget.colors?.length || 1)] || "#6366f1"}
                      animationDuration={1500}
                      isAnimationActive={true}
                    />
                  ))}
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        )
      case "pie":
      case "donut":
        return (
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={widget.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={widget.type === "donut" ? 60 : 0}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  animationDuration={1500}
                  isAnimationActive={true}
                >
                  {widget.data?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || widget.colors?.[index % (widget.colors?.length || 1)] || "#6366f1"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e2a", borderColor: "#1e1e2a", color: "white" }}
                  formatter={(value) => [`${value}`, "Value"]}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: "10px", color: "#6b7280" }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        )
      case "horizontalBar":
        return (
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={widget.data}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 100, bottom: 20 }}
              >
                <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: "#6b7280", fontSize: 10 }} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e2a", borderColor: "#1e1e2a", color: "white" }}
                  formatter={(value) => [`${value}`, widget.title]}
                />
                <Bar
                  dataKey="value"
                  fill={widget.colors?.[0] || "#6366f1"}
                  animationDuration={1500}
                  isAnimationActive={true}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        )
      default:
        return null
    }
  }

  // Sample data for different chart types
  const columnChartData = [
    { name: "Dec 01, 2024", successful: 40, unknown: 70, unsuccessful: 10 },
    { name: "Jan 01, 2025", successful: 30, unknown: 50, unsuccessful: 20 },
    { name: "Feb 01, 2025", successful: 35, unknown: 60, unsuccessful: 15 },
    { name: "Apr 01, 2025", successful: 25, unknown: 40, unsuccessful: 5 },
  ]

  const lineChartData = [
    { name: "Dec 19, 2024", value: 80 },
    { name: "Dec 23, 2024", value: 120 },
    { name: "Dec 27, 2024", value: 40 },
    { name: "Jan 15, 2025", value: 60 },
    { name: "Jan 25, 2025", value: 90 },
    { name: "Jan 30, 2025", value: 70 },
    { name: "Feb 10, 2025", value: 100 },
    { name: "Apr 11, 2025", value: 140 },
  ]

  const donutChartData = [
    { name: "Successful", value: 40, color: "#6366f1" },
    { name: "Unsuccessful", value: 15, color: "#f97316" },
    { name: "Unknown", value: 45, color: "#06b6d4" },
  ]

  // Function to render the preview chart based on selected type
  const renderPreviewChart = () => {
    switch (selectedGraphType) {
      case "column":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={columnChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e1e2a", borderColor: "#1e1e2a", color: "white" }} />
              <Legend wrapperStyle={{ fontSize: "10px", color: "#6b7280" }} />
              <Bar dataKey="successful" fill="#6366f1" name="Call counts: successful" />
              <Bar dataKey="unknown" fill="#f97316" name="Call counts: unknown" />
              <Bar dataKey="unsuccessful" fill="#06b6d4" name="Call counts: unsuccessful" />
            </RechartsBarChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={columnChartData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 100, bottom: 20 }}
            >
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#6b7280", fontSize: 10 }} width={100} />
              <Tooltip contentStyle={{ backgroundColor: "#1e1e2a", borderColor: "#1e1e2a", color: "white" }} />
              <Legend wrapperStyle={{ fontSize: "10px", color: "#6b7280" }} />
              <Bar dataKey="successful" fill="#6366f1" name="Call counts: successful" />
              <Bar dataKey="unknown" fill="#f97316" name="Call counts: unknown" />
              <Bar dataKey="unsuccessful" fill="#06b6d4" name="Call counts: unsuccessful" />
            </RechartsBarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={lineChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e1e2a", borderColor: "#1e1e2a", color: "white" }} />
              <Legend wrapperStyle={{ fontSize: "10px", color: "#6b7280" }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                name="Call counts"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1500}
                isAnimationActive={true}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        )
      case "donut":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={donutChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                animationDuration={1500}
                isAnimationActive={true}
              >
                {donutChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e1e2a", borderColor: "#1e1e2a", color: "white" }} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: "10px", color: "#6b7280" }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        )
      case "number":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-6xl font-bold text-white">200</div>
            <div className="text-sm text-gray-400 mt-2">Total Calls</div>
          </div>
        )
      default:
        return null
    }
  }

  // Function to get the chart title based on selected type
  const getChartTitle = () => {
    switch (selectedGraphType) {
      case "column":
        return "Call Successful/Unsuccessful"
      case "bar":
        return "Call Successful/Unsuccessful"
      case "line":
        return "Call Counts"
      case "donut":
        return "Call Successful/Unsuccessful"
      case "number":
        return "Call Counts"
      default:
        return "Chart"
    }
  }

  // Function to get the chart icon based on selected type
  const getChartIcon = () => {
    switch (selectedGraphType) {
      case "column":
        return <BarChart className="h-5 w-5 mr-2 text-gray-400" />
      case "bar":
        return <BarChart className="h-5 w-5 mr-2 text-gray-400 rotate-90" />
      case "line":
        return <LineChart className="h-5 w-5 mr-2 text-gray-400" />
      case "donut":
        return <PieChart className="h-5 w-5 mr-2 text-gray-400" />
      case "number":
        return <Hash className="h-5 w-5 mr-2 text-gray-400" />
      default:
        return <BarChart className="h-5 w-5 mr-2 text-gray-400" />
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0d0d11]">
      <div className="flex items-center justify-between border-b border-[#1e1e2a] p-4">
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-gray-400 mr-2" />
          <h1 className="text-lg font-medium text-white">Analytics</h1>
        </div>
      </div>

      <div className="p-4 border-b border-[#1e1e2a]">
        <div className="flex items-center gap-2">
          {/* Date Range Picker */}
          <Button
            variant="outline"
            className="border-[#1e1e2a] bg-[#13131a] text-white hover:bg-[#1e1e2a] relative"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            All time
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-1 z-50 w-auto p-4 bg-[#0d0d11] border border-[#1e1e2a] rounded-md shadow-md">
                <div className="flex justify-between mb-4">
                  <Button variant="ghost" size="sm" className="text-white">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center text-lg font-medium">April 2025</div>
                  <div className="text-center text-lg font-medium ml-8">May 2025</div>
                  <Button variant="ghost" size="sm" className="text-white">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* April Calendar */}
                  <div>
                    <div className="grid grid-cols-7 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div key={day} className="text-center text-sm text-gray-400">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {/* Previous month days */}
                      {aprilDays.prevMonthDays.map((day) => (
                        <button key={`prev-${day}`} className="h-8 w-8 text-center text-sm text-gray-600">
                          {day}
                        </button>
                      ))}

                      {/* April days */}
                      {aprilDays.currentMonthDays.map((day) => (
                        <button
                          key={`april-${day}`}
                          className={`h-8 w-8 text-center text-sm rounded-sm ${
                            day === selectedDate ? "bg-[#1e1e2a]" : "hover:bg-[#1e1e2a]/50"
                          }`}
                          onClick={() => handleDateSelect(day)}
                        >
                          {day}
                        </button>
                      ))}

                      {/* Next month days */}
                      {aprilDays.nextMonthDays.slice(0, 6).map((day) => (
                        <button key={`next-${day}`} className="h-8 w-8 text-center text-sm text-gray-600">
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* May Calendar */}
                  <div>
                    <div className="grid grid-cols-7 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div key={`may-${day}`} className="text-center text-sm text-gray-400">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {/* Previous month days */}
                      {mayDays.prevMonthDays.map((day) => (
                        <button key={`may-prev-${day}`} className="h-8 w-8 text-center text-sm text-gray-600">
                          {day}
                        </button>
                      ))}

                      {/* May days */}
                      {mayDays.currentMonthDays.map((day) => (
                        <button
                          key={`may-${day}`}
                          className="h-8 w-8 text-center text-sm hover:bg-[#1e1e2a]/50 rounded-sm"
                        >
                          {day}
                        </button>
                      ))}

                      {/* Next month days */}
                      {mayDays.nextMonthDays.slice(0, 6).map((day) => (
                        <button key={`may-next-${day}`} className="h-8 w-8 text-center text-sm text-gray-600">
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Button>

          {/* Filter Menu */}
          <Button
            variant="outline"
            className="border-[#1e1e2a] bg-[#13131a] text-white hover:bg-[#1e1e2a] relative"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Filter
            {showFilterMenu && (
              <div className="absolute top-full left-0 mt-1 z-50 w-64 py-2 bg-[#0d0d11] border border-[#1e1e2a] rounded-md shadow-md">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className="w-full px-4 py-3 hover:bg-[#1e1e2a] cursor-pointer flex items-center text-left"
                  >
                    <div className="flex items-center justify-center w-6 h-6 mr-2">
                      <Plus className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="text-white text-base">{option}</span>
                  </button>
                ))}
              </div>
            )}
          </Button>

          <div className="ml-auto flex items-center gap-2">
            {/* Add Widget Button */}
            <Button
              variant="outline"
              className="border-[#1e1e2a] bg-[#13131a] text-white hover:bg-[#1e1e2a]"
              onClick={handleAddWidget}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>

            {/* Edit Dashboard Button */}
            <Button
              variant="outline"
              className="border-[#1e1e2a] bg-[#13131a] text-white hover:bg-[#1e1e2a]"
              onClick={handleEditDashboard}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-auto p-4" ref={dashboardRef}>
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <Droppable droppableId="dashboard" direction="vertical">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {widgets.map((widget, index) => (
                  <Draggable
                    key={widget.id}
                    draggableId={widget.id}
                    index={index}
                    isDragDisabled={!showEditDashboardDialog}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-[#13131a] border border-[#1e1e2a] rounded-md overflow-hidden transition-all ${
                          isDragging ? "opacity-70" : "opacity-100"
                        } ${
                          widget.size === "medium" ? "md:col-span-2" : widget.size === "large" ? "md:col-span-3" : ""
                        }`}
                        onClick={() => handleWidgetClick(widget.id)}
                      >
                        <div className="p-4 border-b border-[#1e1e2a]">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-medium">{widget.title}</h3>
                              {widget.subtitle && <p className="text-xs text-gray-400">{widget.subtitle}</p>}
                            </div>
                            {showEditDashboardDialog && (
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="p-4 h-48">{renderWidget(widget)}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Add Widget Dialog */}
      <Dialog open={showAddWidgetDialog} onOpenChange={setShowAddWidgetDialog}>
        <DialogContent className="bg-[#0d0d11] border-[#1e1e2a] text-white max-w-5xl">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6">Add a Custom Chart</h2>

            <div className="flex gap-8">
              {/* Left side - Configuration options */}
              <div className="w-1/2 space-y-6">
                {/* Graph Type */}
                <div>
                  <h3 className="text-white mb-3">Graph Type</h3>
                  <div className="grid grid-cols-5 gap-2">
                    <button
                      className={`flex flex-col items-center justify-center p-3 border ${
                        selectedGraphType === "column" ? "border-blue-500" : "border-[#1e1e2a]"
                      } rounded-md bg-[#13131a] hover:bg-[#1e1e2a]`}
                      onClick={() => setSelectedGraphType("column")}
                    >
                      <BarChart className="h-5 w-5 mb-1" />
                      <span className="text-sm">Column</span>
                    </button>
                    <button
                      className={`flex flex-col items-center justify-center p-3 border ${
                        selectedGraphType === "bar" ? "border-blue-500" : "border-[#1e1e2a]"
                      } rounded-md bg-[#13131a] hover:bg-[#1e1e2a]`}
                      onClick={() => setSelectedGraphType("bar")}
                    >
                      <BarChart className="h-5 w-5 mb-1 rotate-90" />
                      <span className="text-sm">Bar</span>
                    </button>
                    <button
                      className={`flex flex-col items-center justify-center p-3 border ${
                        selectedGraphType === "donut" ? "border-blue-500" : "border-[#1e1e2a]"
                      } rounded-md bg-[#13131a] hover:bg-[#1e1e2a]`}
                      onClick={() => setSelectedGraphType("donut")}
                    >
                      <PieChart className="h-5 w-5 mb-1" />
                      <span className="text-sm">Donut</span>
                    </button>
                    <button
                      className={`flex flex-col items-center justify-center p-3 border ${
                        selectedGraphType === "line" ? "border-blue-500" : "border-[#1e1e2a]"
                      } rounded-md bg-[#13131a] hover:bg-[#1e1e2a]`}
                      onClick={() => setSelectedGraphType("line")}
                    >
                      <LineChart className="h-5 w-5 mb-1" />
                      <span className="text-sm">Line</span>
                    </button>
                    <button
                      className={`flex flex-col items-center justify-center p-3 border ${
                        selectedGraphType === "number" ? "border-blue-500" : "border-[#1e1e2a]"
                      } rounded-md bg-[#13131a] hover:bg-[#1e1e2a]`}
                      onClick={() => setSelectedGraphType("number")}
                    >
                      <div className="h-5 w-5 mb-1 flex items-center justify-center">
                        <span className="text-lg">#</span>
                      </div>
                      <span className="text-sm">Number</span>
                    </button>
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <h3 className="text-white mb-3">Date Range</h3>
                  <div className="relative">
                    <select className="w-full bg-[#13131a] border border-[#1e1e2a] rounded-md p-2 text-white appearance-none">
                      <option>All time</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>Custom range</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="mt-2 p-3 bg-[#13131a] border border-[#1e1e2a] rounded-md text-gray-400 text-sm flex items-center">
                    <div className="h-5 w-5 mr-2 rounded-full border border-[#1e1e2a] flex items-center justify-center">
                      <span className="text-xs">i</span>
                    </div>
                    The date range filter will override this charts date range.
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h3 className="text-white mb-3">Metrics</h3>
                  <div className="space-y-2">
                    <div className="relative">
                      <select className="w-full bg-[#13131a] border border-[#1e1e2a] rounded-md p-2 text-white appearance-none">
                        <option>All agents</option>
                        <option>Oakwood-Law-Firm-Intake-Benjamin</option>
                        <option>Multi state agent</option>
                        <option>Healthcare-Exchange-Inbound-Agent-Samuel</option>
                        <option>Real-Estate-Outbound-Appointment-Setter</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    {/* Metrics Dropdown with Grouped and Individual Metrics */}
                    <div className="relative">
                      <button
                        className="w-full bg-[#13131a] border border-[#1e1e2a] rounded-md p-2 text-white flex justify-between items-center"
                        onClick={() => setShowMetricsDropdown(!showMetricsDropdown)}
                      >
                        <span>{selectedMetric}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </button>

                      {showMetricsDropdown && (
                        <div className="absolute top-full left-0 mt-1 z-50 w-full bg-[#0d0d11] border border-[#1e1e2a] rounded-md shadow-md max-h-80 overflow-y-auto">
                          <div className="p-2 text-xs text-gray-400 font-medium border-b border-[#1e1e2a]">
                            GROUPED METRICS
                          </div>
                          <div className="py-1">
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("Call Successful/Unsuccessful")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "Call Successful/Unsuccessful" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "Call Successful/Unsuccessful" ? "ml-6" : "ml-0"}>
                                Call Successful/Unsuccessful
                              </span>
                            </button>
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("Call Status")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "Call Status" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "Call Status" ? "ml-6" : "ml-0"}>Call Status</span>
                            </button>
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("User Sentiment")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "User Sentiment" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "User Sentiment" ? "ml-6" : "ml-0"}>
                                User Sentiment
                              </span>
                            </button>
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("Disconnection Reason")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "Disconnection Reason" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "Disconnection Reason" ? "ml-6" : "ml-0"}>
                                Disconnection Reason
                              </span>
                            </button>
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("Phone Inbound/Outbound")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "Phone Inbound/Outbound" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "Phone Inbound/Outbound" ? "ml-6" : "ml-0"}>
                                Phone Inbound/Outbound
                              </span>
                            </button>
                          </div>

                          <div className="p-2 text-xs text-gray-400 font-medium border-b border-t border-[#1e1e2a]">
                            INDIVIDUAL METRICS
                          </div>
                          <div className="py-1">
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("Call Counts")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "Call Counts" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "Call Counts" ? "ml-6" : "ml-0"}>Call Counts</span>
                            </button>
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("End to End Latency")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "End to End Latency" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "End to End Latency" ? "ml-6" : "ml-0"}>
                                End to End Latency
                              </span>
                            </button>
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("Call Duration")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "Call Duration" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "Call Duration" ? "ml-6" : "ml-0"}>
                                Call Duration
                              </span>
                            </button>
                            <button
                              className="w-full px-4 py-2 hover:bg-[#1e1e2a] text-left flex items-center text-white"
                              onClick={() => {
                                setSelectedMetric("Call Successful Rate")
                                setShowMetricsDropdown(false)
                              }}
                            >
                              {selectedMetric === "Call Successful Rate" && <Check className="h-4 w-4 mr-2" />}
                              <span className={selectedMetric === "Call Successful Rate" ? "ml-6" : "ml-0"}>
                                Call Successful Rate
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selected Metrics Display */}
                    <div className="bg-[#13131a] border border-[#1e1e2a] rounded-md p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white">{selectedMetric}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-[#1e1e2a] text-white hover:bg-[#1e1e2a]"
                      onClick={() => setShowMetricsDropdown(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* View By */}
                <div>
                  <h3 className="text-white mb-3">View By</h3>
                  <div className="relative mb-3">
                    <select className="w-full bg-[#13131a] border border-[#1e1e2a] rounded-md p-2 text-white appearance-none">
                      <option>Time</option>
                      <option>Agent</option>
                      <option>Call Status</option>
                      <option>Disconnection Reason</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-[#13131a] border border-[#1e1e2a] rounded-md overflow-hidden">
                    <button className="py-2 text-center text-sm text-gray-400 hover:bg-[#1e1e2a]">Day</button>
                    <button className="py-2 text-center text-sm text-gray-400 hover:bg-[#1e1e2a]">Week</button>
                    <button className="py-2 text-center text-sm text-white bg-[#1e1e2a]">Month</button>
                  </div>
                </div>
              </div>

              {/* Right side - Chart preview */}
              <div className="w-1/2">
                <div className="bg-[#13131a] border border-[#1e1e2a] rounded-md p-2 mb-4">
                  <div className="flex justify-center">
                    <button className="px-4 py-1 text-sm text-white bg-[#1e1e2a] rounded-md">Chart</button>
                  </div>
                </div>

                <div
                  className={`bg-[#13131a] border border-[#1e1e2a] rounded-md p-4 ${
                    selectedSize === "small" ? "h-[300px]" : selectedSize === "medium" ? "h-[400px]" : "h-[500px]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center">
                        {getChartIcon()}
                        <h3 className="text-white font-medium">{getChartTitle()}</h3>
                        <Edit className="h-4 w-4 ml-2 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-400">All agents</p>
                    </div>
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </div>

                  <div
                    className={`${
                      selectedSize === "small" ? "h-[200px]" : selectedSize === "medium" ? "h-[300px]" : "h-[400px]"
                    } mt-4`}
                  >
                    {renderPreviewChart()}
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <button
                      className={`py-2 text-center text-sm ${
                        selectedSize === "small" ? "text-white bg-[#1e1e2a]" : "text-gray-400 bg-[#13131a]"
                      } rounded-md hover:bg-[#1e1e2a] border border-[#1e1e2a]`}
                      onClick={() => setSelectedSize("small")}
                    >
                      Small
                    </button>
                    <button
                      className={`py-2 text-center text-sm ${
                        selectedSize === "medium" ? "text-white bg-[#1e1e2a]" : "text-gray-400 bg-[#13131a]"
                      } rounded-md hover:bg-[#1e1e2a] border border-[#1e1e2a]`}
                      onClick={() => setSelectedSize("medium")}
                    >
                      Medium
                    </button>
                    <button
                      className={`py-2 text-center text-sm ${
                        selectedSize === "large" ? "text-white bg-[#1e1e2a]" : "text-gray-400 bg-[#13131a]"
                      } rounded-md hover:bg-[#1e1e2a] border border-[#1e1e2a]`}
                      onClick={() => setSelectedSize("large")}
                    >
                      Large
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                className="border-[#1e1e2a] text-white hover:bg-[#1e1e2a] mr-2"
                onClick={() => setShowAddWidgetDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => {
                  // Create a new widget based on the selected options
                  const newWidget: AnalyticsWidget = {
                    id: `widget-${Date.now()}`,
                    type:
                      selectedGraphType === "column"
                        ? "bar"
                        : selectedGraphType === "bar"
                          ? "horizontalBar"
                          : selectedGraphType === "line"
                            ? "line"
                            : selectedGraphType === "donut"
                              ? "donut"
                              : "metric",
                    title: selectedMetric,
                    subtitle: "All agents",
                    size: selectedSize,
                    colors: ["#6366f1", "#f97316", "#06b6d4"],
                    data:
                      selectedGraphType === "column" || selectedGraphType === "bar"
                        ? columnChartData
                        : selectedGraphType === "line"
                          ? lineChartData
                          : selectedGraphType === "donut"
                            ? donutChartData
                            : undefined,
                    value: selectedGraphType === "number" ? "200" : undefined,
                  }

                  setWidgets((prev) => [...prev, newWidget])
                  setShowAddWidgetDialog(false)
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
