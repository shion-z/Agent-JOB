import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Palette, Component } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Design System Dashboard</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive design system built with shadcn/ui components and custom CSS tokens. Explore components and
          design tokens that power our unified design language.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Quick Navigation</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Component className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Components</CardTitle>
              <CardDescription>
                Explore all available UI components with their variants and usage examples
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="primary-m" className="w-full">
                <Link href="/home/components">View Components</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                <Palette className="h-8 w-8 text-secondary-700" style={{ color: "var(--secondary-700)" }} />
              </div>
              <CardTitle className="text-xl">Design Tokens</CardTitle>
              <CardDescription>View and customize the design tokens that power the entire system</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="primary-m" className="w-full">
                <Link href="/home/designtokens">View Design Tokens</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-3">About This Design System</h3>
          <p className="text-muted-foreground">
            This design system is built on top of shadcn/ui components with custom CSS tokens defined in globals.css.
            All components inherit their styling from these centralized tokens, ensuring consistency and easy
            customization across the entire application.
          </p>
        </div>
      </div>
    </div>
  )
}
