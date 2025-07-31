"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, FileText } from "lucide-react"

interface ScoutTemplate {
  id: string
  name: string
  jobId?: string
  jobTitle?: string
  type: "initial" | "followup"
  content: string
  createdAt: string
}

const mockTemplates: ScoutTemplate[] = [
  {
    id: "temp-1",
    name: "初回接触用テンプレート",
    type: "initial",
    content: `{候補者名}様

はじめまして、株式会社イサイの採用担当です。

あなたの素晴らしいご経歴を拝見し、ぜひ一度お話をお伺いしたくご連絡いたしました。

弊社では現在、{求人タイトル}のポジションで一緒に働いていただける方を募集しております。

ご興味をお持ちいただけましたら、まずはカジュアルにお話しできればと思います。

何かご質問がございましたら、お気軽にお声がけください。

よろしくお願いいたします。`,
    createdAt: "2024-01-15",
  },
  {
    id: "temp-2",
    name: "カジュアル面談案内",
    type: "followup",
    content: `{候補者名}様

ご連絡ありがとうございます。

カジュアル面談の日程候補をいくつかお送りしますので、ご都合の良い日時をお知らせください。

・1月25日（木）14:00-15:00
・1月26日（金）10:00-11:00
・1月29日（月）16:00-17:00

オンライン（Zoom）での実施を予定しております。

ご質問等ございましたら、お気軽にお声がけください。`,
    createdAt: "2024-01-12",
  },
  {
    id: "temp-3",
    name: "技術系ポジション向け",
    type: "initial",
    content: `{候補者名}様

はじめまして、株式会社イサイの採用担当です。

あなたの技術的なバックグラウンドと経験に大変興味を持ち、ご連絡させていただきました。

特に、あなたの{スキル}に関する経験は、弊社の{求人タイトル}のポジションにとって非常に価値があると考えております。

弊社では最新の技術スタックを活用し、エンジニアが成長できる環境を整えています。

もしご興味をお持ちいただけましたら、まずは技術的な内容も含めてカジュアルにお話しできればと思います。`,
    createdAt: "2024-01-10",
  },
]

interface ScoutTemplateManagerProps {
  selectedJobId?: string
  onTemplateSelect: (template: ScoutTemplate) => void
}

export function ScoutTemplateManager({ selectedJobId, onTemplateSelect }: ScoutTemplateManagerProps) {
  const [templates] = useState<ScoutTemplate[]>(mockTemplates)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplateId(templateId)
      onTemplateSelect(template)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            テンプレート選択
          </CardTitle>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                新規作成
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規テンプレート作成</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>テンプレート名</Label>
                  <input className="w-full p-2 border rounded" placeholder="テンプレート名を入力" />
                </div>
                <div className="space-y-2">
                  <Label>メッセージ内容</Label>
                  <Textarea rows={8} placeholder="メッセージ内容を入力してください..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>保存</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>テンプレートを選択</Label>
          <Select value={selectedTemplateId} onValueChange={handleTemplateSelect}>
            <SelectTrigger>
              <SelectValue placeholder="テンプレートを選択してください" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  <div className="flex items-center gap-2">
                    <span>{template.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {template.type === "initial" ? "初回" : "フォロー"}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTemplateId && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">プレビュー</h4>
            <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-32 overflow-y-auto">
              {templates.find((t) => t.id === selectedTemplateId)?.content}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>テンプレート内の変数は自動で置換されます：</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>{"{候補者名}"} → 候補者の名前</li>
            <li>{"{求人タイトル}"} → 選択した求人のタイトル</li>
            <li>{"{スキル}"} → 候補者の主要スキル</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
