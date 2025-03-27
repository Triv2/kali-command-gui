import type { Command } from "./types"

export const passwordAttacksCommands: Command[] = [
  {
    name: "hydra",
    description: "Password cracking tool",
    explanation: "Fast and flexible online password cracking tool that supports numerous protocols.",
    examples: {
      simple: {
        command: "hydra -l admin -p password ssh://192.168.1.1",
        description: "Basic SSH login attempt with a single username and password.",
      },
      intermediate: {
        command:
          'hydra -l admin -P wordlist.txt 192.168.1.1 http-post-form "/login:username=^USER^&password=^PASS^:F=Login failed"',
        description: "HTTP form brute force using a username and password list.",
      },
      advanced: {
        command: "hydra -L users.txt -P passwords.txt -t 4 -f -v 192.168.1.1 ssh -o ssh_results.txt",
        description:
          "SSH brute force with multiple usernames and passwords, 4 threads, stopping after first valid match.",
      },
    },
    options: [
      {
        name: "l",
        type: "string",
        description: "Single username",
        placeholder: "admin",
        common: true,
      },
      {
        name: "L",
        type: "string",
        description: "Username list",
        placeholder: "users.txt",
        common: true,
      },
      {
        name: "p",
        type: "string",
        description: "Single password",
        placeholder: "password123",
        common: true,
      },
      {
        name: "P",
        type: "string",
        description: "Password list",
        placeholder: "passwords.txt",
        common: true,
      },
      {
        name: "C",
        type: "string",
        description: "Colon separated username:password combo list",
        placeholder: "combos.txt",
        common: false,
      },
      {
        name: "e",
        type: "string",
        description: "Try additional password checks (n: null, s: same as login, r: reversed login)",
        placeholder: "nsr",
        common: true,
      },
      {
        name: "M",
        type: "string",
        description: "List of servers to attack in parallel",
        placeholder: "servers.txt",
        common: false,
      },
      {
        name: "t",
        type: "string",
        description: "Number of parallel tasks per target",
        placeholder: "16",
        common: true,
      },
      {
        name: "f",
        type: "boolean",
        description: "Exit after first found login/password pair",
        common: true,
      },
      {
        name: "s",
        type: "string",
        description: "Port to use (if different from default)",
        placeholder: "8080",
        common: true,
      },
      {
        name: "v",
        type: "boolean",
        description: "Verbose mode",
        common: true,
      },
      {
        name: "o",
        type: "string",
        description: "Write found credentials to file",
        placeholder: "found.txt",
        common: true,
      },
      {
        name: "target",
        type: "string",
        description: "Target in format: service://server[:port]",
        placeholder: "ssh://192.168.1.1",
        required: true,
      },
    ],
    documentation: "https://github.com/vanhauser-thc/thc-hydra",
  },
  {
    name: "john",
    description: "John the Ripper password cracker",
    explanation: "Fast password cracker for offline password cracking, supporting various hash types.",
    examples: {
      simple: {
        command: "john hashes.txt",
        description: "Basic password cracking attempt on a hash file.",
      },
      intermediate: {
        command: "john --wordlist=/usr/share/wordlists/rockyou.txt --format=md5 hashes.txt",
        description: "Password cracking using a wordlist and specifying the hash format.",
      },
      advanced: {
        command:
          "john --wordlist=/usr/share/wordlists/rockyou.txt --rules=Jumbo --format=sha512crypt hashes.txt --pot=john.pot",
        description:
          "Advanced password cracking with wordlist, rules, specific hash format, and saving results to a pot file.",
      },
    },
    options: [
      {
        name: "wordlist",
        type: "string",
        description: "Wordlist to use",
        placeholder: "/usr/share/wordlists/rockyou.txt",
        common: true,
      },
      {
        name: "format",
        type: "string",
        description: "Hash format",
        placeholder: "md5",
        common: true,
      },
      {
        name: "rules",
        type: "string",
        description: "Rules to use",
        placeholder: "Jumbo",
        common: false,
      },
      {
        name: "hash-file",
        type: "string",
        description: "File containing hashes",
        placeholder: "hashes.txt",
        required: true,
      },
    ],
    documentation: "https://www.openwall.com/john/doc/",
  },
  {
    name: "hashcat",
    description: "Advanced password recovery tool",
    explanation:
      "World's fastest and most advanced password recovery utility, supporting various attack modes and hash types.",
    examples: {
      simple: {
        command: "hashcat -m 0 hashes.txt /usr/share/wordlists/rockyou.txt",
        description: "Basic MD5 hash cracking using a wordlist.",
      },
      intermediate: {
        command: "hashcat -m 1000 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt -r rules/best64.rule",
        description: "NTLM hash cracking using a wordlist and rule-based attack.",
      },
      advanced: {
        command: "hashcat -m 1800 -a 3 hashes.txt ?a?a?a?a?a?a?a?a -i --increment-min=6",
        description: "SHA-512 hash cracking using brute force attack with incremental mode.",
      },
    },
    options: [
      {
        name: "a",
        type: "string",
        description: "Attack mode (0=Wordlist, 1=Combination, 3=Brute-force)",
        placeholder: "0",
        common: true,
      },
      {
        name: "m",
        type: "string",
        description: "Hash type (e.g., 0=MD5, 1000=NTLM)",
        placeholder: "0",
        common: true,
      },
      {
        name: "hash-file",
        type: "string",
        description: "File containing hashes",
        placeholder: "hashes.txt",
        required: true,
      },
      {
        name: "wordlist",
        type: "string",
        description: "Wordlist to use",
        placeholder: "/usr/share/wordlists/rockyou.txt",
        common: true,
      },
      {
        name: "r",
        type: "string",
        description: "Rule file to use",
        placeholder: "rules/best64.rule",
        common: true,
      },
      {
        name: "o",
        type: "string",
        description: "Output file for cracked hashes",
        placeholder: "cracked.txt",
        common: true,
      },
      {
        name: "increment",
        type: "boolean",
        description: "Enable incremental mode",
        common: false,
      },
      {
        name: "increment-min",
        type: "string",
        description: "Minimum password length for incremental mode",
        placeholder: "1",
        common: false,
      },
      {
        name: "increment-max",
        type: "string",
        description: "Maximum password length for incremental mode",
        placeholder: "8",
        common: false,
      },
      {
        name: "force",
        type: "boolean",
        description: "Ignore warnings",
        common: false,
      },
      {
        name: "status",
        type: "boolean",
        description: "Enable automatic status updates",
        common: true,
      },
      {
        name: "status-timer",
        type: "string",
        description: "Status update timer in seconds",
        placeholder: "5",
        common: false,
      },
      {
        name: "potfile-disable",
        type: "boolean",
        description: "Do not use potfile",
        common: false,
      },
      {
        name: "show",
        type: "boolean",
        description: "Show cracked passwords only",
        common: false,
      },
    ],
    documentation: "https://hashcat.net/wiki/",
  },
  {
    name: "cewl",
    description: "Custom wordlist generator",
    explanation: "Creates custom wordlists from a target website by spidering and collecting unique words.",
    examples: {
      simple: {
        command: "cewl http://example.com",
        description: "Basic wordlist generation from a website.",
      },
      intermediate: {
        command: "cewl -d 2 -m 6 -w wordlist.txt http://example.com",
        description: "Generate a wordlist with depth 2, minimum word length 6, and save to a file.",
      },
      advanced: {
        command: "cewl -d 3 -m 8 -c -e --with-numbers -w wordlist.txt http://example.com",
        description:
          "Comprehensive wordlist generation with email extraction, counting occurrences, and including numbers.",
      },
    },
    options: [
      {
        name: "d",
        type: "string",
        description: "Depth to spider to",
        placeholder: "2",
        common: true,
      },
      {
        name: "m",
        type: "string",
        description: "Minimum word length",
        placeholder: "6",
        common: true,
      },
      {
        name: "w",
        type: "string",
        description: "Write output to file",
        placeholder: "wordlist.txt",
        common: true,
      },
      {
        name: "url",
        type: "string",
        description: "URL to spider",
        placeholder: "http://example.com",
        required: true,
      },
    ],
    documentation: "https://github.com/digininja/CeWL",
  },
]

