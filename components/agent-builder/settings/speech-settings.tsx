"use client"

import { useState } from "react"
import { MessageSquare, Settings, Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SpeechSettings() {
  // State for all the form controls
  const [backgroundSound, setBackgroundSound] = useState("call-center")
  const [responsiveness, setResponsiveness] = useState(1)
  const [interruptionSensitivity, setInterruptionSensitivity] = useState(0.75)
  const [backchanneling, setBackchanneling] = useState(true)
  const [backchannelFrequency, setBackchannelFrequency] = useState(0.4)
  const [backchannelWords, setBackchannelWords] = useState('"I see.", "I understand.", "Got it.", "That makes sense."')
  const [transcriptionMode, setTranscriptionMode] = useState("speed")
  const [boostedKeywords, setBoostedKeywords] = useState("")
  const [speechNormalization, setSpeechNormalization] = useState(true)
  const [transcriptFormatting, setTranscriptFormatting] = useState(false)
  const [reminderSeconds, setReminderSeconds] = useState(10)
  const [reminderTimes, setReminderTimes] = useState(3)

  return (
    <div className="flex flex-col space-y-6 py-4">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-purple-500" />
          <span className="text-white font-medium">Speech Settings</span>
        </div>
      </div>

      <div className="px-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Background Sound */}
        <div className="space-y-2">
          <Label className="text-white">Background Sound</Label>
          <div className="flex items-center gap-2">
            <Select value={backgroundSound} onValueChange={setBackgroundSound}>
              <SelectTrigger className="w-full bg-[#1e1e2a] border-[#2e2e3a]">
                <SelectValue placeholder="Select background sound" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e1e2a] border-[#2e2e3a]">
                <SelectItem value="call-center">Call Center</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="cafe">Café</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="bg-[#1e1e2a] border-[#2e2e3a]">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Responsiveness */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-white">Responsiveness</Label>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">Control how fast the agent responds after users finish speaking.</p>
          <div className="flex items-center gap-4">
            <Slider
              value={[responsiveness]}
              min={0}
              max={2}
              step={0.1}
              onValueChange={(value) => setResponsiveness(value[0])}
              className="flex-1"
            />
            <span className="text-white min-w-[2ch] text-right">{responsiveness}</span>
          </div>
        </div>

        {/* Interruption Sensitivity */}
        <div className="space-y-2">
          <Label className="text-white">Interruption Sensitivity</Label>
          <p className="text-sm text-gray-400">Control how sensitively AI can be interrupted by human speech.</p>
          <div className="flex items-center gap-4">
            <Slider
              value={[interruptionSensitivity]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(value) => setInterruptionSensitivity(value[0])}
              className="flex-1"
            />
            <span className="text-white min-w-[3ch] text-right">{interruptionSensitivity}</span>
          </div>
        </div>

        {/* Enable Backchanneling */}
        <div className="space-y-2">
          <Label className="text-white">Enable Backchanneling</Label>
          <p className="text-sm text-gray-400">
            Enables the agent to use affirmations like 'yeah' or 'uh-huh' during conversations, indicating active
            listening and engagement.
          </p>
          <div className="flex items-center">
            <Switch checked={backchanneling} onCheckedChange={setBackchanneling} />
          </div>
        </div>

        {/* Backchannel settings - only show if backchanneling is enabled */}
        {backchanneling && (
          <div className="space-y-6 rounded-md bg-[#1a1a24] p-4">
            {/* Backchannel Frequency */}
            <div className="space-y-2">
              <Label className="text-white">Backchannel Frequency</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[backchannelFrequency]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setBackchannelFrequency(value[0])}
                  className="flex-1"
                />
                <span className="text-white min-w-[3ch] text-right">{backchannelFrequency}</span>
              </div>
            </div>

            {/* Backchannel Words */}
            <div className="space-y-2">
              <Label className="text-white">Backchannel Words</Label>
              <p className="text-sm text-gray-400">A list of words that the agent would use for backchanneling.</p>
              <Textarea
                value={backchannelWords}
                onChange={(e) => setBackchannelWords(e.target.value)}
                className="bg-[#13131a] border-[#2e2e3a] text-white"
              />
            </div>
          </div>
        )}

        {/* Transcription Mode */}
        <div className="space-y-2">
          <Label className="text-white">Transcription Mode</Label>
          <p className="text-sm text-gray-400">Balance between speed and accuracy.</p>
          <RadioGroup value={transcriptionMode} onValueChange={setTranscriptionMode} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="speed" id="speed" className="border-[#2e2e3a]" />
              <Label htmlFor="speed" className="text-gray-400">
                Optimize for speed
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accuracy" id="accuracy" className="border-[#2e2e3a]" />
              <Label htmlFor="accuracy" className="text-gray-400">
                Optimize for accuracy <Info className="inline h-4 w-4 text-gray-400" />
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Boosted Keywords */}
        <div className="space-y-2">
          <Label className="text-white">Boosted Keywords</Label>
          <p className="text-sm text-gray-400">
            Provide a customized list of keywords to expand our models' vocabulary.
          </p>
          <Input
            value={boostedKeywords}
            onChange={(e) => setBoostedKeywords(e.target.value)}
            placeholder="Split by comma. Example: Retell,Walmart"
            className="bg-[#13131a] border-[#2e2e3a] text-white"
          />
        </div>

        {/* Enable Speech Normalization */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-white">Enable Speech Normalization</Label>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">
            It converts text elements like numbers, currency, and dates into human-like spoken forms. (
            <a href="#" className="text-blue-400 hover:underline">
              Learn more
            </a>
            )
          </p>
          <div className="flex items-center">
            <Switch checked={speechNormalization} onCheckedChange={setSpeechNormalization} />
          </div>
        </div>

        {/* Enable Transcript Formatting */}
        <div className="space-y-2">
          <Label className="text-white">Enable Transcript Formatting</Label>
          <p className="text-sm text-gray-400">
            Prevent agent errors like phone numbers being formatted as timestamps.
          </p>
          <div className="flex items-center">
            <Switch checked={transcriptFormatting} onCheckedChange={setTranscriptFormatting} />
          </div>
        </div>

        {/* Reminder Message Frequency */}
        <div className="space-y-2">
          <Label className="text-white">Reminder Message Frequency</Label>
          <p className="text-sm text-gray-400">Control how often AI will send a reminder message.</p>
          <div className="flex items-center gap-2">
            <div className="bg-[#13131a] border border-[#2e2e3a] rounded-md p-2 flex items-center">
              <Input
                type="number"
                value={reminderSeconds}
                onChange={(e) => setReminderSeconds(Number.parseInt(e.target.value))}
                className="w-16 bg-transparent border-0 p-0 text-white text-center"
                min={1}
              />
              <div className="flex flex-col px-1">
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setReminderSeconds((prev) => Math.min(prev + 1, 60))}
                >
                  ▲
                </button>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setReminderSeconds((prev) => Math.max(prev - 1, 1))}
                >
                  ▼
                </button>
              </div>
              <span className="text-gray-400 ml-2">seconds</span>
            </div>

            <div className="bg-[#13131a] border border-[#2e2e3a] rounded-md p-2 flex items-center">
              <Input
                type="number"
                value={reminderTimes}
                onChange={(e) => setReminderTimes(Number.parseInt(e.target.value))}
                className="w-16 bg-transparent border-0 p-0 text-white text-center"
                min={1}
              />
              <div className="flex flex-col px-1">
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setReminderTimes((prev) => Math.min(prev + 1, 10))}
                >
                  ▲
                </button>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setReminderTimes((prev) => Math.max(prev - 1, 1))}
                >
                  ▼
                </button>
              </div>
              <span className="text-gray-400 ml-2">times</span>
            </div>
          </div>
        </div>

        {/* Pronunciation */}
        <div className="space-y-2">
          <Label className="text-white">Pronunciation</Label>
          <p className="text-sm text-gray-400">
            Guide the model to pronounce a word, name, or phrase in a specific way. (
            <a href="#" className="text-blue-400 hover:underline">
              Learn more
            </a>
            )
          </p>
          <Button variant="outline" className="bg-[#13131a] border-[#2e2e3a] text-white">
            + Add
          </Button>
        </div>

        <div className="border-t border-[#2e2e3a] my-4"></div>
      </div>
    </div>
  )
}
