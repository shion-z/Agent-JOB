"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Users } from "lucide-react"
import { ScoutTemplateManager } from "./scout-template-manager"
import { ScoutCostIndicator } from "./scout-cost-indicator"
import { ScheduleSendSection } from "./schedule-send-section"
import type { Candidate } from "../types/candidate"

export function BulkScoutDialog({ isOpen, onClose, candidates, onScoutSent }: BulkScoutDialogProps) {
  const [scoutMessage, setScoutMessage] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [businessDaysLater, setBusinessDaysLater] = useState("3")
  const [scheduledDate, setScheduledDate] = useState<Date>()

  const candidateCount = candidates.length

  const handleTemplateSelect = (template: any) => {
    let message = template.content
    message = message.replace(/\{候補者名\}/g, "候補者")

    // 一括送信では共通スキルは表示しない
    message = message.replace(/\{スキル\}/g, "技術スキル")

    setScoutMessage(message)
  }

  const handleSendScout = () => {
    if (!scoutMessage.trim()) return

    // 一括スカウト送信処理
    onScoutSent(candidates.map((c) => c.id))

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
            <Users className="w-5 h-5" />
            {candidateCount}名の候補者に一括スカウト送信
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* コスト表示 */}
          <ScoutCostIndicator selectedCount={candidateCount} />

          {/* 対象候補者一覧 */}
          <div className="p-4 bg-gray-50 border rounded-lg">
            <h4 className="font-medium mb-2">送信対象候補者</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {candidates.map((candidate, index) => (
                <div key={candidate.id} className="text-sm text-gray-700">
                  {index + 1}. {candidate.currentCompany} - {candidate.title}
                </div>
              ))}
            </div>
          </div>

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
              placeholder="候補者への共通メッセージを入力してください..."
              rows={8}
            />
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>注意:</strong> このメッセージは選択した{candidateCount}名全員に同じ内容で送信されます。
                個別の候補者情報（名前、スキルなど）は自動で置換されます。
              </p>
            </div>
          </div>

          {/* 送信ボタン */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button onClick={handleSendScout} disabled={!scoutMessage.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {isScheduled ? `${candidateCount}名にスケジュール設定` : `${candidateCount}名に送信`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface BulkScoutDialogProps {
  isOpen: boolean
  onClose: () => void
  candidates: Candidate[]
  onScoutSent: (candidateIds: string[]) => void
}
