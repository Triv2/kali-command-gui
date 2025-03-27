import type { Command } from "./types"

export const sniffingSpoofingCommands: Command[] = [
  {
    name: "wireshark",
    description: "Network protocol analyzer",
    explanation: "Graphical network protocol analyzer that captures and interactively browses network traffic.",
    examples: {
      simple: {
        command: "wireshark",
        description: "Launch Wireshark with the graphical interface.",
      },
      intermediate: {
        command: "wireshark -i eth0 -k",
        description: "Launch Wireshark and immediately start capturing on the eth0 interface.",
      },
      advanced: {
        command: 'wireshark -i eth0 -k -f "port 80 or port 443" -w capture.pcap',
        description: "Capture HTTP and HTTPS traffic on eth0 and save to a file.",
      },
    },
    options: [
      {
        name: "i",
        type: "string",
        description: "Interface to capture on",
        placeholder: "eth0",
        common: true,
      },
      {
        name: "k",
        type: "boolean",
        description: "Start capturing immediately",
        common: true,
      },
      {
        name: "f",
        type: "string",
        description: "Capture filter",
        placeholder: "port 80",
        common: true,
      },
      {
        name: "w",
        type: "string",
        description: "Write to output file",
        placeholder: "capture.pcap",
        common: true,
      },
      {
        name: "Y",
        type: "string",
        description: "Read file format (pcap, pcapng)",
        placeholder: "pcapng",
        common: false,
      },
      {
        name: "r",
        type: "string",
        description: "Read from input file",
        placeholder: "input.pcap",
        common: true,
      },
      {
        name: "c",
        type: "string",
        description: "Stop after n packets",
        placeholder: "1000",
        common: false,
      },
      {
        name: "a",
        type: "string",
        description: "Auto-stop after duration",
        placeholder: "60",
        common: false,
      },
      {
        name: "b",
        type: "string",
        description: "Ring buffer with n files",
        placeholder: "10",
        common: false,
      },
      {
        name: "D",
        type: "boolean",
        description: "List available interfaces",
        common: true,
      },
      {
        name: "L",
        type: "boolean",
        description: "List available capture link-layer types",
        common: false,
      },
    ],
    documentation: "https://www.wireshark.org/docs/",
  },
  {
    name: "tcpdump",
    description: "Command-line packet analyzer",
    explanation: "Powerful command-line packet analyzer that captures and displays packet contents.",
    examples: {
      simple: {
        command: "tcpdump -i eth0",
        description: "Capture packets on the eth0 interface.",
      },
      intermediate: {
        command: "tcpdump -i eth0 -n port 80",
        description: "Capture HTTP traffic on eth0 without resolving hostnames.",
      },
      advanced: {
        command:
          "tcpdump -i eth0 -n -A -s0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'",
        description: "Capture and display HTTP packet contents (payload only) on eth0.",
      },
    },
    options: [
      {
        name: "i",
        type: "string",
        description: "Interface to listen on",
        placeholder: "eth0",
        common: true,
      },
      {
        name: "n",
        type: "boolean",
        description: "Don't convert addresses to names",
        common: true,
      },
      {
        name: "nn",
        type: "boolean",
        description: "Don't convert protocol and port numbers",
        common: false,
      },
      {
        name: "w",
        type: "string",
        description: "Write packets to file",
        placeholder: "capture.pcap",
        common: true,
      },
      {
        name: "c",
        type: "string",
        description: "Exit after capturing n packets",
        placeholder: "100",
        common: true,
      },
      {
        name: "s",
        type: "string",
        description: "Capture n bytes of packet (0 for full packet)",
        placeholder: "0",
        common: true,
      },
      {
        name: "A",
        type: "boolean",
        description: "Print packets in ASCII",
        common: true,
      },
      {
        name: "X",
        type: "boolean",
        description: "Print packets in hex and ASCII",
        common: false,
      },
      {
        name: "v",
        type: "boolean",
        description: "Verbose output",
        common: true,
      },
      {
        name: "vv",
        type: "boolean",
        description: "More verbose output",
        common: false,
      },
      {
        name: "e",
        type: "boolean",
        description: "Print link-level headers",
        common: false,
      },
      {
        name: "q",
        type: "boolean",
        description: "Quick (quiet) output",
        common: false,
      },
      {
        name: "filter",
        type: "string",
        description: "Expression to filter packets",
        placeholder: "port 80",
        required: true,
      },
    ],
    documentation: "https://www.tcpdump.org/manpages/tcpdump.1.html",
  },
  {
    name: "ettercap",
    description: "Multipurpose sniffer/interceptor/logger",
    explanation:
      "Comprehensive suite for man-in-the-middle attacks, supporting active and passive dissection of protocols.",
    examples: {
      simple: {
        command: "ettercap -T -q -i eth0",
        description: "Start Ettercap in text mode on eth0 interface.",
      },
      intermediate: {
        command: "ettercap -T -q -i eth0 -M arp /192.168.1.1/ /192.168.1.2/",
        description: "Perform an ARP poisoning attack between two hosts.",
      },
      advanced: {
        command: "ettercap -T -q -i eth0 -M arp -P dns_spoof /192.168.1.1/ /192.168.1.0/24/",
        description: "Perform ARP poisoning with DNS spoofing against an entire subnet.",
      },
    },
    options: [
      {
        name: "T",
        type: "string",
        description: "Text only mode (with specified interface)",
        placeholder: "-T -i eth0",
        common: true,
      },
      {
        name: "M",
        type: "string",
        description: "Man-in-the-middle attack method",
        placeholder: "arp:remote",
        common: true,
      },
      {
        name: "target",
        type: "string",
        description: "Target specification",
        placeholder: "/192.168.1.1/ /192.168.1.2/",
        required: true,
      },
    ],
    documentation: "https://www.ettercap-project.org/",
  },
  {
    name: "bettercap",
    description: "Swiss army knife for network attacks and monitoring",
    explanation: "Modern network attack framework with modules for various attack vectors and protocols.",
    examples: {
      simple: {
        command: "bettercap -iface eth0",
        description: "Start Bettercap on the eth0 interface.",
      },
      intermediate: {
        command: "bettercap -iface eth0 -caplet http-ui",
        description: "Start Bettercap with the web UI module.",
      },
      advanced: {
        command:
          'bettercap -iface eth0 -eval "net.probe on; net.sniff on; arp.spoof on; set arp.spoof.targets 192.168.1.2; http.proxy on"',
        description:
          "Start network probing, packet sniffing, and ARP spoofing against a specific target with HTTP proxy.",
      },
    },
    options: [
      {
        name: "iface",
        type: "string",
        description: "Network interface to bind to",
        placeholder: "eth0",
        required: true,
      },
      {
        name: "caplet",
        type: "string",
        description: "Read commands from this file",
        placeholder: "script.cap",
        common: true,
      },
      {
        name: "no-history",
        type: "boolean",
        description: "Disable history file",
        common: false,
      },
    ],
    documentation: "https://www.bettercap.org/docs/",
  },
]

