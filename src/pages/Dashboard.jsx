import { PageHeader, ReportCard } from "@/components/custom"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

function Dashboard() {
    const formStats = {
        totalSubmissions: 1250,
        growthRate: 12.5,
        trendMessage: "Trending up this month",
        subtitle: "Submissions in the last 6 months"
    };

    return (
        <main className='p-3'>
            {/* header  */}
            <PageHeader title="Dashboard">
                <Button size="sm" className={"text-xs"}>
                    <BarChart3 />
                    <span className="sm:block hidden">View Analytics</span>
                </Button>
            </PageHeader>
            {/* card  */}
            <section className="flex gap-3 sm:flex-row flex-col w-full mt-2">
                <ReportCard data={formStats} />
                <ReportCard data={formStats} />
                <ReportCard data={formStats} />

            </section>
        </main>
    )
}

export default Dashboard
