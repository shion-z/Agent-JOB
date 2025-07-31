"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useScoutDialog } from "@/app/hooks/useScoutDialog"
import { useMessageSender } from "@/app/hooks/useMessageSender"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function ScoutDialog() {
  const { isOpen, closeDialog, candidate } = useScoutDialog()
  const { isSending, sendMessage } = useMessageSender()
  const [message, setMessage] = useState("")

  const handleSend = async () => {
    if (!candidate || !message) return
    const success = await sendMessage(candidate.name, message)
    if (success) {
      closeDialog()
      setMessage("")
    }
  }

  if (!candidate) return null

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{candidate.name}さんへのスカウト</DialogTitle>
          <DialogDescription>スカウトメッセージを作成して送信します。</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="message">メッセージ</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={10} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            キャンセル
          </Button>
          <Button onClick={handleSend} disabled={isSending || !message}>
            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            送信
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
