"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { format, addBusinessDays } from "date-fns"
import { ja } from "date-fns/locale"

interface ScheduleSendSectionProps {
  isScheduled: boolean
  onScheduledChange: (scheduled: boolean) => void
  businessDaysLater: string
  onBusinessDaysChange: (days: string) => void
  scheduledDate?: Date
  onScheduledDateChange: (date?: Date) => void
}

export function ScheduleSendSection({
  isScheduled,
  onScheduledChange,
  businessDaysLater,
  onBusinessDaysChange,
  scheduledDate,
  onScheduledDateChange,
}: ScheduleSendSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="schedule-send" checked={isScheduled} onCheckedChange={onScheduledChange} />
        <Label htmlFor="schedule-send" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          スケジュール送信
        </Label>
      </div>

      {isScheduled && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <Label>営業日後に送信</Label>
            <Select value={businessDaysLater} onValueChange={onBusinessDaysChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1営業日後</SelectItem>
                <SelectItem value="3">3営業日後</SelectItem>
                <SelectItem value="5">5営業日後</SelectItem>
                <SelectItem value="7">7営業日後</SelectItem>
                <SelectItem value="14">14営業日後</SelectItem>
              </SelectContent>
            </Select>
            {businessDaysLater && (
              <p className="text-xs text-gray-600">
                送信予定日:{" "}
                {format(addBusinessDays(new Date(), Number.parseInt(businessDaysLater)), "yyyy年MM月dd日", {
                  locale: ja,
                })}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>または具体的な日付を指定</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduledDate ? format(scheduledDate, "yyyy年MM月dd日", { locale: ja }) : "日付を選択"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={(date) => {
                    onScheduledDateChange(date)
                    if (date) {
                      onBusinessDaysChange("")
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  )
}
