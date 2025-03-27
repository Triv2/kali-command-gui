import type { Command } from "./types"
import { informationGatheringCommands } from "./information-gathering"
import { vulnerabilityAnalysisCommands } from "./vulnerability-analysis"
import { webApplicationCommands } from "./web-application"
import { passwordAttacksCommands } from "./password-attacks"
import { wirelessAttacksCommands } from "./wireless-attacks"
import { exploitationCommands } from "./exploitation"
import { sniffingSpoofingCommands } from "./sniffing-spoofing"
import { postExploitationCommands } from "./post-exploitation"
import { forensicsCommands } from "./forensics"
import { utilitiesCommands } from "./utilities"

// Create the commands database
export const commandsDatabase: Record<string, Command[]> = {
  "information-gathering": informationGatheringCommands,
  "vulnerability-analysis": vulnerabilityAnalysisCommands,
  "web-application": webApplicationCommands,
  "password-attacks": passwordAttacksCommands,
  "wireless-attacks": wirelessAttacksCommands,
  exploitation: exploitationCommands,
  "sniffing-spoofing": sniffingSpoofingCommands,
  "post-exploitation": postExploitationCommands,
  forensics: forensicsCommands,
  utilities: utilitiesCommands,
}

