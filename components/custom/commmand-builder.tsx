"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Save,
  Copy,
  Play,
  Clock,
  Bookmark,
  AlertTriangle,
  Info,
  ExternalLink,
  BookOpen,
  Terminal,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import {
  commandCategories,
  getCommandsByCategory,
  generateCommandExplanation,
  getCommandDocumentation,
  getCommandShellExamples,
} from "@/lib/commands"
import CommandOptions from "./command-options"
import CommandHistory from "./command-history"
import CommandPresets from "./command-presets"

export default function CommandBuilder() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedCommand, setSelectedCommand] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [commandOptions, setCommandOptions] = useState<Record<string, unknown>>({})

  const [commandPreview, setCommandPreview] = useState<string>("")
  const [commandExplanation, setCommandExplanation] = useState<string>("")
  const [securityMode, setSecurityMode] = useState<boolean>(true)
  const [commandHistory, setCommandHistory] = useState<Array<{
    id: string;
    command: string;
    timestamp: string;
    status: 'completed' | 'failed';
  }>>([])
  const [availableCommands, setAvailableCommands] = useState<Array<{
    name: string;
    description: string;
  }>>([])

  // Load commands for the selected category
  useEffect(() => {
    const commands = getCommandsByCategory(selectedCategory)
    setAvailableCommands(commands)
    if (commands.length > 0 && !commands.find((cmd) => cmd.name === selectedCommand)) {
      setSelectedCommand(commands[0].name)
    }
  }, [selectedCategory, selectedCommand])

  // Update command preview when command or options change
  useEffect(() => {
    if (!selectedCommand) return

    let preview = selectedCommand

    // Add options to the preview
    Object.entries(commandOptions).forEach(([key, value]) => {
      if (value && typeof value === "boolean") {
        preview += ` --${key}`
      } else if (value) {
        preview += ` --${key} ${value}`
      }
    })

    setCommandPreview(preview)

    // Generate explanation for the current command
    const explanation = generateCommandExplanation(selectedCommand, commandOptions)
    setCommandExplanation(explanation)
  }, [selectedCommand, commandOptions])

  const handleCommandSelect = (command: string) => {
    setSelectedCommand(command)
    setCommandOptions({})
  }

  const handleOptionChange = (name: string, value: unknown) => {
    setCommandOptions((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleExecuteCommand = () => {
    const timestamp = new Date().toISOString()
    const newHistoryItem = {
      id: timestamp,
      command: commandPreview,
      timestamp,
      status: 'completed' as const,
    }
  
    setCommandHistory((prev) => [newHistoryItem, ...prev])
  
    alert(`Command executed: ${commandPreview}`)
  }
  
  const handleCopyCommand = () => {
    navigator.clipboard.writeText(commandPreview)
    // Show a toast notification
    alert("Command copied to clipboard")
  }

  const handleSavePreset = () => {
    const presetName = prompt("Enter a name for this preset:")
    if (presetName) {
      const preset = {
        id: Date.now().toString(),
        name: presetName,
        command: selectedCommand,
        options: commandOptions,
        preview: commandPreview,
        category: selectedCategory,
      }

      // In a real app, this would be saved to localStorage or a database
      alert(`Preset "${presetName}" saved`)
      console.log(preset) // Use the preset object to prevent the unused variable warning
    }
  }

  const filteredCommands = availableCommands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  // Get shell examples for the selected command
  const shellExamples = getCommandShellExamples(selectedCommand)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left sidebar - Command Selection */}
      <div className="lg:col-span-1">
        <Card className="bg-zinc-900 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Command Selection</CardTitle>
            <CardDescription className="text-zinc-300">Choose a tool category and command</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search commands..."
                className="pl-8 bg-zinc-950 border-zinc-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectGroup>
                  <SelectLabel className="text-zinc-300">Categories</SelectLabel>
                  {commandCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-white">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <ScrollArea className="h-[300px] rounded-md border border-zinc-700 p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command) => (
                  <div
                    key={command.name}
                    className={`p-2 rounded-md mb-1 cursor-pointer hover:bg-zinc-800 ${
                      selectedCommand === command.name ? "bg-zinc-800 border border-primary" : ""
                    }`}
                    onClick={() => handleCommandSelect(command.name)}
                  >
                    <div className="font-medium text-white">{command.name}</div>
                    <div className="text-xs text-zinc-300">{command.description}</div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-zinc-400">No commands found matching {searchQuery}</div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main content - Command Configuration */}
      <div className="lg:col-span-3 space-y-6">
        {/* Command Preview */}
        <Card className="bg-zinc-900 border-zinc-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Command Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-md p-3 font-mono text-green-400 overflow-x-auto border border-zinc-800">
              $ {commandPreview || "Select a command to begin"}
            </div>

            {/* Command Explanation */}
            {commandExplanation && (
              <div className="mt-4 bg-zinc-800 rounded-md p-3 border border-zinc-700">
                <div className="flex items-center gap-2 mb-1 text-zinc-300">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="font-medium">Command Explanation:</span>
                </div>
                <p className="text-sm text-zinc-300">{commandExplanation}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="security-mode" checked={securityMode} onCheckedChange={setSecurityMode} />
              <Label htmlFor="security-mode" className="text-sm text-zinc-300">
                Security Mode (Sandbox Execution)
              </Label>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCommand}
                className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSavePreset}
                className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Preset
              </Button>
              <Button size="sm" onClick={handleExecuteCommand} className="bg-primary text-white hover:bg-primary/90">
                <Play className="h-4 w-4 mr-2" />
                Execute
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Command Options */}
        {selectedCommand && (
          <Card className="bg-zinc-900 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Configure Options</CardTitle>
              <CardDescription className="text-zinc-300">
                Set parameters and flags for {selectedCommand}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommandOptions
                commandName={selectedCommand}
                options={commandOptions}
                onOptionChange={handleOptionChange}
              />
            </CardContent>
          </Card>
        )}

        {/* Tabs for History, Presets, Examples, and Documentation */}
        <Tabs defaultValue="examples">
          <TabsList className="bg-zinc-800 border border-zinc-700">
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-300"
            >
              <Clock className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger
              value="presets"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-300"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Presets
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-300"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Examples
            </TabsTrigger>
            <TabsTrigger
              value="documentation"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-300"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Documentation
            </TabsTrigger>
            {shellExamples && (
              <TabsTrigger
                value="shells"
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-300"
              >
                <Terminal className="h-4 w-4 mr-2" />
                Shells
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="history">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Command History</CardTitle>
                <CardDescription className="text-zinc-300">Previously executed commands</CardDescription>
              </CardHeader>
              <CardContent>
                <CommandHistory history={commandHistory} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="presets">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Saved Presets</CardTitle>
                <CardDescription className="text-zinc-300">Your saved command configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <CommandPresets />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="examples">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Command Examples</CardTitle>
                <CardDescription className="text-zinc-300">
                  Example use cases for {selectedCommand || "selected command"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedCommand ? (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="simple" className="border-zinc-700">
                      <AccordionTrigger className="text-white">Simple Example</AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                          $ {selectedCommand === "nmap" ? "nmap 192.168.1.1" : `${selectedCommand} --help`}
                        </div>
                        <p className="text-sm text-zinc-300">
                          {selectedCommand === "nmap"
                            ? "Basic scan of a single IP address to discover open ports."
                            : `Shows the help menu for ${selectedCommand} with all available options.`}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="intermediate" className="border-zinc-700">
                      <AccordionTrigger className="text-white">Intermediate Example</AccordionTrigger>
                      <AccordionContent>
                        {selectedCommand === "nmap" && (
                          <>
                            <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                              $ nmap -sV -p 1-1000 192.168.1.1
                            </div>
                            <p className="text-sm text-zinc-300">
                              Scans the first 1000 ports of the target IP and attempts to determine service versions.
                            </p>
                          </>
                        )}
                        {selectedCommand === "hydra" && (
                          <>
                            <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                              $ hydra -l admin -P wordlist.txt 192.168.1.1 http-post-form
                              "/login:username=^USER^&password=^PASS^:F=Login failed"
                            </div>
                            <p className="text-sm text-zinc-300">
                              Attempts to brute force a web login form using the username "admin" and passwords from
                              wordlist.txt.
                            </p>
                          </>
                        )}
                        {!["nmap", "hydra"].includes(selectedCommand) && (
                          <p className="text-sm text-zinc-300">
                            Intermediate examples for {selectedCommand} will be shown here.
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="advanced" className="border-zinc-700">
                      <AccordionTrigger className="text-white">Advanced Example</AccordionTrigger>
                      <AccordionContent>
                        {selectedCommand === "nmap" && (
                          <>
                            <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                              $ nmap -sS -sV -sC -p- -T4 -A -v 192.168.1.0/24 -oA network_scan
                            </div>
                            <p className="text-sm text-zinc-300">
                              Comprehensive network scan with service detection, script scanning, OS detection, and
                              verbose output saved to multiple formats.
                            </p>
                          </>
                        )}
                        {!["nmap"].includes(selectedCommand) && (
                          <p className="text-sm text-zinc-300">
                            Advanced examples for {selectedCommand} will be shown here.
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <div className="text-center p-4 text-zinc-400">Select a command to view examples</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documentation">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Tool Documentation</CardTitle>
                <CardDescription className="text-zinc-300">
                  Official documentation for {selectedCommand || "selected command"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedCommand ? (
                  <div className="space-y-4">
                    <p className="text-zinc-300">
                      Access the official documentation for {selectedCommand} to learn more about its capabilities,
                      options, and usage examples.
                    </p>
                    <a
                      href={getCommandDocumentation(selectedCommand)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open {selectedCommand} Documentation
                    </a>
                  </div>
                ) : (
                  <div className="text-center p-4 text-zinc-400">Select a command to view its documentation</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {shellExamples && (
            <TabsContent value="shells">
              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Shell Payloads</CardTitle>
                  <CardDescription className="text-zinc-300">
                    Reverse and bind shell examples for {selectedCommand}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {shellExamples.reverseShell && (
                    <div className="mb-6">
                      <h3 className="text-white font-medium mb-2">Reverse Shell</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Attacker (listener):</p>
                          <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                            $ {shellExamples.reverseShell.attacker}
                          </div>
                        </div>

                        {typeof shellExamples.reverseShell.victim === "string" ? (
                          <div>
                            <p className="text-zinc-400 text-sm mb-1">Victim (target):</p>
                            <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                              $ {shellExamples.reverseShell.victim}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-zinc-400 text-sm mb-1">Victim (target) - Multiple options:</p>
                            <Accordion type="single" collapsible className="w-full">
                              {Object.entries(shellExamples.reverseShell.victim).map(([key, value]) => (
                                <AccordionItem key={key} value={key} className="border-zinc-700">
                                  <AccordionTrigger className="text-white">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                                      $ {value}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {shellExamples.bindShell && (
                    <div className="mb-6">
                      <h3 className="text-white font-medium mb-2">Bind Shell</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Victim (listener):</p>
                          <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                            $ {shellExamples.bindShell.victim}
                          </div>
                        </div>
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Attacker (connector):</p>
                          <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                            $ {shellExamples.bindShell.attacker}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {shellExamples.encryptedReverseShell && (
                    <div className="mb-6">
                      <h3 className="text-white font-medium mb-2">Encrypted Reverse Shell</h3>
                      <div className="space-y-3">
                        {shellExamples.encryptedReverseShell.setup && (
                          <div>
                            <p className="text-zinc-400 text-sm mb-1">Setup (generate certificate):</p>
                            <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                              $ {shellExamples.encryptedReverseShell.setup}
                            </div>
                          </div>
                        )}
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Attacker (listener):</p>
                          <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                            $ {shellExamples.encryptedReverseShell.attacker}
                          </div>
                        </div>
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Victim (target):</p>
                          <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                            $ {shellExamples.encryptedReverseShell.victim}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {shellExamples.encodedPayload && (
                    <div>
                      <h3 className="text-white font-medium mb-2">Encoded Payload</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Generate payload:</p>
                          <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                            $ {shellExamples.encodedPayload.command}
                          </div>
                        </div>
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Usage:</p>
                          <div className="bg-black rounded-md p-3 font-mono text-green-400 mb-2 border border-zinc-800">
                            $ {shellExamples.encodedPayload.usage}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 bg-red-900/30 border border-red-700/50 rounded-md p-3">
                    <p className="text-sm text-red-300">
                      <strong>Warning:</strong> These shell examples are provided for educational purposes only. Using
                      these techniques without proper authorization is illegal and unethical. Always ensure you have
                      permission before testing on any system.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}

