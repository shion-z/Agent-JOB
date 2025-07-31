"use client"

import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"

export function ScoutPlanManager() {
  return (
    <div className="flex items-center gap-4">
      {/* Quick Add Credits Button */}
      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        スカウト追加
      </Button>
    </div>
  )
}
