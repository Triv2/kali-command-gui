"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Copy, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface CommandHistoryItem {
  id: string
  command: string
  timestamp: string | number | Date
  status: 'completed' | 'failed'
}


export default function CommandHistory({ history = [] }: { history: CommandHistoryItem[] }) {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>(history)

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command)
    // Show a toast notification
    alert("Command copied to clipboard")
  }

  const handleDeleteCommand = (id: string) => {
    setCommandHistory(commandHistory.filter((item) => item.id !== id))
  }

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your command history?")) {
      setCommandHistory([])
    }
  }

  if (commandHistory.length === 0) {
    return (
      <div className="text-center p-4 text-zinc-400">No command history yet. Execute commands to see them here.</div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-white">Recent Commands</h3>
        <Button variant="destructive" size="sm" onClick={handleClearHistory} className="bg-red-600 hover:bg-red-700">
          Clear History
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {commandHistory.map((item) => (
            <div key={item.id} className="bg-zinc-950 rounded-md p-3 border border-zinc-700">
              <div className="flex justify-between items-start">
                <div className="font-mono text-sm text-green-400 break-all">{item.command}</div>
                <div className="flex space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                    onClick={() => handleCopyCommand(item.command)}
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                    onClick={() => handleDeleteCommand(item.id)}
                  >
                    <Trash className="h-3 w-3" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-zinc-400">
                <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                <Badge
                  variant={item.status === "completed" ? "success" : "destructive"}
                  className={
                    item.status === "completed"
                      ? "bg-green-900/50 text-green-400 hover:bg-green-900/50 border border-green-700"
                      : "bg-red-900/50 text-red-400 hover:bg-red-900/50 border border-red-700"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

