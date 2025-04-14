export interface Position {
  x: number
  y: number
}

export interface Edge {
  target: string
  condition?: string
}

export interface WorkflowState {
  id: string
  name: string
  type: string
  position: Position
  edges: Edge[]
  prompt: string
}

export interface Folder {
  id: string
  name: string
}

export interface Agent {
  id: string
  name: string
  type: string
  voice: string
  phone: string
  editedBy: string
  editedDate: string
  folder: string
  workflow: WorkflowState[]
}
