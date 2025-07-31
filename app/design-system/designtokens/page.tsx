import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Copy } from "lucide-react"

export default function DesignTokensPage() {
  const colorTokens = {
    grayscale: [
      { name: "--gray-50", value: "#F5F5FA", description: "Light backgrounds and subtle elements" },
      { name: "--gray-100", value: "#E6E8F0", description: "Secondary backgrounds" },
      { name: "--gray-200", value: "#D0D3DB", description: "Border and input colors" },
      { name: "--gray-300", value: "#ADAEB8", description: "Disabled text and icons" },
      { name: "--gray-400", value: "#999BA5", description: "Placeholder text" },
      { name: "--gray-500", value: "#888B8F", description: "Secondary text" },
      { name: "--gray-600", value: "#6C6C68", description: "Muted text" },
      { name: "--gray-700", value: "#4E4F52", description: "Body text" },
      { name: "--gray-800", value: "#3E3E40", description: "Headings" },
      { name: "--gray-900", value: "#1C1C1C", description: "Primary text" },
    ],
    primary: [
      { name: "--primary-50", value: "#F5F7FF", description: "Light primary backgrounds" },
      { name: "--primary-300", value: "#99B2FF", description: "Light primary accents" },
      { name: "--primary-500", value: "#668CFF", description: "Medium primary" },
      { name: "--primary-700", value: "#3366FF", description: "Primary buttons and links" },
      { name: "--primary-900", value: "#0040FF", description: "Dark primary accents" },
    ],
    secondary: [
      { name: "--secondary-50", value: "#FFF8F0", description: "Light secondary backgrounds" },
      { name: "--secondary-300", value: "#FFD0B0", description: "Light secondary accents" },
      { name: "--secondary-500", value: "#FF8C85", description: "Medium secondary" },
      { name: "--secondary-700", value: "#FF8F33", description: "Secondary buttons" },
      { name: "--secondary-900", value: "#FF7300", description: "Dark secondary accents" },
    ],
    error: [
      { name: "--error-50", value: "#FFEA65", description: "Light error backgrounds" },
      { name: "--error-500", value: "#FF0995", description: "Error states" },
      { name: "--error-900", value: "#FF3B00", description: "Critical errors" },
    ],
    special: [
      { name: "--aqua", value: "#00DAFF", description: "Info and special highlights" },
      { name: "--amber", value: "#FFA800", description: "Warnings and attention" },
      { name: "--white", value: "#FFFFFF", description: "Pure white" },
      { name: "--black", value: "#000000", description: "Pure black" },
    ],
    gradients: [
      {
        name: "--gradient-blue-primary",
        value: "linear-gradient(95deg, #00D4FF 0%, #0040FF 100%)",
        description: "Primary blue gradient for main brand elements",
      },
      {
        name: "--gradient-blue-secondary",
        value: "linear-gradient(139deg, #F5F7FF 0%, #0040FF 100%)",
        description: "Secondary blue gradient for subtle backgrounds",
      },
      {
        name: "--gradient-orange-primary",
        value: "linear-gradient(95deg, #FFA800 0%, #FF7300 100%)",
        description: "Primary orange gradient for secondary brand elements",
      },
      {
        name: "--gradient-orange-secondary",
        value: "linear-gradient(139deg, #FFBC85 0%, #FF7300 100%)",
        description: "Secondary orange gradient for accent elements",
      },
      {
        name: "--gradient-orange-number",
        value: "linear-gradient(139deg, #FFF9F5 0%, #FF7300 100%)",
        description: "Orange number gradient for numerical displays",
      },
      {
        name: "--gradient-red",
        value: "linear-gradient(315deg, #FF3B00 3.12%, #FF9985 103.12%)",
        description: "Red gradient for error states and alerts",
      },
      {
        name: "--gradient-red-orange",
        value: "linear-gradient(315deg, #FF3B00 3.12%, #FF8F33 103.12%)",
        description: "Red-orange gradient for warning states",
      },
      {
        name: "--gradient-red-purple",
        value: "linear-gradient(95deg, #FF67E6 0%, #0F3FFF 100%)",
        description: "Special red-purple gradient for unique elements",
      },
    ],
  }

  const shadowTokens = [
    {
      name: "--shadow-normal-s",
      value: "0 2px 20px 0 rgba(0, 0, 0, 0.04)",
      description: "Small shadow for subtle elevation",
    },
    {
      name: "--shadow-normal-m",
      value: "0 16px 32px -16px rgba(0, 0, 0, 0.20)",
      description: "Medium shadow for cards and containers",
    },
    {
      name: "--shadow-normal-l",
      value: "0 16px 32px -16px rgba(0, 0, 0, 0.40)",
      description: "Large shadow for modals and overlays",
    },
    {
      name: "--shadow-blue-s",
      value: "2px 2px 4px 0 rgba(0, 64, 255, 0.20)",
      description: "Small blue shadow for primary buttons",
    },
    {
      name: "--shadow-blue-m",
      value: "0 16px 32px -16px rgba(0, 64, 255, 0.40)",
      description: "Medium blue shadow for primary cards",
    },
  ]

  const radiusTokens = [
    { name: "--radius-s", value: "12px", description: "Small border radius for buttons and inputs" },
    { name: "--radius-m", value: "16px", description: "Medium border radius for cards" },
    { name: "--radius-l", value: "32px", description: "Large border radius for modals and containers" },
  ]

  const typographyTokens = {
    fontFamily: [
      { name: "--font-sans", value: "'Noto Sans JP', sans-serif", description: "Primary font family for the system" },
    ],
    fontSize: [
      {
        name: "--text-xs",
        value: "0.75rem",
        description: "12px - Small labels, captions",
        sample: "小さなラベルテキスト",
      },
      {
        name: "--text-sm",
        value: "0.875rem",
        description: "14px - Secondary text, form labels",
        sample: "セカンダリテキスト",
      },
      {
        name: "--text-base",
        value: "1rem",
        description: "16px - Body text, default size",
        sample: "本文テキストのサンプル",
      },
      { name: "--text-lg", value: "1.125rem", description: "18px - Large body text", sample: "大きな本文テキスト" },
      { name: "--text-xl", value: "1.25rem", description: "20px - Small headings", sample: "小見出しテキスト" },
      { name: "--text-2xl", value: "1.5rem", description: "24px - Medium headings", sample: "中見出しテキスト" },
      { name: "--text-3xl", value: "1.875rem", description: "30px - Large headings", sample: "大見出しテキスト" },
      { name: "--text-4xl", value: "2.25rem", description: "36px - Extra large headings", sample: "特大見出し" },
      { name: "--text-5xl", value: "3rem", description: "48px - Display headings", sample: "ディスプレイ見出し" },
    ],
    lineHeight: [
      { name: "--leading-none", value: "1", description: "1.0 - Tight spacing for headings" },
      { name: "--leading-tight", value: "1.25", description: "1.25 - Compact text" },
      { name: "--leading-snug", value: "1.375", description: "1.375 - Slightly relaxed" },
      { name: "--leading-normal", value: "1.5", description: "1.5 - Standard body text" },
      { name: "--leading-relaxed", value: "1.625", description: "1.625 - Comfortable reading" },
      { name: "--leading-loose", value: "2", description: "2.0 - Very spacious" },
    ],
    letterSpacing: [
      { name: "--tracking-tighter", value: "-0.05em", description: "-0.05em - Very tight" },
      { name: "--tracking-tight", value: "-0.025em", description: "-0.025em - Tight" },
      { name: "--tracking-normal", value: "0", description: "0 - Normal spacing" },
      { name: "--tracking-wide", value: "0.025em", description: "0.025em - Wide" },
      { name: "--tracking-wider", value: "0.05em", description: "0.05em - Wider" },
      { name: "--tracking-widest", value: "0.1em", description: "0.1em - Widest" },
    ],
    fontWeight: [
      { name: "--font-light", value: "300", description: "Light weight" },
      { name: "--font-normal", value: "400", description: "Normal/Regular weight" },
      { name: "--font-medium", value: "500", description: "Medium weight" },
      { name: "--font-semibold", value: "600", description: "Semi-bold weight" },
      { name: "--font-bold", value: "700", description: "Bold weight" },
    ],
  }

  const semanticTokens = [
    { name: "--background", value: "var(--white)", description: "Main background color" },
    { name: "--foreground", value: "var(--gray-900)", description: "Main text color" },
    { name: "--primary", value: "var(--primary-700)", description: "Primary button color" },
    { name: "--secondary", value: "var(--gray-100)", description: "Secondary backgrounds" },
    { name: "--muted", value: "var(--gray-100)", description: "Muted backgrounds" },
    { name: "--border", value: "var(--gray-200)", description: "Default border color" },
    { name: "--input", value: "var(--gray-200)", description: "Input border color" },
    { name: "--ring", value: "var(--primary-700)", description: "Focus ring color" },
  ]

  const ColorSwatch = ({ name, value, description }: { name: string; value: string; description: string }) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
      <div
        className="w-12 h-12 rounded-md border shadow-sm flex-shrink-0"
        style={{
          backgroundColor: value.startsWith("#") ? value : `var(${value.replace("var(", "").replace(")", "")})`,
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="font-mono text-sm font-medium">{name}</div>
        <div className="font-mono text-xs text-muted-foreground">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      </div>
      <Button variant="gray-m" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )

  const GradientTokenSwatch = ({ name, value, description }: { name: string; value: string; description: string }) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
      <div
        className="w-12 h-12 rounded-md border shadow-sm flex-shrink-0"
        style={{
          background: value,
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="font-mono text-sm font-medium">{name}</div>
        <div className="font-mono text-xs text-muted-foreground">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      </div>
      <Button variant="gray-m" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )

  const GradientSwatch = ({
    name,
    tailwindClass,
    description,
  }: { name: string; tailwindClass: string; description: string }) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className={`w-12 h-12 rounded-md border shadow-sm flex-shrink-0 ${tailwindClass}`} />
      <div className="flex-1 min-w-0">
        <div className="font-mono text-sm font-medium">{name}</div>
        <div className="font-mono text-xs text-muted-foreground">.{tailwindClass}</div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      </div>
      <Button variant="gray-m" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )

  const TypographySwatch = ({
    name,
    value,
    description,
    sample,
  }: { name: string; value: string; description: string; sample?: string }) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="font-mono text-sm font-medium">{name}</div>
        <div className="font-mono text-xs text-muted-foreground">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
        {sample && (
          <div className="mt-2 p-2 bg-muted/30 rounded" style={{ fontSize: value }}>
            {sample}
          </div>
        )}
      </div>
      <Button variant="gray-m" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground">Design Tokens</h1>
          <div className="flex gap-3">
            <Link href="/design-system/components">
              <Button variant="primary-s">Components</Button>
            </Link>
            <Link href="/design-system">
              <Button variant="gray-m">Back to Design System Dashboard</Button>
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">Explore the design tokens that power the entire design system</p>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="gradients">Gradients</TabsTrigger>
          <TabsTrigger value="shadows">Shadows</TabsTrigger>
          <TabsTrigger value="radius">Radius</TabsTrigger>
          <TabsTrigger value="semantic">Semantic</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Grayscale</CardTitle>
              <CardDescription>Neutral colors for text, backgrounds, and borders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {colorTokens.grayscale.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Primary Colors</CardTitle>
              <CardDescription>Main brand colors for primary actions and highlights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {colorTokens.primary.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secondary Colors</CardTitle>
              <CardDescription>Accent colors for secondary actions and variety</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {colorTokens.secondary.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Colors</CardTitle>
              <CardDescription>Colors for error states and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {colorTokens.error.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Colors</CardTitle>
              <CardDescription>Unique colors for specific use cases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {colorTokens.special.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Font Family</CardTitle>
              <CardDescription>Primary font family used throughout the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {typographyTokens.fontFamily.map((token) => (
                <div key={token.name} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium">{token.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{token.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{token.description}</div>
                    <div className="mt-2 p-3 bg-muted/30 rounded text-lg" style={{ fontFamily: token.value }}>
                      Noto Sans JP フォントサンプル - Typography Sample 123
                    </div>
                  </div>
                  <Button variant="gray-m" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Sizes</CardTitle>
              <CardDescription>Typography scale with Japanese text samples</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {typographyTokens.fontSize.map((token) => (
                <TypographySwatch key={token.name} {...token} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Heights</CardTitle>
              <CardDescription>Line height values optimized for readability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {typographyTokens.lineHeight.map((token) => (
                <div key={token.name} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium">{token.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{token.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{token.description}</div>
                    <div className="mt-2 p-2 bg-muted/30 rounded text-sm" style={{ lineHeight: token.value }}>
                      これは行間のサンプルテキストです。日本語の文章における行間の設定により、読みやすさが大きく変わります。適切な行間を設定することで、ユーザーにとって快適な読書体験を提供できます。
                    </div>
                  </div>
                  <Button variant="gray-m" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Letter Spacing</CardTitle>
              <CardDescription>Letter spacing values for different text styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {typographyTokens.letterSpacing.map((token) => (
                <div key={token.name} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium">{token.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{token.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{token.description}</div>
                    <div className="mt-2 p-2 bg-muted/30 rounded text-sm" style={{ letterSpacing: token.value }}>
                      文字間隔のサンプルテキスト - Letter Spacing Sample
                    </div>
                  </div>
                  <Button variant="gray-m" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Weights</CardTitle>
              <CardDescription>Available font weights for Noto Sans JP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {typographyTokens.fontWeight.map((token) => (
                <div key={token.name} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium">{token.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{token.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{token.description}</div>
                    <div className="mt-2 p-2 bg-muted/30 rounded text-lg" style={{ fontWeight: token.value }}>
                      フォントウェイトサンプル - Font Weight Sample
                    </div>
                  </div>
                  <Button variant="gray-m" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gradients" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Gradient Tokens</CardTitle>
              <CardDescription>CSS variables defining gradient start and end colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {colorTokens.gradients.map((token) => (
                <GradientTokenSwatch key={token.name} {...token} />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Gradient Classes</CardTitle>
              <CardDescription>Tailwind CSS classes for applying gradients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <GradientSwatch
                name="Blue Primary"
                tailwindClass="bg-gradient-blue-primary"
                description="Primary blue gradient for main brand elements"
              />
              <GradientSwatch
                name="Blue Secondary"
                tailwindClass="bg-gradient-blue-secondary"
                description="Secondary blue gradient for subtle backgrounds"
              />
              <GradientSwatch
                name="Orange Primary"
                tailwindClass="bg-gradient-orange-primary"
                description="Primary orange gradient for secondary brand elements"
              />
              <GradientSwatch
                name="Orange Secondary"
                tailwindClass="bg-gradient-orange-secondary"
                description="Secondary orange gradient for accent elements"
              />
              <GradientSwatch
                name="Orange Number"
                tailwindClass="bg-gradient-orange-number"
                description="Orange number gradient for numerical displays"
              />
              <GradientSwatch
                name="Red Gradient"
                tailwindClass="bg-gradient-red"
                description="Red gradient for error states and alerts"
              />
              <GradientSwatch
                name="Red Orange"
                tailwindClass="bg-gradient-red-orange"
                description="Red-orange gradient for warning states"
              />
              <GradientSwatch
                name="Red Purple"
                tailwindClass="bg-gradient-red-purple"
                description="Special red-purple gradient for unique elements"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shadows" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Shadow Tokens</CardTitle>
              <CardDescription>CSS variables defining shadow styles for elevation and depth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {shadowTokens.map((token) => (
                <div
                  key={token.name}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-md bg-white flex-shrink-0 border"
                    style={{ boxShadow: token.value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium">{token.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{token.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{token.description}</div>
                  </div>
                  <Button variant="gray-m" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radius" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Border Radius Tokens</CardTitle>
              <CardDescription>Consistent border radius values for rounded corners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {radiusTokens.map((token) => (
                <div key={token.name} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div
                    className="w-12 h-12 bg-primary/20 border-2 border-primary flex-shrink-0"
                    style={{ borderRadius: token.value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium">{token.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{token.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{token.description}</div>
                  </div>
                  <Button variant="gray-m" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radius Usage Examples</CardTitle>
              <CardDescription>How different radius values look in practice</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-full h-20 bg-gradient-blue-primary rounded-s mb-2 flex items-center justify-center text-white font-semibold">
                  Small (12px)
                </div>
                <p className="text-sm text-muted-foreground">Buttons & Inputs</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 bg-gradient-orange-primary rounded-m mb-2 flex items-center justify-center text-white font-semibold">
                  Medium (16px)
                </div>
                <p className="text-sm text-muted-foreground">Cards & Components</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 bg-gradient-red rounded-l mb-2 flex items-center justify-center text-white font-semibold">
                  Large (32px)
                </div>
                <p className="text-sm text-muted-foreground">Modals & Containers</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semantic" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Semantic Tokens</CardTitle>
              <CardDescription>
                Semantic tokens that map to specific color values and provide meaning to components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {semanticTokens.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
