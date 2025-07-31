import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Mail, Clock } from "lucide-react"
import type { Candidate } from "@/app/types/candidate"

export const getScoutStatusBadge = (status: string) => {
  const variant = getScoutStatusVariant(status)
  const icon = getScoutStatusIcon(status)
  const text = getScoutStatusText(status)

  return (
    <Badge variant={variant} className="flex items-center gap-1">
      {icon}
      {text}
    </Badge>
  )
}

const getScoutStatusIcon = (status: string) => {
  switch (status) {
    case "sent":
      return <Mail className="w-3 h-3" />
    case "replied":
      return <CheckCircle className="w-3 h-3" />
    case "declined":
      return <XCircle className="w-3 h-3" />
    case "scheduled":
      return <Clock className="w-3 h-3" />
    default:
      return null
  }
}

const getScoutStatusText = (status: string) => {
  switch (status) {
    case "unscouted":
      return "未スカウト"
    case "sent":
      return "送信済み"
    case "replied":
      return "返信あり"
    case "declined":
      return "辞退"
    case "scheduled":
      return "送信予定"
    default:
      return "不明"
  }
}

export const getScoutStatusVariant = (status: string) => {
  switch (status) {
    case "new":
      return "default"
    case "contacted":
      return "secondary"
    case "replied":
      return "success"
    case "declined":
      return "destructive"
    default:
      return "outline"
  }
}

export const anonymizeCandidateName = (name: string): string => {
  return name.charAt(0) + "***"
}

export const formatRelativeTime = (timestamp: string): string => {
  const now = new Date()
  const messageTime = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "たった今"
  if (diffInMinutes < 60) return `${diffInMinutes}分前`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}時間前`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}日前`

  return messageTime.toLocaleDateString("ja-JP")
}

export function filterCandidates(candidates: Candidate[], filters: any): Candidate[] {
  return candidates.filter((candidate) => {
    // Implement filter logic here
    return true
  })
}

export function sortCandidates(candidates: Candidate[], sortBy: string, order: "asc" | "desc"): Candidate[] {
  return [...candidates].sort((a, b) => {
    // Implement sort logic here
    return 0
  })
}
