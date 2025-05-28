import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function ReportCard({data}) {
    return (
        <Card className="sm:max-w-xs bg-gradient-to-b from-background to-accent shadow-md border w-full">
            <CardHeader className="relative">
                <CardDescription>📋 Form Submissions</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {data.totalSubmissions}
                </CardTitle>
                <div className="absolute right-4 top-4">
                    {data.growthRate && (
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />
                            +{data.growthRate}%
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {data.trendMessage}
                    <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">
                    {data.subtitle || "Submissions in the last 30 days"}
                </div>
            </CardFooter>
        </Card>
    )
}

export default ReportCard
