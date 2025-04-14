"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Plus, X, Link, Upload, FileText } from "lucide-react"

interface KnowledgeBase {
  id: string
  name: string
  documents: Document[]
  createdAt: string
  updatedAt: string
}

interface Document {
  id: string
  name: string
  type: "web" | "file" | "text"
  size?: string
  url?: string
  content?: string
  createdAt: string
}

export default function KnowledgeBaseManager() {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([])
  const [showAddKnowledgeBase, setShowAddKnowledgeBase] = useState(false)
  const [newKnowledgeBaseName, setNewKnowledgeBaseName] = useState("")
  const [documents, setDocuments] = useState<Document[]>([])

  // State for document addition options
  const [showWebPageForm, setShowWebPageForm] = useState(false)
  const [showFileUploadForm, setShowFileUploadForm] = useState(false)
  const [showTextForm, setShowTextForm] = useState(false)

  // Form states
  const [webUrl, setWebUrl] = useState("")
  const [textContent, setTextContent] = useState("")

  const handleAddKnowledgeBase = () => {
    if (!newKnowledgeBaseName.trim()) return

    const newKnowledgeBase: KnowledgeBase = {
      id: `kb-${Date.now()}`,
      name: newKnowledgeBaseName,
      documents,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setKnowledgeBases([...knowledgeBases, newKnowledgeBase])
    setShowAddKnowledgeBase(false)
    resetForm()
  }

  const resetForm = () => {
    setNewKnowledgeBaseName("")
    setDocuments([])
    setWebUrl("")
    setTextContent("")
    setShowWebPageForm(false)
    setShowFileUploadForm(false)
    setShowTextForm(false)
  }

  const handleAddWebPage = () => {
    if (!webUrl.trim()) return

    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      name: webUrl,
      type: "web",
      url: webUrl,
      createdAt: new Date().toISOString(),
    }

    setDocuments([...documents, newDocument])
    setWebUrl("")
    setShowWebPageForm(false)
  }

  const handleAddText = () => {
    if (!textContent.trim()) return

    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      name: `Text Document ${documents.length + 1}`,
      type: "text",
      content: textContent,
      createdAt: new Date().toISOString(),
    }

    setDocuments([...documents, newDocument])
    setTextContent("")
    setShowTextForm(false)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-[#1e1e2a] p-4">
        <h1 className="text-lg font-medium text-white">Knowledge Base</h1>
        <Button onClick={() => setShowAddKnowledgeBase(true)} className="bg-[#1e1e2a] hover:bg-[#2d2d3a] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Knowledge Base
        </Button>
      </div>

      <div className="flex-1 p-6">
        {knowledgeBases.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4 h-16 w-16 rounded-full bg-[#1e1e2a] flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-white mb-2">No Knowledge Bases</h2>
            <p className="text-gray-400 max-w-md mb-6">
              Create a knowledge base to enhance your agent's capabilities with domain-specific information.
            </p>
            <Button
              onClick={() => setShowAddKnowledgeBase(true)}
              className="bg-[#1e1e2a] hover:bg-[#2d2d3a] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Knowledge Base
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeBases.map((kb) => (
              <div key={kb.id} className="bg-[#13131a] border border-[#1e1e2a] rounded-md p-4">
                <h3 className="text-lg font-medium text-white mb-2">{kb.name}</h3>
                <div className="text-sm text-gray-400 mb-4">
                  {kb.documents.length} document{kb.documents.length !== 1 ? "s" : ""}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">Updated {new Date(kb.updatedAt).toLocaleDateString()}</div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Knowledge Base Dialog */}
      <Dialog open={showAddKnowledgeBase} onOpenChange={setShowAddKnowledgeBase}>
        <DialogContent className="sm:max-w-[600px] bg-[#0d0d11] border-[#1e1e2a] text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Add Knowledge Base</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddKnowledgeBase(false)}
              className="h-6 w-6 rounded-full p-0 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="kb-name" className="text-white mb-2 block">
                Knowledge Base Name
              </label>
              <Input
                id="kb-name"
                value={newKnowledgeBaseName}
                onChange={(e) => setNewKnowledgeBaseName(e.target.value)}
                className="bg-[#13131a] border-[#1e1e2a] text-white"
                placeholder="Enter"
              />
            </div>

            <div>
              <label className="text-white mb-2 block">Documents</label>

              {documents.length > 0 && (
                <div className="mb-4 space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-[#1e1e2a] p-2 rounded">
                      <div className="flex items-center">
                        {doc.type === "web" && <Link className="h-4 w-4 mr-2 text-gray-400" />}
                        {doc.type === "file" && <Upload className="h-4 w-4 mr-2 text-gray-400" />}
                        {doc.type === "text" && <FileText className="h-4 w-4 mr-2 text-gray-400" />}
                        <span className="text-sm text-white">{doc.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDocuments(documents.filter((d) => d.id !== doc.id))}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button className="bg-transparent hover:bg-[#1e1e2a] text-white border border-[#1e1e2a] mb-6" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>

              <div className="space-y-4">
                <button
                  className="flex items-center gap-4 p-4 w-full rounded-md border border-[#1e1e2a] bg-[#13131a] hover:bg-[#1e1e2a] cursor-pointer transition-colors text-left"
                  onClick={() => setShowWebPageForm(true)}
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#1e1e2a] flex items-center justify-center">
                    <Link className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Add Web Pages</div>
                    <div className="text-sm text-gray-400">Crawl and sync your website</div>
                  </div>
                </button>

                {showWebPageForm && (
                  <div className="p-4 border border-[#1e1e2a] rounded-md bg-[#1e1e2a]">
                    <div className="mb-2">
                      <label htmlFor="web-url" className="text-sm text-gray-300 mb-1 block">
                        Website URL
                      </label>
                      <Input
                        id="web-url"
                        value={webUrl}
                        onChange={(e) => setWebUrl(e.target.value)}
                        className="bg-[#13131a] border-[#1e1e2a] text-white"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowWebPageForm(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleAddWebPage}
                        className="bg-white text-black hover:bg-gray-200"
                        disabled={!webUrl.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}

                <button
                  className="flex items-center gap-4 p-4 w-full rounded-md border border-[#1e1e2a] bg-[#13131a] hover:bg-[#1e1e2a] cursor-pointer transition-colors text-left"
                  onClick={() => setShowFileUploadForm(true)}
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#1e1e2a] flex items-center justify-center">
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Upload Files</div>
                    <div className="text-sm text-gray-400">File size should be less than 100MB</div>
                  </div>
                </button>

                {showFileUploadForm && (
                  <div className="p-4 border border-[#1e1e2a] rounded-md bg-[#1e1e2a]">
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-[#2d2d3a] rounded-md">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Drag and drop files here or click to browse</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFileUploadForm(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                        Upload
                      </Button>
                    </div>
                  </div>
                )}

                <button
                  className="flex items-center gap-4 p-4 w-full rounded-md border border-[#1e1e2a] bg-[#13131a] hover:bg-[#1e1e2a] cursor-pointer transition-colors text-left"
                  onClick={() => setShowTextForm(true)}
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#1e1e2a] flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Add Text</div>
                    <div className="text-sm text-gray-400">Add articles manually</div>
                  </div>
                </button>

                {showTextForm && (
                  <div className="p-4 border border-[#1e1e2a] rounded-md bg-[#1e1e2a]">
                    <div className="mb-2">
                      <label htmlFor="text-content" className="text-sm text-gray-300 mb-1 block">
                        Text Content
                      </label>
                      <textarea
                        id="text-content"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        className="w-full h-32 bg-[#13131a] border border-[#1e1e2a] rounded-md p-2 text-white resize-none"
                        placeholder="Enter your text content here..."
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowTextForm(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleAddText}
                        className="bg-white text-black hover:bg-gray-200"
                        disabled={!textContent.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddKnowledgeBase(false)
                resetForm()
              }}
              className="border-[#1e1e2a] text-white hover:bg-[#1e1e2a]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddKnowledgeBase}
              className="bg-white text-black hover:bg-gray-200"
              disabled={!newKnowledgeBaseName.trim()}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
