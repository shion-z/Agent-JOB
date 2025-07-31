"use client"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button" // Import ButtonProps
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { AlertCircle, Info } from "lucide-react"

// Helper to get specific classes for hover/onclick simulation
const getSimulatedClasses = (variant: ButtonProps["variant"], state: "hover" | "onclick" | "disabled") => {
  const classMap: Record<string, { hover?: string; onclick?: string; disabled?: string }> = {
    "primary-s": {
      hover: "opacity-90 shadow-blue-m",
      onclick: "opacity-100 scale-95 shadow-none hover:opacity-100 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-300 text-gray-500 shadow-none opacity-50",
    },
    "primary-m": {
      hover: "opacity-90 shadow-blue-m",
      onclick: "opacity-100 scale-95 shadow-none hover:opacity-100 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-300 text-gray-500 shadow-none opacity-50",
    },
    "primary-l-bottom": {
      hover: "opacity-90 shadow-blue-m",
      onclick: "opacity-100 scale-95 shadow-none hover:opacity-100 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-300 text-gray-500 shadow-none opacity-50",
    },
    "secondary-s": {
      hover: "bg-secondary/80 border-gray-300",
      onclick: "bg-secondary/70 scale-95 shadow-none hover:bg-secondary/70 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-100 text-gray-400 border-gray-200",
    },
    "secondary-s-top": {
      hover: "bg-secondary-50 border-secondary-500",
      onclick: "bg-secondary-100 scale-95 shadow-none hover:bg-secondary-100 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-50 text-gray-400 border-gray-200",
    },
    "secondary-m": {
      hover: "bg-secondary/80 border-gray-300",
      onclick: "bg-secondary/70 scale-95 shadow-none hover:bg-secondary/70 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-100 text-gray-400 border-gray-200",
    },
    "gray-m": {
      hover: "bg-gray-200 text-gray-800",
      onclick: "bg-gray-300 scale-95 shadow-none hover:bg-gray-300 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-50 text-gray-400 border-gray-100",
    },
    "red-m": {
      hover: "bg-destructive/90 shadow-normal-m",
      onclick: "bg-destructive/80 scale-95 shadow-none hover:bg-destructive/80 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-300 text-gray-500 shadow-none",
    },
    "red-l-bottom": {
      hover: "opacity-90 shadow-normal-l",
      onclick: "opacity-80 scale-95 shadow-none hover:opacity-80 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-300 text-gray-500 shadow-none opacity-50",
    },
    "orange-m": {
      hover: "opacity-90 shadow-normal-m",
      onclick: "opacity-80 scale-95 shadow-none hover:opacity-80 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-300 text-gray-500 shadow-none opacity-50",
    },
    "pick-m": {
      hover: "opacity-90 shadow-blue-m",
      onclick: "opacity-80 scale-95 shadow-none hover:opacity-80 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-300 text-gray-500 shadow-none opacity-50",
    },
    "pick-l": {
      hover: "opacity-90 shadow-blue-m",
      onclick: "opacity-80 scale-95 shadow-none hover:opacity-80 hover:scale-95 hover:shadow-none",
      disabled: "bg-gray-300 text-gray-500 shadow-none opacity-50",
    },
    textbutton: {
      hover: "underline text-primary/80",
      onclick: "text-primary/70 hover:text-primary/70 hover:no-underline",
      disabled: "text-gray-400 no-underline",
    },
  }

  return classMap[variant as string]?.[state] || ""
}

const ButtonStateDisplay = ({ variant, label }: { variant: ButtonProps["variant"]; label: string }) => {
  return (
    <div className="w-full space-y-2">
      <h4 className="text-md font-semibold text-foreground">
        {label} <span className="font-mono text-sm text-muted-foreground">({variant})</span>
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button variant={variant}>テキスト</Button>
          <span className="text-xs text-muted-foreground">Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant={variant} className={getSimulatedClasses(variant, "hover")}>
            テキスト
          </Button>
          <span className="text-xs text-muted-foreground">Hover</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant={variant} className={getSimulatedClasses(variant, "onclick")}>
            テキスト
          </Button>
          <span className="text-xs text-muted-foreground">Onclick</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant={variant} disabled className={getSimulatedClasses(variant, "disabled")}>
            テキスト
          </Button>
          <span className="text-xs text-muted-foreground">Disabled</span>
        </div>
      </div>
    </div>
  )
}

