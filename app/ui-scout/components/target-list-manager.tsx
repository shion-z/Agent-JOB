"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Calendar, Briefcase, Send, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { TargetListDetail } from "../types/candidate"

interface TargetListManagerProps {
  targetLists: TargetListDetail[]
  onSelectList: (listId: string) => void
}

export default function TargetListManager({ targetLists, onSelectList }: TargetListManagerProps) {
  if (targetLists.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardHeader>
          <CardTitle>ターゲットリストがありません</CardTitle>
          <CardDescription>「求人一覧から作成」タブで新しいリストを作成しましょう。</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 50) return "bg-blue-500"
    if (percentage >= 20) return "bg-yellow-500"
    return "bg-gray-300"
  }

  const getProgressStatus = (scoutedCount: number, totalCount: number) => {
    const percentage = totalCount > 0 ? Math.round((scoutedCount / totalCount) * 100) : 0

    if (percentage === 100) return { text: "完了", color: "text-green-600", bgColor: "bg-green-50" }
    if (percentage >= 80) return { text: "高進捗", color: "text-green-600", bgColor: "bg-green-50" }
    if (percentage >= 50) return { text: "中進捗", color: "text-blue-600", bgColor: "bg-blue-50" }
    if (percentage >= 20) return { text: "低進捗", color: "text-yellow-600", bgColor: "bg-yellow-50" }
    return { text: "未着手", color: "text-gray-600", bgColor: "bg-gray-50" }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ターゲットリスト管理</CardTitle>
        <CardDescription>
          作成済みのターゲットリスト一覧です。リストを選択して候補者を確認・スカウトできます。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>リスト名</TableHead>
              <TableHead>関連求人</TableHead>
              <TableHead>候補者数</TableHead>
              <TableHead>スカウト進捗</TableHead>
              <TableHead>作成日</TableHead>
              <TableHead>最新追加日</TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {targetLists.map((list) => {
              const scoutedPercentage =
                list.candidateCount > 0 ? Math.round((list.scoutedCount / list.candidateCount) * 100) : 0
              const unscoutedCount = list.candidateCount - list.scoutedCount
              const progressStatus = getProgressStatus(list.scoutedCount, list.candidateCount)

              return (
                <TableRow key={list.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {list.name}
                      {list.hasNewCandidates && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                          NEW {list.newCandidatesCount || 0}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-sm">{list.linkedJob?.title || "N/A"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{list.candidateCount}名</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2 min-w-[200px]">
                      {/* 進捗バーとパーセンテージ */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${progressStatus.bgColor} ${progressStatus.color}`}
                          >
                            {progressStatus.text}
                          </div>
                          <span className="text-sm font-medium">{scoutedPercentage}%</span>
                        </div>
                      </div>

                      {/* 進捗バー */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(scoutedPercentage)}`}
                          style={{ width: `${scoutedPercentage}%` }}
                        />
                      </div>

                      {/* 詳細数値 */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>送信済み: {list.scoutedCount}名</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Send className="h-3 w-3 text-gray-400" />
                          <span>未送信: {unscoutedCount}名</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{list.createdDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{list.lastAddedDate || "N/A"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => onSelectList(list.id)}>
                      リストを見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
