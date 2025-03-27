import type { Command } from "./types"

export const webApplicationCommands: Command[] = [
  {
    name: "burpsuite",
    description: "Web application security testing platform",
    explanation:
      "Integrated platform for performing security testing of web applications, with various tools for different testing requirements.",
    examples: {
      simple: {
        command: "burpsuite",
        description: "Launch Burp Suite with default settings.",
      },
      intermediate: {
        command: "burpsuite --project-file=project.burp",
        description: "Launch Burp Suite and open a specific project file.",
      },
      advanced: {
        command: "burpsuite --project-file=project.burp --config-file=config.json --unpause-spider-and-scanner",
        description:
          "Launch Burp Suite with a specific project and configuration, automatically starting the spider and scanner.",
      },
    },
    options: [
      {
        name: "project-file",
        type: "string",
        description: "Open the specified project file",
        placeholder: "project.burp",
        common: true,
      },
      {
        name: "config-file",
        type: "string",
        description: "Load options from the specified project configuration file",
        placeholder: "config.json",
        common: false,
      },
      {
        name: "disable-extensions",
        type: "boolean",
        description: "Disable loading of extensions",
        common: false,
      },
    ],
    documentation: "https://portswigger.net/burp/documentation",
  },
  {
    name: "sqlmap",
    description: "Automatic SQL injection tool",
    explanation: "Automates the detection and exploitation of SQL injection vulnerabilities.",
    examples: {
      simple: {
        command: 'sqlmap -u "http://example.com/page.php?id=1"',
        description: "Basic SQL injection test on a URL parameter.",
      },
      intermediate: {
        command: 'sqlmap -u "http://example.com/page.php?id=1" --dbms=mysql --dump',
        description: "SQL injection test specifying MySQL as the database and dumping the database.",
      },
      advanced: {
        command: 'sqlmap -u "http://example.com/page.php?id=1" --dbms=mysql --level=5 --risk=3 --dump-all --batch',
        description: "Aggressive SQL injection test with maximum level and risk, dumping all databases.",
      },
    },
    options: [
      {
        name: "u",
        type: "string",
        description: "Target URL",
        placeholder: "http://example.com/page.php?id=1",
        required: true,
      },
      {
        name: "p",
        type: "string",
        description: "Testable parameter(s)",
        placeholder: "id",
        common: true,
      },
      {
        name: "dbms",
        type: "string",
        description: "Force DBMS type",
        placeholder: "mysql",
        common: false,
      },
      {
        name: "dump",
        type: "boolean",
        description: "Dump database table entries",
        common: true,
      },
    ],
    documentation: "https://github.com/sqlmapproject/sqlmap/wiki",
  },
  {
    name: "xsser",
    description: "Cross Site Scripting (XSS) vulnerability detection and exploitation",
    explanation: "Detects and exploits XSS vulnerabilities in web applications.",
    examples: {
      simple: {
        command: 'xsser --url "http://example.com/vulnerable.php?param=test"',
        description: "Basic XSS test on a URL parameter.",
      },
      intermediate: {
        command: 'xsser --url "http://example.com/vulnerable.php?param=test" --Fp',
        description: "XSS test using fast payload scanning.",
      },
      advanced: {
        command: 'xsser --url "http://example.com/vulnerable.php?param=test" --Fp --Xsa --Coo="PHPSESSID=1234"',
        description: "Comprehensive XSS test with agent scripting attacks and cookie injection.",
      },
    },
    options: [
      {
        name: "url",
        type: "string",
        description: "Target URL",
        placeholder: "http://example.com/vulnerable.php?param=test",
        required: true,
      },
      {
        name: "Fp",
        type: "boolean",
        description: "Fast Payload scan (XSS)",
        common: true,
      },
      {
        name: "Xsa",
        type: "boolean",
        description: "Cross Site Agent Scripting attacks",
        common: false,
      },
      {
        name: "Coo",
        type: "string",
        description: "Cookie injection",
        placeholder: "PHPSESSID=1234",
        common: false,
      },
    ],
    documentation: "https://github.com/epsylon/xsser",
  },
  {
    name: "zaproxy",
    description: "OWASP Zed Attack Proxy (ZAP)",
    explanation: "Integrated penetration testing tool for finding vulnerabilities in web applications.",
    examples: {
      simple: {
        command: "zaproxy -quickurl http://example.com",
        description: "Quick scan of a website.",
      },
      intermediate: {
        command: "zaproxy -quickurl http://example.com -quickout zap-report.html",
        description: "Quick scan of a website with HTML report output.",
      },
      advanced: {
        command:
          "zaproxy -daemon -config api.key=12345 -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true",
        description: "Run ZAP in daemon mode with API access configured.",
      },
    },
    options: [
      {
        name: "quickurl",
        type: "string",
        description: "URL to attack",
        placeholder: "http://example.com",
        required: true,
      },
      {
        name: "quickout",
        type: "string",
        description: "Save the report to this file",
        placeholder: "zap-report.html",
        common: true,
      },
      {
        name: "cmd",
        type: "string",
        description: "Run the specified command line",
        placeholder: "script.js",
        common: false,
      },
    ],
    documentation: "https://www.zaproxy.org/docs/",
  },
]

