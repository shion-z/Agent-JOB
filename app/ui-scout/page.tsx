"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Users,
  BarChart3,
  Home,
  Bell,
  Menu,
  MoreVertical,
  Briefcase,
  Calendar,
  MessageSquare,
  PlusCircle,
  History,
} from "lucide-react"
import { ScoutPlanManager } from "./components/scout-plan-manager"
import JobSelectionStep from "./components/job-selection-step"
import TargetListManager from "./components/target-list-manager"
import IndividualTargetList from "./components/individual-target-list"
import ReportDashboard from "./components/report-dashboard"
import type { JobPosition, TargetListDetail } from "./types/candidate"

const mockJobs: JobPosition[] = [
  {
    id: "JOB-001",
    title: "シニアフロントエンドエンジニア",
    company: "株式会社テックイノベーション",
    location: "東京都渋谷区",
    type: "general",
    status: "公開中",
    publicationStatus: "掲載中",
    applicationCount: 25,
    employmentType: "正社員",
    keywords: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "JOB-002",
    title: "バックエンドエンジニア",
    company: "株式会社デジタルソリューション",
    location: "大阪府大阪市",
    type: "general",
    status: "公開中",
    publicationStatus: "掲載中",
    applicationCount: 18,
    employmentType: "正社員",
    keywords: ["Go", "Python", "AWS"],
  },
  {
    id: "JOB-003",
    title: "フルスタックエンジニア",
    company: "株式会社クラウドテック",
    location: "神奈川県横浜市",
    type: "direct",
    status: "公開中",
    publicationStatus: "掲載中",
    applicationCount: 5,
    employmentType: "正社員",
    keywords: ["React", "Node.js", "GCP"],
  },
  {
    id: "JOB-004",
    title: "DevOpsエンジニア",
    company: "株式会社インフラテック",
    location: "東京都新宿区",
    type: "general",
    status: "停止中",
    publicationStatus: "非掲載",
    applicationCount: 32,
    employmentType: "正社員",
    keywords: ["Terraform", "Kubernetes", "CI/CD"],
  },
  {
    id: "JOB-005",
    title: "UI/UXデザイナー（インターン）",
    company: "株式会社クリエイティブスタジオ",
    location: "リモート",
    type: "general",
    status: "公開中",
    publicationStatus: "掲載中",
    applicationCount: 45,
    employmentType: "インターン",
    keywords: ["Figma", "UI Design", "UX Research"],
  },
]

