import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Palette, Component } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">イツザイエージェントJOB</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Agentのワークスペースへようこそ
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Component className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">テキスト</CardTitle>
              <CardDescription>
                Explore all available UI components with their variants and usage examples
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="primary-m" className="w-full">
                <Link href="/design-system/components">View Components</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                <Palette className="h-8 w-8 text-secondary-700" style={{ color: "var(--secondary-700)" }} />
              </div>
              <CardTitle className="text-xl">テキスト</CardTitle>
              <CardDescription>View and customize the design tokens that power the entire system</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="primary-m" className="w-full">
                <Link href="/design-system/designtokens">View Design Tokens</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">テキスト</h3>
            <p className="text-muted-foreground">
              テキスト
テキスト
テキスト
テキスト

            </p>
          </div>
          
          <div className="mt-4 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">UXデザイナーが既存デザインシステムを使って新規UI画面を作る場合</h3>
            <p className="text-muted-foreground pb-4">
              想定担当者：プロジェクトのUIを組むUXデザイナー、V0ユーザー（非エンジニア）
            </p>
                <div className="flex items-center p-6 pt-4 rounded-m border bg-card shadow-normal-s">
                  <div className="text-base text-gray-600 font-medium">
                    <h1>許可されている編集範囲</h1>
                    <h3 className="text-sm text-gray-500 pt-4">
                     <span className="block">• app/*/ ディレクトリ（＝各ページやフローに対応）</span><span className="block pt-2">• ページ単位の page.tsx、必要に応じて page.module.css </span><span className="block pt-2">• などomponents/ 配下で個別のページ用に分けられた補助コンポーネント（例：MyPageSection.tsxなど）</span>
                    </h3>
                  </div>
                  
                </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
