import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import type { Command, CommandOption } from "./types"
import { commandsDatabase } from "./database"

// Helper functions to get commands and options
export function getCommandsByCategory(category: string): Command[] {
  if (category === "all") {
    // Combine all commands from all categories
    let allCommands: Command[] = []
    for (const cat in commandsDatabase) {
      allCommands = [...allCommands, ...commandsDatabase[cat]]
    }
    return allCommands
  }
  return commandsDatabase[category] || []
}

export function getCommandOptions(commandName: string): CommandOption[] {
  for (const category in commandsDatabase) {
    const command = commandsDatabase[category].find((cmd) => cmd.name === commandName)
    if (command) {
      return command.options || []
    }
  }
  return []
}

export function getCommandExamples(commandName: string) {
  for (const category in commandsDatabase) {
    const command = commandsDatabase[category].find((cmd) => cmd.name === commandName)
    if (command) {
      return command.examples || null
    }
  }
  return null
}

export function getCommandExplanation(commandName: string): string {
  for (const category in commandsDatabase) {
    const command = commandsDatabase[category].find((cmd) => cmd.name === commandName)
    if (command) {
      return command.explanation || ""
    }
  }
  return ""
}

// Function to generate an explanation for the current command with options
export function generateCommandExplanation(commandName: string, options: Record<string, any> = {}): string {
  let explanation = getCommandExplanation(commandName)

  // Get the command options
  const commandOptions = getCommandOptions(commandName)

  // Add details about the options being used
  const activeOptions = Object.keys(options).filter((key) => options[key])

  if (activeOptions.length > 0) {
    explanation += " This command is configured with:"

    activeOptions.forEach((optName) => {
      const optionInfo = commandOptions.find((opt) => opt.name === optName)
      if (optionInfo) {
        const optValue = typeof options[optName] === "boolean" ? "enabled" : `set to "${options[optName]}"`

        explanation += ` --${optName} (${optionInfo.description}) ${optValue};`
      }
    })

    // Replace the last semicolon with a period
    explanation = explanation.replace(/;$/, ".")
  }

  return explanation
}

// Add a function to get documentation URL
export function getCommandDocumentation(commandName: string): string {
  for (const category in commandsDatabase) {
    const command = commandsDatabase[category].find((cmd) => cmd.name === commandName)
    if (command) {
      return command.documentation || ""
    }
  }
  return ""
}

// Function to get shell examples for a command
export function getCommandShellExamples(commandName: string) {
  for (const category in commandsDatabase) {
    const command = commandsDatabase[category].find((cmd) => cmd.name === commandName)
    if (command) {
      return command.shellExamples || null
    }
  }
  return null
}

