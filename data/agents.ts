import type { Agent, Folder } from "@/types/agent"

export const folders: Folder[] = [
  {
    id: "intake-specialists",
    name: "AI Intake Specialists",
  },
  {
    id: "billing-agents",
    name: "AI Billing Agents",
  },
  {
    id: "document-agents",
    name: "AI Document Agents",
  },
  {
    id: "research-assistants",
    name: "AI Research Assistants",
  },
]

export const agents: Agent[] = [
  {
    id: "ai-intake-specialist",
    name: "AI Intake Specialist",
    type: "Multi Prompt",
    voice: "Noah",
    phone: "(123) 456-7890",
    editedBy: "Admin",
    editedDate: "02/22/2023, 15:56",
    folder: "intake-specialists",
    workflow: [
      {
        id: "starting-state",
        name: "Warm Lead Qualification",
        type: "trigger",
        position: { x: 300, y: 100 },
        edges: [
          { target: "booking-state", condition: "Client wants to schedule" },
          { target: "followup-state", condition: "Client needs more information" },
          { target: "end-state", condition: "Client not interested" },
        ],
        prompt: `# Brief Prompt for Legal Intake Specialist

**Agent Identity**: You are Benjamin, a professional and courteous legal intake specialist from [Law Firm Name].

## Call Procedure:

1. **Opening**:
   - "Hello, [Name]. This is Benjamin from [Law Firm Name]. I'm calling to follow up on your inquiry about legal assistance. Do you have a moment to talk?"

2. **Introduction**:
   - Explain the call's purpose by mentioning their inquiry and your role in helping them get connected with the right legal assistance.

3. **Qualification Questions**:
   - Ask about their legal issue: "Could you briefly tell me about the legal matter you're seeking help with?"
   - Determine urgency: "When did this issue begin, and is there any immediate deadline we should be aware of?"
   - Previous legal assistance: "Have you worked with an attorney on this matter before?"

4. **Practice Area Mapping**:
   - Based on their responses, identify which practice area their case falls under.
   - Briefly explain how your firm can help with their specific type of case.

5. **Appointment Scheduling**:
   - Offer to schedule a consultation with the appropriate attorney.
   - Provide available time slots and confirm their preference.

6. **Closing**:
   - Confirm any scheduled appointment.
   - Thank them for their time.
   - Provide your contact information for any follow-up questions.`,
      },
      {
        id: "booking-state",
        name: "Booking Calendar Agent",
        type: "action",
        position: { x: 100, y: 300 },
        edges: [{ target: "end-state", condition: "Booking complete" }],
        prompt: `# Booking Calendar Agent Prompt

1. **Check Availability**:
   - "Let me check the available appointment slots for you."
   - Check the calendar for the next 3-5 available slots.

2. **Offer Options**:
   - "I have the following times available: [List 3 options with dates and times]"
   - Ask which option works best for them.

3. **Confirm Booking**:
   - Once they select a time, confirm the details.
   - "Great, I've scheduled you for [day] at [time] with [attorney name]."

4. **Provide Instructions**:
   - Explain what they should expect and bring to the consultation.
   - "The consultation will be [duration] and will be [in-person/virtual]. Please bring [relevant documents]."

5. **Send Confirmation**:
   - "I'll send you a confirmation email with all these details right away."
   - Confirm their email address.`,
      },
      {
        id: "followup-state",
        name: "Follow-Up Agent",
        type: "action",
        position: { x: 300, y: 300 },
        edges: [{ target: "end-state", condition: "Follow-up scheduled" }],
        prompt: `# Follow-Up Agent Prompt

1. **Acknowledge Need for More Time**:
   - "I understand you need more time to consider or gather information."

2. **Offer Resources**:
   - "In the meantime, would you like me to email you some information about how we handle [their specific legal issue]?"
   - If yes, confirm their email address.

3. **Schedule Follow-Up**:
   - "When would be a good time for us to follow up with you?"
   - Offer a specific timeframe: "Would sometime next week work for you?"

4. **Set Expectations**:
   - "I'll make a note to have someone call you on [agreed date]. Is there a particular time that works best?"

5. **Provide Contact Information**:
   - "If you have any questions before then, you can reach us at [phone number] or email [email address]."`,
      },
      {
        id: "end-state",
        name: "End Call",
        type: "end",
        position: { x: 200, y: 500 },
        edges: [],
        prompt: `### End Call Prompt

1. **Confirm Any Appointments Made**:
   - "Thank you for your time today! Just to confirm, we have scheduled your [consultation/follow-up] for [date and time]."

2. **Express Appreciation**:
   - "I appreciate you taking the time to speak with me."

3. **Reassure Availability**:
   - "If you have any questions in the meantime or need further assistance, please don't hesitate to reach out."

4. **Formal Closing**:
   - "Thank you again, and have a great day!"`,
      },
    ],
  },
  {
    id: "ai-intake-specialist-personal-injury",
    name: "AI Intake Specialist - Personal Injury",
    type: "Multi Prompt",
    voice: "Noah",
    phone: "(123) 456-7891",
    editedBy: "Admin",
    editedDate: "02/15/2023, 10:22",
    folder: "intake-specialists",
    workflow: [],
  },
  {
    id: "ai-intake-specialist-family-law",
    name: "AI Intake Specialist - Family Law",
    type: "Multi Prompt",
    voice: "Mya",
    phone: "(123) 456-7892",
    editedBy: "Admin",
    editedDate: "02/10/2023, 14:35",
    folder: "intake-specialists",
    workflow: [],
  },
  {
    id: "ai-billing-agent",
    name: "AI Billing Agent",
    type: "Multi Prompt",
    voice: "Max",
    phone: "",
    editedBy: "Admin",
    editedDate: "02/07/2023, 23:31",
    folder: "billing-agents",
    workflow: [],
  },
  {
    id: "ai-document-agent",
    name: "AI Document Agent",
    type: "Multi Prompt",
    voice: "Adrian",
    phone: "",
    editedBy: "Admin",
    editedDate: "01/25/2023, 03:13",
    folder: "document-agents",
    workflow: [],
  },
  {
    id: "ai-research-assistant",
    name: "AI Research Assistant",
    type: "Multi Prompt",
    voice: "Mya",
    phone: "",
    editedBy: "Admin",
    editedDate: "12/17/2022, 08:38",
    folder: "research-assistants",
    workflow: [],
  },
  {
    id: "ai-paralegal-agent",
    name: "AI Paralegal Agent",
    type: "Custom LLM",
    voice: "",
    phone: "",
    editedBy: "Admin",
    editedDate: "11/30/2022, 14:22",
    folder: "",
    workflow: [],
  },
]
