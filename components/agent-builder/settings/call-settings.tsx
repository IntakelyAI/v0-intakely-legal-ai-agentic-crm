"use client"

import { useState } from "react"
import { Headphones } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CallSettings() {
  // State for all interactive elements
  const [voicemailDetection, setVoicemailDetection] = useState(true)
  const [voicemailAction, setVoicemailAction] = useState("leave-message")
  const [voicemailMessage, setVoicemailMessage] = useState(
    "Hi there! I'm Benjamin, you had submitted a request to talk to an assistant from Oakwood Law Firm. Please feel free to call me back at your convenience.",
  )
  const [voicemailDetectionDuration, setVoicemailDetectionDuration] = useState(30)
  const [endCallOnSilence, setEndCallOnSilence] = useState(1.0)
  const [maxCallDuration, setMaxCallDuration] = useState(11.0)
  const [pauseBeforeSpeaking, setPauseBeforeSpeaking] = useState(0)
  const [ringDuration, setRingDuration] = useState(30)

  return (
    <div className="border-t border-[#1e1e2a] pt-3">
      <div className="flex items-center px-4 py-2 mb-4">
        <Headphones className="h-6 w-6 mr-3 text-white" />
        <h2 className="text-xl font-semibold text-white">Call Settings</h2>
      </div>

      {/* Voicemail Detection */}
      <div className="px-4 py-3">
        <div className="flex flex-col space-y-2 mb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-medium">Voicemail Detection</h3>
              <p className="text-gray-400 text-sm">Hang up or leave a voicemail if a voicemail is detected.</p>
            </div>
            <Switch checked={voicemailDetection} onCheckedChange={setVoicemailDetection} />
          </div>
        </div>

        {voicemailDetection && (
          <div className="bg-[#13131a] rounded-md p-4 mb-4">
            <RadioGroup value={voicemailAction} onValueChange={setVoicemailAction} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hang-up" id="hang-up" />
                <Label htmlFor="hang-up" className="text-white">
                  Hang up if reaching voicemail
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="leave-message" id="leave-message" />
                <Label htmlFor="leave-message" className="text-white">
                  Leave a message if reaching voicemail
                </Label>
              </div>
            </RadioGroup>

            {voicemailAction === "leave-message" && (
              <div className="mt-4">
                <Textarea
                  value={voicemailMessage}
                  onChange={(e) => setVoicemailMessage(e.target.value)}
                  className="bg-[#1e1e2a] border-[#2d2d3a] text-white min-h-[100px]"
                  placeholder="Enter voicemail message here..."
                />
              </div>
            )}

            <div className="mt-6">
              <div className="flex flex-col space-y-1 mb-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-white font-medium">Voicemail Detection Duration</h4>
                    <p className="text-gray-400 text-sm">
                      Duration for which voicemail detection will be active during the call
                    </p>
                  </div>
                  <span className="text-white font-medium">{voicemailDetectionDuration} s</span>
                </div>
              </div>
              <Slider
                value={[voicemailDetectionDuration]}
                min={5}
                max={60}
                step={1}
                onValueChange={(value) => setVoicemailDetectionDuration(value[0])}
                className="my-4"
              />
            </div>
          </div>
        )}

        {/* End Call on Silence */}
        <div className="flex flex-col space-y-1 mb-2">
          <div className="flex justify-between">
            <h3 className="text-white font-medium">End Call on Silence</h3>
            <span className="text-white font-medium">{endCallOnSilence.toFixed(1)} m</span>
          </div>
        </div>
        <Slider
          value={[endCallOnSilence]}
          min={0.5}
          max={5}
          step={0.1}
          onValueChange={(value) => setEndCallOnSilence(value[0])}
          className="my-4"
        />

        {/* Max Call Duration */}
        <div className="flex flex-col space-y-1 mb-2">
          <div className="flex justify-between">
            <h3 className="text-white font-medium">Max Call Duration</h3>
            <span className="text-white font-medium">{maxCallDuration.toFixed(1)} m</span>
          </div>
        </div>
        <Slider
          value={[maxCallDuration]}
          min={1}
          max={30}
          step={0.5}
          onValueChange={(value) => setMaxCallDuration(value[0])}
          className="my-4"
        />

        {/* Pause Before Speaking */}
        <div className="flex flex-col space-y-1 mb-2">
          <div className="flex justify-between">
            <div>
              <h3 className="text-white font-medium">Pause Before Speaking</h3>
              <p className="text-gray-400 text-sm">
                The duration before the assistant starts speaking at the beginning of the call.
              </p>
            </div>
            <span className="text-white font-medium">{pauseBeforeSpeaking} s</span>
          </div>
        </div>
        <Slider
          value={[pauseBeforeSpeaking]}
          min={0}
          max={10}
          step={1}
          onValueChange={(value) => setPauseBeforeSpeaking(value[0])}
          className="my-4"
        />

        {/* Ring Duration */}
        <div className="flex flex-col space-y-1 mb-2">
          <div className="flex justify-between">
            <div>
              <h3 className="text-white font-medium">Ring Duration</h3>
              <p className="text-gray-400 text-sm">
                The duration for which the phone will ring before the call is answered or terminated.
              </p>
            </div>
            <span className="text-white font-medium">{ringDuration} s</span>
          </div>
        </div>
        <Slider
          value={[ringDuration]}
          min={5}
          max={60}
          step={5}
          onValueChange={(value) => setRingDuration(value[0])}
          className="my-4"
        />
      </div>
    </div>
  )
}
