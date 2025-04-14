"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Settings, Download, Clock, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface CallRecord {
  id: string
  time: string
  duration: string
  type: string
  cost: string
  callId: string
  disconnectionReason: "user hangup" | "inactivity" | "dial failed" | string
  callStatus: "ended" | "error" | string
  userSentiment?: string
  from: string
  to?: string
  callSuccessful: boolean
  latency?: string
}

interface ColumnConfig {
  id: string
  name: string
  visible: boolean
}

export default function CallHistoryManager() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(5)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showCustomizeField, setShowCustomizeField] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportFileName, setExportFileName] = useState("")
  const [selectedDate, setSelectedDate] = useState<number | null>(12) // April 12 selected by default

  // Column configuration
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: "time", name: "Time", visible: true },
    { id: "duration", name: "Call Duration", visible: false },
    { id: "type", name: "Type", visible: true },
    { id: "cost", name: "Cost", visible: true },
    { id: "callId", name: "Call ID", visible: true },
    { id: "disconnectionReason", name: "Disconnection Reason", visible: false },
    { id: "callStatus", name: "Call Status", visible: true },
    { id: "userSentiment", name: "User Sentiment", visible: true },
    { id: "from", name: "From", visible: true },
    { id: "to", name: "To", visible: true },
    { id: "callSuccessful", name: "Call Successful", visible: true },
    { id: "latency", name: "End to End Latency", visible: true },
  ])

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

  // Sample call history data
  const callHistory: CallRecord[] = [
    {
      id: "1",
      time: "04/10/2025 00:40",
      duration: "0:00",
      type: "phone_call",
      cost: "$0.001",
      callId: "call_dba95e/32995dcf2fdae3522772",
      disconnectionReason: "user hangup",
      callStatus: "ended",
      from: "+12727771112",
      callSuccessful: false,
    },
    {
      id: "2",
      time: "02/20/2025 06:23",
      duration: "0:26",
      type: "phone_call",
      cost: "$0.034",
      callId: "call_58aec83e9325677f358576b4463",
      disconnectionReason: "user hangup",
      callStatus: "ended",
      from: "+12727771112",
      callSuccessful: false,
      latency: "1533ms",
    },
    {
      id: "3",
      time: "02/20/2025 06:19",
      duration: "1:39",
      type: "phone_call",
      cost: "$0.127",
      callId: "call_fd6f74c3355a56fef32d96732ee",
      disconnectionReason: "user hangup",
      callStatus: "ended",
      from: "+12727771112",
      callSuccessful: false,
      latency: "1775ms",
    },
    {
      id: "4",
      time: "02/16/2025 17:56",
      duration: "1:54",
      type: "phone_call",
      cost: "$0.146",
      callId: "call_41edccff0ec43cf971672b58fba",
      disconnectionReason: "inactivity",
      callStatus: "ended",
      from: "+12727771112",
      callSuccessful: false,
      latency: "1351ms",
    },
    {
      id: "5",
      time: "02/16/2025 17:54",
      duration: "1:52",
      type: "phone_call",
      cost: "$0.143",
      callId: "call_f3183ebe6c915f8053221c04571",
      disconnectionReason: "inactivity",
      callStatus: "ended",
      from: "+12727771112",
      callSuccessful: false,
      latency: "874ms",
    },
    {
      id: "6",
      time: "02/16/2025 16:52",
      duration: "0:00",
      type: "phone_call",
      cost: "$0.001",
      callId: "call_74cb3d5a75aaacae2257dd3369c",
      disconnectionReason: "user hangup",
      callStatus: "ended",
      from: "+12727771112",
      callSuccessful: false,
    },
    {
      id: "7",
      time: "02/16/2025 16:51",
      duration: "0:00",
      type: "phone_call",
      cost: "$0.000",
      callId: "call_0cd159a14070748d27f3af3b3fa",
      disconnectionReason: "dial failed",
      callStatus: "error",
      from: "+12727771112",
      callSuccessful: false,
    },
    {
      id: "8",
      time: "02/16/2025 16:51",
      duration: "0:00",
      type: "phone_call",
      cost: "$0.001",
      callId: "call_196bf872bf69016cd8f44087121",
      disconnectionReason: "user hangup",
      callStatus: "ended",
      from: "+12727771112",
      callSuccessful: false,
    },
  ]

  const getStatusColor = (status: string) => {
    if (status === "ended") return "bg-gray-500"
    if (status === "error") return "bg-red-500"
    return "bg-gray-500"
  }

  const getReasonColor = (reason: string) => {
    if (reason === "user hangup") return "bg-green-500"
    if (reason === "inactivity") return "bg-red-500"
    if (reason === "dial failed") return "bg-red-500"
    return "bg-gray-500"
  }

  const handleExport = () => {
    setIsExporting(true)
    setExportFileName(`Retell-history(${new Date().toISOString().split("T")[0]}).csv`)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      setShowExportDialog(false)
    }, 2000)
  }

  const toggleColumnVisibility = (columnId: string) => {
    setColumns(columns.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col)))
  }

  const handleDateSelect = (day: number) => {
    setSelectedDate(day)
  }

  // Get visible columns
  const visibleColumns = columns.filter((col) => col.visible)

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

  return (
    <div className="flex flex-col h-full bg-[#0d0d11]">
      <div className="flex items-center justify-between border-b border-[#1e1e2a] p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-400 mr-2" />
          <h1 className="text-lg font-medium text-white">Call History</h1>
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
            Date Range
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

          {/* Customize Field */}
          <Button
            variant="outline"
            className="border-[#1e1e2a] bg-[#13131a] text-white hover:bg-[#1e1e2a] relative"
            onClick={() => setShowCustomizeField(!showCustomizeField)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Customize Field
            {showCustomizeField && (
              <div className="absolute top-full left-0 mt-1 z-50 w-64 py-2 bg-[#0d0d11] border border-[#1e1e2a] rounded-md shadow-md">
                {columns.map((column) => (
                  <div key={column.id} className="px-4 py-3 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 mr-2">
                      <Checkbox
                        id={`column-${column.id}`}
                        checked={column.visible}
                        onCheckedChange={() => toggleColumnVisibility(column.id)}
                        className="h-5 w-5 rounded-sm data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 border-[#1e1e2a]"
                      />
                    </div>
                    <label htmlFor={`column-${column.id}`} className="text-white text-base cursor-pointer">
                      {column.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </Button>

          <div className="ml-auto flex items-center gap-2">
            {/* Export Button */}
            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
              <Button
                variant="outline"
                className="border-[#1e1e2a] bg-[#13131a] text-white hover:bg-[#1e1e2a]"
                onClick={() => setShowExportDialog(true)}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <DialogContent className="bg-[#0d0d11] border-[#1e1e2a] text-white">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">Export Records</h2>
                  <p className="text-gray-400 mb-6">
                    The CSVs will be kept for one week. Please download after export.
                  </p>

                  {isExporting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-blue-500 border-r-2 border-blue-500 rounded-full"></div>
                      <span className="text-white">{exportFileName}</span>
                      <span className="ml-2 text-blue-500">Uploading</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-white">Retell-history(2025-04-12).csv</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white"
                        onClick={handleExport}
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="border-[#1e1e2a] bg-[#13131a] text-white hover:bg-[#1e1e2a]">
              <Clock className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          <div
            className="sticky top-0 z-10 grid bg-[#13131a] text-gray-400 text-sm border-b border-[#1e1e2a]"
            style={{
              gridTemplateColumns: visibleColumns.map(() => "minmax(150px, auto)").join(" "),
            }}
          >
            {visibleColumns.map((column) => (
              <div key={column.id} className="p-4 font-medium">
                {column.name}
              </div>
            ))}
          </div>

          <div className="text-white">
            {callHistory.map((call) => (
              <div
                key={call.id}
                className="grid border-b border-[#1e1e2a] hover:bg-[#1e1e2a]"
                style={{
                  gridTemplateColumns: visibleColumns.map(() => "minmax(150px, auto)").join(" "),
                }}
              >
                {visibleColumns.map((column) => {
                  switch (column.id) {
                    case "time":
                      return (
                        <div key={column.id} className="p-4">
                          {call.time}
                        </div>
                      )
                    case "duration":
                      return (
                        <div key={column.id} className="p-4">
                          {call.duration}
                        </div>
                      )
                    case "type":
                      return (
                        <div key={column.id} className="p-4">
                          {call.type}
                        </div>
                      )
                    case "cost":
                      return (
                        <div key={column.id} className="p-4">
                          {call.cost}
                        </div>
                      )
                    case "callId":
                      return (
                        <div key={column.id} className="p-4 truncate">
                          {call.callId}
                        </div>
                      )
                    case "disconnectionReason":
                      return (
                        <div key={column.id} className="p-4 flex items-center">
                          <span
                            className={`h-2 w-2 rounded-full mr-2 ${getReasonColor(call.disconnectionReason)}`}
                          ></span>
                          {call.disconnectionReason}
                        </div>
                      )
                    case "callStatus":
                      return (
                        <div key={column.id} className="p-4 flex items-center">
                          <span className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(call.callStatus)}`}></span>
                          {call.callStatus}
                        </div>
                      )
                    case "userSentiment":
                      return (
                        <div key={column.id} className="p-4">
                          {call.userSentiment || "-"}
                        </div>
                      )
                    case "from":
                      return (
                        <div key={column.id} className="p-4">
                          {call.from}
                        </div>
                      )
                    case "to":
                      return (
                        <div key={column.id} className="p-4">
                          {call.to || "-"}
                        </div>
                      )
                    case "callSuccessful":
                      return (
                        <div key={column.id} className="p-4 flex items-center">
                          <span
                            className={`h-2 w-2 rounded-full mr-2 ${call.callSuccessful ? "bg-green-500" : "bg-red-500"}`}
                          ></span>
                          {call.callSuccessful ? "Successful" : "Unsuccessful"}
                        </div>
                      )
                    case "latency":
                      return (
                        <div key={column.id} className="p-4">
                          {call.latency || "-"}
                        </div>
                      )
                    default:
                      return (
                        <div key={column.id} className="p-4">
                          -
                        </div>
                      )
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center border-t border-[#1e1e2a] p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-gray-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-white">{currentPage}</span>
          <span className="text-gray-400">...</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="text-gray-400 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
