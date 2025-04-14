"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Minus, Edit, Trash2, Mic, MessageSquare } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useParams, useSearchParams } from "next/navigation"
import { templates } from "@/data/templates"
import TestConsole from "./test-console"

interface Position {
  x: number
  y: number
}

interface Edge {
  target: string
  label: string
}

interface WorkflowNode {
  id: string
  type: string
  name: string
  position: Position
  prompt: string
  edges: Edge[]
}

export default function WorkflowBuilderPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  const agentId = params.id as string

  // State for nodes and edges
  const [nodes, setNodes] = useState<WorkflowNode[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // State for selected node
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)

  // State for node editor dialog
  const [nodeEditorOpen, setNodeEditorOpen] = useState(false)

  // State for node being edited
  const [editingNode, setEditingNode] = useState<WorkflowNode | null>(null)

  // Test console state
  const [testMode, setTestMode] = useState<"audio" | "llm">("audio")
  const [showDynamicVariables, setShowDynamicVariables] = useState(false)
  const [userPrompt, setUserPrompt] = useState("You are a customer who wants to return a package...")
  const [chatMessages, setChatMessages] = useState([
    { role: "user", content: "How are you doing?" },
    { role: "assistant", content: "I am doing well" },
  ])
  const [dynamicVariables, setDynamicVariables] = useState([
    { name: "name", value: "John Doe" },
    { name: "phone_number", value: "(123) 456-7890" },
    { name: "email", value: "john.doe@example.com" },
    { name: "case_type", value: "Personal Injury" },
  ])

  // Load template or create default node
  useEffect(() => {
    setIsLoading(true)

    if (templateId) {
      // Find the template
      const template = templates.find((t) => t.id === templateId)

      if (template) {
        // Convert template nodes to workflow nodes
        const workflowNodes = template.nodes.map((node) => ({
          id: node.id,
          type: node.type,
          name: node.label,
          position: node.position,
          prompt: node.description || "# New State Prompt\n\nAdd your prompt here.",
          edges: node.outputs.map((outputId) => ({
            target: outputId,
            label: "Edge",
          })),
        }))

        setNodes(workflowNodes)
      } else {
        // If template not found, create default node
        setNodes([createDefaultNode()])
      }
    } else if (agentId) {
      // Check if this is an existing agent with a workflow
      // For this example, we'll use the first template as a mock for an existing agent
      const mockAgentWorkflow = templates[0].nodes.map((node) => ({
        id: node.id,
        type: node.type,
        name: node.label,
        position: node.position,
        prompt: node.description || "# New State Prompt\n\nAdd your prompt here.",
        edges: node.outputs.map((outputId) => ({
          target: outputId,
          label: "Edge",
        })),
      }))

      setNodes(mockAgentWorkflow)
    } else {
      // Default case - new agent
      setNodes([createDefaultNode()])
    }

    setIsLoading(false)
  }, [templateId, agentId])

  // Function to create a default starting node
  const createDefaultNode = (): WorkflowNode => {
    return {
      id: "starting-state",
      type: "trigger",
      name: "Starting State",
      position: { x: 300, y: 100 },
      prompt: "# Starting State Prompt\n\nThis is the initial state of your agent.",
      edges: [],
    }
  }

  // Function to add a new node
  const addNewNode = () => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: "action",
      name: "New State",
      position: { x: 300, y: 300 },
      prompt: "# New State Prompt\n\nAdd your prompt here.",
      edges: [],
    }

    setNodes([...nodes, newNode])
  }

  // Function to open node editor
  const openNodeEditor = (node: WorkflowNode) => {
    setEditingNode({ ...node })
    setNodeEditorOpen(true)
  }

  // Function to save edited node
  const saveNodeChanges = () => {
    if (!editingNode) return

    setNodes(nodes.map((node) => (node.id === editingNode.id ? editingNode : node)))

    setNodeEditorOpen(false)
    setEditingNode(null)
  }

  // Function to handle node drag
  const handleNodeDrag = (node: WorkflowNode, e: React.MouseEvent) => {
    const startX = e.clientX
    const startY = e.clientY
    const startNodeX = node.position.x
    const startNodeY = node.position.y

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY

      setNodes(
        nodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              position: {
                x: startNodeX + dx,
                y: startNodeY + dy,
              },
            }
          }
          return n
        }),
      )
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  // Function to delete a node
  const deleteNode = (nodeId: string) => {
    // Remove the node
    const updatedNodes = nodes.filter((node) => node.id !== nodeId)

    // Remove any edges pointing to this node
    const nodesWithUpdatedEdges = updatedNodes.map((node) => ({
      ...node,
      edges: node.edges.filter((edge) => edge.target !== nodeId),
    }))

    setNodes(nodesWithUpdatedEdges)
    setNodeEditorOpen(false)
    setEditingNode(null)
    setSelectedNode(null)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0d11]">
        <div className="text-white">Loading workflow...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#0d0d11]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#1e1e2a] bg-[#0d0d11] px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-[#1e1e2a] bg-[#13131a] text-white hover:bg-[#2d2d3a]">
            Save
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className={`flex items-center gap-2 ${testMode === "audio" ? "text-white" : "text-gray-400 hover:text-white"}`}
            onClick={() => setTestMode("audio")}
          >
            <Mic className="h-5 w-5" />
            <span>Test Audio</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center gap-2 ${testMode === "llm" ? "text-white" : "text-gray-400 hover:text-white"}`}
            onClick={() => setTestMode("llm")}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Test LLM</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-400 hover:text-white"
            onClick={() => setShowDynamicVariables(!showDynamicVariables)}
          >
            <span className="text-lg">
              {"{"} {"}"}
            </span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Workflow Canvas */}
        <div className="relative flex-1 bg-[#0d0d11] overflow-auto">
          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute cursor-move rounded-md border ${
                selectedNode?.id === node.id ? "border-purple-500" : "border-[#1e1e2a]"
              } bg-[#13131a] shadow-lg transition-shadow hover:shadow-xl`}
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                width: "200px",
                zIndex: selectedNode?.id === node.id ? 10 : 1,
              }}
              onClick={() => setSelectedNode(node)}
              onDoubleClick={() => openNodeEditor(node)}
              onMouseDown={(e) => handleNodeDrag(node, e)}
            >
              <div
                className={`flex items-center justify-between rounded-t-md px-3 py-2 ${
                  node.type === "trigger"
                    ? "bg-green-600"
                    : node.type === "action"
                      ? "bg-blue-600"
                      : node.type === "condition"
                        ? "bg-yellow-600"
                        : node.type === "output" || node.type === "end"
                          ? "bg-red-600"
                          : "bg-gray-600"
                }`}
              >
                <span className="text-sm font-medium text-white">{node.name}</span>
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-400">{node.type}</div>
              </div>
            </div>
          ))}

          {/* Edges */}
          {nodes.map((node) =>
            node.edges.map((edge, index) => {
              const targetNode = nodes.find((n) => n.id === edge.target)
              if (!targetNode) return null

              // Calculate line coordinates
              const sourceX = node.position.x + 100
              const sourceY = node.position.y + 50
              const targetX = targetNode.position.x
              const targetY = targetNode.position.y + 25

              return (
                <svg
                  key={`${node.id}-${edge.target}-${index}`}
                  className="absolute left-0 top-0 h-full w-full pointer-events-none"
                >
                  <path
                    d={`M ${sourceX} ${sourceY} C ${sourceX + 50} ${sourceY}, ${targetX - 50} ${targetY}, ${targetX} ${targetY}`}
                    fill="none"
                    stroke="#2d2d3a"
                    strokeWidth="2"
                  />
                  <text
                    x={(sourceX + targetX) / 2}
                    y={(sourceY + targetY) / 2 - 10}
                    fill="#6b7280"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                  {/* Arrow head */}
                  <polygon
                    points={`${targetX},${targetY} ${targetX - 10},${targetY - 5} ${targetX - 10},${targetY + 5}`}
                    fill="#2d2d3a"
                  />
                </svg>
              )
            }),
          )}

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Button
              className="flex items-center gap-2 rounded-md bg-white text-black hover:bg-gray-200"
              onClick={addNewNode}
            >
              <Plus className="h-4 w-4" />
              <span>New State</span>
            </Button>
            <Button className="flex items-center justify-center rounded-full bg-[#1e1e2a] p-2 text-white">
              <Plus className="h-5 w-5" />
            </Button>
            <Button className="flex items-center justify-center rounded-full bg-[#1e1e2a] p-2 text-white">
              <Minus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right Column - Testing Console */}
        <div className="w-[30%] border-l border-[#1e1e2a] bg-[#0d0d11] overflow-hidden">
          <TestConsole initialMode={testMode} />
        </div>
      </div>

      {/* Node Editor Dialog */}
      {editingNode && (
        <Dialog open={nodeEditorOpen} onOpenChange={setNodeEditorOpen}>
          <DialogContent className="sm:max-w-[600px] bg-[#0d0d11] border-[#1e1e2a] text-white p-0">
            <div className="border-b border-[#1e1e2a] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Input
                    value={editingNode.name}
                    onChange={(e) => setEditingNode({ ...editingNode, name: e.target.value })}
                    className="border-[#1e1e2a] bg-[#13131a] text-white"
                  />
                  <Edit className="h-4 w-4 text-gray-400" />
                </div>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-400 hover:bg-transparent"
                  onClick={() => deleteNode(editingNode.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <Button
                  variant="outline"
                  className={`text-green-500 border-green-500 hover:bg-green-500/10 ${
                    editingNode.type === "trigger" ? "bg-green-500/20" : ""
                  }`}
                  onClick={() => setEditingNode({ ...editingNode, type: "trigger" })}
                >
                  Set as a starting state
                </Button>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-lg font-medium">Prompt</h3>
                <p className="mb-2 text-xs text-gray-400">Read stateful multi-prompt agent best practices.</p>
                <Textarea
                  value={editingNode.prompt}
                  onChange={(e) => setEditingNode({ ...editingNode, prompt: e.target.value })}
                  className="min-h-[300px] resize-none border-[#1e1e2a] bg-[#13131a] text-white font-mono"
                />
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-lg font-medium">Node Type</h3>
                <div className="flex flex-wrap gap-2">
                  {["trigger", "action", "condition", "output", "end"].map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      className={`capitalize ${
                        editingNode.type === type
                          ? type === "trigger"
                            ? "bg-green-600 text-white border-green-600"
                            : type === "action"
                              ? "bg-blue-600 text-white border-blue-600"
                              : type === "condition"
                                ? "bg-yellow-600 text-white border-yellow-600"
                                : type === "output" || type === "end"
                                  ? "bg-red-600 text-white border-red-600"
                                  : "bg-gray-600 text-white border-gray-600"
                          : "border-[#1e1e2a] text-white"
                      }`}
                      onClick={() => setEditingNode({ ...editingNode, type })}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-lg font-medium">Tools (Optional)</h3>
                <Button className="bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  className="border-[#1e1e2a] text-white hover:bg-[#1e1e2a]"
                  onClick={() => setNodeEditorOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]" onClick={saveNodeChanges}>
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
