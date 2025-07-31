import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "開封率", value: 75 },
  { name: "返信率", value: 42 },
  { name: "面談設定率", value: 25 },
  { name: "内定承諾率", value: 10 },
]

export default function ReportDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>スカウトパフォーマンス</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="割合 (%)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
