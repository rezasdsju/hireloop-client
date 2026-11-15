"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.add({
        type: "success",
        description: "Transaction ID copied to clipboard",
        priority: "high",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.add({
        type: "error",
        description: "Could not copy the transaction ID",
        priority: "high",
      })
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleCopy}
      aria-label="Copy transaction ID"
      className="shrink-0"
    >
      {copied ? (
        <Check className="text-emerald-600 dark:text-emerald-400" />
      ) : (
        <Copy />
      )}
    </Button>
  )
}
