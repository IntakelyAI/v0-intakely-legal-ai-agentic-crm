"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic, ArrowLeft } from "lucide-react"
import type { Agent, WorkflowState } from "@/types/agent"
import StateNode from "./state-node"
import StateEditor from "./state-editor"

export default function WorkflowBuilder({ agent }: { agent: Agent }) {
  const [selectedState, setSelectedState] = useState<WorkflowState | null>(null)
  const [states, setStates] = useState<WorkflowState[]>(agent.workflow || [])

  const handleStateSelect = (state: WorkflowState) => {
    setSelectedState(state)
  }

  const handleStateUpdate = (updatedState: WorkflowState) => {
    setStates(states.map((state) => (state.id === updatedState.id ? updatedState : state)))
    setSelectedState(updatedState)
  }

  const handleAddState = () => {
    const newState: WorkflowState = {
      id: `state-${Date.now()}`,
      name: "New State",
      type: "action",
      position: { x: 300, y: 300 },
      edges: [],
      prompt: "# New State Prompt\n\nAdd your prompt here.",
    }
    setStates([...states, newState])
    setSelectedState(newState)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b border-[#1e1e2a] p-4">
        <Button variant="ghost" size="sm" className="mr-4 text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Agent
        </Button>
        <h1 className="text-lg font-medium text-white">{agent.name} Workflow</h1>
      </div>

      <div className="flex flex-1">
        <div className="relative flex-1 overflow-hidden bg-[#0d0d11]">
          <div className="absolute left-4 top-4 z-10 flex gap-2">
            <Button size="sm" onClick={handleAddState} className="bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]">
              + New State
            </Button>
          </div>
          <div className="h-full w-full">
            {states.map((state) => (
              <StateNode
                key={state.id}
                state={state}
                isSelected={selectedState?.id === state.id}
                onSelect={() => handleStateSelect(state)}
              />
            ))}
            {states.map((state) =>
              state.edges.map((edge, index) => {
                const targetState = states.find((s) => s.id === edge.target)
                if (!targetState) return null

                // Calculate line coordinates
                const sourceX = state.position.x + 100
                const sourceY = state.position.y + 50
                const targetX = targetState.position.x
                const targetY = targetState.position.y + 25

                return (
                  <svg
                    key={`${state.id}-${edge.target}-${index}`}
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
                      Edge
                    </text>
                  </svg>
                )
              }),
            )}
          </div>
        </div>

        <div className="w-96 border-l border-[#1e1e2a] bg-[#13131a]">
          {selectedState ? (
            <StateEditor state={selectedState} onUpdate={handleStateUpdate} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 text-gray-400">Select a state to edit its properties</div>
              <div className="mb-6 text-sm text-gray-500">Or create a new state using the "New State" button</div>
            </div>
          )}
        </div>

        <div className="flex w-80 flex-col items-center justify-center border-l border-[#1e1e2a] bg-[#0d0d11] p-4">
          <div className="mb-4 text-center text-sm text-gray-400">Test your agent</div>
          <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#1e1e2a]">
            <Mic className="h-12 w-12 text-gray-400" />
          </div>
          <Button className="w-full bg-[#1e1e2a] text-white hover:bg-[#2d2d3a]">Test</Button>
        </div>
      </div>
    </div>
  )
}
