"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

interface TestCase {
  id: string
  name: string
  userPrompt: string
  successCriteria: string
  variables: { name: string; value: string }[]
  functionMocks: any[]
  editedBy: string
  editedDate: string
}

export default function SimulationTesting() {
  const [activeTab, setActiveTab] = useState("test-cases")
  const [testCases, setTestCases] = useState<TestCase[]>([])
  const [showAddTestCase, setShowAddTestCase] = useState(false)

  // New test case form state
  const [newTestCase, setNewTestCase] = useState<Omit<TestCase, "id" | "editedBy" | "editedDate">>({
    name: "Unsaved Simulation Test",
    userPrompt: "",
    successCriteria: "",
    variables: [],
    functionMocks: [],
  })

  // Dynamic variables form state
  const [newVariableName, setNewVariableName] = useState("")
  const [newVariableValue, setNewVariableValue] = useState("")

  // Tabs within the test case dialog
  const [variablesTab, setVariablesTab] = useState("dynamic-variables")

  const handleAddTestCase = () => {
    const testCase: TestCase = {
      id: `test-${Date.now()}`,
      ...newTestCase,
      editedBy: "Admin",
      editedDate: new Date().toLocaleString(),
    }

    setTestCases([...testCases, testCase])
    setShowAddTestCase(false)
    resetNewTestCaseForm()
  }

  const resetNewTestCaseForm = () => {
    setNewTestCase({
      name: "Unsaved Simulation Test",
      userPrompt: "",
      successCriteria: "",
      variables: [],
      functionMocks: [],
    })
    setNewVariableName("")
    setNewVariableValue("")
  }

  const handleAddVariable = () => {
    if (newVariableName.trim() && newVariableValue.trim()) {
      setNewTestCase({
        ...newTestCase,
        variables: [...newTestCase.variables, { name: newVariableName, value: newVariableValue }],
      })
      setNewVariableName("")
      setNewVariableValue("")
    }
  }

  const handleRemoveVariable = (index: number) => {
    const updatedVariables = [...newTestCase.variables]
    updatedVariables.splice(index, 1)
    setNewTestCase({
      ...newTestCase,
      variables: updatedVariables,
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[#1e1e2a]">
        <h2 className="text-lg font-medium text-white">Simulation Testing</h2>
      </div>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid w-[400px] grid-cols-2 bg-[#1e1e2a]">
              <TabsTrigger value="test-cases" className="data-[state=active]:bg-[#2d2d3a]">
                Test Cases
              </TabsTrigger>
              <TabsTrigger value="batch-testing" className="data-[state=active]:bg-[#2d2d3a]">
                Batch Testing History
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={() => setShowAddTestCase(true)} className="bg-[#1e1e2a] hover:bg-[#2d2d3a] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Test Case
          </Button>
        </div>

        <div className="bg-[#13131a] rounded-md overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 p-4 border-b border-[#1e1e2a] text-xs font-medium uppercase tracking-wider text-gray-400">
            <div className="w-6"></div>
            <div>Test Case</div>
            <div>User Prompt</div>
            <div>Success Criteria</div>
            <div>Edited by</div>
          </div>

          {testCases.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No test cases yet. Click the "Test Case" button to create one.
            </div>
          ) : (
            testCases.map((testCase) => (
              <div
                key={testCase.id}
                className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 p-4 border-b border-[#1e1e2a] hover:bg-[#1e1e2a] text-white"
              >
                <div className="flex items-center">
                  <input type="checkbox" className="w-5 h-5 rounded-sm border-[#1e1e2a] accent-purple-600" />
                </div>
                <div className="truncate">{testCase.name}</div>
                <div className="truncate">{testCase.userPrompt}</div>
                <div className="truncate">{testCase.successCriteria}</div>
                <div className="flex flex-col">
                  <div>{testCase.editedBy}</div>
                  <div className="text-xs text-gray-400">{testCase.editedDate}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Test Case Dialog */}
      <Dialog open={showAddTestCase} onOpenChange={setShowAddTestCase}>
        <DialogContent className="sm:max-w-[800px] bg-[#0d0d11] border-[#1e1e2a] text-white">
          <DialogHeader>
            <DialogTitle>Add a test case</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <label htmlFor="test-case-name" className="text-white mb-2 block">
                Name
              </label>
              <Input
                id="test-case-name"
                value={newTestCase.name}
                onChange={(e) => setNewTestCase({ ...newTestCase, name: e.target.value })}
                className="bg-[#13131a] border-[#1e1e2a] text-white"
                placeholder="Enter test case name"
              />
            </div>

            <div>
              <label htmlFor="user-prompt" className="text-white mb-2 block">
                User Prompt
              </label>
              <div className="text-xs text-gray-400 mb-2">Define how user will interact with the agent</div>
              <Textarea
                id="user-prompt"
                value={newTestCase.userPrompt}
                onChange={(e) => setNewTestCase({ ...newTestCase, userPrompt: e.target.value })}
                className="min-h-[100px] bg-[#13131a] border-[#1e1e2a] text-white"
                placeholder="Enter user input"
              />
            </div>

            <div>
              <label htmlFor="success-criteria" className="text-white mb-2 block">
                Success Criteria
              </label>
              <div className="text-xs text-gray-400 mb-2">Define the success criteria for the test case</div>
              <Textarea
                id="success-criteria"
                value={newTestCase.successCriteria}
                onChange={(e) => setNewTestCase({ ...newTestCase, successCriteria: e.target.value })}
                className="min-h-[100px] bg-[#13131a] border-[#1e1e2a] text-white"
                placeholder="Enter success criteria"
              />
            </div>

            <div>
              <label className="text-white mb-2 block">Test Variables & Mocks</label>
              <div className="bg-[#13131a] border border-[#1e1e2a] rounded-md p-4">
                <Tabs value={variablesTab} onValueChange={setVariablesTab}>
                  <TabsList className="bg-transparent border-b border-[#1e1e2a] w-full justify-start mb-4 p-0">
                    <TabsTrigger
                      value="dynamic-variables"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none px-4 py-2 text-base"
                    >
                      Dynamic Variables
                    </TabsTrigger>
                    <TabsTrigger
                      value="custom-function-mocks"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none px-4 py-2 text-base"
                    >
                      Custom Function Mocks
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="dynamic-variables">
                    <div className="space-y-4">
                      <div className="text-sm text-gray-400 mb-4">
                        Set dynamic variables for dashboard audio and llm tests
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-base font-medium text-gray-300">Variable Name</div>
                        <div className="text-base font-medium text-gray-300">Test Value</div>
                      </div>

                      {newTestCase.variables.map((variable, index) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4">
                          <div className="bg-[#1e1e2a] p-3 rounded-md">{variable.name}</div>
                          <div className="bg-[#1e1e2a] p-3 rounded-md">{variable.value}</div>
                          <button
                            onClick={() => handleRemoveVariable(index)}
                            className="flex items-center justify-center h-10 w-10 text-gray-400 hover:text-white"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}

                      <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
                        <Input
                          value={newVariableName}
                          onChange={(e) => setNewVariableName(e.target.value)}
                          placeholder="Enter the variable name"
                          className="bg-[#13131a] border-[#1e1e2a] text-white h-12"
                        />
                        <Input
                          value={newVariableValue}
                          onChange={(e) => setNewVariableValue(e.target.value)}
                          placeholder="Enter the value"
                          className="bg-[#13131a] border-[#1e1e2a] text-white h-12"
                        />
                        <button
                          onClick={handleAddVariable}
                          className="flex items-center justify-center h-12 w-12 text-gray-400 hover:text-white"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <Button
                        onClick={handleAddVariable}
                        className="bg-[#13131a] hover:bg-[#1e1e2a] text-white border border-[#1e1e2a]"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="custom-function-mocks">
                    <div className="space-y-4">
                      <div className="text-sm text-gray-400 mb-4">
                        Set custom function mocks for dashboard audio and llm tests
                      </div>

                      <Button className="bg-[#13131a] hover:bg-[#1e1e2a] text-white border border-[#1e1e2a]" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddTestCase(false)
                resetNewTestCaseForm()
              }}
              className="border-[#1e1e2a] text-white hover:bg-[#1e1e2a]"
            >
              Cancel
            </Button>
            <Button onClick={handleAddTestCase} className="bg-white text-black hover:bg-gray-200">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
