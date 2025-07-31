"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { ScoutTemplateManager } from "./scout-template-manager"
import { ScoutCostIndicator } from "./scout-cost-indicator"
import { ScheduleSendSection } from "./schedule-send-section"
import type { Candidate } from "../types/candidate"

interface IndividualScoutDialogProps {
  isOpen: boolean
  onClose: () => void
  candidate: Candidate | null
  onScoutSent: (candidateId: string) => void
}

export function IndividualScoutDialog({ isOpen, onClose, candidate, onScoutSent }: IndividualScoutDialogProps) {
  const [scoutMessage, setScoutMessage] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [businessDaysLater, setBusinessDaysLater] = useState("3")
  const [scheduledDate, setScheduledDate] = useState<Date>()

  if (!candidate) return null

  const handleTemplateSelect = (template: any) => {
    let message = template.content
    message = message.replace(/\{候補者名\}/g, candidate.resume.personalInfo.name)

    // ターゲットリストに紐付いた求人情報を使用
    message = message.replace(/\{求人タイトル\}/g, "求人")

    if (candidate.resume.skills.length > 0) {
      message = message.replace(/\{スキル\}/g, candidate.resume.skills.slice(0, 3).join("、"))
    }

    setScoutMessage(message)
  }

  const handleSendScout = () => {
    if (!scoutMessage.trim()) return

    // スカウト送信処理
    onScoutSent(candidate.id)

    // フォームリセット
    setScoutMessage("")
    setIsScheduled(false)
    setBusinessDaysLater("3")
    setScheduledDate(undefined)

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            {candidate.resume.personalInfo.name}様にスカウト送信
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* コスト表示 */}
          <ScoutCostIndicator selectedCount={1} />

          {/* スケジュール送信設定 */}
          <ScheduleSendSection
            isScheduled={isScheduled}
            onScheduledChange={setIsScheduled}
            businessDaysLater={businessDaysLater}
            onBusinessDaysChange={setBusinessDaysLater}
            scheduledDate={scheduledDate}
            onScheduledDateChange={setScheduledDate}
          />

          {/* テンプレート管理 */}
          <ScoutTemplateManager onTemplateSelect={handleTemplateSelect} />

          {/* スカウトメッセージ */}
          <div className="space-y-2">
            <Label htmlFor="scout-message">スカウトメッセージ</Label>
            <Textarea
              id="scout-message"
              value={scoutMessage}
              onChange={(e) => setScoutMessage(e.target.value)}
              placeholder="候補者への個別メッセージを入力してください..."
              rows={8}
            />
            <p className="text-xs text-gray-500">
              候補者のスキル（{candidate.resume.skills.slice(0, 3).join("、")}）を参考にメッセージを作成してください
            </p>
          </div>

          {/* 送信ボタン */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button onClick={handleSendScout} disabled={!scoutMessage.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {isScheduled ? "スケジュール設定" : "送信"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
