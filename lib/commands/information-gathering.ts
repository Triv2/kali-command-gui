import type { Command } from "./types"

export const informationGatheringCommands: Command[] = [
  {
    name: "nmap",
    description: "Network scanning and enumeration tool",
    explanation: "Scans networks to discover hosts and services, creating a map of the network.",
    examples: {
      simple: {
        command: "nmap 192.168.1.1",
        description: "Basic scan of a single IP address to discover open ports.",
      },
      intermediate: {
        command: "nmap -sV -p 1-1000 192.168.1.1",
        description: "Scans the first 1000 ports of the target IP and attempts to determine service versions.",
      },
      advanced: {
        command: "nmap -sS -sV -sC -p- -T4 -A -v 192.168.1.0/24 -oA network_scan",
        description:
          "Comprehensive network scan with service detection, script scanning, OS detection, and verbose output saved to multiple formats.",
      },
    },
    options: [
      {
        name: "sS",
        type: "boolean",
        description: "TCP SYN scan (Default scan)",
        common: true,
      },
      {
        name: "sT",
        type: "boolean",
        description: "TCP connect scan",
        common: false,
      },
      {
        name: "sU",
        type: "boolean",
        description: "UDP scan",
        common: true,
      },
      {
        name: "sV",
        type: "boolean",
        description: "Version detection",
        common: true,
      },
      {
        name: "sC",
        type: "boolean",
        description: "Default script scan",
        common: true,
      },
      {
        name: "O",
        type: "boolean",
        description: "OS detection",
        common: true,
      },
      {
        name: "A",
        type: "boolean",
        description: "Aggressive scan: OS detection, version detection, script scanning, and traceroute",
        common: true,
      },
      {
        name: "p",
        type: "string",
        description: "Port specification (e.g., 80,443 or 1-1000)",
        placeholder: "80,443 or 1-1000",
        common: true,
      },
      {
        name: "T",
        type: "string",
        description: "Timing template (0-5, higher is faster)",
        placeholder: "4",
        common: true,
      },
      {
        name: "script",
        type: "string",
        description: "Run specific NSE scripts",
        placeholder: "vuln,safe",
        common: false,
      },
      {
        name: "oA",
        type: "string",
        description: "Output in all formats (normal, XML, grepable)",
        placeholder: "scan_results",
        common: true,
      },
      {
        name: "oN",
        type: "string",
        description: "Output in normal format",
        placeholder: "scan_results.txt",
        common: false,
      },
      {
        name: "oX",
        type: "string",
        description: "Output in XML format",
        placeholder: "scan_results.xml",
        common: false,
      },
      {
        name: "oG",
        type: "string",
        description: "Output in grepable format",
        placeholder: "scan_results.gnmap",
        common: false,
      },
      {
        name: "v",
        type: "boolean",
        description: "Increase verbosity level",
        common: true,
      },
      {
        name: "Pn",
        type: "boolean",
        description: "Treat all hosts as online (skip host discovery)",
        common: true,
      },
      {
        name: "n",
        type: "boolean",
        description: "Never do DNS resolution",
        common: false,
      },
      {
        name: "target",
        type: "string",
        description: "Target IP, hostname, network range",
        placeholder: "192.168.1.1 or example.com",
        required: true,
      },
    ],
    documentation: "https://nmap.org/docs.html",
  },
  {
    name: "whois",
    description: "Domain registration information lookup",
    explanation: "Queries WHOIS databases to retrieve registration information about domain names and IP addresses.",
    examples: {
      simple: {
        command: "whois example.com",
        description: "Basic WHOIS lookup for a domain name.",
      },
      intermediate: {
        command: "whois -h whois.arin.net 8.8.8.8",
        description: "Query a specific WHOIS server for information about an IP address.",
      },
      advanced: {
        command: "whois -H --no-recursion example.com | grep 'Name Server'",
        description: "Non-recursive WHOIS lookup with hidden legal disclaimers, filtering for name servers only.",
      },
    },
    options: [
      {
        name: "h",
        type: "string",
        description: "Host to query",
        common: false,
      },
      {
        name: "domain",
        type: "string",
        description: "Domain name to query",
        placeholder: "example.com",
        required: true,
      },
    ],
    documentation: "https://linux.die.net/man/1/whois",
  },
  {
    name: "dnsenum",
    description: "DNS enumeration tool",
    explanation: "Enumerates DNS information for a domain, including subdomains, MX records, and zone transfers.",
    examples: {
      simple: {
        command: "dnsenum example.com",
        description: "Basic DNS enumeration for a domain.",
      },
      intermediate: {
        command: "dnsenum --threads 10 --dnsserver 8.8.8.8 example.com",
        description: "DNS enumeration using 10 threads and Google's DNS server.",
      },
      advanced: {
        command: "dnsenum --threads 15 --dnsserver 8.8.8.8 --enum -p 20 -s 20 -o output.xml example.com",
        description: "Full DNS enumeration with brute force, saving results to XML.",
      },
    },
    options: [
      {
        name: "enum",
        type: "boolean",
        description: "Shortcut option equivalent to --threads 5 -s 15 -w",
        common: true,
      },
      {
        name: "threads",
        type: "string",
        description: "Number of threads to use",
        placeholder: "10",
        common: true,
      },
      {
        name: "dnsserver",
        type: "string",
        description: "Use this DNS server for A, NS and MX queries",
        placeholder: "8.8.8.8",
        common: false,
      },
      {
        name: "domain",
        type: "string",
        description: "Domain name to enumerate",
        placeholder: "example.com",
        required: true,
      },
    ],
    documentation: "https://github.com/fwaeytens/dnsenum",
  },
  {
    name: "theHarvester",
    description: "Email, subdomain and name harvester",
    explanation: "Gathers emails, subdomains, hosts, employee names, and open ports from different public sources.",
    examples: {
      simple: {
        command: "theHarvester -d example.com -b google",
        description: "Basic search for a domain using Google as the data source.",
      },
      intermediate: {
        command: "theHarvester -d example.com -b all -l 500",
        description: "Search using all available data sources with a limit of 500 results.",
      },
      advanced: {
        command: "theHarvester -d example.com -b all -l 1000 -f output.html -c -t",
        description: "Comprehensive search with DNS brute force, TLS certificate search, and HTML output.",
      },
    },
    options: [
      {
        name: "d",
        type: "string",
        description: "Domain to search",
        placeholder: "example.com",
        required: true,
      },
      {
        name: "b",
        type: "string",
        description: "Data source (google, bing, linkedin, etc.)",
        placeholder: "all",
        required: true,
      },
      {
        name: "l",
        type: "string",
        description: "Limit the number of results",
        placeholder: "500",
        common: true,
      },
      {
        name: "f",
        type: "string",
        description: "Output file",
        placeholder: "results.html",
        common: true,
      },
    ],
    documentation: "https://github.com/laramies/theHarvester",
  },
  {
    name: "metagoofil",
    description: "Metadata extraction from public documents",
    explanation: "Extracts metadata from public documents (PDF, DOC, XLS, etc.) found on target websites.",
    examples: {
      simple: {
        command: "metagoofil -d example.com -t pdf -o output",
        description: "Extract metadata from PDF files on a domain.",
      },
      intermediate: {
        command: "metagoofil -d example.com -t pdf,doc,xls -l 20 -n 5 -o output",
        description: "Extract metadata from multiple file types with limits on results and downloads.",
      },
      advanced: {
        command: "metagoofil -d example.com -t pdf,doc,docx,xls,xlsx,ppt,pptx -l 100 -n 25 -o output -w",
        description: "Comprehensive metadata extraction with web interface output.",
      },
    },
    options: [
      {
        name: "d",
        type: "string",
        description: "Domain to search",
        placeholder: "example.com",
        required: true,
      },
      {
        name: "t",
        type: "string",
        description: "File types to download (pdf,doc,xls,ppt,etc)",
        placeholder: "pdf,doc,docx",
        common: true,
      },
      {
        name: "l",
        type: "string",
        description: "Limit of results to work with",
        placeholder: "100",
        common: true,
      },
      {
        name: "n",
        type: "string",
        description: "Limit of files to download",
        placeholder: "10",
        common: true,
      },
    ],
    documentation: "https://github.com/laramies/metagoofil",
  },
  {
    name: "whatweb",
    description: "Next generation web scanner",
    explanation:
      "Identifies web technologies, including content management systems, JavaScript libraries, and server details.",
    examples: {
      simple: {
        command: "whatweb example.com",
        description: "Basic scan of a website to identify technologies.",
      },
      intermediate: {
        command: "whatweb -v example.com --log-json=results.json",
        description: "Verbose scan with JSON output.",
      },
      advanced: {
        command: "whatweb -a 3 -v --log-sql=results.sql example.com",
        description: "Aggressive scan with verbose output and SQL logging.",
      },
    },
    options: [
      {
        name: "v",
        type: "string",
        description: "Verbosity level (0-4)",
        placeholder: "3",
        common: true,
      },
      {
        name: "a",
        type: "string",
        description: "Aggression level (1-4)",
        placeholder: "3",
        common: true,
      },
      {
        name: "url",
        type: "string",
        description: "Target URL to scan",
        placeholder: "https://example.com",
        required: true,
      },
    ],
    documentation: "https://github.com/urbanadventurer/WhatWeb",
  },
]