export default function ScoutingDashboard() {
  const mockUsageHistory = [
    {
      date: "2024-01-23",
      scoutsUsed: 3,
      candidateName: "田中 太郎",
      jobTitle: "シニアフロントエンドエンジニア",
      status: "sent",
    },
    {
      date: "2024-01-22",
      scoutsUsed: 2,
      candidateName: "佐藤 花子",
      jobTitle: "バックエンドエンジニア",
      status: "replied",
    },
    {
      date: "2024-01-21",
      scoutsUsed: 1,
      candidateName: "鈴木 一郎",
      jobTitle: "フルスタックエンジニア",
      status: "sent",
    },
    {
      date: "2024-01-20",
      scoutsUsed: 4,
      candidateName: "高橋 美咲",
      jobTitle: "UI/UXデザイナー",
      status: "replied",
    },
    {
      date: "2024-01-19",
      scoutsUsed: 2,
      candidateName: "山田 次郎",
      jobTitle: "DevOpsエンジニア",
      status: "declined",
    },
  ]
  const [activeView, setActiveView] = useState<"scout" | "reports" | "usage-history">("scout")
  const [activeTab, setActiveTab] = useState("list-management")
  const [targetLists, setTargetLists] = useState<TargetListDetail[]>([])
  const [selectedTargetListId, setSelectedTargetListId] = useState<string | null>(null)

  useEffect(() => {
    // 初期表示時にターゲットリストがなければ求人一覧タブをデフォルトにする
    if (targetLists.length === 0) {
      setActiveTab("job-list")
    } else {
      setActiveTab("list-management")
    }
  }, [targetLists.length])

  const handleJobSelect = (job: JobPosition) => {
    const existingList = targetLists.find((list) => list.linkedJob?.id === job.id)

    if (existingList) {
      setSelectedTargetListId(existingList.id)
    } else {
      const newTargetList: TargetListDetail = {
        id: `tl_${Date.now()}`,
        name: `${job.title} 候補者リスト`,
        description: `${job.location}勤務、${job.keywords.join("・")}のスキルを持つ候補者`,
        candidateCount: Math.floor(Math.random() * 20) + 5,
        scoutedCount: Math.floor(Math.random() * 5), // 追加: ランダムなスカウト済み数
        linkedJob: {
          id: job.id,
          title: job.title,
          company: job.company,
        },
        createdDate: new Date().toISOString().split("T")[0],
        lastAddedDate: new Date().toISOString().split("T")[0],
        hasNewCandidates: Math.random() > 0.5,
        newCandidatesCount: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : 0,
        status: "active",
      }
      setTargetLists((prev) => [...prev, newTargetList])
      setActiveTab("list-management")
    }
  }

  const handleSelectList = (listId: string) => {
    setSelectedTargetListId(listId)
  }

  const handleBackToList = () => {
    setSelectedTargetListId(null)
  }

  const renderScoutContent = () => {
    if (selectedTargetListId) {
      const targetList = targetLists.find((list) => list.id === selectedTargetListId)
      return <IndividualTargetList targetList={targetList} onBack={handleBackToList} />
    }

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list-management" disabled={targetLists.length === 0}>
              リスト管理
            </TabsTrigger>
            <TabsTrigger value="job-list">求人一覧から作成</TabsTrigger>
          </TabsList>
          {activeTab === "list-management" && (
            <Button onClick={() => setActiveTab("job-list")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              新しいリストを作成
            </Button>
          )}
        </div>
        <TabsContent value="list-management">
          <TargetListManager targetLists={targetLists} onSelectList={handleSelectList} />
        </TabsContent>
        <TabsContent value="job-list">
          <JobSelectionStep jobs={mockJobs} targetLists={targetLists} onJobSelect={handleJobSelect} />
        </TabsContent>
      </Tabs>
    )
  }

  const navigationItems = [
    { title: "ホーム", icon: Home, url: "/", isActive: false },
    { title: "求人一覧", icon: Briefcase, url: "/jobs", isActive: false },
    { title: "スカウト管理", icon: Search, url: "/scout", isActive: true },
    { title: "エントリー一覧", icon: Users, url: "/entries", isActive: false },
    { title: "メッセージ", icon: MessageSquare, url: "/messages", isActive: false },
    { title: "スケジュール", icon: Calendar, url: "/schedule", isActive: false },
  ]

  return (
    <div
      className="min-h-screen pt-16 relative w-full"
      style={{
        backgroundImage: "url('/images/background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-white rounded-bl-[24px] px-4 sm:px-6 overflow-hidden ml-5">
        <div className="flex items-center gap-4 relative z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="gray-m" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <div className="p-4">
                <div className="text-2xl font-bold text-gray-800 mb-6">イサイエージェント</div>
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${
                        item.isActive ? "text-blue-600 font-medium" : ""
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="イサイエージェント" className="h-8 w-auto" />
            </div>
            <nav className="hidden lg:flex items-center gap-6 bg-slate-50 rounded-full px-3 py-1">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Home
              </a>
              <a href="#" className="text-blue-600 font-medium text-sm">
                スカウト管理
              </a>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="gray-m" size="sm" className="text-gray-600 hidden sm:flex">
            設定
          </Button>
          <Button variant="gray-m" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500">
              1
            </Badge>
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">テスト太郎</div>
              <div className="text-xs text-gray-500">作業社1</div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>テ</AvatarFallback>
            </Avatar>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="gray-m" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>プロフィール</DropdownMenuItem>
              <DropdownMenuItem>設定</DropdownMenuItem>
              <DropdownMenuItem>ログアウト</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className="fixed left-5 top-6 z-40 rounded-[24px] w-20 pb-[116px] h-fit pt-[116px] my-0 mt-20"
        style={{
          background: "linear-gradient(179deg, #56C2FF 0.26%, #0B40DD 99.76%)",
          boxShadow: "0px 24px 32px -16px rgba(34, 78, 195, 0.60)",
        }}
      >
        <div className="p-3">
          <nav className="space-y-3">
            {navigationItems.map((item) => (
              <div key={item.title} className="relative group">
                <button
                  className={
                    item.isActive
                      ? "w-14 h-14 shrink-0 bg-white border-0 justify-center transition-all duration-200 leading-7 mx-0 rounded-3xl flex items-center hover:bg-white/90"
                      : "w-14 h-14 shrink-0 hover:bg-white/20 text-white border-0 justify-center transition-all duration-200 leading-7 mx-0 rounded-3xl flex items-center"
                  }
                  style={{
                    color: item.isActive ? "#0040FF" : "white",
                  }}
                  title={item.title}
                >
                  <item.icon className="flex justify-center items-center gap-[11px] shrink-0 size-[30px] w-6" />
                </button>
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.title}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="ml-32 max-w-7xl py-6 px-6 min-h-screen overflow-y-auto relative z-10">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">スカウト管理</h1>
              <p className="text-gray-600 mt-1">求人を選択し、効率的にスカウトを送信しましょう</p>
            </div>
            <ScoutPlanManager />
          </div>
        </div>

        <Tabs
          value={activeView}
          onValueChange={(value) => setActiveView(value as "scout" | "reports" | "usage-history")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 max-w-lg bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
            <TabsTrigger
              value="scout"
              className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none bg-transparent text-gray-600 hover:text-gray-900 rounded-none"
            >
              <Search className="w-4 h-4" />
              スカウト管理
            </TabsTrigger>
            <TabsTrigger
              value="usage-history"
              className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none bg-transparent text-gray-600 hover:text-gray-900 rounded-none"
            >
              <History className="w-4 h-4" />
              利用履歴
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none bg-transparent text-gray-600 hover:text-gray-900 rounded-none"
            >
              <BarChart3 className="w-4 h-4" />
              レポート
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scout" className="mt-6">
            {renderScoutContent()}
          </TabsContent>

          <TabsContent value="usage-history" className="mt-6">
            <div className="space-y-6">
              {/* Current Plan Overview and Daily Usage Chart - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Plan Overview */}
                <Card className="shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="w-5 h-5" />
                        スカウト利用状況
                      </CardTitle>
                      <Badge className="bg-green-100 text-green-800 border-green-200">利用中</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">100</div>
                        <div className="text-sm text-gray-600">総スカウト数</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">67</div>
                        <div className="text-sm text-gray-600">使用済み</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">33 / 100</div>
                        <div className="text-sm text-gray-600">残りスカウト</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>利用状況</span>
                        <span>67.0% 使用済み</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full" style={{ width: "67%" }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-600">利用期間</div>
                          <div className="font-medium">2024-01-01 ~ 2024-01-31</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-600">残り日数</div>
                          <div className="font-medium">8日</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Usage Chart */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      日別利用状況
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { date: "1/23", used: 3, remaining: 33 },
                        { date: "1/22", used: 2, remaining: 36 },
                        { date: "1/21", used: 1, remaining: 38 },
                        { date: "1/20", used: 4, remaining: 39 },
                        { date: "1/19", used: 2, remaining: 43 },
                      ].map((day, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-12 text-sm text-gray-600">{day.date}</div>
                          <div className="flex-1 bg-gray-100 rounded-full h-2 relative">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(day.used / 10) * 100}%` }}
                            />
                          </div>
                          <div className="text-sm font-medium w-16 text-right">{day.used}通</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Scout Usage History - Full Width */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    スカウト利用履歴
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsageHistory.map((usage, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-600">{usage.date}</div>
                          <div className="w-px h-6 bg-gray-300" />
                          <div>
                            <div className="font-medium">{usage.candidateName}</div>
                            <div className="text-sm text-gray-600">{usage.jobTitle}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              usage.status === "replied"
                                ? "default"
                                : usage.status === "declined"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {usage.status === "sent" ? "送信済み" : usage.status === "replied" ? "返信あり" : "辞退"}
                          </Badge>
                          <div className="text-sm font-medium">-{usage.scoutsUsed}通</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <ReportDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
