"use client"

import { useState } from "react"
import { TaskList, type Task } from "@/components/shared/task-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Onboard new law firm client",
      description: "Complete the onboarding process for Smith & Associates",
      status: "in-progress",
      dueDate: "2023-12-15",
      assignee: "John Doe",
      priority: "high",
    },
    {
      id: "2",
      title: "Update billing information",
      description: "Update billing details for Johnson Legal Group",
      status: "in-progress",
      dueDate: "2023-12-10",
      assignee: "Jane Smith",
      priority: "medium",
    },
    {
      id: "3",
      title: "Schedule demo call",
      description: "Schedule a product demo with Williams Law Partners",
      status: "pending",
      dueDate: "2023-12-20",
      assignee: "Mike Johnson",
      priority: "low",
    },
    {
      id: "4",
      title: "Resolve technical issue",
      description: "Fix login issues reported by Davis & Miller LLP",
      status: "blocked",
      dueDate: "2023-12-05",
      assignee: "Sarah Williams",
      priority: "high",
    },
    {
      id: "5",
      title: "Send follow-up email",
      description: "Send follow-up email to Oakwood Law Firm",
      status: "completed",
      dueDate: "2023-12-01",
      assignee: "Alex Brown",
      priority: "medium",
    },
  ])

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  })

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const handleAddTask = () => {
    if (newTask.title) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        status: newTask.status as Task["status"],
        dueDate: newTask.dueDate,
        assignee: newTask.assignee,
        priority: newTask.priority as Task["priority"],
      }
      setTasks([...tasks, task])
      setNewTask({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
      })
      setDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Task title"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value) => setNewTask({ ...newTask, status: value as Task["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-1">
                    Priority
                  </label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as Task["priority"] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                    Due Date
                  </label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="assignee" className="block text-sm font-medium mb-1">
                    Assignee
                  </label>
                  <Input
                    id="assignee"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    placeholder="Assignee name"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>Add Task</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <TaskList tasks={tasks} onStatusChange={handleStatusChange} />
      </div>
    </div>
  )
}
