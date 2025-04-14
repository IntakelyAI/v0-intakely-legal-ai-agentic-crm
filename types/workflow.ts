export interface Position {
  x: number
  y: number
}

export interface WorkflowNode {
  id: string
  type: string
  label: string
  description?: string
  position: Position
  inputs: string[]
  outputs: string[]
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  nodes: WorkflowNode[]
}
