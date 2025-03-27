
import CommandBuilder from "@/components/custom/commmand-builder"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kali Linux Command Builder",
  description: "A web-based GUI tool for constructing Kali Linux commands",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">Kali Linux Command Builder</h1>
        <p className="text-zinc-300 mb-8">Build, preview, and save Kali Linux commands with an intuitive interface</p>
        <CommandBuilder />
      </div>
    </main>
  )
}

