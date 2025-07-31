"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeft, Send, User, Briefcase, MapPin, Calendar, Mail, Phone, GraduationCap, Building } from "lucide-react"
import type { TargetListDetail, Candidate as CandidateType } from "../types/candidate"
import { IndividualScoutDialog } from "./individual-scout-dialog"
import { BulkScoutDialog } from "./bulk-scout-dialog"

// 候補者データを動的に生成する関数
const generateMockCandidates = (count: number): CandidateType[] => {
  const companies = [
    "株式会社テックイノベーション",
    "株式会社デジタルソリューション",
    "株式会社クラウドテック",
    "株式会社インフラテック",
    "株式会社クリエイティブスタジオ",
    "株式会社データサイエンス",
    "株式会社モバイルテック",
    "株式会社AIソリューション",
    "株式会社ウェブデザイン",
    "株式会社システム開発",
    "株式会社フィンテック",
    "株式会社ゲーム開発",
  ]

  const positions = [
    "フロントエンドエンジニア",
    "バックエンドエンジニア",
    "フルスタックエンジニア",
    "DevOpsエンジニア",
    "データサイエンティスト",
    "UI/UXデザイナー",
    "プロダクトマネージャー",
    "テックリード",
    "シニアエンジニア",
  ]

  const prefectures = ["東京都", "神奈川県", "大阪府", "愛知県", "福岡県", "北海道", "宮城県", "広島県"]

  const skills = [
    ["React", "TypeScript", "Next.js"],
    ["Python", "Django", "AWS"],
    ["Vue.js", "Nuxt.js", "Firebase"],
    ["Java", "Spring", "Docker"],
    ["Go", "Kubernetes", "GCP"],
    ["Node.js", "Express", "MongoDB"],
  ]

  const universities = [
    "東京大学",
    "京都大学",
    "早稲田大学",
    "慶應義塾大学",
    "東京工業大学",
    "大阪大学",
    "名古屋大学",
    "九州大学",
    "北海道大学",
    "東北大学",
  ]

  return Array.from({ length: count }, (_, index) => {
    const companyIndex = index % companies.length
    const positionIndex = index % positions.length
    const prefectureIndex = index % prefectures.length
    const skillIndex = index % skills.length
    const universityIndex = index % universities.length

    return {
      id: `CAND-${String(index + 1).padStart(3, "0")}`,
      name: `候補者${index + 1}`,
      avatar: `/placeholder.svg?height=40&width=40`,
      title: positions[positionIndex],
      currentCompany: companies[companyIndex],
      matchRate: Math.floor(Math.random() * 30) + 70, // 70-100%
      status: "unscouted" as const, // すべて「未スカウト」で初期化
      lastContact: "未接触", // 初期状態では未接触
      resume: {
        personalInfo: {
          name: `候補者${index + 1}`,
          age: Math.floor(Math.random() * 15) + 25, // 25-40歳
          prefecture: prefectures[prefectureIndex],
          email: `candidate${index + 1}@example.com`,
          phone: `090-****-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
        },
        workHistory: [
          {
            id: "work-1",
            company: companies[companyIndex],
            position: positions[positionIndex],
            period: "2020年4月 - 現在",
            description: `${positions[positionIndex]}として、Webアプリケーションの開発・運用に従事。チーム開発でのコードレビューや新人教育も担当。`,
          },
          {
            id: "work-2",
            company: companies[(companyIndex + 1) % companies.length],
            position: "ジュニアエンジニア",
            period: "2018年4月 - 2020年3月",
            description: "新卒として入社し、基本的なプログラミングスキルを習得。小規模なWebサイトの制作を担当。",
          },
        ],
        education: [
          {
            id: "edu-1",
            school: universities[universityIndex],
            degree: "学士",
            major: "情報工学科",
            period: "2014年4月 - 2018年3月",
          },
        ],
        selfPR: `${positions[positionIndex]}として${Math.floor(Math.random() * 5) + 3}年の経験があります。特に${skills[skillIndex].join("、")}を用いた開発が得意で、ユーザビリティを重視したアプリケーション開発を心がけています。チームワークを大切にし、積極的にコミュニケーションを取りながら開発を進めることができます。`,
        skills: skills[skillIndex],
        languages: ["日本語（ネイティブ）", "英語（ビジネスレベル）"],
        preferences: {
          salary: `${Math.floor(Math.random() * 400) + 600}万円`,
          location: prefectures[prefectureIndex],
          workStyle: "リモート可",
        },
      },
    }
  })
}

interface IndividualTargetListProps {
  targetList: TargetListDetail | undefined
  onBack: () => void
}

export default function IndividualTargetList({ targetList, onBack }: IndividualTargetListProps) {
  const [isIndividualScoutOpen, setIsIndividualScoutOpen] = useState(false)
  const [isBulkScoutOpen, setIsBulkScoutOpen] = useState(false)
  const [selectedCandidateForScout, setSelectedCandidateForScout] = useState<CandidateType | null>(null)
  const [candidates, setCandidates] = useState<CandidateType[]>(() =>
    generateMockCandidates(targetList?.candidateCount || 0),
  )
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [selectedCandidateForResume, setSelectedCandidateForResume] = useState<CandidateType | null>(null)
  const [isResumeSidebarOpen, setIsResumeSidebarOpen] = useState(false)

  if (!targetList) {
    return (
      <div className="text-center">
        <p>リストが見つかりません。</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          一覧に戻る
        </Button>
      </div>
    )
  }

  // ターゲットリストの候補者数と同数の候補者を生成
  // const mockCandidates = generateMockCandidates(targetList.candidateCount)

  // handleSelectAll関数を更新（未スカウトの候補者のみ対象）
  const handleSelectAll = (checked: boolean) => {
    const unscoutedCandidates = candidates.filter((c) => c.status === "unscouted")

    if (checked) {
      setSelectedCandidates(unscoutedCandidates.map((c) => c.id))
    } else {
      setSelectedCandidates([])
    }
  }

  // handleSelectCandidate関数を更新（未スカウトの候補者のみ選択可能）
  const handleSelectCandidate = (candidateId: string, checked: boolean) => {
    const candidate = candidates.find((c) => c.id === candidateId)
    if (candidate?.status !== "unscouted") return // 未スカウト以外は選択不可

    if (checked) {
      setSelectedCandidates((prev) => [...prev, candidateId])
    } else {
      setSelectedCandidates((prev) => prev.filter((id) => id !== candidateId))
    }
  }

  const handleCandidateClick = (candidate: CandidateType) => {
    setSelectedCandidateForResume(candidate)
    setIsResumeSidebarOpen(true)
  }

  // isAllSelected の計算を更新（未スカウトの候補者のみ対象）
  const unscoutedCandidates = candidates.filter((c) => c.status === "unscouted")
  const isAllSelected = selectedCandidates.length === unscoutedCandidates.length && unscoutedCandidates.length > 0

  // getStatusBadge関数を更新
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unscouted":
        return <Badge variant="secondary">未スカウト</Badge>
      case "scouted":
        return <Badge variant="default">スカウト済</Badge>
      case "replied":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            返信あり
          </Badge>
        )
      case "declined":
        return <Badge variant="destructive">辞退</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  // スカウト送信成功時の処理を追加（useScoutDialog内で呼び出される想定）
  const handleScoutSent = (candidateIds: string[]) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidateIds.includes(candidate.id)
          ? { ...candidate, status: "scouted" as const, lastContact: new Date().toISOString().split("T")[0] }
          : candidate,
      ),
    )
    setSelectedCandidates([])
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                リスト管理に戻る
              </Button>
              <CardTitle className="text-2xl">{targetList.name}</CardTitle>
              <CardDescription className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {targetList.linkedJob?.title}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {targetList.candidateCount}名の候補者
                </span>
              </CardDescription>
            </div>
            <Button
              disabled={selectedCandidates.length === 0 || unscoutedCandidates.length === 0}
              onClick={() => setIsBulkScoutOpen(true)}
            >
              <Send className="mr-2 h-4 w-4" />
              選択した{selectedCandidates.length}名に一括スカウト
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  {unscoutedCandidates.length > 0 && (
                    <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                  )}
                </TableHead>
                <TableHead>候補者</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>最終接触</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id} className="group">
                  <TableCell>
                    {candidate.status === "unscouted" ? (
                      <Checkbox
                        checked={selectedCandidates.includes(candidate.id)}
                        onCheckedChange={(checked) => handleSelectCandidate(candidate.id, !!checked)}
                      />
                    ) : (
                      <div className="w-4 h-4" /> // スカウト済みの場合は空のスペース
                    )}
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      onClick={() => handleCandidateClick(candidate)}
                    >
                      <Avatar>
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{candidate.currentCompany.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{candidate.currentCompany}</p>
                        <p className="text-sm text-muted-foreground">{candidate.title}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                  <TableCell>{candidate.lastContact}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCandidateForScout(candidate)
                        setIsIndividualScoutOpen(true)
                      }}
                    >
                      個別スカウト
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 候補者レジュメサイドピーク */}
      <Sheet open={isResumeSidebarOpen} onOpenChange={setIsResumeSidebarOpen}>
        <SheetContent side="right" className="w-[600px] sm:w-[700px] lg:max-w-[90vw] overflow-y-auto">
          {selectedCandidateForResume && (
            <>
              <SheetHeader className="pb-6">
                <SheetTitle className="text-xl">候補者詳細</SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                {/* 個人情報 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      個人情報
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedCandidateForResume.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedCandidateForResume.resume.personalInfo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{selectedCandidateForResume.resume.personalInfo.name}</h3>
                        <p className="text-muted-foreground">{selectedCandidateForResume.title}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>年齢: {selectedCandidateForResume.resume.personalInfo.age}歳</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>住所: {selectedCandidateForResume.resume.personalInfo.prefecture}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {selectedCandidateForResume.resume.personalInfo.email.replace(/(.{2}).*@/, "$1****@")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedCandidateForResume.resume.personalInfo.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 職歴 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      職務経歴
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedCandidateForResume.resume.workHistory.map((job) => (
                      <div key={job.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start gap-2 mb-2">
                          <Building className="w-4 h-4 text-muted-foreground mt-1" />
                          <div>
                            <h4 className="font-semibold">{job.company}</h4>
                            <p className="text-sm text-muted-foreground">{job.position}</p>
                            <p className="text-xs text-muted-foreground">{job.period}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 ml-6">{job.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* 学歴 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      学歴
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedCandidateForResume.resume.education.map((edu) => (
                      <div key={edu.id} className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          <h4 className="font-semibold">{edu.school}</h4>
                          <p className="text-sm text-muted-foreground">
                            {edu.degree} {edu.major}
                          </p>
                          <p className="text-xs text-muted-foreground">{edu.period}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* 自己PR */}
                <Card>
                  <CardHeader>
                    <CardTitle>自己PR</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {selectedCandidateForResume.resume.selfPR}
                    </p>
                  </CardContent>
                </Card>

                {/* スキル・言語 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">スキル</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidateForResume.resume.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">語学</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {selectedCandidateForResume.resume.languages.map((lang) => (
                          <p key={lang} className="text-sm">
                            {lang}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 希望条件 */}
                <Card>
                  <CardHeader>
                    <CardTitle>希望条件</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">希望年収:</span>
                        <p>{selectedCandidateForResume.resume.preferences.salary}</p>
                      </div>
                      <div>
                        <span className="font-medium">希望勤務地:</span>
                        <p>{selectedCandidateForResume.resume.preferences.location}</p>
                      </div>
                      <div>
                        <span className="font-medium">勤務形態:</span>
                        <p>{selectedCandidateForResume.resume.preferences.workStyle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* アクションボタン */}
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setSelectedCandidateForScout(selectedCandidateForResume)
                      setIsIndividualScoutOpen(true)
                      setIsResumeSidebarOpen(false)
                    }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    スカウトする
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    お気に入りに追加
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <IndividualScoutDialog
        isOpen={isIndividualScoutOpen}
        onClose={() => {
          setIsIndividualScoutOpen(false)
          setSelectedCandidateForScout(null)
        }}
        candidate={selectedCandidateForScout}
        onScoutSent={(candidateId) => handleScoutSent([candidateId])}
      />

      <BulkScoutDialog
        isOpen={isBulkScoutOpen}
        onClose={() => setIsBulkScoutOpen(false)}
        candidates={candidates.filter((c) => selectedCandidates.includes(c.id))}
        onScoutSent={handleScoutSent}
      />
    </>
  )
}
