"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, PlusCircle, ArrowRight, Info, FileText } from "lucide-react"
import type { JobPosition, TargetListDetail } from "../types/candidate"

interface JobSelectionStepProps {
  jobs: JobPosition[]
  targetLists: TargetListDetail[]
  onJobSelect: (job: JobPosition) => void
}

export default function JobSelectionStep({ jobs, targetLists, onJobSelect }: JobSelectionStepProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "公開中":
        return <Badge variant="default">{status}</Badge>
      case "停止中":
        return <Badge variant="secondary">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPublicationStatusBadge = (status: string) => {
    switch (status) {
      case "掲載中":
        return (
          <Badge variant="outline" className="text-green-600 border-green-300">
            {status}
          </Badge>
        )
      case "非掲載":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-300">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>求人一覧から作成</CardTitle>
        <p className="text-muted-foreground">
          ターゲットリストを作成したい求人を選択してください。1つの求人につき1つのリストを作成できます。
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>求人ID</TableHead>
              <TableHead>ポジション名</TableHead>
              <TableHead>求人状態</TableHead>
              <TableHead>掲載状態</TableHead>
              <TableHead className="text-right">応募数</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  求人種別
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>「ダイレクト求人」にはスカウト機能を利用できません。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead>ターゲットリスト</TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => {
              const linkedList = targetLists.find((list) => list.linkedJob?.id === job.id)
              const isDirect = job.type === "direct"
              const isDisabled = isDirect || job.status !== "公開中"

              const actionButton = (
                <Button
                  size="sm"
                  onClick={() => onJobSelect(job)}
                  disabled={isDisabled}
                  variant={linkedList ? "gray-m" : "secondary-m"}
                >
                  {linkedList ? (
                    <>
                      リストを見る
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      リスト作成
                      <PlusCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )

              return (
                <TableRow key={job.id} data-disabled={isDisabled}>
                  <TableCell className="font-mono text-xs">{job.id}</TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell>{getPublicationStatusBadge(job.publicationStatus)}</TableCell>
                  <TableCell className="text-right">{job.applicationCount}名</TableCell>
                  <TableCell>
                    <Badge variant={isDirect ? "destructive" : "secondary"}>
                      {job.type === "direct" ? "ダイレクト求人" : "一般求人"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {linkedList ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>作成済み</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>未作成</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isDisabled ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{actionButton}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="flex items-center gap-2">
                              <Info className="w-4 h-4" />
                              {isDirect
                                ? "この求人はスカウト機能を利用できません。"
                                : "この求人は現在スカウト対象外です"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      actionButton
                    )}
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
