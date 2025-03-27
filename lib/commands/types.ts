// Type definitions for command data

export interface CommandExample {
  command: string
  description: string
}

export interface CommandExamples {
  simple: CommandExample
  intermediate: CommandExample
  advanced: CommandExample
}

export type CommandOption = {
  name: string
  type: string
  description: string
  placeholder?: string
  common?: boolean
  required?: boolean
}

export interface ShellExample {
  attacker: string
  victim: string | Record<string, string>
}

export interface EncodedPayloadExample {
  command: string
  usage: string
}

export interface EncryptedShellExample {
  setup: string
  attacker: string
  victim: string
}

export interface ShellExamples {
  reverseShell?: ShellExample
  bindShell?: ShellExample
  encryptedReverseShell?: EncryptedShellExample
  encodedPayload?: EncodedPayloadExample
}

export interface Command {
  name: string
  description: string
  explanation: string
  examples: CommandExamples
  options: CommandOption[]
  documentation: string
  shellExamples?: ShellExamples
}

export interface Category {
  id: string
  name: string
}

