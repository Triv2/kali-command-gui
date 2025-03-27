import type { Command } from "./types"

export const wirelessAttacksCommands: Command[] = [
  {
    name: "aircrack-ng",
    description: "WiFi security auditing tool suite",
    explanation: "Complete suite of tools to assess WiFi network security, including packet capture and cracking.",
    examples: {
      simple: {
        command: "aircrack-ng capture.cap",
        description: "Basic WEP/WPA key cracking from a capture file.",
      },
      intermediate: {
        command: "aircrack-ng -b 00:11:22:33:44:55 -w /usr/share/wordlists/rockyou.txt capture.cap",
        description: "WPA key cracking targeting a specific access point using a wordlist.",
      },
      advanced: {
        command: "aircrack-ng -b 00:11:22:33:44:55 -w /usr/share/wordlists/rockyou.txt -l cracked_key.txt capture.cap",
        description: "WPA key cracking with specific BSSID, wordlist, and saving the result to a file.",
      },
    },
    options: [
      {
        name: "b",
        type: "string",
        description: "BSSID of access point",
        placeholder: "00:11:22:33:44:55",
        common: true,
      },
      {
        name: "w",
        type: "string",
        description: "Wordlist to use for cracking",
        placeholder: "/usr/share/wordlists/rockyou.txt",
        common: true,
      },
      {
        name: "a",
        type: "string",
        description: "Force attack mode (1=WEP, 2=WPA-PSK)",
        placeholder: "2",
        common: true,
      },
      {
        name: "e",
        type: "string",
        description: "Target ESSID (network name)",
        placeholder: "MyWiFi",
        common: true,
      },
      {
        name: "l",
        type: "string",
        description: "Write key to file",
        placeholder: "found.key",
        common: true,
      },
      {
        name: "q",
        type: "boolean",
        description: "Quiet mode (no status output)",
        common: false,
      },
      {
        name: "p",
        type: "string",
        description: "Number of CPU threads to use",
        placeholder: "4",
        common: true,
      },
      {
        name: "n",
        type: "string",
        description: "WEP key length (64/128/152/256/512)",
        placeholder: "128",
        common: false,
      },
      {
        name: "capture-file",
        type: "string",
        description: "Packet capture file (.cap)",
        placeholder: "capture.cap",
        required: true,
      },
    ],
    documentation: "https://www.aircrack-ng.org/documentation.html",
  },
  {
    name: "reaver",
    description: "WPS brute force attack tool",
    explanation: "Brute forces WPS PINs to recover WPA/WPA2 passphrases on vulnerable access points.",
    examples: {
      simple: {
        command: "reaver -i wlan0 -b 00:11:22:33:44:55",
        description: "Basic WPS PIN brute force attack.",
      },
      intermediate: {
        command: "reaver -i wlan0 -b 00:11:22:33:44:55 -vv -c 6",
        description: "WPS PIN brute force with verbose output on a specific channel.",
      },
      advanced: {
        command: "reaver -i wlan0 -b 00:11:22:33:44:55 -vv -c 6 -K 1 -f -N -d 2",
        description: "Advanced WPS attack with delay between attempts, no association checks, and pixie dust attack.",
      },
    },
    options: [
      {
        name: "i",
        type: "string",
        description: "Interface to use",
        placeholder: "wlan0",
        required: true,
      },
      {
        name: "b",
        type: "string",
        description: "Target BSSID",
        placeholder: "00:11:22:33:44:55",
        required: true,
      },
      {
        name: "vv",
        type: "boolean",
        description: "Display verbose output",
        common: true,
      },
      {
        name: "c",
        type: "string",
        description: "Channel to listen on",
        placeholder: "6",
        common: false,
      },
    ],
    documentation: "https://github.com/t6x/reaver-wps-fork-t6x",
  },
  {
    name: "wifite",
    description: "Automated wireless attack tool",
    explanation: "Automated wireless auditing tool that can attack multiple WEP, WPA, and WPS encrypted networks.",
    examples: {
      simple: {
        command: "wifite --interface wlan0",
        description: "Basic wireless network scan and attack.",
      },
      intermediate: {
        command: "wifite --interface wlan0 --wpa --dict /usr/share/wordlists/rockyou.txt",
        description: "Target WPA networks using a specific wordlist.",
      },
      advanced: {
        command: "wifite --interface wlan0 --wpa --wps --dict /usr/share/wordlists/rockyou.txt --kill --crack",
        description:
          "Comprehensive attack targeting both WPA and WPS networks, killing conflicting processes and cracking captured handshakes.",
      },
    },
    options: [
      {
        name: "wps",
        type: "boolean",
        description: "Only target WPS networks",
        common: true,
      },
      {
        name: "wpa",
        type: "boolean",
        description: "Only target WPA networks",
        common: true,
      },
      {
        name: "wep",
        type: "boolean",
        description: "Only target WEP networks",
        common: true,
      },
      {
        name: "interface",
        type: "string",
        description: "Wireless interface to use",
        placeholder: "wlan0",
        required: true,
      },
    ],
    documentation: "https://github.com/derv82/wifite2",
  },
]

