"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, AlignLeft, ListFilter, CircleSlash, Hash } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define types for our field types
type FieldType = "text" | "selector" | "boolean" | "number"

interface Field {
  id: string
  type: FieldType
  name: string
  description: string
  formatExample?: string
  choices?: string[]
}

export function PostCallAnalysis() {
  const [enableSummaries, setEnableSummaries] = useState(true)
  const [enableSentimentAnalysis, setEnableSentimentAnalysis] = useState(true)
  const [enableActionItems, setEnableActionItems] = useState(false)

  // State for custom fields
  const [fields, setFields] = useState<Field[]>([])

  // State for add field popover
  const [addFieldOpen, setAddFieldOpen] = useState(false)

  // State for field dialogs
  const [fieldDialogOpen, setFieldDialogOpen] = useState(false)
  const [currentFieldType, setCurrentFieldType] = useState<FieldType | null>(null)

  // State for field form
  const [fieldName, setFieldName] = useState("")
  const [fieldDescription, setFieldDescription] = useState("")
  const [fieldFormatExample, setFieldFormatExample] = useState("")
  const [fieldChoices, setFieldChoices] = useState<string[]>([])

  // Function to open field dialog
  const openFieldDialog = (type: FieldType) => {
    setCurrentFieldType(type)
    setFieldName("")
    setFieldDescription("")
    setFieldFormatExample("")
    setFieldChoices([])
    setAddFieldOpen(false)
    setFieldDialogOpen(true)
  }

  // Function to add a new field
  const addField = () => {
    if (!currentFieldType || !fieldName || !fieldDescription) return

    const newField: Field = {
      id: Date.now().toString(),
      type: currentFieldType,
      name: fieldName,
      description: fieldDescription,
    }

    if (currentFieldType === "text" && fieldFormatExample) {
      newField.formatExample = fieldFormatExample
    }

    if (currentFieldType === "selector" && fieldChoices.length > 0) {
      newField.choices = fieldChoices
    }

    setFields([...fields, newField])
    setFieldDialogOpen(false)
  }

  // Function to add a new choice
  const addChoice = () => {
    setFieldChoices([...fieldChoices, ""])
  }

  // Function to update a choice
  const updateChoice = (index: number, value: string) => {
    const newChoices = [...fieldChoices]
    newChoices[index] = value
    setFieldChoices(newChoices)
  }

  // Function to remove a choice
  const removeChoice = (index: number) => {
    const newChoices = [...fieldChoices]
    newChoices.splice(index, 1)
    setFieldChoices(newChoices)
  }

  // Function to remove a field
  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  return (
    <div className="flex flex-col space-y-6 py-4">
      <div className="px-4 space-y-6">
        {/* Enable Call Summaries */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Enable Call Summaries</Label>
              <p className="text-sm text-gray-400">Generate a summary of each call after it ends.</p>
            </div>
            <Switch checked={enableSummaries} onCheckedChange={setEnableSummaries} />
          </div>
        </div>

        {/* Enable Sentiment Analysis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Enable Sentiment Analysis</Label>
              <p className="text-sm text-gray-400">Analyze the sentiment of the user during the call.</p>
            </div>
            <Switch checked={enableSentimentAnalysis} onCheckedChange={setEnableSentimentAnalysis} />
          </div>
        </div>

        {/* Enable Action Items */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Enable Action Items</Label>
              <p className="text-sm text-gray-400">Identify action items discussed during the call.</p>
            </div>
            <Switch checked={enableActionItems} onCheckedChange={setEnableActionItems} />
          </div>
        </div>

        {/* Custom Fields */}
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <Label className="text-white text-lg">Custom Fields</Label>
            <Popover open={addFieldOpen} onOpenChange={setAddFieldOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-0 bg-gray-900 border-gray-800">
                <div className="py-2">
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800"
                    onClick={() => openFieldDialog("text")}
                  >
                    <AlignLeft className="mr-2 h-4 w-4" /> Text
                  </button>
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800"
                    onClick={() => openFieldDialog("selector")}
                  >
                    <ListFilter className="mr-2 h-4 w-4" /> Selector
                  </button>
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800"
                    onClick={() => openFieldDialog("boolean")}
                  >
                    <CircleSlash className="mr-2 h-4 w-4" /> Boolean
                  </button>
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800"
                    onClick={() => openFieldDialog("number")}
                  >
                    <Hash className="mr-2 h-4 w-4" /> Number
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* List of custom fields */}
          <div className="space-y-2">
            {fields.map((field) => (
              <div key={field.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                <div>
                  <p className="text-white">{field.name}</p>
                  <p className="text-sm text-gray-400">{field.type}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeField(field.id)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Text Field Dialog */}
      <Dialog
        open={fieldDialogOpen && currentFieldType === "text"}
        onOpenChange={(open) => !open && setFieldDialogOpen(false)}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlignLeft className="mr-2 h-5 w-5" /> Text
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="detailed_call_summary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={fieldDescription}
                onChange={(e) => setFieldDescription(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                placeholder="Detailed summary of the call before you transfer the call to a human agent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Format Example (Optional)</Label>
              <Input
                id="format"
                value={fieldFormatExample}
                onChange={(e) => setFieldFormatExample(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Detailed call summary of your use case"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFieldDialogOpen(false)}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={addField}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Selector Field Dialog */}
      <Dialog
        open={fieldDialogOpen && currentFieldType === "selector"}
        onOpenChange={(open) => !open && setFieldDialogOpen(false)}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ListFilter className="mr-2 h-5 w-5" /> Selector
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="selector-name">Name</Label>
              <Input
                id="selector-name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="customer_type"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="selector-description">Description</Label>
              <Textarea
                id="selector-description"
                value={fieldDescription}
                onChange={(e) => setFieldDescription(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                placeholder="What type of customer is the user?"
              />
            </div>
            <div className="space-y-2">
              <Label>Choices</Label>
              <div className="space-y-2">
                {fieldChoices.map((choice, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={choice}
                      onChange={(e) => updateChoice(index, e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChoice(index)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addChoice}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFieldDialogOpen(false)}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={addField}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Boolean Field Dialog */}
      <Dialog
        open={fieldDialogOpen && currentFieldType === "boolean"}
        onOpenChange={(open) => !open && setFieldDialogOpen(false)}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CircleSlash className="mr-2 h-5 w-5" /> Yes/No
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="boolean-name">Name</Label>
              <Input
                id="boolean-name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="appointment_booked"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boolean-description">Description</Label>
              <Textarea
                id="boolean-description"
                value={fieldDescription}
                onChange={(e) => setFieldDescription(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                placeholder="Did the user book an appointment?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFieldDialogOpen(false)}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={addField}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Number Field Dialog */}
      <Dialog
        open={fieldDialogOpen && currentFieldType === "number"}
        onOpenChange={(open) => !open && setFieldDialogOpen(false)}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Hash className="mr-2 h-5 w-5" /> Number
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="number-name">Name</Label>
              <Input
                id="number-name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="user_age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number-description">Description</Label>
              <Textarea
                id="number-description"
                value={fieldDescription}
                onChange={(e) => setFieldDescription(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                placeholder="What is the user's age?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFieldDialogOpen(false)}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={addField}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
