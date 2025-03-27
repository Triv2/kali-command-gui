import type { Command } from "./types"

export const forensicsCommands: Command[] = [
  {
    name: "volatility",
    description: "Memory forensics framework",
    explanation:
      "Advanced memory forensics framework for extracting digital artifacts from volatile memory (RAM) samples.",
    examples: {
      simple: {
        command: "volatility -f memory.dmp imageinfo",
        description: "Identify the operating system from a memory dump.",
      },
      intermediate: {
        command: "volatility -f memory.dmp --profile=Win10x64_19041 pslist",
        description: "List running processes from a Windows 10 memory dump.",
      },
      advanced: {
        command: "volatility -f memory.dmp --profile=Win10x64_19041 mimikatz -k",
        description: "Extract passwords and hashes from a Windows 10 memory dump using the mimikatz plugin.",
      },
    },
    options: [
      {
        name: "f",
        type: "string",
        description: "Memory dump file to analyze",
        placeholder: "memory.dmp",
        required: true,
      },
      {
        name: "profile",
        type: "string",
        description: "Profile to use",
        placeholder: "Win10x64_19041",
        common: true,
      },
      {
        name: "plugin",
        type: "string",
        description: "Plugin to run",
        placeholder: "pslist",
        required: true,
      },
    ],
    documentation: "https://github.com/volatilityfoundation/volatility/wiki",
  },
  {
    name: "autopsy",
    description: "Digital forensics platform",
    explanation: "Graphical interface to The Sleuth Kit and other digital forensics tools for disk image analysis.",
    examples: {
      simple: {
        command: "autopsy",
        description: "Launch the Autopsy graphical interface.",
      },
      intermediate: {
        command: "autopsy --caseDir=/cases/investigation1",
        description: "Launch Autopsy and open a specific case directory.",
      },
      advanced: {
        command: "autopsy --caseDir=/cases/investigation1 --dataSource=/evidence/disk.img",
        description: "Launch Autopsy, open a case, and add a specific data source.",
      },
    },
    options: [
      {
        name: "caseDir",
        type: "string",
        description: "Case directory",
        placeholder: "/cases/investigation1",
        common: true,
      },
      {
        name: "dataSource",
        type: "string",
        description: "Data source to add",
        placeholder: "/evidence/disk.img",
        common: true,
      },
    ],
    documentation: "https://www.autopsy.com/documentation/",
  },
  {
    name: "foremost",
    description: "File recovery tool",
    explanation: "Recovers files based on their headers, footers, and internal data structures.",
    examples: {
      simple: {
        command: "foremost -i disk.img",
        description: "Recover files from a disk image using default settings.",
      },
      intermediate: {
        command: "foremost -t jpg,pdf,doc -i disk.img -o recovered",
        description: "Recover specific file types from a disk image to a custom output directory.",
      },
      advanced: {
        command: "foremost -v -t all -i disk.img -o recovered -T",
        description: "Verbose recovery of all file types with timestamp information.",
      },
    },
    options: [
      {
        name: "t",
        type: "string",
        description: "File types to recover (jpg,pdf,etc)",
        placeholder: "jpg,pdf,doc",
        common: true,
      },
      {
        name: "o",
        type: "string",
        description: "Output directory",
        placeholder: "recovered",
        common: true,
      },
      {
        name: "input-file",
        type: "string",
        description: "Input file or device to recover from",
        placeholder: "disk.img",
        required: true,
      },
    ],
    documentation: "https://linux.die.net/man/1/foremost",
  },
]

