import { CreditCard } from "lucide-react"

interface ScoutCostIndicatorProps {
  selectedCount: number
  remainingScouts?: number
}

export function ScoutCostIndicator({ selectedCount, remainingScouts = 33 }: ScoutCostIndicatorProps) {
  if (selectedCount === 0) return null

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <span className="font-medium">スカウト消費数</span>
        </div>
        <div className="text-lg font-bold text-blue-600">{selectedCount}通</div>
      </div>
      <div className="text-sm text-blue-700 mt-1">送信後の残高: {remainingScouts - selectedCount}通</div>
    </div>
  )
}
