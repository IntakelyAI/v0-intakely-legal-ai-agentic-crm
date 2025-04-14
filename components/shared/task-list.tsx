"use client"

import { useState } from "react"
import { CheckCircle, Circle, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Task {
  id: string
  title: string
  description?: string
  status: "completed" | "in-progress" | "pending" | "blocked"
  dueDate?: string
  assignee?: string
  priority?: "low" | "medium" | "high"
}

interface TaskListProps {
  tasks: Task[]
  title?: string
  onTaskClick?: (task: Task) => void
  onStatusChange?: (taskId: string, newStatus: Task["status"]) => void
}

export function TaskList({ tasks, title = "Tasks", onTaskClick, onStatusChange }: TaskListProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null)

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <Circle className="h-5 w-5 text-gray-400" />
      case "blocked":
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getPriorityClass = (priority?: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500"
      case "medium":
        return "border-l-4 border-yellow-500"
      case "low":
        return "border-l-4 border-green-500"
      default:
        return ""
    }
  }

  const handleTaskClick = (task: Task) => {
    setExpandedTask(expandedTask === task.id ? null : task.id)
    if (onTaskClick) onTaskClick(task)
  }

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    if (onStatusChange) onStatusChange(taskId, newStatus)
  }

  // Group tasks by status
  const tasksByStatus = tasks.reduce(
    (acc, task) => {
      if (!acc[task.status]) acc[task.status] = []
      acc[task.status].push(task)
      return acc
    },
    {} as Record<Task["status"], Task[]>,
  )

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* In Progress Tasks */}
      {tasksByStatus["in-progress"] && tasksByStatus["in-progress"].length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700">In Progress</h3>
          <div className="space-y-3">
            {" "}
            {/* Added space-y-3 for spacing between tasks */}
            {tasksByStatus["in-progress"].map((task) => (
              <div
                key={task.id}
                className={cn(
                  "p-4 rounded-md cursor-pointer transition-all",
                  "bg-gray-700", // Darker shade of grey
                  getPriorityClass(task.priority),
                  expandedTask === task.id ? "ring-2 ring-primary" : "hover:bg-gray-600", // Darker hover state
                )}
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <span className="font-medium text-white">{task.title}</span>
                  </div>
                  {task.dueDate && <span className="text-sm text-gray-300">Due: {task.dueDate}</span>}
                </div>
                {expandedTask === task.id && task.description && (
                  <div className="mt-3 pl-8">
                    <p className="text-sm text-gray-300">{task.description}</p>
                    {task.assignee && <p className="text-sm text-gray-400 mt-2">Assigned to: {task.assignee}</p>}
                    <div className="mt-3 flex gap-2">
                      <button
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded-md hover:bg-green-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(task.id, "completed")
                        }}
                      >
                        Complete
                      </button>
                      <button
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(task.id, "blocked")
                        }}
                      >
                        Block
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Tasks */}
      {tasksByStatus["pending"] && tasksByStatus["pending"].length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700">Pending</h3>
          <div className="space-y-3">
            {" "}
            {/* Added space-y-3 for spacing between tasks */}
            {tasksByStatus["pending"].map((task) => (
              <div
                key={task.id}
                className={cn(
                  "p-4 rounded-md cursor-pointer transition-all",
                  "bg-gray-700", // Darker shade of grey
                  getPriorityClass(task.priority),
                  expandedTask === task.id ? "ring-2 ring-primary" : "hover:bg-gray-600", // Darker hover state
                )}
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <span className="font-medium text-white">{task.title}</span>
                  </div>
                  {task.dueDate && <span className="text-sm text-gray-300">Due: {task.dueDate}</span>}
                </div>
                {expandedTask === task.id && task.description && (
                  <div className="mt-3 pl-8">
                    <p className="text-sm text-gray-300">{task.description}</p>
                    {task.assignee && <p className="text-sm text-gray-400 mt-2">Assigned to: {task.assignee}</p>}
                    <div className="mt-3 flex gap-2">
                      <button
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(task.id, "in-progress")
                        }}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blocked Tasks */}
      {tasksByStatus["blocked"] && tasksByStatus["blocked"].length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700">Blocked</h3>
          <div className="space-y-3">
            {" "}
            {/* Added space-y-3 for spacing between tasks */}
            {tasksByStatus["blocked"].map((task) => (
              <div
                key={task.id}
                className={cn(
                  "p-4 rounded-md cursor-pointer transition-all",
                  "bg-gray-700", // Darker shade of grey
                  getPriorityClass(task.priority),
                  expandedTask === task.id ? "ring-2 ring-primary" : "hover:bg-gray-600", // Darker hover state
                )}
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <span className="font-medium text-white">{task.title}</span>
                  </div>
                  {task.dueDate && <span className="text-sm text-gray-300">Due: {task.dueDate}</span>}
                </div>
                {expandedTask === task.id && task.description && (
                  <div className="mt-3 pl-8">
                    <p className="text-sm text-gray-300">{task.description}</p>
                    {task.assignee && <p className="text-sm text-gray-400 mt-2">Assigned to: {task.assignee}</p>}
                    <div className="mt-3 flex gap-2">
                      <button
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(task.id, "in-progress")
                        }}
                      >
                        Resume
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {tasksByStatus["completed"] && tasksByStatus["completed"].length > 0 && (
        <div>
          <h3 className="text-md font-medium mb-3 text-gray-700">Completed</h3>
          <div className="space-y-3">
            {" "}
            {/* Added space-y-3 for spacing between tasks */}
            {tasksByStatus["completed"].map((task) => (
              <div
                key={task.id}
                className={cn(
                  "p-4 rounded-md cursor-pointer transition-all",
                  "bg-gray-700", // Darker shade of grey
                  getPriorityClass(task.priority),
                  expandedTask === task.id ? "ring-2 ring-primary" : "hover:bg-gray-600", // Darker hover state
                )}
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <span className="font-medium text-white line-through">{task.title}</span>
                  </div>
                  {task.dueDate && <span className="text-sm text-gray-300">Completed: {task.dueDate}</span>}
                </div>
                {expandedTask === task.id && task.description && (
                  <div className="mt-3 pl-8">
                    <p className="text-sm text-gray-300">{task.description}</p>
                    {task.assignee && <p className="text-sm text-gray-400 mt-2">Completed by: {task.assignee}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && <div className="p-4 bg-gray-700 rounded-md text-center text-gray-300">No tasks found</div>}
    </div>
  )
}
