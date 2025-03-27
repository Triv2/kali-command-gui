"use client"

import { useState } from "react"
import { Bookmark, Copy, Play, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Mock data for presets
const mockPresets = [
  {
    id: "1",
    name: "Basic Network Scan",
    command: "nmap",
    options: { sV: true, p: "1-1000" },
    preview: "nmap -sV -p 1-1000 192.168.1.1",
    category: "information-gathering",
  },
  {
    id: "2",
    name: "Full Port Scan",
    command: "nmap",
    options: { sS: true, p: "-", A: true },
    preview: "nmap -sS -p- -A 192.168.1.1",
    category: "information-gathering",
  },
  {
    id: "3",
    name: "WordPress Scan",
    command: "wpscan",
    options: { url: "http://example.com", enumerate: "u" },
    preview: "wpscan --url http://example.com --enumerate u",
    category: "vulnerability-analysis",
  },
]

export default function CommandPresets() {
  const [presets, setPresets] = useState(mockPresets)

  const handleCopyCommand = (command:string) => {
    navigator.clipboard.writeText(command)
    // Show a toast notification
    alert("Command copied to clipboard")
  }

  const handleDeletePreset = (id:string) => {
    if (confirm("Are you sure you want to delete this preset?")) {
      setPresets(presets.filter((preset) => preset.id !== id))
    }
  }

  const handleLoadPreset = (preset: {
    id: string;
    name: string;
    command: string;
    options: Record<string, unknown>;
    preview: string;
    category: string;
  }) => {
    // In a real app, this would load the preset into the command builder
    alert(`Loading preset: ${preset.name}`);
  };
  if (presets.length === 0) {
    return (
      <div className="text-center p-4 text-zinc-400">
        No saved presets yet. Save command configurations to see them here.
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-3">
        {presets.map((preset) => (
          <div key={preset.id} className="bg-zinc-950 rounded-md p-3 border border-zinc-700">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <Bookmark className="h-4 w-4 mr-2 text-primary" />
                  <h4 className="font-medium text-white">{preset.name}</h4>
                </div>
                <div className="font-mono text-sm text-green-400 mt-2 break-all">{preset.preview}</div>
              </div>
              <Badge className="ml-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-800 border border-zinc-700">
                {preset.category.replace("-", " ")}
              </Badge>
            </div>
            <div className="flex justify-end space-x-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCommand(preset.preview)}
                className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLoadPreset(preset)}
                className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Play className="h-3 w-3 mr-1" />
                Load
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeletePreset(preset.id)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