export default function ComponentsPage() {
  const [sliderValue, setSliderValue] = useState([50])
  const [progress] = useState(65)

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Components</h1>
          <div className="flex gap-3">
            <Link href="/home/designtokens">
              <Button variant="gray-m">Design Tokens</Button>
            </Link>
            <Link href="/home">
              <Button variant="gray-m">Back to Home</Button>
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">Explore all available UI components organized by category</p>
      </div>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="buttons">Buttons & Actions</TabsTrigger>
          <TabsTrigger value="forms">Form Elements</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="gradients">Gradients</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Primary Buttons</CardTitle>
              <CardDescription>Main action buttons in different sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <ButtonStateDisplay variant="primary-s" label="プライマリ小" />
              <ButtonStateDisplay variant="primary-m" label="プライマリ中" />
              <ButtonStateDisplay variant="primary-l-bottom" label="プライマリ大" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Secondary Buttons</CardTitle>
              <CardDescription>Secondary action buttons with different styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <ButtonStateDisplay variant="secondary-s" label="セカンダリ小" />
              <ButtonStateDisplay variant="secondary-s-top" label="セカンダリ小上" />
              <ButtonStateDisplay variant="secondary-m" label="セカンダリ中" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Utility Buttons</CardTitle>
              <CardDescription>Specialized buttons for different use cases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <ButtonStateDisplay variant="gray-m" label="グレー中" />
              <ButtonStateDisplay variant="orange-m" label="オレンジ中" />
              <ButtonStateDisplay variant="textbutton" label="テキストボタン" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Destructive Buttons</CardTitle>
              <CardDescription>Buttons for destructive or warning actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <ButtonStateDisplay variant="red-m" label="レッド中" />
              <ButtonStateDisplay variant="red-l-bottom" label="レッド大" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Special Buttons</CardTitle>
              <CardDescription>Buttons with special functionality and styling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <ButtonStateDisplay variant="pick-l" label="選択ボタン" />
              <ButtonStateDisplay variant="pick-l" label="選択ボタン" />
            </CardContent>
          </Card>

          {/* Removed the redundant "Button States" card as states are now shown per variant */}

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Badges</CardTitle>
              <CardDescription>Status indicators and labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Badge>デフォルト</Badge>
                <Badge variant="secondary">セカンダリ</Badge>
                <Badge variant="outline">アウトライン</Badge>
                <Badge variant="destructive">エラー</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Elements</CardTitle>
              <CardDescription>Form inputs and controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input id="email" type="email" placeholder="メールアドレスを入力" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <Input id="password" type="password" placeholder="パスワードを入力" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">メッセージ</Label>
                <Textarea id="message" placeholder="メッセージを入力してください" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">通知を有効にする</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">利用規約に同意する</Label>
                </div>
              </div>

              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">選択肢1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">選択肢2</Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label>Select an option</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">選択肢1</SelectItem>
                    <SelectItem value="option2">選択肢2</SelectItem>
                    <SelectItem value="option3">選択肢3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>スライダー: {sliderValue[0]}</Label>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Status messages and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>情報</AlertTitle>
                <AlertDescription>これは情報アラートメッセージです。</AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>エラー</AlertTitle>
                <AlertDescription>何かが間違っています。もう一度お試しください。</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
              <CardDescription>Progress indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>進捗</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avatars</CardTitle>
              <CardDescription>User profile images and placeholders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>Content containers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>サンプルカード</CardTitle>
                    <CardDescription>これはサンプルカードの説明です</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      カードの内容がここに表示されます。これはデザインシステムでのカードの表示例を示しています。
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>別のカード</CardTitle>
                    <CardDescription>異なる内容のカード</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="primary-m" className="w-full">
                      アクションボタン
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gradients" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Gradients</CardTitle>
              <CardDescription>Main brand gradients for primary elements</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 rounded-lg bg-gradient-blue-primary flex flex-col items-center justify-center text-white font-semibold shadow-blue-s gap-1">
                <span>Blue Primary</span>
                <span className="font-mono text-xs text-muted-foreground">--gradient-blue-primary</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-blue-primary</span>
              </div>
              <div className="h-32 rounded-lg bg-gradient-blue-secondary flex flex-col items-center justify-center text-primary-900 font-semibold shadow-normal-s gap-1">
                <span>Blue Secondary</span>
                <span className="font-mono text-xs text-muted-foreground">--gradient-blue-secondary</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-blue-secondary</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orange Gradients</CardTitle>
              <CardDescription>Secondary brand gradients for accent elements</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 rounded-lg bg-gradient-orange-primary flex flex-col items-center justify-center text-white font-semibold shadow-normal-s gap-1">
                <span>Orange Primary</span>
                <span className="font-mono text-xs text-muted-foreground">--gradient-orange-primary</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-orange-primary</span>
              </div>
              <div className="h-32 rounded-lg bg-gradient-orange-secondary flex flex-col items-center justify-center text-white font-semibold shadow-normal-s gap-1">
                <span>Orange Secondary</span>
                <span className="font-mono text-xs text-muted-foreground">--gradient-orange-secondary</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-orange-secondary</span>
              </div>
              <div className="h-32 rounded-lg bg-gradient-orange-number flex flex-col items-center justify-center text-secondary-900 font-semibold shadow-normal-s gap-1">
                <span>Orange Number</span>
                <span className="font-mono text-xs text-muted-foreground">--gradient-orange-number</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-orange-number</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Gradients</CardTitle>
              <CardDescription>Unique gradients for special use cases</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 rounded-lg bg-gradient-red flex flex-col items-center justify-center text-white font-semibold shadow-normal-s gap-1">
                <span>Red Gradient</span>
                <span className="font-mono text-xs text-muted-foreground">--gradient-red</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-red</span>
              </div>
              <div className="h-32 rounded-lg bg-gradient-red-orange flex flex-col items-center justify-center text-white font-semibold shadow-normal-s gap-1">
                <span>Red Orange</span>
                <span className="font-mono text-xs text-muted-foreground">--gradient-red-orange</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-red-orange</span>
              </div>
              <div className="h-32 rounded-lg bg-gradient-red-purple flex flex-col items-center justify-center text-white font-semibold shadow-normal-s gap-1">
                <span>Red Purple</span>
                <span className="font-mono text-xs text-muted-foreground">--gradient-red-purple</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-red-purple</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shadow Examples</CardTitle>
              <CardDescription>Different shadow styles applied to elements</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-32 rounded-s bg-white shadow-normal-s flex flex-col items-center justify-center font-semibold border gap-1">
                <span>Normal Small</span>
                <span className="font-mono text-xs text-muted-foreground">--shadow-normal-s</span>
                <span className="font-mono text-xs text-muted-foreground">.shadow-normal-s</span>
              </div>
              <div className="h-32 rounded-m bg-white shadow-normal-m flex flex-col items-center justify-center font-semibold gap-1">
                <span>Normal Medium</span>
                <span className="font-mono text-xs text-muted-foreground">--shadow-normal-m</span>
                <span className="font-mono text-xs text-muted-foreground">.shadow-normal-m</span>
              </div>
              <div className="h-32 rounded-l bg-white shadow-normal-l flex flex-col items-center justify-center font-semibold gap-1">
                <span>Normal Large</span>
                <span className="font-mono text-xs text-muted-foreground">--shadow-normal-l</span>
                <span className="font-mono text-xs text-muted-foreground">.shadow-normal-l</span>
              </div>
              <div className="h-32 rounded-s bg-white shadow-blue-s flex flex-col items-center justify-center font-semibold text-primary gap-1">
                <span>Blue Small</span>
                <span className="font-mono text-xs text-muted-foreground">--shadow-blue-s</span>
                <span className="font-mono text-xs text-muted-foreground">.shadow-blue-s</span>
              </div>
              <div className="h-32 rounded-m bg-white shadow-blue-m flex flex-col items-center justify-center font-semibold text-primary gap-1">
                <span>Blue Medium</span>
                <span className="font-mono text-xs text-muted-foreground">--shadow-blue-m</span>
                <span className="font-mono text-xs text-muted-foreground">.shadow-blue-m</span>
              </div>
              <div className="h-32 rounded-m bg-gradient-blue-primary shadow-blue-m flex flex-col items-center justify-center font-semibold text-white gap-1">
                <span>Blue Gradient + Shadow</span>
                <span className="font-mono text-xs text-muted-foreground">.bg-gradient-blue-primary</span>
                <span className="font-mono text-xs text-muted-foreground">.shadow-blue-m</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
