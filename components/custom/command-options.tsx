"use client"


import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getCommandOptions } from "@/lib/commands"
import { useState, useEffect } from "react"
import { CommandOption } from "@/lib/commands/types"


interface CommandOptionsProps {
  commandName: string
  options: Record<string, string | boolean>
  onOptionChange: (name: string, value: string | boolean) => void
}

export default function CommandOptions({ commandName, options, onOptionChange }: CommandOptionsProps) {
  const [commandOptions, setCommandOptions] = useState<CommandOption[]>([])

  useEffect(() => {
    if (commandName) {
      const opts = getCommandOptions(commandName)
      setCommandOptions(opts)
    }
  }, [commandName])

  if (!commandName) {
    return <div className="text-center p-4 text-zinc-400">Select a command to configure options</div>
  }

  // Group options by category
  const requiredOptions = commandOptions.filter((opt) => opt.required)
  const commonOptions = commandOptions.filter((opt) => !opt.required && opt.common)
  const advancedOptions = commandOptions.filter((opt) => !opt.required && !opt.common)

  return (
    <div className="space-y-4">
      {/* Required Options */}
      {requiredOptions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center text-white">
            Required Options
            <Badge variant="destructive" className="ml-2 bg-red-600">
              Required
            </Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredOptions.map((option) => (
              <OptionInput
                key={option.name}
                option={option}
                value={options[option.name] || ""}
                onChange={(value) => onOptionChange(option.name, value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Common and Advanced Options */}
      <Tabs defaultValue="common">
        <TabsList className="bg-zinc-800 border border-zinc-700">
          <TabsTrigger
            value="common"
            className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-300"
          >
            Common Options
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-300"
          >
            Advanced Options
          </TabsTrigger>
        </TabsList>
        <TabsContent value="common" className="pt-4">
          {commonOptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonOptions.map((option) => (
                <OptionInput
                  key={option.name}
                  option={option}
                  value={options[option.name] || ""}
                  onChange={(value) => onOptionChange(option.name, value)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-zinc-400">No common options available for this command</div>
          )}
        </TabsContent>
        <TabsContent value="advanced" className="pt-4">
          {advancedOptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advancedOptions.map((option) => (
                <OptionInput
                  key={option.name}
                  option={option}
                  value={options[option.name] || ""}
                  onChange={(value) => onOptionChange(option.name, value)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-zinc-400">No advanced options available for this command</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface OptionInputProps {
  option: CommandOption
  value: string | boolean
  onChange: (value: string | boolean) => void
}

function OptionInput({ option, value, onChange }: OptionInputProps) { 
  if (option.type === "boolean") {
    return (
      <div className="flex items-start space-x-2">
        <Checkbox
          id={option.name}
          checked={!!value}
          onCheckedChange={onChange}
          className="border-zinc-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <div className="grid gap-1.5">
          <Label htmlFor={option.name} className="font-medium text-white">
            --{option.name}
          </Label>
          <p className="text-xs text-zinc-300">{option.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={option.name} className="font-medium text-white">
        --{option.name}
        {option.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={option.name}
        placeholder={option.placeholder || `Enter ${option.name}`}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-950 border-zinc-700 text-white"
      />
      <p className="text-xs text-zinc-300">{option.description}</p>
    </div>
  )
}

