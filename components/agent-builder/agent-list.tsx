"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { agents, folders } from "@/data/agents"
import { PlusIcon, SearchIcon, FolderIcon, ChevronDownIcon } from "lucide-react"

export default function AgentList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [createAgentDropdownOpen, setCreateAgentDropdownOpen] = useState(false)

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === "all" || agent.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[#1e1e2a] p-4">
        <div className="flex items-center">
          <h1 className="text-lg font-medium text-white">All Agents</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 rounded-md border-[#1e1e2a] bg-[#0d0d11] pl-9 text-sm text-white"
            />
          </div>
          <Button className="bg-white text-black hover:bg-gray-200">Import</Button>
          <div className="relative">
            <Button
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => setCreateAgentDropdownOpen(!createAgentDropdownOpen)}
            >
              <span>Create an Agent</span>
              <ChevronDownIcon
                className={`ml-2 h-4 w-4 transition-transform ${createAgentDropdownOpen ? "rotate-180" : ""}`}
              />
            </Button>

            {createAgentDropdownOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-md border border-[#1e1e2a] bg-[#13131a] p-0 shadow-md">
                <div className="flex flex-col py-2">
                  <div className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#1e1e2a]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1e2a]">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor">
                        <path d="M9 6v12m6-6H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Conversation Flow Agent</div>
                      <div className="text-sm text-gray-400">For tasks with complex transitions</div>
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#1e1e2a]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1e2a]">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor">
                        <path d="M17 7L7 17M7 7l10 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Single Prompt Agent</div>
                      <div className="text-sm text-gray-400">For short calls and straightforward tasks</div>
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#1e1e2a]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1e2a]">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor">
                        <path
                          d="M4 5h16M4 12h16M4 19h16"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Multi-Prompt Agent</div>
                      <div className="text-sm text-gray-400">For lengthy calls and complex tasks</div>
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#1e1e2a]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1e2a]">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor">
                        <path
                          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Custom LLM</div>
                      <div className="text-sm text-gray-400">Attach your custom llm link</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Folders Section */}
        <div className="w-64 border-r border-[#1e1e2a] bg-[#0d0d11] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">FOLDERS</h2>
            <button className="text-gray-400 hover:text-white">
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedFolder("all")}
              className={`flex w-full items-center rounded-md px-2 py-1.5 text-sm ${
                selectedFolder === "all"
                  ? "bg-[#1e1e2a] text-white"
                  : "text-gray-400 hover:bg-[#1e1e2a] hover:text-white"
              }`}
            >
              All Agents
            </button>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`flex w-full items-center rounded-md px-2 py-1.5 text-sm ${
                  selectedFolder === folder.id
                    ? "bg-[#1e1e2a] text-white"
                    : "text-gray-400 hover:bg-[#1e1e2a] hover:text-white"
                }`}
              >
                <FolderIcon className="mr-2 h-4 w-4" />
                {folder.name}
              </button>
            ))}
          </div>
        </div>

        {/* Agents List */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-[1fr_150px_100px_150px_150px_50px] border-b border-[#1e1e2a] bg-[#13131a] px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
              <div>Agent Name</div>
              <div>Agent Type</div>
              <div>Voice</div>
              <div>Phone</div>
              <div>Edited by</div>
              <div></div>
            </div>

            {filteredAgents.map((agent) => (
              <Link
                key={agent.id}
                href={`/agent-builder/${agent.id}`}
                className="grid grid-cols-[1fr_150px_100px_150px_150px_50px] border-b border-[#1e1e2a] px-4 py-3 text-sm text-white hover:bg-[#1e1e2a]"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-4 w-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                  </svg>
                  {agent.name}
                </div>
                <div>{agent.type}</div>
                <div className="flex items-center">
                  {agent.voice && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700">
                      <span className="text-xs">{agent.voice.charAt(0)}</span>
                    </div>
                  )}
                  <span className="ml-2">{agent.voice || "-"}</span>
                </div>
                <div>{agent.phone || "-"}</div>
                <div>
                  <div className="flex items-center">
                    <span>{agent.editedBy}</span>
                    <span className="ml-2 text-xs text-gray-400">{agent.editedDate}</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="relative">
                    <button className="text-gray-400 hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
